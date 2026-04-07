const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?appName=DateDeck`;
const client = new MongoClient(url);

async function connectToDb() {
  try{
    await client.connect();
    console.log("connected to Mongo DB")
  } catch (err) {
    console.error("Mongo connection failed", err);
    throw err;
  }
}

const db = client.db('datedeck');
const userCollection = db.collection('user');
const deckCollection = db.collection('deck');
const messageCollection = db.collection('messages');

//Authentication
function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function updateToken(user, newToken){
  await userCollection.updateOne({ email: user.email }, { $set:{token: newToken }});
}

async function addUser(user) {
  await userCollection.insertOne(user);
}


async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ username: user.username }, { $unset: { token: 1 } });
}

//Deck
async function getCards(user) {
    return deckCollection.find({ username: user.username, used: false }).toArray();
}

async function addCard(user, card) {
    const newCard = {
        ...card,
        username: user.username
    };
    await deckCollection.insertOne(newCard);
    await userCollection.updateOne({ username: user.username }, {$inc: {index: 1}});
}

async function useCard(user, cardId) {
    await deckCollection.updateOne({ username: user.username, id: cardId }, { $set: {used: true}});
}

//For chat messages
async function saveMessage(message) {
    await messageCollection.insertOne(message);
}

//searching for user to chat with
async function userSearching(username) {
  return userCollection.find({ username: { $regex: username, $options: 'i' } }).limit(5).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  updateToken,
  addUser,
  updateUserRemoveAuth,
  getCards,
  addCard,
  useCard,
  connectToDb,
  saveMessage
};