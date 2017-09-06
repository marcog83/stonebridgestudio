const {getPosts} = require("./facebook");


exports.getData = () => {
    return Promise.all([

        getPosts()

    ]).then(([posts]) => {
        return {
            data: {
                _production:process.env.NODE_ENV=="production",
                title: "Posts | Stonebridge Studio"

                , posts: posts.filter(({full_picture, message}) => {
                    return full_picture && message
                })
            }
        }
    })
};