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
            WebsiteService.getWebsiteByUserId(vm.userId)
                .success(function (website){
                    vm.websites = website;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();

    }
    function WebsiteControllerEdit($routeParams,WebsiteService,$location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        var webSiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        function init(){
                WebsiteService.getWebsiteById(webSiteId,vm.userId)
                    .success(function (response){
                vm.website = response;
            })
                    .error(function (error) {
                        console.log(error);
                    });
             WebsiteService.getWebsiteByUserId(vm.userId)
                 .success(function (response) {
                     vm.websites = response;
                 })
                 .error(function (error) {
                     console.log(error);
                 });
        }
        init();

        function deleteWebsite(){
           WebsiteService.deleteWebsite(webSiteId,vm.userId)
               .success(function () {
                   $location.url("/user/"+vm.userId+"/website");
               })
               .error(function(){
                   $location.url("/login");
               });
        }

        function updateWebsite(name, description) {
           WebsiteService.updateWebsite(webSiteId,name,description,vm.userId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function(){
                        $location.url("/login");
                });
        }
    }
    
    function WebsiteControllerNew($routeParams,WebsiteService,$location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.addWebsite = addWebsite;
        function init(){
            WebsiteService.getWebsiteByUserId(vm.userId)
                .success(function (response) {
                    vm.websites = response;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();
        function addWebsite(name, description) {
        WebsiteService.addWebsite(name,description,vm.userId)
                .success(function (response) {
                    console.log(response);
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function (error){
                   console.log(error);
                    $location.url("/login");
                });
        }
    }
})();