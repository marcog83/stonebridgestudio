/**
 * Created by mgobbi on 01/08/2017.
 */
module.exports = function(){
    return {
        contentId: 'membri-gruppi',
        fields:[
            {
                type: "text"
                , name: "name"
                , label: "Nome"
            }
            , {
                type: "date"
                , name: "birth"
                , label: "Anno di nascita"
                , date_type: "date"
            }
            , {
                type: "html"
                , name: "biography"
                , label: "Biografia"
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
                    , name: "gruppo"
                    , label: ""
                }]
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
            }
        ]
    }
}