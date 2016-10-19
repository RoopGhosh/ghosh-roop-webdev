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
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;
        vm.userId = $routeParams['uid'];
        function init() {
            vm.page = PageService.getPageById(pageId);
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
            var userId = $routeParams.uid;
            var websiteId = $routeParams['wid'];
            vm.addPage = addPage;
            function init() {
                console.log("PagecontrollerNew init");
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