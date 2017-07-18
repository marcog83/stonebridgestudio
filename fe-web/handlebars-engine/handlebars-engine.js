const fs = require('fs');
const mergeDeep = require('./merge-deep');
var glob = require("glob");
var path = require("path");
var Handlebars = require("handlebars");
const DEFINITION_DIR = 'fe-web/render/definitions/';
const LAYOUT_DIR = 'fe-web/render/layout/';
const DATA_DIR = 'fe-web/render/data/';
const INCLUDE_DIR = 'fe-web/render/include/';
const BODY_DIR = `fe-web/render/body/`;
function getFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, content) {
            if (err) return reject(err);

            resolve(content.toString());

        })
    })
};
function registerIncludes() {
    return new Promise(resolve => {
        // options is optional
        var options = {};
        glob(INCLUDE_DIR + "**/*.hbs", options, function (er, files) {
            // files is an array of filenames.
            // If the `nonull` option is set, and nothing
            // was found, then files is ["**/*.js"]
            // er is an error object or null.
            resolve(files);
        })
    }).then(filenames => {
        filenames.forEach(function (filename) {

            var nameParsed = path.parse(filename);
            var name = path.normalize(nameParsed.name);


            if (name.match(/{scripts|stylesheet}/gim)) {
                return;
            }
            var include = fs.readFileSync(filename, 'utf8');
            Handlebars.registerPartial(name, include);
        });
        return true;
    });

}
module.exports = function (options) {
    const {pages} = options;
    const cache = {};
    const includes = registerIncludes();
    return function engine(filePath, options, callback) { // define the template engine
        var key = this.name;
        var page = pages[key] === true ? {} : pages[key];
        const {layout = "index", body = key, scripts = "scripts", stylesheet = "stylesheet", data = key} = page;
        if (!cache[key]) {
            cache[key] = {
                layout: getFile(`${LAYOUT_DIR}${layout}.hbs`),
                body: getFile(`${BODY_DIR}${body}.hbs`),
                scripts: getFile(`${INCLUDE_DIR}${scripts}.hbs`),
                stylesheet: getFile(`${INCLUDE_DIR}${stylesheet}.hbs`)
            };
            cache[key].data = {};
            /*if (fs.existsSync(`${DATA_DIR}${data}.json`)) {
             cache[key].data = require(`${DATA_DIR}${data}`);
             }*/
            //cache[key].data = mergeDeep(cache[key].data, options.data);
        }
        includes.then(_ => {
            return Promise.all([
                cache[key].layout
                , cache[key].body
                , cache[key].scripts
                , cache[key].stylesheet

            ]);
        }).then(([layout, body, scripts, stylesheet]) => {
            Handlebars.registerPartial('body', body);
            Handlebars.registerPartial('scripts', scripts);
            Handlebars.registerPartial('stylesheet', stylesheet);
            return Handlebars.compile(layout);
        }).then(template => {
                const {data = {}} = options.data||{};
                data.__pagename__ = key;
                return callback(null, template(data));
            })
            .catch(err => {
                callback(err);
            })
        // getFile.then(content => {
        //     return callback(null, rendered);
        // })

    }
};