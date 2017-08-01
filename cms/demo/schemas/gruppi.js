module.exports = [
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
        , mimeTypes: ["image/*"]
    },
    {
        type: "document"
        , label: "Profile Image"
        , name: "profileImage"
        , mimeTypes: ["image/*"]
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
        , label: "Genere"
        , name: "genere"
    }]
    },
    {
        type: "repeatable"
        , label: "Aggiungi uno o più membri"
        , name: "membri"
        , fields: [{
        type: "relation"
        , to: "membro-gruppo"
        , label: "membro"
        , name: "membro"
    }]
    },
    {
        type: "repeatable"
        , label: "Aggiungi uno o più dischi"
        , name: "dischi"
        , fields: [{
        type: "relation"
        , to: "dischi"
        , label: "disco"
        , name: "disco"
    }]
    }


];