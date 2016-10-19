(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteControllerList",WebsiteControllerList)
        .controller("WebsiteControllerEdit",WebsiteControllerEdit)
        .controller("WebsiteControllerNew",WebsiteControllerNew)

    function WebsiteControllerList($routeParams,WebsiteService) {
        var vm = this;
        vm.userId= $routeParams.uid;
        function init(){
            vm.websites = WebsiteService.getWebsiteByUserId(vm.userId);
        }
        init();

    }
    function WebsiteControllerEdit($routeParams,WebsiteService,$location) {
        var vm = this;
        var userId= $routeParams.uid;
        var webSiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        function init(){
            vm.website = WebsiteService.getWebsiteById(webSiteId);
        }
        init();

        function deleteWebsite(){
            var success = WebsiteService.deleteWebsite(webSiteId);
            if(success){
                $location.url("/user/"+userId+"/website");
            }else{
                $location.url("/login");
            }
        }

        function updateWebsite(name, description) {
            var success = WebsiteService.updateWebsite(webSiteId,name,description);
            if(success){
                $location.url("/user/"+userId+"/website");
            }else{
                $location.url("/login");
            }
        }
    }
    
    function WebsiteControllerNew($routeParams,WebsiteService,$location) {
        var vm = this;
        var userId= $routeParams.uid;
        vm.addWebsite = addWebsite;
        function init(){
            console.log("websitecontrollerNew init");
        }
        init();
        function addWebsite(name, description) {
            var success = WebsiteService.addWebsite(name,description,userId);
            if(success){
                $location.url("/user/"+userId+"/website");
            }else{
                $location.url("/login");
            }
        }
    }
})();