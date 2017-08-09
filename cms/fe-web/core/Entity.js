/**
 * Created by mgobbi on 03/08/2017.
 */
const dbManager = require("./db-manager");
class Entity {
    constructor(id) {
        this.id = id;
        this._schema = {};

    }

    findAll(exclude_merge = false) {
        return dbManager.findAll(this.id).then(records => {
            if (exclude_merge)return records;
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
                }, {_id: record._id.toString()});
            });
        })

    }

    findById(recordId, exclude_merge = false) {
        return dbManager.findOne(this.id, recordId).then(response => {
            if (exclude_merge)return response;
            return this._mergeRecordSchema(response);
        })
    }

    deleteOne(recordId) {
        return dbManager.deleteOne(this.id, recordId)
    }

    save(body) {
        const schema = this._mergeRecordSchema(body);
        return dbManager.save(this.id, body);
    }

    update(recordId, body) {
        //
        return dbManager.save(this.id, body, recordId);
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
            return response.reduce((prev, {key, schema}) => {
                prev[key] = schema;
                return prev;
            }, {})
        });
    }

    getRelation() {
        return Promise.resolve([]);
    }
}

module.exports = Entity;