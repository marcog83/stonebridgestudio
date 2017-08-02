/**
 * Created by mgobbi on 02/08/2017.
 */
var Schemas = {
    dischi: require("./dischi")
    , gruppi: require("./gruppi")
    , membro_gruppo: require("./membri-gruppi")
};
module.exports = function (contentId) {
    var schema = Schemas[contentId]();

    return schema;
};