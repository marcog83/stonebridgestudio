const express = require('express');

const router = express.Router();
// define the detail route
router.get('/', function (req, res) {

    res.render("homepage",{
        data:{
            title:"Homepage | Stonebridge Studio"
        }
    });

});
module.exports = router;