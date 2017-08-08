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

    clone() {

    }

    save(value) {
//
    }
}
exports.TextSchema = class TextSchema extends Schema {
    constructor({name, label} = {}) {
        super(name, label);
        this.type = TEXT_SCHEMA;
    }

    clone() {
        return new TextSchema(this);
    }
};
exports.HtmlSchema = class HtmlSchema extends Schema {
    constructor({name, label} = {}) {
        super(name, label);
        this.type = HTML_SCHEMA;
    }

    clone() {
        return new HtmlSchema(this);
    }
};
exports.NumberSchema = class NumberSchema extends Schema {
    constructor({name, label} = {}) {
        super(name, label);
        this.type = NUMBER_SCHEMA;
    }

    clone() {
        return new NumberSchema(this);
    }
};
exports.LinkSchema = class LinkSchema extends Schema {
    constructor({name, label} = {}) {
        super(name, label);
        this.type = LINK_SCHEMA;
    }

    clone() {
        return new LinkSchema(this);
    }
};
exports.DocumentSchema = class DocumentSchema extends Schema {
    constructor({name, label, mimetype} = {}) {
        super(name, label);
        this.type = DOCUMENT_SCHEMA;
        this.mimetype = mimetype;
    }

    clone() {
        return new DocumentSchema(this);
    }
};
exports.DateSchema = class DateSchema extends Schema {
    constructor({name, label, date_type = 'date'} = {}) {
        super(name, label);
        this.type = DATE_SCHEMA;
        this.date_type = date_type;
    }

    clone() {
        return new DateSchema(this);
    }
};
exports.RepeatableSchema = class RepeatableSchema extends Schema {
    constructor({name, label, field} = {}) {
        super(name, label);
        this.type = REPEATABLE_SCHEMA;
        this.field = field;
        this.field.name = `${this.name}[]`;
    }

    clone() {
        return new RepeatableSchema(this);
    }

    resolve() {
        return this.field.resolve().then(_ => this);
    }

    mergeValue(values) {
        let promises = [];
        if (values) {
            promises = values.map(v => {
                return this.field.clone().mergeValue(v);
            })
        }
        return Promise.all(promises)
            .then(values => {

                return Object.assign({}, this, {value: values})
            });

    }
};
exports.RelationSchema = class RelationSchema extends Schema {
    constructor({name, label, toEntity, options} = {}) {
        super(name, label);
        this.type = RELATION_SCHEMA;
        this.toEntity = toEntity;
        this.options = options || [];//= this.getRelation();
    }

    clone() {
        return new RelationSchema(Object.assign({}, this));
    }

    resolve() {
        return this.getRelation().then(_ => this);
    }


    mergeValue(recordId) {

        return this.toEntity.findById(recordId).then(value => {

            return Object.assign({},this,{  value});
        })
    }

    getRelation() {
        return this.toEntity.findAll()
            .then(response => {
                return response.map(record => {

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