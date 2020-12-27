import MongoClient from 'mongodb'


var db: MongoClient.Db;

const db_login = process.env.MONGODB_USERNAME;
const db_password = process.env.MONGODB_PASSWORD;
const db_location = process.env.MONGODB_URL;

async function getDb() {
    if (db === undefined)
        db = (await MongoClient.connect("mongodb://" + db_login + ":" + db_password + "@" + db_location)).db('fymate')
    return db;
}

export default getDb;