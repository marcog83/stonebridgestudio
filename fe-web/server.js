const express = require('express');
const fs = require('fs');
const http2 = require('spdy');

const handlebars = require('./render/handlebars-config');

const photoGallery = require("./routers/photo-gallery");
const homepage = require("./routers/homepage");
const contacts = require("./routers/contacts");
const app = express();

handlebars(app);
app.use('/static', express.static(__dirname + '/../static', {
    maxAge: '5d'
    , etag: "strong"
}));

app.use('/', homepage);
app.use('/contacts', contacts);
app.use('/photo-gallery', photoGallery);
//
const PORT = process.env.PORT || 5000;

const options = {
    key: fs.readFileSync('./fe-web/server.key'),
    cert: fs.readFileSync('./fe-web/server.crt')
};

// http2.createServer(options, app)
app.listen(PORT, () => {
            console.log(`Server is listening on https://localhost:${PORT}.
You can open the URL in the browser.`)
        }
    );