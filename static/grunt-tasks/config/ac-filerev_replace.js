/**
 * Created by mgobbi on 26/06/2016.
 */
var utils = require("../utils/Utils");
module.exports = {
    options: {
        assets_root: utils.getHTDOCS()
    },
     
    views: {
        src: [
            utils.getHTDOCS()+'static-include/scripts.jsp',
            utils.getHTDOCS()+'static-include/stylesheet.jsp'
        ]
    }
};
