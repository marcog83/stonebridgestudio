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
            , description: new HtmlSchema({
                label: "Embed dell'album"
                , name: "description"
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
            , videos_embed: new RepeatableSchema({
                label: "Video Embed"
                , name: "videos_embed"
                , field: new HtmlSchema()
            })
            , album_tracks_embed: new HtmlSchema({
                label: "Embed dell'album"
                , name: "album_tracks_embed"
            })

        }
    }

    schema() {
        return Promise.resolve(this._schema)
    }

};