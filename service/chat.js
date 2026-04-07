const express = require('express');
const router = express.Router();
const {verifyAuth} = require('./auth.js');
const DB = require('./database.js');

async function grabUser(req) {
    const token = req.cookies?.token;
    const user = await DB.getUserByToken(token);
    return user;
}

router.get('/getUsername', verifyAuth, async (req, res) => {
    const user = await grabUser(req);
    res.json({username: user.username});
});

//searching for user to chat with
router.get('/searchUsers', verifyAuth, async (req, res) => {
    const searchQuery = req.query.q;
    const user = await grabUser(req);
    if (!searchQuery) { return res.json({ users: [] }); }
    const users = await DB.userSearching(searchQuery, user.username);
    res.json({ users });
});

router.post('/openChat', verifyAuth, async (req, res) => {
    const user = await grabUser(req);
    const friendUsername = req.body.friendUsername;
    const chatId = [user.username, friendUsername].sort().join('-'); //prevents duplicate orders
    const chat = await DB.getChatById(chatId);
    res.json({ chat });
});

router.get('/loadChats', verifyAuth, async (req, res) => {
    const user = await grabUser(req);
    if (!user) {
        return res.status(401).json({ msg: 'Unauthorized, no user found' });
    }
    console.log("user:", user.username);
    const chats = await DB.loadChats(user);
    const sortedChats = chats.sort((a, b) => new Date(b.privateTimestamp) - new Date(a.privateTimestamp)); // Sort chats by most recent message
    res.json({ sortedChats });
});

router.get('/getChat', verifyAuth, async (req, res) => {
    const chatId = req.query.chatId;
    const chat = await DB.getChatById(chatId);
    res.json({ chat });
});

router.post('/saveMessage', verifyAuth, async (req, res) => {
    const message = req.body;
    await DB.saveMessage(message);
    res.sendStatus(200);
});

router.get('/getMessages', verifyAuth, async (req, res) => {
    const chatId = req.query.chatId;
    const messages = await DB.getMessagesByChatId(chatId);
    const sortedMessages = messages.sort((a, b) => new Date(a.time) - new Date(b.time));
    res.json({ sortedMessages });
});

module.exports = router;