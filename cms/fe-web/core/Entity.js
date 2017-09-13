/**
 * Created by mgobbi on 03/08/2017.
 */
const dbManager = require("./db-manager");
function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
};
function isNumeric(obj) {




    // parseFloat NaNs numeric-cast false positives ("")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    return !isNaN(obj - parseFloat(obj));
}
function isArray(val) {
    return (val != null &&
    val.length >= 0 &&
    Object.prototype.toString.call(val) === '[object Array]');
};
function _castValue(value) {
    if (value === "true") {
        value = true;
    } else if (value === "false") {
        value = false;
    } else if (isNumeric(value)) {
        value = Number(value);
    }
    return value;
}
function _excludeEmptyFields(obj = {}) {
    Object.keys(obj).forEach(function (key) {
        if (obj[key] && isObject(obj[key])) {
            _excludeEmptyFields(obj[key])
        }
        else if (obj[key] && isArray(obj[key])) {
            obj[key] = obj[key].filter(v => v);
        } else if (obj[key] == null || obj[key] == "") {
            delete obj[key]
        } else {
            obj[key] = _castValue(obj[key])
        }
    });
    return obj;
};
function parseSchema(schema, method, initialValue, values, recordId = undefined) {
    const promises = Object.keys(schema).map(key => {
        return schema[key][method](values[key], recordId).then(value => {
            return {
                key,
                value
            }
        })
    });
    return Promise.all(promises).then(response => {
        return response.reduce((prev, {key, value}) => {
            prev[key] = value;
            return prev;
        }, initialValue);

    });
}
class Entity {
    constructor(id) {
        this.id = id;
        this._schema = {};

    }

    findAll(limit, exclude_merge = false) {
        return dbManager.findAll(this.id, limit)

            .then(records => {
                if (exclude_merge)return records;
                return Promise.all(records
                    .filter(r => r)
                    .map(this._mergeRecordSchema.bind(this)))
            })
    }

    _mergeRecordSchema(record) {

        return this.schema().then(_schema => {
            return parseSchema(_schema, "mergeValue", {_id: record._id.toString()}, record);

        })

    }
    queryOne(query){
        return dbManager.queryOne(this.id, query).then(response => {

            if (!response)return this.schema();
            return this._mergeRecordSchema(response);
        })
    }
    findById(recordId, exclude_merge = false) {
        return dbManager.findOne(this.id, recordId).then(response => {
            if (exclude_merge)return response;
            if (!response)return {};
            return this._mergeRecordSchema(response);
        })
    }

    deleteOne(recordId) {
        return dbManager.deleteOne(this.id, recordId)
    }

    save(body) {
        const _fieldsToSave = _excludeEmptyFields(body);

        return parseSchema(this._schema, "save", {}, _fieldsToSave)
            .then(_normalizedValues => {
                return dbManager.save(this.id, _normalizedValues);
            });

        // const promises = Object.keys(this._schema).map(key => {
        //     return this._schema[key].save(_fieldsToSave[key]).then(value => {
        //         return {
        //             key,
        //             value
        //         }
        //     })
        // });
        // return Promise.all(promises).then(response => {
        //     const _normalizedValues = response.reduce((prev, {key, value}) => {
        //         prev[key] = value;
        //         return prev;
        //     }, {});
        //     return dbManager.save(this.id, _normalizedValues);
        // });

    }

    update(recordId, body) {
        const _fieldsToSave = _excludeEmptyFields(body);
        return parseSchema(this._schema, "update", {}, _fieldsToSave, recordId)
            .then(_normalizedValues => {
                return dbManager.save(this.id, _normalizedValues, recordId);
            });

    }

    schema() {
        return parseSchema(this._schema, "resolve", {}, {});

        // const promises = Object.keys(this._schema).map(key => {
        //     return this._schema[key].resolve().then(schema => {
        //         return {
        //             key,
        //             schema
        //         }
        //     })
        // });
        // return Promise.all(promises).then(response => {
        //     return response.reduce((prev, {key, schema}) => {
        //         prev[key] = schema;
        //         return prev;
        //     }, {})
        // });
    }

    getRelation() {
        return Promise.resolve([]);
    }
}

module.exports = Entity;