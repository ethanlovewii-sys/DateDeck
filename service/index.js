console.log("file reached");

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const { connectToDb } = require('./database');

const { router: authRoutes } = require('./routes/auth');
const deckRoutes = require('./routes/deck');

const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/deck', deckRoutes);

async function startServer() {
  console.log("Starting server...");

  try {
    console.log("Connecting to DB...");
    await connectToDb();
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB FAILED:", err);
  }

  console.log("Starting Express...");

  app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
  });
}

startServer();