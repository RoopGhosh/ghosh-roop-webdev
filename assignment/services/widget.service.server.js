module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/images/uploads' });
    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ]

    app.get("/api/user/:uid/website/:wid/page/:pid/widget",findWidgetsByPageId);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/:wgid",findWidgetById);
    app.post("/api/user/:uid/website/:wid/page/:pid/widget/new",addWidget);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget/:wgid",updateWidget);
    app.delete("/api/user/:uid/website/:wid/page/:pid/widget/:wgid",deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put ("/api/:pid/widgetsort", sortWidget);


    function deleteWidget(req,res){
        var id = req.params.wgid;
        var count = widgets.length;
        for(w in widgets){
            if(widgets[w]._id===id){
                widgets.splice(w,1);
            }
        }
        if(count>widgets.length){
            return res.send(200);
        }else{
            return res.send(400);
        }
    }

    function sortWidget(req,res) {
        var start = req.query.START;
        var end = req.query.END;
        var pid = req.params.pid;
        var count = 0;
        var spliceStart;
        var spliceEnd;
        for(w in widgets){
            if(widgets[w].pageId === pid){
                count++;
            }
            if(count==start){
                spliceStart = count;
            }
            if(count==end){
                spliceEnd= count;
            }
        }

        widgets.splice(spliceEnd,0,widgets.splice(spliceStart,1)[0]);
        return res.send(200);
    }

    function findWidgetsByPageId(req,res){
        var pid = req.params['pid'];
        var arr = [];
        for(w in widgets){
            if(widgets[w].pageId === pid){
                arr.push(widgets[w]);
            }
        }
        return res.status(200).send(arr);
    }

    function findWidgetById(req,res){
        var wgid = req.params['wgid'];
        for(w in widgets){
            if(widgets[w]._id=== wgid){
                return res.status(200).send(widgets[w]);
            }
        }
        return res.status(400).send(null);
    }

    function addWidget(req,res){
        var obj = req.body;
        var temp = Number.MIN_VALUE;
        for(w in widgets){
            if(widgets[w]._id>temp){
                temp = widgets[w]._id;
            }
        }
        temp++;
        var widget;
        switch(obj.widgetType) {
            case "HEADER":
                widget = { "_id": temp+'', "widgetType": "HEADER", "pageId": obj.pid+'', "size": 2, "text": ""};
                break;
            case "YOUTUBE":
                widget = { "_id": temp+'', "widgetType": "YOUTUBE", "pageId": obj.pid+'', "width": "100%",
                    "url": "" };
                break;
            case "HTML":
                widget = { "_id": temp+'', "widgetType": "HTML", "pageId": obj.pid+'', "text": ""};
                break;
            case "IMAGE":
                widget = { "_id": temp+'', "widgetType": "IMAGE", "pageId": obj.pid+'', "width": "100%",
                    "url": ""};
                break;
        }
        widgets.push(widget);
        return res.status(200).send(widget);
    }

    function updateWidget(req,res){
        var obj = req.body;
        var widget;
        for(w in widgets){
            if(widgets[w]._id===obj._id){
                switch(obj.widgetType) {
                    case "HEADER":
                        widget = { "_id": obj._id, "widgetType": "HEADER", "pageId": obj.pid, "size": obj.size, "text": obj.text};
                        break;
                    case "YOUTUBE":
                        widget = { "_id": obj._id, "widgetType": "YOUTUBE", "pageId": obj.pid, "width": obj.size,
                            "url": obj.text};
                        break;
                    case "HTML":
                        widget = { "_id": obj._id, "widgetType": "HTML", "pageId": obj.pid, "text": obj.text};
                        break;
                    case "IMAGE":
                        widget = { "_id": obj._id, "widgetType": "IMAGE", "pageId": obj.pid, "width": obj.size,
                            "url": obj.text};
                        break;
                }
                widgets[w]=widget;
                return res.status(200).send(widget);
            }
        }
        return res.status(400).send(null);
    }


    function uploadImage(req, res) {
        var widgetId = req.body.wgid;
        var userId = req.body.uid;
        var websiteId = req.body.wid;
        var pageId = req.body.pid;
        var myFile = req.file;
        var width = req.body.width;
        var name = req.body.name;
        var description = req.body.description;
        var filename = myFile.filename;     // new file name in upload folder
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === widgetId) {
                widget.url = '/assignment/images/uploads/' + filename;
                widget.width = width;
                widget.name = name;
                widget.description = description;
                var url = "/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
                res.redirect(url);
                return;
            }
        }
    }
}