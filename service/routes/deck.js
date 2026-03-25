const express = require('express');
const router = express.Router();
const {verifyAuth} = require('./auth');

const cards = [];
let titleIndex = 1;

async function grabUser(req) {
    const token = req.cookies.token;
    const user = await getUserByToken(token);
    return user
}

router.get('/loadCards', verifyAuth, async (_req, res) => {
    const user = await grabUser(req);

    const unusedCards = await DB.getCards(user);
    res.json(unusedCards);
});

router.get('/loadTitleIndex', async (req, res) => {
    const user = await grabUser(req);

    res.send(user.index);
});

router.post('/addCard', verifyAuth, async (req, res) => {
    const user = await grabUser(req);
    const card = req.body

    const titleIndex = await addCard(user, card);
    titleIndex++;
    res.json({ titleIndex }); //send index to load from front end
});

router.get('/image/:title', async (req, res) => {
    try{
        const title = req.params.title;
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${title},date,couple,aesthetic&client_id=_9OHFRBNCyBj2z9WwaBM8I7n8PTo3Y6iQj2ZynLwZgg`);
        const data = await response.json();
        res.json({
            image: data.urls.regular
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch image"});
    }

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