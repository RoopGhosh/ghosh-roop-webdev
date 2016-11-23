module.exports = function (app,model) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.get("/api/user/:uid/website/:wid/page",getPageByWebsiteId);
    app.get("/api/user/:uid/website/:wid/page/:pid",getPageById);
    app.put("/api/user/:uid/website/:wid/page/:pid",updatePage);
    app.delete("/api/user/:uid/website/:wid/page/:pid",deletePage);
    app.post("/api/user/:uid/website/:wid/page/new",addPage);

    function getPageByWebsiteId(req,res) {
        var wid = req.params['wid'];
        model.pageModel.findPagebyWebsiteId(wid)
            .then(
                function (body) {
                    res.send(body);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        /*
        var arr = [];
        for(p in pages){
            if(pages[p].websiteId ===  wid){
                arr.push(pages[p]);
            }
        }
        return res.status(200).send(arr);*/
    }

    function getPageById(req,res) {
        var pid = req.params['pid'];
        model.pageModel.findPageById({_id:pid})
            .then(
                function (body) {
                    res.send(body);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        /*for(p in pages){
            if(pages[p]._id === pid){
                return res.status(200).send(pages[p]);
            }
        }
        return res.status(400).send(null);*/
    }

    function updatePage(req,res) {
        var pid = req.params['pid'];
        var page = req.body;

        model.pageModel.updatePage(pid,page)
            .then(
                function (body) {
                    res.send(body);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*for(w in pages){
            if(pages[w]._id === pid){
                var mainPage = {_id:pages[w]._id,name:page.name,websiteId:pages[w].websiteId};
                pages[w]=mainPage;
                return res.status(200).send(mainPage );
            }
        }
        return res.status(400).send(null);*/
    }

    function deletePage(req,res){
    var pid = req.params['pid'];
        model.pageModel.deletePage(pid)
            .then(
                function (body) {
                    res.send(body);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*for(p in pages){
            if(pages[p]._id === pid){
                pages.splice(p,1);
                return res.send(200);
            }
        }
    return res.send(400);*/
    }

    function addPage(req,res) {
        var page = req.body;
        var websiteId = req.params['wid'];
        model.pageModel.createPage(page)
            .then(
                function (obj) {
                    obj._website = websiteId;
                    obj.save();
                    res.send(obj);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        /*for(w in pages){
            if(pages[w]._id>temp){
                temp = pages[w]._id;
            }
        }
        var mainPage = {_id:++temp+'',name:page.name,websiteId:websiteId};
        var num = pages.length;
        pages.push(mainPage);
        if(pages.length>num) {
            return res.status(200).send(mainPage);
        }else{
            return res.status(400).send(null);
        }*/
    }
}