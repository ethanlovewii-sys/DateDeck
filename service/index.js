const app = express();
const express = require('express');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const deckRoutes = require('./routes/deck');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

var apiRouter = express.Router();
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes)
app.use('/api/deck',deckRoutes )

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});