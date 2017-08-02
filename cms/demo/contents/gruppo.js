/**
 * Created by mgobbi on 02/08/2017.
 */
module.exports = {
    contentId: "gruppi",
    fields: [
        {
            type: "text"
            , label: "Nome"
            , name: "name"
            , value: "Marrano"
        },
        {
            type: "text"
            , label: "Biografia"
            , name: "biography"
            , value: "Biografia testaul"
        },
        {
            type: "text"
            , label: "Luogo"
            , name: "location"
            , value: ""
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
            , value: "email@email.it"
        },
        {
            type: "link"
            , label: "Website"
            , name: "website"
            , value: "/link.it"
        },
        {
            type: "repeatable"
            , label: "genere musicale"
            , name: "genere"
            , fields: [{
            type: "text"
            , label: ""
            , name: "genere[]"
        }]
        },
        {
            type: "repeatable"
            , label: "componente gruppo"
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
            , label: "dischi pubblicati"
            , name: "dischi"
            , fields: [{
            type: "relation"
            , to: "dischi"
            , label: ""
            , name: "dischi[]"
        }]
        }


    ]
};