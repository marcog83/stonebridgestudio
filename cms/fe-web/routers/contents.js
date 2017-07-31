const express = require('express');
const contents = require('./manager/contents');

const router = express.Router();
// define the detail route
router.get('/', function (req, res) {
    contents.getData().then(data => {
        res.render("contents", data);
    })


});
router.get('/new/:id', function (req, res) {
    contents.setNew(req.params.id).then(data => {
        res.render("new-contents", data);
    })
});
router.get('/search/:id', function (req, res) {
    contents.search(req.params.id).then(data => {
        res.render("search-contents", data);
    })
});
router.post("/save", function (req, res) {
    console.log(req.body);
    res.redirect("/contents");
});
module.exports = router;