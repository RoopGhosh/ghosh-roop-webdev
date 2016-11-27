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
           WidgetService.findWidgetsByPageId(vm.pid,vm.uid,vm.wid)
               .success(function (response){
                   vm.widgets= response;
               })
               .error(function (error) {
                   console.log(error);
               });
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
        vm.updateWidget =updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.widgetType = $routeParams['widgetType'];
        function init() {
            WidgetService.findWidgetById(vm.wid,vm.uid,vm.pid,vm.wgid)
                .success(function (res) {
                    vm.widget = res;
                })
                .error(function (error) {
                    console.log(error);
                });
        }
        init();
        function updateWidget(id,widgetType,obj,size) {
            WidgetService.updateWidget(id,widgetType,obj,size,vm.pid,vm.uid,vm.wid)
                .success(function (res){
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                })
                .error(function (error) {
                    console.log(error);
                });
        }

        function  deleteWidget() {
            WidgetService.deleteWidget(vm.pid,vm.uid,vm.wid,vm.wgid)
                .success(function(){
                    console.log("here");
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                })
                .error(function (error) {
                    console.log("error");
                    console.log(error);
                });
        }
    }

    function WidgetControllerChooser($routeParams,WidgetService,$location) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];
        vm.count = $routeParams['size'];
        vm.clickItem = clickItem;
        function init(){

        }
        init();
        function clickItem(widgetType) {
           WidgetService.addWidget(widgetType,vm.pid,vm.uid,vm.wid,vm.count)
               .success(function (res) {
                   var item = res;
                   $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+item._id);
               })
               .error(function (error) {
                   console.log(error);
               });
        }
    }

})();
