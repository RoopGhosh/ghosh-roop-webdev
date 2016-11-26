/**
 * Created by roopghosh on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService)

    function PageService($http) {
        var api = {
            getPageByWebsiteId:getPageByWebsiteId,
            deletePage:deletePage,
            getPageById:getPageById,
            updatePage:updatePage,
            addPage:addPage
        };
        return api;

        function getPageByWebsiteId(wid,uid) {
           return $http.get("/api/user/"+uid+"/website/"+wid+"/page");
        }

        function getPageById(pageId,wid,uid){
            return $http.get("/api/user/"+uid+"/website/"+wid+"/page/"+pageId);
        }

        function deletePage(pageId,wid,uid){
            return $http.delete("/api/user/"+uid+"/website/"+wid+"/page/"+pageId);
        }

        function updatePage(name,description,pageId,wid,uid){
            var page = {name:name,description: description};
            return $http.put("/api/user/"+uid+"/website/"+wid+"/page/"+pageId,page);
        }

        function addPage(name,description,wid,uid) {
            var page = {name:name,description: description};
            return $http.post("/api/user/"+uid+"/website/"+wid+"/page/new",page);
        }
    }

})();
