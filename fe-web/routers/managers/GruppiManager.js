/**
 * Created by marcogobbi on 05/08/2017.
 */
const Gruppi = require("../../../cms/fe-web/entities/Gruppi");
const gruppi = new Gruppi();
function getGruppi() {
    return gruppi.findAll().then(response => {
        return response.map(record => {
            return Object.keys(record).map(key => {
                return {
                    key,
                    value: record[key].getValue ?record[key].getValue():record[key]
                }
            }).reduce((prev, curr) => {
                prev[curr.key] = curr.value;
                return prev;
            }, {})
        })
    })
}
function getGruppo(id) {
    return gruppi.findById(id,true).then(response => {
        return response;
    })
}
module.exports = {
    getGruppi
    ,getGruppo
}