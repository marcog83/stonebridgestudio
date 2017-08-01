/**
 * Created by mgobbi on 01/08/2017.
 */
module.exports = [
    {
        type: "text",
        name: "titolo"
        , label: "Titolo Disco"
    }
    , {
        type: "number"
        , name: "publication_date"
        , label: "Data di Pubblicazione"
    }
    , {
        type: "repeatable"
        , name: "gruppi"
        , label: "Gruppo"
        , fields: [{
            type: "relation"
            , to: "gruppi"
            , label: "Gruppo"
        }]
    }
];