/**
 * Created by roopghosh on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetControllerList",WidgetControllerList)
        .controller("WidgetControllerEdit",WidgetControllerEdit)
        .controller("WidgetControllerChooser",WidgetControllerChooser)


    function WidgetControllerList($routeParams,WidgetService,$sce) {
        var vm = this;
        vm.pid = $routeParams['pid'];
        vm.uid = $routeParams['uid'];
        vm.wid= $routeParams['wid'];
        vm.safeHtml = safeHtml;
        vm.safeUrl = safeUrl;
        vm.safeUrlImage = safeUrlImage;
        function init(){
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }
        init();
        function safeHtml(text){
            return $sce.trustAsHtml(text);
        }
        function safeUrl(url){
            var youtube = url.split("/");
            return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+youtube[youtube.length-1]);
        }
        function safeUrlImage(url){
            return $sce.trustAsResourceUrl(url);
        }
    }

    function WidgetControllerEdit($routeParams,WidgetService) {
        var vm = this;
        vm.pid = $routeParams['pid'];
        vm.uid = $routeParams['uid'];
        vm.wid= $routeParams['wid'];
        function init(){
            vm.widget = WidgetService.findWidgetById(vm.wid);
        }
        init();
    }
    function WidgetControllerChooser($routeParams,WidgetService) {
        var vm = this;

    }

})();
