/**
 * Created by mgobbi on 02/08/2017.
 */
var data = {
    dischi: require("./disco")
    , gruppi: require("./gruppo")
    , "membri-gruppi": require("./membro-gruppo")
};
exports.fromId = function (collectionId,entityId) {
    return {
        data:data[collectionId]
    };
};