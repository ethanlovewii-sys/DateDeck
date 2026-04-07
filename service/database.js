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
const chatCollection = db.collection('chat');
const messageCollection = db.collection('message');

//random avatar colors for chats
function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);       // 0–360
    const saturation = Math.floor(Math.random() * 20) + 60; // 60–80%
    const lightness = Math.floor(Math.random() * 15) + 75;  // 75–90%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

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
async function userSearching(username, currentUsername) {
    return userCollection
        .find({
            $and: [
                { username: { $regex: username, $options: 'i' } },
                { username: { $ne: currentUsername } }
            ]
        })
        .limit(5)
        .toArray();
}

//grabbing a chat by its ID and make it if it doesn't exist
async function getChatById(chatId) {
    const chat = await chatCollection.findOne({ chatId: chatId });
    if (!chat) {
        const newChat = {
            chatId: chatId,
            users: [chatId.split('-')[0], chatId.split('-')[1]],
            accepted: false,
            lastMessage: "",
            color: getRandomPastelColor(),
            privateTimestamp: new Date().toISOString(),
            userTimestamp:"",
        };
        await chatCollection.insertOne(newChat);
        return newChat;
    }
    return chat;
}

async function loadChats(user) {
    return chatCollection.find({ users: user.username }).toArray();
}

async function saveMessage(message) {
    await messageCollection.insertOne(message);
    await chatCollection.updateOne({ chatId: message.chatId }, { $set: { lastMessage: message.text, privateTimestamp: message.time } });
}

async function getMessagesByChatId(chatId) {
    return messageCollection.find({ chatId: chatId }).toArray();
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
  saveMessage,
  userSearching,
  getChatById,
  loadChats,
  getMessagesByChatId,
};