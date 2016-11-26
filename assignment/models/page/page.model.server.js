module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findPagebyWebsiteId: findPagebyWebsiteId,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    }
    return api;

    function createPage(page) {
        return PageModel.create(page);
    }

    function findPagebyWebsiteId(wid) {
        return PageModel.find({_website: wid});
    }

    function findPageById(pid) {
        return PageModel.findOne(pid);
    }

    function updatePage(pid,page) {
        return PageModel.update(
            {
                _id : pid
            },
            {
                name : page.name
            }
        );
    }

    function deletePage(pid) {
        return PageModel.remove({_id:pid});
    }
}
