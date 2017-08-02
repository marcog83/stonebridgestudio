const express = require('express');
const contents = require('./manager/contents');
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');


var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
})

var upload = multer({storage: storage})
const router = express.Router();
// define the detail route
router.get('/', function (req, res) {
    contents.getData().then(data => {
        res.render("contents", data);
    })
});
router.get('/:id', function (req, res) {
    contents.getData().then(data => {
        res.render("detail-contents", data);
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
router.post("/save", upload.any(), function (req, res) {
    contents.save(req.files, req.body).then(contentId => {
        contentId = "contentId";
        res.redirect(`/contents/${contentId}`);
    });


});
module.exports = router;