var express = require('express');

const handlebars = require('./render/handlebars-config');

const homepage = require("./routers/homepage/homepage");
var app = express();

handlebars(app);
app.use('/static', express.static(__dirname + '/../static',{
    maxAge: '5d'
    ,etag:"strong"
}));

app.use('/', homepage);
//
const PORT = process.env.PORT || 5000;
app.set('port', PORT);
app.listen(app.get('port'), (error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    } else {
        console.log('Listening on port: ' + app.get('port') + '.')
    }
});