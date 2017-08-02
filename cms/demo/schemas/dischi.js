/**
 * Created by mgobbi on 01/08/2017.
 */
function getRelation(to, selected) {
    //recupera tutti gli id/label dei gruppi
    return [{
        value: 1
        , label: "marrano"
        , selected: selected == 1
    }
        , {
            value: 2
            , label: "So Long"
            , selected: selected == 2
        }
        , {
            value: 3
            , label: "Chronics"
            , selected: selected == 3
        }
    ]
}
module.exports = function () {
    return {
        contentId: "dischi",
        fields: [
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
    }
};