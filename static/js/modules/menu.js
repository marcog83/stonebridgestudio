/**
 * Created by marcogobbi on 11/09/2017.
 */
define(function () {
    return function(node){
        node.querySelector(".nav-trigger").addEventListener("click", function () {
            node.classList.toggle("is-navopen");
        });
    };
});