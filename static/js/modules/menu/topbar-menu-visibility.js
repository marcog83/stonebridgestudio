define(function (require, exports, module) {
    'use strict';
    var Scheduler = require("./scroll-scheduler");
    var most = require("most");
    var TweenMax = require("gsap");

    return function (node) {


        Scheduler.oTick
            .skipRepeats()
            .filter(function () {
                return window.innerWidth < 768;
            })
            .flatMap(function (direction) {
                var i = window.scrollY;
                var scroll = {y: 0};
                return most.fromEvent("scroll", document)
                    .takeWhile(function () {
                        if (direction) {

                            return scroll.y >= -54;
                        } else {
                            return scroll.y <= 0;
                        }
                    }).map(function (e) {
                        console.log(i - window.scrollY)
                        if (direction) {
                            scroll.y = Math.max(-54, i - window.scrollY);

                        } else {
                            scroll.y = Math.min(0, i - window.scrollY);

                        }
                        return scroll.y;
                    })
                // return direction ? "add" : "remove";
            }).forEach(function (y) {
            TweenMax.set(node, {y: y});
            // node.classList[method]("closed");
        })

    }
});