/**
 * Created by mgobbi on 06/05/2016.
 */
var utils = require("../utils/Utils");
module.exports = {
    dist: {
        files: [
            // includes files within path
            {
                expand: true
                , cwd: utils.getSRC()
                , src: [
                'css/font/*'
                , "static-include/scripts.jsp"
                , "static-include/stylesheet.jsp"
                , "img/favicon.ico"
                , "img/academy/mappa-scopri.jpg"
                , "gfx/icons/manifest.json"

                 , "js/libs/provide.js"
                 , "js/external-widgets/mixpanel/mixpanel-alias-user.min.js"
                 , "js/modules/banner/banner-analytics.js"
            ]
                , dest: utils.getHTDOCS()
            }


        ]
    }
};