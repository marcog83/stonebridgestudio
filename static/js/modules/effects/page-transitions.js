/**
 * Created by marcogobbi on 11/09/2017.
 */
define(function (require) {
    var Barba = require("Barba");
    var TweenMax = require("gsap");
    return function () {
        var FadeTransition = Barba.BaseTransition.extend({
            start: function () {
                /**
                 * This function is automatically called as soon the Transition starts
                 * this.newContainerLoading is a Promise for the loading of the new container
                 * (Barba.js also comes with an handy Promise polyfill!)
                 */

                // As soon the loading is finished and the old page is faded out, let's fade the new page
                Promise
                    .all([this.newContainerLoading, this.fadeOut()])
                    .then(this.fadeIn.bind(this));
            },

            fadeOut: function () {
                /**
                 * this.oldContainer is the HTMLElement of the old Container
                 */
                return new Promise(function (resolve) {
                    document.body.classList.add("page-transition")
                    document.querySelector(".menu-ctr").classList.remove("is-navopen")
                    TweenMax.to(document.querySelector(".header"), .5, {
                        height: "100vh"
                        , onComplete: function () {
                            window.scrollTo(0, 0)
                            resolve();
                        }
                    })
                })
                // return $(this.oldContainer).animate({ opacity: 0 }).promise();
            },

            fadeIn: function () {
                /**
                 * this.newContainer is the HTMLElement of the new Container
                 * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
                 * Please note, newContainer is available just after newContainerLoading is resolved!
                 */

                var _this = this;
                //var $el = $(this.newContainer);
                this.oldContainer.style.display="none";
                //this.newContainer.style.visibility="visible";
               // this.newContainer.style.visibility="visible";


                return new Promise(function (resolve) {
                    document.body.classList.remove("page-transition")
                    TweenMax.to(document.querySelector(".header"), .3, {
                        height: "54px"
                        , onComplete: function () {
                            /**
                             * Do not forget to call .done() as soon your transition is finished!
                             * .done() will automatically remove from the DOM the old Container
                             */
                            _this.done();
                            resolve();

                        }
                    })
                });

            }
        });

        /**
         * Next step, you have to tell Barba to use the new Transition
         */

        Barba.Pjax.getTransition = function () {
            /**
             * Here you can use your own logic!
             * For example you can use different Transition based on the current page or link...
             */

            return FadeTransition;
        };
        Barba.Pjax.start();
    };
});