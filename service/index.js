const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const { router: authRoutes } = require('./routes/auth');
const deckRoutes = require('./routes/deck');

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const path = require('path');

app.use(express.static(path.join(__dirname, '../dist')));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/deck', deckRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//NEED TO ADD:
//third party API call
//shift deck from local storage to back end

//can look into the socail page, but prolly scrap it for now.