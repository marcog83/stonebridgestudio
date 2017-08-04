/**
 * Created by mgobbi on 03/08/2017.
 */
const Entity = require("../core/Entity");
const Dischi = require("./Dischi");
const MembriGruppo = require("./MembriGruppo");
const {TextSchema, HtmlSchema, DocumentSchema, LinkSchema, RepeatableSchema, RelationSchema} = require("../core/schemas");
class Gruppi extends Entity {
    constructor() {
        super("gruppi");
        this._schema = {
            name: new TextSchema({
                label: "Nome"
                , name: "name"
            })
            , biography: new HtmlSchema({
                label: "Biografia"
                , name: "biography"
            })
            , location: new TextSchema({
                label: "Luogo"
                , name: "location"
            }),
            coverImage: new DocumentSchema({
                label: "Cover Image"
                , name: "coverImage"
                , mimetype: "image/*"
            })
            , profileImage: new DocumentSchema({
                label: "Profile Image"
                , name: "profileImage"
                , mimetype: "image/*"
            })
            , email: new TextSchema({
                label: "Email"
                , name: "email"
            })
            , website: new LinkSchema({
                label: "Website"
                , name: "website"
            })
            , genere: new RepeatableSchema({
                label: "genere musicale"
                , name: "genere"
                , field: new TextSchema()
            })
            , membri: new RepeatableSchema({
                label: "componente gruppo"
                , name: "membri"
                , field: new RelationSchema({
                    toEntity: new MembriGruppo()
                })
            })
            , dischi: new RepeatableSchema({
                label: "Dischi"
                , name: "dischi"
                , field: new RelationSchema({
                    toEntity: new Dischi()
                })
            })
        }
    }



    save() {

    }
}
;
module.exports = Gruppi;