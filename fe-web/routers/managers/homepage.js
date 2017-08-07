const {getPosts} = require("./facebook");
const {getGruppi} = require("./gruppi-manager");

exports.getData = () => {
    return Promise.all([
        getGruppi()
       , getPosts()
    ]).then(([gruppi,posts]) => {
        return {
            data: {
                _production:process.env.NODE_ENV=="production",
                title: "Homepage | Stonebridge Studio"
                ,gruppi
                , posts: posts.filter(({full_picture, message}) => {
                    return full_picture && message
                }).slice(0, 6)
            }
        }
    })
};