/**
 * Created by mgobbi on 12/09/2017.
 */

const SeoParams = require("../../entities/SeoParams");
const seoEntity = new SeoParams();
exports.fromEntity = entity => {

};
exports.getFromOriginalUrl = seo_original_url => {

    return seoEntity.queryOne({seo_original_url});

};
exports.getFromRecordId = seo_recordId => {
    return seoEntity.queryOne({seo_recordId}).then(record => {
        //if (!record.length)return {fields:[]};
        const fields = Object.keys(record).map(key => record[key]);
        return {fields}

    })
};
exports.save = body => {
    return seoEntity.save(body);
};
exports.update =(recordId,body)  => {
    return seoEntity.update(recordId,body);
};
exports.middleware = (req, res, next) => {
    const seo_url = "/" + req.param(0);
    return seoEntity.queryOne({seo_url}).then(seoItem => {
        if (seoItem) {
            req.url = seoItem.seo_original_url;
        }
        next();

    });
};