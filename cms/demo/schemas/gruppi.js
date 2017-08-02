module.exports = function(){
    return {
        fields:[
            {
                type: "text"
                , label: "Nome"
                , name: "name"
            },
            {
                type: "text"
                , label: "Biografia"
                , name: "biography"
            },
            {
                type: "text"
                , label: "Luogo"
                , name: "location"
            },
            {
                type: "document"
                , label: "Cover Image"
                , name: "coverImage"
                , mimetype: "image/*"
            },
            {
                type: "document"
                , label: "Profile Image"
                , name: "profileImage"
                , mimetype: "image/*"
            },
            {
                type: "text"
                , label: "Email"
                , name: "email"
            },
            {
                type: "link"
                , label: "Website"
                , name: "website"
            },
            {
                type: "repeatable"
                , label: "Aggiungi uno o più generi"
                , name: "genere"
                , fields: [{
                type: "text"
                , label: ""
                , name: "genere[]"
            }]
            },
            {
                type: "repeatable"
                , label: "Aggiungi uno o più membri"
                , name: "membri"
                , fields: [{
                type: "relation"
                , to: "membro-gruppo"
                , label: ""
                , name: "membri[]"
            }]
            },
            {
                type: "repeatable"
                , label: "Aggiungi uno o più dischi"
                , name: "dischi"
                , fields: [{
                type: "relation"
                , to: "dischi"
                , label: ""
                , name: "dischi[]"
            }]
            }


        ]
    }
}