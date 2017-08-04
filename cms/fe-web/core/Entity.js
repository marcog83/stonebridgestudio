/**
 * Created by mgobbi on 03/08/2017.
 */
const dbManager = require("./db-manager");
class Entity {
    constructor(id) {
        this.id = id;
        this._schema = {};

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
                return response.reduce((prev, _record) => {
                    prev[_record.name] = _record;
                    return prev;
                }, { _id:record._id.toString()});
            });
        })

    }

    findById(recordId) {
        return dbManager.findOne(this.id, recordId).then(this._mergeRecordSchema.bind(this))
    }

    schema() {
        const promises = Object.keys(this._schema).map(key => {
            return this._schema[key].resolve().then(schema => {
                return {
                    key,
                    schema
                }
            })
        });
        return Promise.all(promises).then(response => {
            return response.reduce((prev, curr) => {
                prev[curr.key] = curr.schema;
                return prev;
            }, {})
        });
    }
}

module.exports = Entity;