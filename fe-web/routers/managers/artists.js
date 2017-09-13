const {getGruppi, getGruppo} = require("./gruppi-manager");
const jsonld = require("../../../cms/fe-web/plugins/seo/json-ld");

exports.getData = () => {
    return Promise.all([
        getGruppi()

    ]).then(([gruppi]) => {
        return {
            data: {
                _production: process.env.NODE_ENV == "production",
                title: "Artists | Stonebridge Studio"
                , gruppi

            }
        }
    })
};
exports.getDetail = (id) => {
    return Promise.all(
        [getGruppo(id)]
    ).then(([gruppo]) => {

        return {
            data: {
                _production: process.env.NODE_ENV == "production",
                title: "Artist Detail | Stonebridge Studio"
                , gruppo
                , jsonld: jsonld.getGroup(gruppo)

            }
        }
    })
};