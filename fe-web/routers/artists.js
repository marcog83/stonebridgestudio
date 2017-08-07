const express = require('express');
const manager=require("./managers/artists");
const router = express.Router();
// define the detail route
router.get('/', function (req, res) {
    manager.getData().then(data=>{
        res.render("artists",data);
    })


});
// define the detail route
router.get('/:id', function (req, res) {

    res.render("artist-detail",{
        data:{
            title:"Artist detail | Stonebridge Studio"
        }
    });

});
module.exports = router;