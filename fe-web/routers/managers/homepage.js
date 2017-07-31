const {getPosts} = require("./facebook");

exports.getData = () => {
    return Promise.all([
        getPosts()
    ]).then(([posts]) => {
        return {
            data: {
                title: "Homepage | Stonebridge Studio"
                , posts: posts.filter(({full_picture, message}) => {
                    return full_picture && message
                }).slice(0, 6)
            }
        }
    })
};