/**
 * Created by marcogobbi on 30/07/2017.
 */
var menu = document.querySelector(".menu-ctr");
if (menu) {

    document.querySelector(".nav-trigger").addEventListener("click", function () {
        menu.classList.toggle("is-navopen");
    });
    // [].slice.call(document.querySelectorAll(".menu__item"), 0).forEach(function (btn) {
    //     btn.addEventListener("click", function () {
    //         menu.classList.remove("is-navopen");
    //     })
    // })
}
var posts = document.querySelector('.post-image-zoomed');
if (posts) {
    posts.addEventListener("click", function (e) {
        var textPanel = document.querySelector('.post-image-zoomed__text-panel');
        TweenMax.to(textPanel,.3,{autoAlpha:0,y:100});
        TweenMax.to(posts.querySelector("img"), .4, {
            autoAlpha: 0
        });
        TweenMax.to(posts, .5, {
            backgroundColor: 'rgba(0, 0, 0, 0)'
            // backgroundColor: 'rgba(255, 255, 255, 0)'

            , onComplete: function () {
                posts.style.visibility = "hidden";
                posts.innerHTML = '<div class="post-image-zoomed__text-panel"> <p class="text-js"></p> </div>'
                // document.body.classList.remove("fixed")
            }
        })
    });
    [].slice.call(document.querySelectorAll(".post"), 0).forEach(function (post) {
        post.addEventListener("click", function () {
            var text = document.querySelector('.post-image-zoomed .text-js');
            var textPanel = document.querySelector('.post-image-zoomed__text-panel');

            var scrollTop = 0//window.document.body.scrollTop;
            var originalThumb = post.querySelector("img");
            var textThumb = post.querySelector(".post__text p").textContent;
            var thumbPosition = post.getBoundingClientRect();
            var ratio = thumbPosition.height / thumbPosition.width;
            var nextHeight = ratio * window.innerWidth;
            text.innerHTML = textThumb;
            var cloneThumb = originalThumb.cloneNode(true);
            cloneThumb.classList.add("post__image__over");
            cloneThumb.style.width = thumbPosition.width + 'px';
            cloneThumb.style.top = scrollTop + thumbPosition.top + 'px';

            cloneThumb.style.left = thumbPosition.left + 'px';
            cloneThumb.style.transition = 'none';

            posts.appendChild(cloneThumb);
            posts.style.visibility = "visible";
            TweenMax.to(posts, 1, {
                backgroundColor: 'rgba(0, 0, 0, 0.9)'
                // backgroundColor: '#fff'
            });
            var isMobile = window.innerWidth < 768;
            TweenMax.to(cloneThumb, 0.8, {
                top: scrollTop + 54 + (isMobile ? (window.innerHeight - 54 - nextHeight) / 2 : 0),
                // left: 0,

                left: "50%",
                x: "-50%",
                width: isMobile ? "100%" : "auto",
                height: isMobile ? "auto" : window.innerHeight - 54
            });
            TweenMax.fromTo(textPanel,1,{autoAlpha:0,y:100},{autoAlpha:1,y:1});
        })
    })
}