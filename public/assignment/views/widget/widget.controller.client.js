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

    function WidgetControllerEdit($routeParams,WidgetService,$location) {
        var vm = this;
        vm.pid = $routeParams['pid'];
        vm.uid = $routeParams['uid'];
        vm.wid= $routeParams['wid'];
        vm.wgid= $routeParams['wgid'];
        vm.widgetType = $routeParams['widgetType'];
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }
        init();
    }

    function WidgetControllerChooser($routeParams,WidgetService,$location) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.clickItem = clickItem;
        function init(){

        }
        init();
        function clickItem(widgetType) {
            var item = WidgetService.addWidget(widgetType,vm.pid);
            if(item!=null){
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+item._id);
            }else{
                //todo
            }
        }
    }

})();
