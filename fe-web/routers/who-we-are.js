const express = require('express');

const router = express.Router();
// define the detail route
router.get('/', function (req, res) {

    res.render("who-we-are",{
        data:{
            title:"Who we are | Stonebridge Studio"
        }
    });

});
module.exports = router;