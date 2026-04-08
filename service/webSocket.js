const { saveMessage } = require('./database');

const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({port: 3000});

const chatRooms = new Map();

wss.on('connection', (ws) => {
    console.log("User connected");

    ws.on('message', async (data) => {
        const socketMessage = JSON.parse(data);
        console.log("Received message:", socketMessage);

        if (socketMessage.type === 'join') {
            const chatId  = socketMessage.chatId;

            // if the chat room doesnt exist create one
            if (!chatRooms.has(chatId)) {
                chatRooms.set(chatId, new Set());
            }

            //add this user to the chat room
            chatRooms.get(chatId).add(ws);
            ws.chatId = chatId; 
            console.log(`User joined chat ${chatId}`);
        }

        if (socketMessage.type === 'message') {
            const message = socketMessage.payload;
            // Save to DB
            await saveMessage(message);

            // Broadcast to everyone in the chat room
            const clients = chatRooms.get(message.chatId) || [];

            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'message', payload: message }));
                        console.log("Broadcasted message to chat room:", message.chatId);
                }
            });
        }
    });

    ws.on('close', () => {
        const chatId = ws.chatId;

        if (chatId && chatRooms.has(chatId)) {
            chatRooms.get(chatId).delete(ws);
            console.log("User disconnected");

            if (chatRooms.get(chatId).size === 0) {
                chatRooms.delete(chatId);
                console.log(`Chat ${chatId} deleted due to no users`);
            }
        }
    });
});

console.log("WebSocket server running on port 3000");