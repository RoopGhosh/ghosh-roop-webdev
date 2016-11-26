(function() {
    angular
        .module("WebAppMaker")
        .controller("PageControllerList",PageControllerList)
        .controller("PageControllerEdit",PageControllerEdit)
        .controller("PageControllerNew",PageControllerNew)

    function PageControllerList($routeParams,PageService){
        var vm = this;
        vm.websiteId= $routeParams.wid;
        vm.userId = $routeParams['uid'];
        function init(){
            PageService.getPageByWebsiteId(vm.websiteId,vm.userId)
                .success(function (response){
                    vm.pages = response;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();
    }

    function PageControllerEdit($location,$routeParams,PageService) {
        var vm = this;
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        vm.userId = $routeParams['uid'];
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;
        vm.userId = $routeParams['uid'];
        function init() {
            PageService.getPageById(pageId,websiteId,vm.userId)
                .success(function(response){
                    vm.page = response;
                })
            PageService.getPageByWebsiteId(websiteId,vm.userId)
                .success(function (response){
                    vm.pages = response;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();

        function deletePage() {
            var promise = PageService.deletePage(pageId,websiteId,vm.userId);
            promise
                .success(function (res) {
                    console.log(res);
                    $location.url("/user/" + vm.userId + "/website/" + websiteId + "/page");
                })
                .error(function (error){
                    console.log(error);
                    $location.url("/login");
                })
        }

        function updatePage(name, description) {
           PageService.updatePage(name,description,pageId,websiteId,vm.userId)
                .success(function (res) {
                    $location.url("/user/" + vm.userId + "/website/" + websiteId + "/page");
                })
                .error(function (error){
                    console.log(error);
                    $location.url("/user/" + vm.userId + "/website/" + websiteId + "/page");
                })
        }
    }
        function PageControllerNew($routeParams,PageService,$location) {
            var vm = this;
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.addPage = addPage;
            function init() {
                PageService.getPageByWebsiteId(vm.websiteId,vm.userId)
                    .success(function (response){
                        vm.pages = response;
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }
            init();
            function addPage(name, description) {
               PageService.addPage(name, description, vm.websiteId,vm.userId)
                   .success(function(res){
                       $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                   })
            }
        }
})();