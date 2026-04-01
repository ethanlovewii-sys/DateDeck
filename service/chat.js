const express = require('express');
const router = express.Router();
const {verifyAuth} = require('./auth.js');
const DB = require('./database.js');

async function grabUser(req) {
    const token = req.cookies?.token;
    const user = await DB.getUserByToken(token);
    return user;
}

