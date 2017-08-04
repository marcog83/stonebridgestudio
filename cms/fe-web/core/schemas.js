/**
 * Created by mgobbi on 03/08/2017.
 */

const TEXT_SCHEMA = "text";
const HTML_SCHEMA = "html";
const NUMBER_SCHEMA = "number";
const DOCUMENT_SCHEMA = "document";
const LINK_SCHEMA = "link";
const DATE_SCHEMA = "date";
const REPEATABLE_SCHEMA = "repeatable";
const RELATION_SCHEMA = "relation";

class Schema {
    constructor(name, label) {
        this.name = name;
        this.label = label;
        this.type = "";
    }

    mergeValue(value) {
        return Promise.resolve(Object.assign({}, this, {value}));
    }

    resolve() {
        return Promise.resolve(this);
    }

    save(value) {
//
    }
}
exports.TextSchema = class  extends Schema {
    constructor({name, label} = {}) {
        super(name, label);
        this.type = TEXT_SCHEMA;
    }
};
exports.HtmlSchema = class  extends Schema {
    constructor({name, label} = {}) {
        super(name, label);
        this.type = HTML_SCHEMA;
    }
};
exports.NumberSchema = class  extends Schema {
    constructor({name, label} = {}) {
        super(name, label);
        this.type = NUMBER_SCHEMA;
    }
};
exports.LinkSchema = class  extends Schema {
    constructor({name, label} = {}) {
        super(name, label);
        this.type = LINK_SCHEMA;
    }
};
exports.DocumentSchema = class  extends Schema {
    constructor({name, label, mimetype} = {}) {
        super(name, label);
        this.type = DOCUMENT_SCHEMA;
        this.mimetype = mimetype;
    }
};
exports.DateSchema = class  extends Schema {
    constructor({name, label, date_type = 'date'} = {}) {
        super(name, label);
        this.type = DATE_SCHEMA;
        this.date_type = date_type;
    }
};
exports.RepeatableSchema = class  extends Schema {
    constructor({name, label, field} = {}) {
        super(name, label);
        this.type = REPEATABLE_SCHEMA;
        this.field = field;
        this.field.name = `${this.name}[]`;
    }

    resolve() {
        return this.field.resolve().then(_ => this);
    }

    mergeValue(values) {
        let promises = [];
        if (values) {
            promises = values.map(v => {
                return this.field.mergeValue(v);
            })
        }
        return Promise.all(promises)
            .then(values => {
                return Object.assign({}, this, {
                    value: values
                });
            });

    }
};
exports.RelationSchema = class  extends Schema {
    constructor({name, label, toEntity} = {}) {
        super(name, label);
        this.type = RELATION_SCHEMA;
        this.toEntity = toEntity;
        this.options;//= this.getRelation();
    }

    resolve() {
        return this.getRelation().then(_ => this);
    }

    mergeValue(value) {
        return this.toEntity.findById(value).then(value => {
            return Object.assign({}, this, {value});
        })
    }

    getRelation() {
        return this.toEntity.findAll()
            .then(response => {
                return response.map(record => {
                    console.log(record);
                    return {
                        label: record.name.value || ""
                        , value: record._id
                    };
                })
            })
            .then(response => {
                this.options = response;
                return response;
            });
    }
};