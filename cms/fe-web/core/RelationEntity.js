/**
 * Created by mgobbi on 09/08/2017.
 */
const Entity = require("./Entity");
const dbManager = require("./db-manager");
class RelationEntity extends Entity {
    constructor({relationTo = "gruppi", id} = {}) {
        super(id);
        this.relationTo = relationTo;
        // this._schema = _buildRelationTo(relationTo);
    }

    schema() {
        return Promise.resolve({})
    }

    getRelation() {
        return dbManager.findAll(this.relationTo).then(records => {
                return Promise.all(records);
            })
            .catch(e => {
                console.log(e);
            })
    }
}
module.exports = RelationEntity;