const express = require('express');
const router = express.Router();
const {verifyAuth} = require('./auth.js');
const DB = require('./database.js');

async function grabUser(req) {
    const token = req.cookies?.token;
    const user = await DB.getUserByToken(token);
    return user;
}

router.get('/loadCards', verifyAuth, async (req, res) => {
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
    const card = req.body;

    await DB.addCard(user, card);
    res.sendStatus(200);
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

router.post('/useCard', async (req, res) => {
    console.log("reached backend")
    const user = await grabUser(req)
    const {id} = req.body;
    await DB.useCard(user, id)
    res.sendStatus(200);
});

module.exports = router;