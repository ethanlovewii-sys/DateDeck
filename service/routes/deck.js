const express = require('express');
const router = express.Router();
const {verifyAuth} = require('./auth');

const cards = [];
let titleIndex = 1;

router.get('/loadCards', verifyAuth, (_req, res) => {
    const unusedCards = cards.filter(card => !card.used);
    res.json(unusedCards);
});

router.get('/loadTitleIndex', (req, res) => {
    res.send(titleIndex);
});

router.post('/addCard', verifyAuth, (req, res) => {
    cards.push(req.body);
    titleIndex++;
    res.json({ titleIndex });
});

router.post('/useCard', verifyAuth, (req, res) => {
    const {id} = req.body;
    const card = cards.find(c => c.id === id);
    if (!card) {
        return res.status(404).json({ msg: "Card not found" });
    }
    card.used = true;
    res.json(card);
});

module.exports = router;