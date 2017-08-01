/**
 * Created by mgobbi on 01/08/2017.
 */

// usage {{{json user}}}
module.exports=function(Handlebars){
    Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });
};