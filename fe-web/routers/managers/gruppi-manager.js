/**
 * Created by mgobbi on 07/08/2017.
 */
const Gruppi = require("../../../cms/fe-web/entities/Gruppi");
const gruppi = new Gruppi();
const SeoPlugin = require("../../plugins/seo/seo-plugin")
if (!Object.entries)
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };
function getGruppi(limit = 100) {
    return gruppi.findAll(limit, true)
        .then(response => {
            return response.map(record => {
                const seo = SeoPlugin.fromEntity(record);
                return Object.assign({seo}, record);
            })
        })

}
function _helper(data) {
    return data.map(i => i.value);

}
function getGruppo(id) {
    return gruppi.findById(id).then(response => {
        return Promise.all([
            SeoPlugin.fromEntity(response)
            , response
        ])

    }).then(([seo, response]) => {
        return Object.entries(response).map(([key, data]) => {
            const value = Array.isArray(data.value) ? _helper(data.value) : data.value;
            return [key, value];
        }).reduce((prev, [key, value]) => {
            prev[key] = value;
            return prev;
        }, {seo})
    })
}
module.exports = {
    getGruppi
    , getGruppo
};