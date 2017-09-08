/**
 * Created by marcogobbi on 01/08/2017.
 */
requirejs.config({
    paths: {
        "libraries": "./libs/libraries"

    }
});
require(["require", "libraries"], function (require) {
    require(["./application"], function (main) {
        main();
    })
});