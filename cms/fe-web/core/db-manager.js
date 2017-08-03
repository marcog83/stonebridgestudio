/**
 * Created by mgobbi on 03/08/2017.
 */
const {Connection} = require("./db-connection");
const {ObjectId} = require("mongodb");
const tap = require("./tap");
module.exports = {
    findAll(collectionId){
        const connection = new Connection();
        connection.connect();
        return connection.collection(collectionId).then(collection => {
            return collection.find({}).toArray();
        }).then(tap(_ => {
            connection.db.close();
        })).catch(tap(_ => {
            connection.db.close();
        }))

        // return Promise.all([{id: 1, label: "1"}, {id: 2, label: "2"}, {id: 3, label: "3"}])
    }
    , findOne(collectionId, id){
        const connection = new Connection();
        connection.connect();
        return connection.collection(collectionId).then(collection => {
            return collection.findOne({_id: ObjectId(id)});
        }).then(tap(_ => {
            connection.db.close();
        })).catch(tap(_ => {
            connection.db.close();
        }))
    }
    , save(collectionId, record){
        //deve salvare su db
        const connection = new Connection();
        connection.connect();
        return connection.collection(collectionId).then(collection => {
                if (record.recordId) {
                    return collection.findOneAndUpdate({_id:ObjectId(record.recordId)}, {$set: record}, {upsert: true});
                } else {
                    return collection.insertOne(record);
                }
            })
            .then(({insertedId=record.recordId}) => {
                return insertedId;
            })
            .then(tap(_ => {
                connection.db.close();
            })).catch(tap(_ => {
                connection.db.close();
            }))
    }
};