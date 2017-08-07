
const {getGruppi} = require("./gruppi-manager");

exports.getData = () => {
    return Promise.all([
        getGruppi()

    ]).then(([gruppi,]) => {
        return {
            data: {
                _production:process.env.NODE_ENV=="production",
                title: "Artists | Stonebridge Studio"
                ,gruppi

            }
        }
    })
};