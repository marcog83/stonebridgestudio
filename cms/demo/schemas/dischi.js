/**
 * Created by mgobbi on 01/08/2017.
 */
function getRelation(to) {
    //recupera tutti gli id/label dei gruppi
    return [{
        value: 1
        , label: "marrano"
    }
        , {
            value: 2
            , label: "So Long"
        }
        , {
            value: 3
            , label: "Chronics"
        }
    ]
}
module.exports = function () {
    return [
        {
            type: "text",
            name: "titolo"
            , label: "Titolo Disco"
        }
        , {
            type: "document"
            , label: "Cover Image"
            , name: "coverImage"
            , mimetype: "image/*"
        }
        , {
            type: "date"
            , name: "publication_date"
            , label: "Data di Pubblicazione"
            , date_type: "month"
        }
        , {
            type: "repeatable"
            , name: "gruppi"
            , label: "Gruppo"
            , fields: [{
                type: "relation"
                , name: "gruppi[]"
                , to: "gruppi"
                , label: ""
                , options: getRelation("gruppi")
            }]
        }
    ]
};