const { WebSocketServer } = require('ws');
const { saveMessage } = require('./database');

function setupWebSocket(server) {
    const wss = new WebSocketServer({ server });

    const chatRooms = new Map();

    wss.on('connection', (ws) => {
        console.log("User connected");

        ws.on('message', async (data) => {
            const socketMessage = JSON.parse(data);

            if (socketMessage.type === 'join') {
                console.log("joined chat room", socketMessage.chatId)
                const chatId = socketMessage.chatId;

                if (!chatRooms.has(chatId)) {
                    chatRooms.set(chatId, new Set());
                }

                chatRooms.get(chatId).add(ws);
                ws.chatId = chatId;

                console.log(`User joined chat ${chatId}`);
            }

            if (socketMessage.type === 'message') {
                const message = socketMessage.payload;

                await saveMessage(message);
                console.log("broadcasting message", message);

                const clients = chatRooms.get(message.chatId) || [];

                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'message',
                            payload: message
                        }));
                    }
                });
            }
        });

        ws.on('close', () => {
            const chatId = ws.chatId;

            if (chatId && chatRooms.has(chatId)) {
                chatRooms.get(chatId).delete(ws);

                if (chatRooms.get(chatId).size === 0) {
                    chatRooms.delete(chatId);
                }
            }
        });
    });

    console.log("WebSocket attached to HTTP server");
}

module.exports = { setupWebSocket };