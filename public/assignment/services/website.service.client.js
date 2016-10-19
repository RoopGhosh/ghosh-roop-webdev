/**
 * Created by roopghosh on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        var api = {
            getWebsiteByUserId:getWebsiteByUserId,
            getWebsiteById:getWebsiteById,
            deleteWebsite:deleteWebsite,
            updateWebsite:updateWebsite,
            addWebsite:addWebsite
        }
        return api;

        function getWebsiteByUserId(userid){
            var list=[];
            for(w in websites){
                if(websites[w].developerId === userid){
                    list.push(websites[w]);
                }
            }
            return list;
        }

        function getWebsiteById(websiteId){
            for(w in websites){
                if(websites[w]._id === websiteId){
                    return websites[w];
                }
            }
            return null;
        }

        function deleteWebsite(websiteId){
            for(w in websites){
                if(websites[w]._id === websiteId){
                    websites.splice(w,1);
                    return true;
                }
            }
            return false;
        }

        function updateWebsite(websiteId,name,description){
            for(w in websites){
                if(websites[w]._id === websiteId){
                    var website = {_id:websites[w]._id,name:name,developerId:websites[w].developerId};
                    websites[w]=website;
                    return true;
                }
            }
            return false;
        }

        function addWebsite(name,description,developerId) {
            var temp = Number.MIN_VALUE;
            for(w in websites){
                if(websites[w]._id>temp){
                    temp = websites[w]._id;
                }
            }
            var website = {_id:++temp+'',name:name,developerId:developerId};
            websites.push(website);
            return website;
        }
    }

})();
