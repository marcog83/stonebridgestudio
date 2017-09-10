const express = require('express');
const fs = require('fs');
const http2 = require('spdy');
const compression = require("compression");
const handlebars = require('./render/handlebars-config');
const SeoUrl = require('./plugins/seo/seo-url');
const photoGallery = require("./routers/photo-gallery");
const homepage = require("./routers/homepage");
const contacts = require("./routers/contacts");
const whoWeAre = require("./routers/who-we-are");
const artists = require("./routers/artists");
const disco = require("./routers/disco");
const posts = require("./routers/posts");
const cms = require("../cms/fe-web/server").cms;

const app = express();

handlebars(app);
 app.get('/**',SeoUrl.middleware );
function  cacheMiddleware(seconds){
    return function(req,res,next){
        var date=new Date();
        date.setDate(date.getDate()+1);
        date.setHours(0,0,0,0);
        res.setHeader("Cache-Control", `public, must-revalidate, max-age=${seconds}`);
        res.setHeader("Service-Worker-Allowed", `/`);
        res.setHeader("Expires", date.toString());
        next();
    }
}



app.use("/cms",cms);
app.use(compression());
app.use(cacheMiddleware(3600));
app.use('/static', express.static(__dirname + '/../static', {
    maxAge: '5d'
    , etag: "strong"
}));
// app.use('/uploads', express.static(__dirname + '/../uploads'));
app.use('/', homepage);
app.use('/contacts', contacts);
app.use('/photo-gallery', photoGallery);
app.use('/who-we-are', whoWeAre);
app.use('/gruppi', artists);
app.use('/dischi', disco);
app.use('/posts', posts);
//

const PORT = process.env.PORT || 4900;

const options = {
    key: fs.readFileSync('./fe-web/server.key'),
    cert: fs.readFileSync('./fe-web/server.crt')
};

// http2.createServer(options, app)
app.listen(PORT, () => {
            console.log(`Server is listening on http://localhost:${PORT}.
You can open the URL in the browser.`)
        }
    );