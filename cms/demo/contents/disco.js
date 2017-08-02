/**
 * Created by mgobbi on 02/08/2017.
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
module.exports = {
    contentId: "dischi",
    fields: [
        {
            type: "text",
            name: "titolo"
            , label: "Titolo Disco"
            , value: "Belgrado"
        }
        , {
            type: "document"
            , label: "Cover Image"
            , name: "coverImage"
            , mimetype: "image/*"
            , value: "uploads\\ac10ceb5bc828d751680a58c3723f0d4.jpg"
        }
        , {
            type: "date"
            , name: "publication_date"
            , label: "Data di Pubblicazione"
            , date_type: "month"
            , value: '2017-08'
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
            , value: [1].map(v => {
                return {
                    type: "relation"
                    , name: "gruppi[]"
                    , to: "gruppi"
                    , label: ""
                    , options: getRelation("gruppi", v)
                    , value: {
                        value: v
                        , label: "Chronics"
                    }

                }
            })
        }
    ]
}