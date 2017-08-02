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
    contentId: 'membri-gruppi',
    fields: [
        {
            type: "text"
            , name: "name"
            , label: "Nome"
            , value: "Paolino"
        }
        , {
            type: "date"
            , name: "birth"
            , label: "Anno di nascita"
            , date_type: "date"
            , value: "1984-08-07"
        }
        , {
            type: "html"
            ,
            name: "biography"
            ,
            label: "Biografia"
            ,
            value: "'When building the FT’s and Economist’s HTML5 apps we felt that as we were targeting only the latest browsers shipping the entirety of jQuery would be a bit – well – wasteful. What we wanted were small focused components that could be swapped in and out that we could pull in (initially) via npm, bower or (later) our build service. This thinking has since spread to the rest of the FT, who are now also moving away from jQuery.'"
        }
        , {
            type: "document"
            , name: "profile_image"
            , label: "Immagine di Profilo"
        }
        , {
            type: "repeatable"
            , name: "gruppi"
            , label: "Gruppi dove suona"
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
                        , label: "marrano"
                    }

                }
            })

        }
        , {
            type: "repeatable"
            , name: "strumenti"
            , label: "Strumento"
            , fields: [{
                type: "text"
                , name: "strumento"
                , label: ""
            }]
            , value: ['chitarra', 'voce'].map(v => {
                return {
                    type: "text"
                    , name: "strumento"
                    , label: ""
                    , value: v
                }
            })
        }
    ]
};