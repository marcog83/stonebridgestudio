/**
 * Created by marcogobbi on 31/07/2017.
 */
function getData() {
    var data = {
        data: {
            entities: [
                {
                    name: "dischi"
                    , _id: "dischi"
                    , data: []
                },
                {
                    name: "gruppi"
                    , _id: "gruppi"
                    , data: []
                }
                , {
                    name: "membro-gruppo"
                    , _id: "membro-gruppo"
                    , data: []
                }
            ]
        }
    };
    return Promise.resolve(data)
}
function setNew(contentId) {
    console.log(contentId);
    const response= {
        data:{
            contentId,
            fields: [
                {
                    "type": "text"
                    , "label": "titolo"
                    , "name": "titolo"
                    , "value": "questo è un titolo"
                }
            ]
        }
    }
    return Promise.resolve(response);
}
function search(contentId) {
    console.log(contentId)

}
exports.setNew = setNew;
exports.search = search;
exports.getData = getData;