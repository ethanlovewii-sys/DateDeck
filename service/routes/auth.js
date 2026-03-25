const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const express = require('express');
const router = express.Router();

const authCookieName = 'token';

router.post('/register', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({msg: 'That user already exists'});
    }
    else{
        const user = await createUser(req.body.email, req.body.password);
        setAuthCookie(res, user.token);
        res.status(200).send({msg: "User created"});
    }
});

router.post('/login', async (req, res) => {
    const user = await findUser('email', req.body.email)
    if (!user) {
        res.status(409).send({msg: 'User not found'});
    }
    else{
        if (await bcrypt.compare(req.body.password, user.password)) {
        user.token = uuid.v4();
        setAuthCookie(res, user.token);
        res.status(200).send({msg: "Login successful"});
        }
        else {
            res.status(409).send({msg: 'Incorrect password'})
        }
    }
});

router.delete('/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
            await DB.updateUserRemoveAuth(user);
            res.clearCookie(authCookieName);
            res.status(200).send({msg: 'logged out successsfully'});
    }else{
        res.status(401).send({msg: 'Unable to logout'})
    }

});

async function findUser(field, value) {
    if (!value) return null;
    if (field === 'token') {
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

async function createUser(email, password){
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user);

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

module.exports = {router, verifyAuth};