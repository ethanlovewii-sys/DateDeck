const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.email}:${config.password}@${config.hostname}/?appName=DateDeck`;
const client = new MongoClient(url);
const db = client.db('datedeck');
const userCollection = db.collection('user');
const deckCollection = db.collection('deck');

//Authentication
function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

//Deck
async function getCards(user) {
    deckCollection.find({ email: user.email, used: flase })
}

async function addCard(user, card) {
    const newCard = {
        ...card,
        email: user.email
    }
    deckCollection.insertOne(newCard)
}