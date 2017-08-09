/**
 * Created by marcogobbi on 31/07/2017.
 */
const dbManager = require("../../core/db-manager");
const Gruppi = require("../../entities/Gruppi");
const Dischi = require("../../entities/Dischi");
const MembriGruppo = require("../../entities/MembriGruppo");

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
        const item = this._entities.filter(({entity}) => entity.id === entityId)[0]
        ;
        return item.entity.findById(recordId)
            .then(mapResponse(entityId, recordId))
            .then(response => response)
    }

    create(entityId) {
        console.log(entityId);
        const entity = this._entities.filter(({entity}) => entity.id === entityId)[0].entity;
        return entity.schema().then(mapResponse(entityId));

    }

    search() {

    }

    entities() {

        const promises = this._entities
            // .filter(({shown}) => {
            //     return shown;
            // })
            .map(({entity, name}) => {
                return entity.findAll().then(records => {
                    return Object.assign({}, entity, {name, records});
                })
            });
        return Promise.all(promises).then(entities => {
            return {
                entities
            }
        }).catch(e => {
            console.log(e);
            return {
                entities: []
            }
        })
    }

    save(entityId, files, body) {
        const entity = this._entities.filter(({entity}) => entity.id === entityId)[0].entity;

        files.forEach(file => {
            body[file.fieldname] = `${file.destination}/${file.filename}`;
        });

        return entity.save(body);
        //
    }

    update(entityId, recordId, files, body) {
        const entity = this._entities.filter(({entity}) => entity.id === entityId)[0].entity;

        files.forEach(file => {
            body[file.fieldname] = `${file.destination}/${file.filename}`;
        });

        return entity.update(recordId, body);
    }

    deleteOne(entityId, recordId) {
        console.log(entityId, recordId);
        const entity = this._entities.filter(({entity}) => entity.id === entityId)[0].entity;
        return entity.deleteOne(recordId);
    }
};