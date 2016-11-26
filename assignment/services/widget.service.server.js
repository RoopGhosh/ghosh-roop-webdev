module.exports = function (app,model) {
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
        model.widgetModel.delete(id)
            .then(
                function (response){
                  res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*var count = widgets.length;
        for(w in widgets){
            if(widgets[w]._id===id){
                widgets.splice(w,1);
            }
        }
        if(count>widgets.length){
            return res.send(200);
        }else{
            return res.send(400);
        }*/
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
                if(count==start){
                    spliceStart = w;
                }
                if(count==end){
                    spliceEnd= w;
                }
                count++;
            }
        }

         widgets.splice(spliceEnd,0,widgets.splice(spliceStart,1)[0]);
        return res.send(200);
    }

    function findWidgetsByPageId(req,res){
        var pid = req.params['pid'];
        model.widgetModel.getWidgetByPageId(pid)
            .then(
                function (response) { //diff btw empty response and actual data >TBD
                    res.send(response);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
/*
        var arr = [];
        for(w in widgets){
            if(widgets[w].pageId === pid){
                arr.push(widgets[w]);
            }
        }
        return res.status(200).send(arr);*/
    }

    function findWidgetById(req,res){
        var wgid = req.params['wgid'];
        model.widgetModel.getWidgetById(wgid)
            .then(
                function (response) {
                    res.send(response);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
       /* for(w in widgets){
            if(widgets[w]._id=== wgid){
                return res.status(200).send(widgets[w]);
            }
        }
        return res.status(400).send(null);*/
    }

    function addWidget(req,res){
        var obj = req.body;
        var widget;
        switch(obj.widgetType) {
            case "HEADER":
                widget = {"widgetType": "HEADER", "size": 2, "text": ""};
                break;
            case "YOUTUBE":
                widget = {"widgetType": "YOUTUBE",  "width": "100%",
                    "url": "" };
                break;
            case "HTML":
                widget = {"widgetType": "HTML","text": ""};
                break;
            case "IMAGE":
                widget = {"widgetType": "IMAGE", "width": "100%",
                    "url": ""};
                break;
        }
        model.widgetModel.createWidget(widget)
            .then(
                function (response) {
                    response._page = obj.pid;
                    response.save();
                    res.send(response);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*widgets.push(widget);
        return res.status(200).send(widget);*/
    }

    function updateWidget(req,res){
        var obj = req.body;
        var widget;
        switch(obj.widgetType) {
            case "HEADER":
                widget = {"widgetType": "HEADER", "pageId": obj.pid, "size": obj.size, "text": obj.text};
                break;
            case "YOUTUBE":
                widget = {"widgetType": "YOUTUBE", "pageId": obj.pid, "width": obj.size,
                    "url": obj.text};
                break;
            case "HTML":
                widget = {"widgetType": "HTML", "pageId": obj.pid, "text": obj.text};
                break;
            case "IMAGE":
                widget = {"widgetType": "IMAGE", "pageId": obj.pid, "width": obj.size,
                    "url": obj.text};
                break;
        }
        model.widgetModel.updateWidget(obj._id,widget)
            .then(
                function (response) {
                    res.send(response);
                },
                function (error) {
                    res.sendStatus(400).send(200);
                }
            );
                /*widgets[w]=widget;
                return res.status(200).send(widget);
    return res.status(400).send(null);  */
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
        var widget = {
            url : '/assignment/images/uploads/' + filename,
            width :width,
            name :name,
            widgetType:"IMAGE"
        };
        model.widgetModel.updateWidget(widgetId,widget)
            .then(
                function (response) {
                    var url = "/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
                    res.redirect(url);
                    return;
                },
                function (error) {
                    res.sendStatus(400).send(200);
                }
            );
    }
}