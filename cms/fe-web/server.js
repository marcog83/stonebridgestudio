const express = require('express');
const fs = require('fs');
const http2 = require('spdy');

const handlebars = require('./render/handlebars-config');

const index = require("./routers/index");

const app = express();

handlebars(app);
app.use('/static', express.static(__dirname + '/../static', {
    maxAge: '5d'
    , etag: "strong"
}));

app.use('/', index);

//
const PORT = process.env.PORT || 5000;

const options = {
    key: fs.readFileSync('./fe-web/server.key'),
    cert: fs.readFileSync('./fe-web/server.crt')
};

http2.createServer(options, app)
    .listen(PORT, () => {
            console.log(`Server is listening on https://localhost:${PORT}.
You can open the URL in the browser.`)
        }
    );