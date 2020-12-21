import MongoClient from 'mongodb'



class apiDB {
    db!: MongoClient.Db 

    constructor() {
        let instance = this;
        MongoClient.connect('mongodb://mongodb:27017', function (err, client) {
            if (err) throw err

            instance.db = client.db('fymate') //select database
        })
    }
}

export default apiDB;