const WebSocket = require('ws');
const { saveMessage } = require('./database');

const wss = new WebSocket.Server({ port: 3001 });

const clients = new Set();

wss.on('connection', (ws) => {
    //When a new client connects, add them to the set of clients
    clients.add(ws);

    console.log("User connected");

    ws.on('message', async (data) => {
        const message = JSON.parse(data);

        // Save to DB
        await saveMessage(message);

        // Broadcast to everyone
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log("User disconnected");
    });
});