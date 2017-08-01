/**
 * Created by marcogobbi on 01/08/2017.
 */
define(function (require) {
    var builder=require("./field-builder");
    return function (node) {
        var addBtn = node.querySelector(".js-add");
        var fields = node.querySelector("[data-json]").innerHTML;
        var container = node.querySelector(".js-fields-ctr");
        try {
            fields = JSON.parse(fields)
        } catch (e) {
            fields = [];
        }
        addBtn.addEventListener("click", function (e) {
            //container
            var div=document.createElement("div");
            div.innerHTML=builder({fields:fields});


            container.appendChild(div.firstElementChild )
        })
        return function () {

        }
    };
});