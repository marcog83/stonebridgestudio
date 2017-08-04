/**
 * Created by marcogobbi on 04/08/2017.
 */
define(function () {
    return function (node) {
        var input = node.querySelector(".js-input");
        var img = node.querySelector(".js-img");
        input.addEventListener("change",function(e){
            var file    = input.files[0];
            var reader  = new FileReader();

            reader.addEventListener("load", function () {
                img.src = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }else{
                img.src=""
            }
        })
    };
});