/**
 * Created by marcogobbi on 31/07/2017.
 */
const Schemas = require("../../../demo/schemas/schemas");
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
        data: Schemas(contentId)
    };
    return Promise.resolve(response);
}
function search(contentId) {
    console.log(contentId)

}
function save(files, body) {

    files.forEach(file => {
        body[file.fieldname] = {
            path: file.path
            , mimetype: file.mimetype
            , filename: file.filename
        }
    })
    console.log(body);
    console.log(files);
return Promise.resolve(1)
}
exports.setNew = setNew;
exports.search = search;
exports.getData = getData;
exports.save = save;