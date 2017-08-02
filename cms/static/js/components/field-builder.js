/**
 * Created by marcogobbi on 01/08/2017.
 */
define(function (require) {
    var Handlebars = require("handlebars");
    var jsonHelper = require("../libs/hbs/json-helper");
    var rawHelper = require("../libs/hbs/raw-helper");
    var switchHelper = require("../libs/hbs/switch-helper");
    jsonHelper(Handlebars);
    rawHelper(Handlebars);
    switchHelper(Handlebars);
    [].slice.call(document.querySelectorAll("script[type='text/x-handlebars']"), 0).forEach(function (node) {
        var name = node.id.replace("-tpl", "");
        Handlebars.registerPartial(name, node.innerHTML);
    });
    return function (data) {
        var template = Handlebars.compile("{{#fields}} {{> field-builder this}}<button class='js-delete'>DELETE</button> {{/fields}}");
        return template(data)
    };
});