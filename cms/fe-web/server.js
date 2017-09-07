if (!Object.entries)
    Object.entries = function( obj ){
        var ownProps = Object.keys( obj ),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };

const express = require('express');
const fs = require('fs');
const http2 = require('spdy');
var bodyParser = require('body-parser');
const handlebars = require('./render/handlebars-config');

const index = require("./routers/index");
const contents = require("./routers/contents");

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
handlebars(app);
app.use('/static', express.static(__dirname + '/../static', {
    maxAge: '5d'
    , etag: "strong"
}));
app.use('/uploads', express.static(__dirname + '/../../uploads', {
    maxAge: '5d'
    , etag: "strong"
}));
app.use('/', index);
app.use('/contents', contents);

//
const PORT = process.env.PORT || 5000;

// const options = {
//     key: fs.readFileSync('./fe-web/server.key'),
//     cert: fs.readFileSync('./fe-web/server.crt')
// };

// http2.createServer(options, app)
app.listen(PORT, () => {
            console.log(`Server is listening on http://localhost:${PORT}.
You can open the URL in the browser.`)
        }
    );