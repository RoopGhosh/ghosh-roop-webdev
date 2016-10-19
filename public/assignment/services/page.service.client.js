/**
 * Created by roopghosh on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService)

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var api = {
            getPageByWebsiteId:getPageByWebsiteId,
            deletePage:deletePage,
            getPageById:getPageById,
            updatePage:updatePage,
            addPage:addPage

        }
        return api;

        function getPageByWebsiteId(wid) {
            var arr = [];
            for(p in pages){
                if(pages[p].websiteId ===  wid){
                    arr.push(pages[p]);
                }
            }
            return arr;
        }

        function getPageById(pageId){
            for(p in pages){
                if(pages[p]._id === pageId){
                    return pages[p];
                }
            }
            return null;
        }

        function deletePage(pageId){
            for(p in pages){
                if(pages[p]._id === pageId){
                    pages.splice(p,1);
                    return true;
                }
            }
            return false;
        }

        function updatePage(pageId,name,description){
            for(w in pages){
                if(pages[w]._id === pageId){
                    var page = {_id:pages[w]._id,name:name,websiteId:pages[w].websiteId};
                    pages[w]=page;
                    return true;
                }
            }
            return false;
        }

        function addPage(name,description,websiteId) {
            var temp = Number.MIN_VALUE;
            for(w in pages){
                if(pages[w]._id>temp){
                    temp = pages[w]._id;
                }
            }
            var page = {_id:++temp+'',name:name,websiteId:websiteId};
            pages.push(page);
            return page;
        }
    }

})();
