/**
 * Created by mgobbi on 07/08/2017.
 */
const Gruppi = require("../../../cms/fe-web/entities/Gruppi");
const gruppi = new Gruppi();
function getGruppi() {
    return gruppi.findAll(true)

        /*.then(response => {
            var result = {};
            Object.keys(response).forEach(key => {

                result[key] = response[key] && response[key].value || response[key];

            });
            return result;
        })*/
}
module.exports = {
    getGruppi
};