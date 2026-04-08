process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');

const { connectToDb } = require('./database');

// Routes
const { router: authRoutes } = require('./auth');
const deckRoutes = require('./deck');
const chatRoutes = require('./chat');

// ✅ Import WebSocket setup function
const { setupWebSocket } = require('./webSocket');

const app = express();

const port = process.env.PORT || 4000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/deck', deckRoutes);
app.use('/api/chat', chatRoutes);

// ✅ Create HTTP server from Express
const server = http.createServer(app);

// ✅ Attach WebSocket to the same server
setupWebSocket(server);

// Start server
async function startServer() {
  console.log("Starting server...");

  try {
    console.log("Connecting to DB...");
    await connectToDb();
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB FAILED:", err);
  }

  server.listen(port, '0.0.0.0', () => {
    console.log(`HTTP + WebSocket server running on port ${port}`);
  });
}

startServer();