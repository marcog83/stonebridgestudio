/**
 * Created by mgobbi on 03/08/2017.
 */
module.exports = {
    findAll(collectionId){
        return Promise.all([{id:1,label:"1"},{id:2,label:"2"},{id:3,label:"3"}])
    }
    , findOne(collectionId, id){
        return Promise.all({})
    }
    , save(collectionId, record){
        //deve salvare su db
        return Promise.resolve("id-record");
    }
};