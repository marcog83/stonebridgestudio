const {getDisco} = require("./dischi-manager");

// exports.getData = () => {
//     return Promise.all([
//         getGruppi()
//
//     ]).then(([gruppi]) => {
//         return {
//             data: {
//                 _production: process.env.NODE_ENV == "production",
//                 title: "Artists | Stonebridge Studio"
//                 , gruppi
//
//             }
//         }
//     })
// };
exports.getDetail = (id) => {
    return Promise.all(
        [getDisco(id)]
    ).then(([disco]) => {
        return {
            data: {
                _production: process.env.NODE_ENV == "production",
                title: "Disco Detail | Stonebridge Studio"
                , disco

            }
        }
    })
}