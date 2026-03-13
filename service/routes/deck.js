const express = require('express');
const router = express.Router();
const {verifyAuth} = require('./auth');

const cards = [];
let titleIndex = 1;

router.get('/loadCards', verifyAuth, (_req, res) => {
    res.send(cards);
});

router.get('/loadTitleIndex', (req, res) => {
    res.send(titleIndex);
});

router.post('/addCard', (req, res) => {
    cards.push(req.body);
    titleIndex++;
    res.json({ titleIndex });
});

module.exports = router;