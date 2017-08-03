/**
 * Created by marcogobbi on 31/07/2017.
 */
const Schemas = require("../../../demo/schemas/schemas");
const contentsManager = require("../../../demo/contents/manager");
const dbManager = require("../../core/db-manager");
const Gruppi = require("../../entities/Gruppi");
const Dischi = require("../../entities/Dischi");
const MembriGruppo = require("../../entities/MembriGruppo");
// function getData() {
//     var data = {
//         data: {
//             entities: [
//                 {
//                     name: "dischi"
//                     , _id: "dischi"
//                     , data: []
//                 },
//                 {
//                     name: "gruppi"
//                     , _id: "gruppi"
//                     , data: []
//                 }
//                 , {
//                     name: "membro-gruppo"
//                     , _id: "membro_gruppo"
//                     , data: []
//                 }
//             ]
//         }
//     };
//     return Promise.resolve(data)
// }
// function setNew(contentId) {
//     console.log(contentId);
//     const response = {
//         data: Schemas(contentId)
//     };
//     return Promise.resolve(response);
// }
// function search(contentId) {
//     console.log(contentId)
//
// }
// function save(files, body) {
//
//     files.forEach(file => {
//         body[file.fieldname] = {
//             path: file.path
//             , mimetype: file.mimetype
//             , filename: file.filename
//         }
//     });
//     console.log(body);
//     console.log(files);
//     return Promise.resolve(1)
// }
//
//
// function fromId(collectionId, entityId) {
//     return new Promise(resolve => {
//         resolve(contentsManager.fromId(collectionId, entityId))
//     })
// }
//
//
// exports.fromId = fromId;
// exports.setNew = setNew;
// exports.search = search;
// exports.getData = getData;
// exports.save = save;

function mapResponse(entityId, recordId) {
    return record => {
        const fields = Object.keys(record).map(key => record[key]);
        return {
            entityId
            , recordId
            , fields
        }
    }
}
module.exports = class ContentsManager {
    constructor() {
        this._entities = [
            {name: "GRUPPI", entity: new Gruppi()}
            , {name: "MEMBRI GRUPPI", entity: new MembriGruppo()}
            , {name: "DISCHI", entity: new Dischi()}

        ];
    }

    fromId(entityId, recordId) {
        console.log(entityId);
        const entity = this._entities.filter(({entity}) => entity.id === entityId)[0].entity;
        return entity.findById(recordId).then(mapResponse(entityId, recordId));
    }

    create(entityId) {
        console.log(entityId);
        const entity = this._entities.filter(({entity}) => entity.id === entityId)[0].entity;
        return entity.schema().then(mapResponse(entityId));

    }

    search() {

    }

    get entities() {

        return this._entities.map(({entity, name}) => {
            return Object.assign({}, entity, {name});
        });
    }

    save(files, body) {
        files.forEach(file => {
            body[file.fieldname] = file.path.replace("\\", "/");
        });
        const {entityId} = body;
        return dbManager.save(entityId, body);
    }
}