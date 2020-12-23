import MongoClient from 'mongodb'


var db: MongoClient.Db;

const db_login = process.env.MONGODB_USERNAME;
const db_password = process.env.MONGODB_PASSWORD;


async function getDb() {
    if (db === undefined)
        db = (await MongoClient.connect("mongodb://" + db_login + ":" + db_password + "@mongo:27017")).db('fymate')
    return db;
}

export default getDb;