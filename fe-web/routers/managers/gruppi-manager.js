/**
 * Created by mgobbi on 07/08/2017.
 */
const Gruppi = require("../../../cms/fe-web/entities/Gruppi");
const gruppi = new Gruppi();
function getGruppi() {
    return gruppi.findAll(true)

}
function _helper(data) {
    return data.map(i => i.value);

}
function getGruppo(id) {
    return gruppi.findById(id).then(response => {
        return Object.entries(response).map(([key, data]) => {
            const value = Array.isArray(data.value) ? _helper(data.value) : data.value;
            return [key, value];
        }).reduce((prev, [key, value]) => {
            prev[key] = value;
            return prev;
        }, {})
    })
}
module.exports = {
    getGruppi
    , getGruppo
};