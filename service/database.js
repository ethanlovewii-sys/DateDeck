const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?appName=DateDeck`;
const client = new MongoClient(url);

async function connectTODb() {
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

//Authentication
function getUser(email) {
  return userCollection.findOne({ email: email });
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
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

//Deck
async function getCards(user) {
    return deckCollection.find({ email: user.email, used: false }).toArray();
}

async function addCard(user, card) {
    const newCard = {
        ...card,
        email: user.email
    };
    await deckCollection.insertOne(newCard);
    await userCollection.updateOne({ email: user.email }, {$inc: {index: 1}});
}

async function useCard(user, cardId) {
    await deckCollection.updateOne({ email: user.email, id: cardId }, { $set: {used: true}});
}

module.exports = {
  getUser,
  getUserByToken,
  updateToken,
  addUser,
  updateUserRemoveAuth,
  getCards,
  addCard,
  useCard
};