const express = require('express');

const router = express.Router();


// define the detail route
router.get('/', function (req, res) {
// router.get('/:id', function (req, res) {
    res.render("disco-detail", {});

});

 router.get('/:id', function (req, res) {
    res.render("disco-detail", {});

});
module.exports = router;