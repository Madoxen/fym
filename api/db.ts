import MongoClient from 'mongodb'


var db: MongoClient.Db;

const db_login = process.env.MONGO_INITDB_ROOT_USERNAME;
const db_password = process.env.MONGO_INITDB_ROOT_PASSWORD;


async function getDb() {
    if (db === undefined)
        db = (await MongoClient.connect("mongodb://" + db_login + ":" + db_password + "mongodb:27017")).db('fymate')
    return db;
}

export default getDb;