import MongoClient from 'mongodb'


var db: MongoClient.Db;


async function getDb() {
    if (db === undefined)
        db = (await MongoClient.connect('mongodb://mongodb:27017')).db('fymate')
    return db;
}

export default getDb;