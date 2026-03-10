const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

const users = [];
const authCookieName = 'token';

router.post('/register', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({msg: 'Existing user'});
    }
    else{
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
    }
});

router.post('/login', async (req, res) => {
    if (!await findUser('email', req.body.email)) {
        res.status(409).send({msg: 'User isn\'t registered'});
    }
    else{
        if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        }
    }
});

async function findUser(field, value) {
    if (!value) return null;
    return users.find((u) => u[field] === value);
}

async function createUser(email, password){
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        //1000 seconds, 1 min, 1 hour, 1 day, 1 month
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};