/**
 * Created by mgobbi on 03/08/2017.
 */
const Entity = require("../core/Entity");
const {TextSchema, DateSchema, HtmlSchema, DocumentSchema, LinkSchema, RepeatableSchema, RelationSchema} = require("../core/schemas");

module.exports = class Dischi extends Entity {
    constructor() {
        super("dischi");
        this._schema = {
            name: new TextSchema({
                label: "Nome"
                , name: "name"
            })
            , coverImage: new DocumentSchema({
                label: "Cover Image"
                , name: "coverImage"
                , mimetype: "image/*"
            })
            , publication_date: new DateSchema({
                name: "publication_date"
                , label: "Data di Pubblicazione"
                , date_type: "month"
            })

        }
    }

    schema() {
        return Promise.resolve(this._schema)
    }

};