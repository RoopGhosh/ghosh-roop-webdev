/**
 * Created by roopghosh on 10/17/16.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService)

    function WidgetService($http) {

        var api = {
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            addWidget:addWidget,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            sort : sort
        }
        return api;


        function deleteWidget(pid,uid,wid,wgid){
            return $http.delete("/api/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+wgid);
        }

        function sort(start,end,pid){
            return $http.put("/api/"+pid+"/widgetsort?START="+start+"&END="+end);
        }
        function findWidgetsByPageId(pid,uid,wid) {
            return $http.get("/api/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/");
        }

        function findWidgetById(wid,uid,pid,wgid) {
           return $http.get("/api/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+wgid);
        }

        function addWidget(widgetType,pid,uid,wid) {
            var widget = { "widgetType": widgetType, "pid": pid};
            return $http.post("/api/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/new",widget);
        }

        function updateWidget(id,widgetType,obj,size,pid,uid,wid) {
            var widget = { "_id": id, "widgetType": widgetType, "pid": pid, "size": size, "text": obj};
            return $http.put("/api/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget/"+id,widget);
        }
    }
})();