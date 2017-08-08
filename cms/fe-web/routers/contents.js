const express = require('express');
const ContentsManager = require('./manager/contents');
var multer = require('multer');
var multerPatch = require('./multer-patch');
var path = require('path');
var crypto = require('crypto');

const contentsManager = new ContentsManager();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads',function(destination,filename){
            return path.join("../uploads", filename);
        })
    },

    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});
multerPatch(storage);
var upload = multer({storage: storage});
const router = express.Router();
// define the detail route
router.get('/', function (req, res) {
    contentsManager.entities().then(data => {
        res.render("contents", {data});
    })


});
router.get('/:entityId/:recordId', function (req, res) {
    contentsManager.fromId(req.params.entityId, req.params.recordId).then(data => {

        res.render("new-contents", {data});
    })
});
router.get('/:entityId', function (req, res) {
    contentsManager.create(req.params.entityId).then(data => {
        res.render("new-contents", {data});
    })
});
router.get('/search/:id', function (req, res) {
    contentsManager.search(req.params.id).then(data => {
        res.render("search-contents", data);
    })
});
router.post("/save", upload.any(), function (req, res) {
    contentsManager.save(req.files, req.body).then(recordId => {
        res.redirect(`/contents/${req.body.entityId}/${recordId}`);
    });
});
router.get('/delete/:entityId/:recordId', function (req, res) {
    contentsManager.deleteOne(req.params.entityId, req.params.recordId).then(data => {
        res.redirect(`/contents/${req.params.entityId}`);
    })
});
module.exports = router;