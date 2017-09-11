/**
 * Created by marcogobbi on 11/09/2017.
 */
define(function (require) {
    var TweenMax = require("gsap");
    var $ = require("jquery");
    return function (post) {
        post.addEventListener("click", function () {
            var text = document.querySelector('.post-image-zoomed .text-js');
            var textPanel = document.querySelector('.post-image-zoomed__text-panel');
            TweenMax.set(textPanel,
                {x: 200,alpha:0}
            );

            var scrollTop = 0//window.document.body.scrollTop;
            var originalThumb = post.querySelector("img");
            var textThumb = post.querySelector(".post__text p").textContent;
            var thumbPosition = post.getBoundingClientRect();
            var ratio = thumbPosition.height / thumbPosition.width;
            var nextHeight = ratio * (window.innerWidth/2);
            text.innerHTML = textThumb;
            var cloneThumb = $("<div></div>");
            $(cloneThumb).append(originalThumb.cloneNode(true))
            cloneThumb.addClass("post__image__over")
                .css({
                    width: thumbPosition.width + 'px'
                    , top: scrollTop + thumbPosition.top + 'px'
                    , left: thumbPosition.left + 'px'
                    , transition: 'none'
                })
            cloneThumb.height("100%");
            var height=cloneThumb.height();

            var posts = $(".post-image-zoomed ");
            posts.find(".js-thumb-ctr").prepend(cloneThumb);
            posts.css({
                visibility: "visible"
                ,opacity:1
                ,backgroundColor: 'rgba(0, 0, 0, 0)'
            });
            TweenMax.to(posts, 1, {
                // backgroundColor: 'rgba(0, 0, 0, 0.9)'
                backgroundColor: '#fff'
            });
            var isMobile = window.innerWidth < 768;

            TweenMax.to(cloneThumb, 0.5, {
                top: scrollTop + (isMobile ? (window.innerHeight - 54 - nextHeight) / 2 : 85),
                // left: 0,

                left: "0",
                x: "0",
                width: isMobile ? "100%" : "50%",
                height: isMobile ? "auto" : window.innerHeight - 85
                , onComplete: function () {
                    posts.addClass("zoom-completed")
                    TweenMax.to(textPanel, .41,
                        {alpha: 1, x: 0}
                    );

                }
            });

        })
    };
});