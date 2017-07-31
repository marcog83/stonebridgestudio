const express = require('express');

const router = express.Router();
// define the detail route
router.get('/', function (req, res) {

    res.render("artists",{
        data:{
            title:"Artists | Stonebridge Studio"
        }
    });

});
// define the detail route
router.get('/detail/:id', function (req, res) {

    res.render("artist-detail",{
        data:{
            title:"Artist detail | Stonebridge Studio"
        }
    });

});
module.exports = router;