/**
 * Created by mgobbi on 03/08/2017.
 */
const Entity = require("../core/Entity");
const Dischi = require("./Dischi");
const MembriGruppo = require("./MembriGruppo");
const {TextSchema, HtmlSchema, DocumentSchema, LinkSchema, RepeatableSchema, RelationSchema} = require("../core/schemas");
class Gruppi extends Entity {
    constructor() {
        super("gruppi-membri-gruppo");
        this._schema = {
            gruppi: new TextSchema({
                name: "gruppi"
            })
            , membriGruppo: new TextSchema({
                name: "membriGruppo"
            })
        }
    }

    schema() {
        return Promise.resolve(this._schema)
    }


}
module.exports = Gruppi;