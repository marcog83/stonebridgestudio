/**
 * Created by marcogobbi on 31/07/2017.
 */
var Schemas = {
    dischi: require("../../../demo/schemas/dischi")
    , gruppi: require("../../../demo/schemas/gruppi")
    , membro_gruppo: require("../../../demo/schemas/membri-gruppi")
}
function getData() {
    var data = {
        data: {
            entities: [
                {
                    name: "dischi"
                    , _id: "dischi"
                    , data: []
                },
                {
                    name: "gruppi"
                    , _id: "gruppi"
                    , data: []
                }
                , {
                    name: "membro-gruppo"
                    , _id: "membro_gruppo"
                    , data: []
                }
            ]
        }
    };
    return Promise.resolve(data)
}
function setNew(contentId) {
    console.log(contentId);
    const response = {
        data: {
            contentId,
            fields: Schemas[contentId]
        }
    };
    return Promise.resolve(response);
}
function search(contentId) {
    console.log(contentId)

}
exports.setNew = setNew;
exports.search = search;
exports.getData = getData;