/**
 * Created by roopghosh on 10/17/16.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService)

    function WidgetService() {
            var widgets=[
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ]

        var api = {
            findWidgetsByPageId:findWidgetsByPageId,
            findWidgetById:findWidgetById,
            addWidget:addWidget
        }
        return api;

        function findWidgetsByPageId(pid) {
            var arr = [];
            for(w in widgets){
                if(widgets[w].pageId === pid){
                    arr.push(widgets[w]);
                }
            }
            return arr;
        }

        function findWidgetById(wid) {
            for(w in widgets){
                if(widgets[w]._id===wid){
                    return widgets[w];
                }
            }
            return null;
        }

        function addWidget(widgetType,pid) {
            var temp = Number.MIN_VALUE;
            for(w in widgets){
                if(widgets[w]._id>temp){
                    temp = widgets[w]._id;
                }
            }
            temp++;
            var widget;
            switch(widgetType) {
                case "HEADER":
                widget = { "_id": temp+'', "widgetType": "HEADER", "pageId": pid+'', "size": 2, "text": ""};
                    break;
                case "YOUTUBE":
                    widget = { "_id": temp+'', "widgetType": "YOUTUBE", "pageId": pid+'', "width": "100%",
                        "url": "" };
                    break;
                case "HTML":
                widget = { "_id": temp+'', "widgetType": "HTML", "pageId": pid+'', "text": ""};
                    break;
                case "IMAGE":
                    widget = { "_id": temp+'', "widgetType": "IMAGE", "pageId": pid+'', "width": "100%",
                        "url": ""};
                    break;
            }
            widgets.push(widget);
            return widget;
        }
    }
})();