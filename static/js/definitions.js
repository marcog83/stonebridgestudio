/**
 * Created by marcogobbi on 01/08/2017.
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    }
})(this, function () {
    return {
        "menu-visibility": "modules/menu/topbar-menu-visibility"
        , "bg-image": "modules/effects/bg-image"
        , "menu": "modules/menu"
        , "post-thumbnail": "modules/posts/post-thumbnail"
        , "post-image-zoomed": "modules/posts/post-image-zoomed"
    };
});
