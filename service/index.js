const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const DB = require('./database.js');

const { router: authRoutes } = require('./routes/auth');
const deckRoutes = require('./routes/deck');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/deck', deckRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});