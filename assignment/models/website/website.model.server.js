module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel",WebsiteSchema);

    var api = {
        createWebsite:createWebsite,
        findWebsiteByUserId:findWebsiteByUserId,
        findWebsiteById :findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite
    }
    return api;


    function deleteWebsite(wid) {
        return WebsiteModel.remove({_id:wid});
    }

    function updateWebsite(wid, website) {
        return WebsiteModel.update(
            {
                _id:wid
            },
            {
                name: website.name
            }
        )
    }
    function findWebsiteById (wid) {
        return WebsiteModel.findOne({_id:wid});
    }
    function findWebsiteByUserId(userid) {
        return WebsiteModel.find({
            _user : userid
        });
    }
    function createWebsite(userid,website) {
        return WebsiteModel.create(website);
    }
}