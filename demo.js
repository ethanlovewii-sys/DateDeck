const { MongoClient } = require('mongodb'); //load up all the code
const config = require('./dbConfig.json'); //bring in configuration we just make locally

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`; //the connection string

const client = new MongoClient(url); //creats client
const db = client.db('rental');              //creates new DB in the cluster we made
const collection = db.collection('house');     //An array within the rental DB

async function main() {
    try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
    } catch (ex) {
    console.log(`Error with ${url} because ${ex.message}`);
    process.exit(1);
    }
    try{
    const house = {
     name: 'Beachfront views',
     summary: 'From your bedroom to the beach, no shoes required',
     property_type: 'Condo',
     beds: 1,
    };
    

   const insertResult = await collection.insertOne(house);

    }finally {
        client.close();
    }
}

main();