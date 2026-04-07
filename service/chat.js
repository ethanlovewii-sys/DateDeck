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
    if (!searchQuery) { return res.json({ users: [] }); }
    const users = await DB.userSearching(searchQuery);
    res.json(users);
});


module.exports = router;