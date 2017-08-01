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
            , label: "Gruppo"
        }]
    }
];