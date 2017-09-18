const passport = require('passport');
const ceLogin = require('connect-ensure-login');
require('../core/auth/index');
const session = require('express-session');
const login = passport.authenticate('local', {successReturnToOrRedirect: '/cms/', failureRedirect: '/cms/login'});

const loginForm = (request, response) => {
    response.render('login',{});
};
const logout = (request, response) => {
    request.logout();
    response.redirect('/cms');
};
module.exports.init = (app) => {
    app.get("/*",(req,res,next)=>{
        if (req.originalUrl.match(/\/login|\/logout/gim) === null) {
            next();
        }else {
            next( 'route' );
        }
    },ceLogin.ensureLoggedIn());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
    app.use(/^(\/asset.+|(?!\/asset).*)$/,passport.initialize());
    app.use(/^(\/asset.+|(?!\/asset).*)$/,passport.session());
    app.get('/login', loginForm);
    app.post('/login', login);
    app.get('/logout', logout);
};