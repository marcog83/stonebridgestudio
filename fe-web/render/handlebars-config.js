 

 // const exphbs = require("express-handlebars");
const hbs = require("../handlebars-engine/handlebars-engine");

module.exports=function(app){
    // Register `hbs` as our view engine using its bound `engine()` function.
    // app.engine('.hbs', exphbs({
    //     defaultLayout: 'layout'
    //     , extname: '.hbs'
    //     , layoutsDir: "fe-web/render/layout/"
    //     // Uses multiple partials dirs, templates in "shared/templates/" are shared
    //     // with the client-side of the app (see below).
    //     , partialsDir: "fe-web/render"
    // }));
    app.engine('.hbs',hbs({
        pages:{
            homepage:true
        }
    }));

    app.set('views', 'fe-web/render/body/');
    app.set('view engine', 'hbs');
    app.enable('view cache');
};