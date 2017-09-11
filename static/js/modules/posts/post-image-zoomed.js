/**
 * Created by marcogobbi on 11/09/2017.
 */
define(function (require) {
    var TweenMax = require("gsap")
    var $ = require("jquery")
    return function (posts) {
        posts.addEventListener("click", function (e) {
            var textPanel = document.querySelector('.post-image-zoomed__text-panel');

            TweenMax.to($(textPanel), .3, {autoAlpha: 0, y: 100, ease: Ease.easeIn});
            // TweenMax.to(posts.querySelector("img"), .4, {
            //     autoAlpha: 0
            //     , delay: 0.3
            // });
            TweenMax.to(posts, .5, {
                alpha: 0
                // backgroundColor: 'rgba(255, 255, 255, 0)'
                , delay: 0.3
                , onComplete: function () {
                    posts.style.visibility = "hidden";
                    posts.innerHTML = '<div class="content-wrapper js-thumb-ctr">' +
                        '<div class="post-image-zoomed__text-panel">' +
                        '<p class="text-js"></p>' +
                        '</div>' +
                        '</div>'
                    // document.body.classList.remove("fixed")
                }
            })
        });
    };
});