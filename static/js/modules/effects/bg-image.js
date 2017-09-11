/**
 * Created by marcogobbi on 11/09/2017.
 */
define(function (require) {
    var TweenMax = require("gsap");
    return function (node) {
        var src = node.dataset.image;
        var img = new Image();
        img.onload = function () {
            node.style.backgroundImage = "url('" + src + "')";
            TweenMax.fromTo(node, .3, {
                alpha: 0
            }, {
                alpha: 1
            })
        };
        img.src = src;
    };
});