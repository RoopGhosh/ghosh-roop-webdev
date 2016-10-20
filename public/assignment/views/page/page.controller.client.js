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
            vm.pages = PageService.getPageByWebsiteId(vm.websiteId);
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
            vm.page = PageService.getPageById(pageId);
            vm.pages = PageService.getPageByWebsiteId(websiteId);
        }
        init();

        function deletePage() {
            var success = PageService.deletePage(pageId);
            if (success) {
                $location.url("/user/" + vm.userId + "/website/" + websiteId + "/page");
            } else {
                $location.url("/login");
            }
        }

        function updatePage(name, description) {
            var success = PageService.updatePage(pageId, name, description);
            if (success) {
                $location.url("/user/" + vm.userId + "/website/" + websiteId + "/page");
            } else {
                $location.url("/login");
            }
        }
    }
        function PageControllerNew($routeParams,PageService,$location) {
            var vm = this;
            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.addPage = addPage;
            function init() {
                vm.pages = PageService.getPageByWebsiteId(vm.websiteId);
            }

            init();
            function addPage(name, description) {
                var success = PageService.addPage(name, description, websiteId);
                if (success) {
                    $location.url("/user/" + vm.userId + "/website/" + websiteId + "/page");
                } else {
                    $location.url("/login");
                }
            }
        }
})();