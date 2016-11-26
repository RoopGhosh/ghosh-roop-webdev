/**
 * Created by roopghosh on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            getWebsiteByUserId:getWebsiteByUserId,
            getWebsiteById:getWebsiteById,
            deleteWebsite:deleteWebsite,
            updateWebsite:updateWebsite,
            addWebsite:addWebsite
        }
        return api;

        function getWebsiteByUserId(userid){
            return $http.get("/api/user/"+userid+"/website");
        }

        function getWebsiteById(websiteId,userId){
            return $http.get("/api/user/"+userId+"/website/"+websiteId);
        }

        function deleteWebsite(websiteId,userId){
            return $http.delete("/api/user/"+userId+"/website/"+websiteId);
        }

        function updateWebsite(websiteId,name,description,userId){
            var website = {websiteId : websiteId, name : name, description: description};
            return $http.put("/api/user/"+userId+"/website/"+websiteId,website);
        }

        function addWebsite(name,description,developerId) {
            var website = {name : name, description: description};
            return $http.post("/api/user/"+developerId+"/website/new",website);
        }
    }

})();
