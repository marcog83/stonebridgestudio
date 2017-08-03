/**
 * Created by mgobbi on 03/08/2017.
 */
const dbManager = require("./db-manager");
class Entity {
    constructor(id) {
        this.id = id;
    }

    findAll() {
        return dbManager.findAll(this.id).then(records => {
            return Promise.all(records.map(this._mergeRecordSchema.bind(this)))
        })
    }

    _mergeRecordSchema(record) {

        return this.schema().then(_schema => {
            const promises = Object.keys(_schema).map(key => {
                return _schema[key].mergeValue(record[key]);
            });
            return Promise.all(promises).then(response => {
                return response.reduce((prev, record) => {
                    prev[record.name] = record;
                    return prev;
                }, {});
            });
        })

    }

    findById(recordId) {
        return dbManager.findOne(this.id, recordId).then(this._mergeRecordSchema.bind(this))
    }

    schema() {
        return Promise.resolve({})
    }
}

module.exports = Entity;