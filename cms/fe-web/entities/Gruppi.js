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

    }

    schema() {
        const membri = new RelationSchema({
            toEntity: new MembriGruppo()
        });
        const dischi = new RelationSchema({
            toEntity: new Dischi()
        });
        return Promise.all([
            membri.getRelation()
            , dischi.getRelation()
        ]).then(_ => {
            return {
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
                    , field: membri
                })
                , dischi: new RepeatableSchema({
                    label: "Dischi"
                    , name: "dischi"
                    , field: dischi
                })
            }
        });

    }

    save() {

    }
}
;
module.exports = Gruppi;