/**
 * Created by marcogobbi on 01/08/2017.
 */
requirejs.config({
    paths: {
        "robojs": "./libs/robojs.min"

    }
});
require(["./application"], function (main) {
    main();
})