/**
 * Created by mgobbi on 07/08/2017.
 */
const Dischi = require("../../../cms/fe-web/entities/Dischi");
const dischi = new Dischi();
if (!Object.entries)
    Object.entries = function( obj ){
        var ownProps = Object.keys( obj ),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };

function _helper(data) {
    return data.map(i => i.value);

}
function getDisco(id) {
    return dischi.findById(id).then(response => {
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
    getDisco
};