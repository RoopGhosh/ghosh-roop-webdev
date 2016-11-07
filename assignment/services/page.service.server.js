module.exports = function (app) {
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
        var arr = [];
        for(p in pages){
            if(pages[p].websiteId ===  wid){
                arr.push(pages[p]);
            }
        }
        return res.status(200).send(arr);
    }

    function getPageById(req,res) {
        var pid = req.params['pid'];
        for(p in pages){
            if(pages[p]._id === pid){
                return res.status(200).send(pages[p]);
            }
        }
        return res.status(400).send(null);
    }

    function updatePage(req,res) {
        var pid = req.params['pid'];
        var page = req.body;
        for(w in pages){
            if(pages[w]._id === pid){
                var mainPage = {_id:pages[w]._id,name:page.name,websiteId:pages[w].websiteId};
                pages[w]=mainPage;
                return res.status(200).send(mainPage );
            }
        }
        return res.status(400).send(null);
    }

    function deletePage(req,res){
    var pid = req.params['pid'];
        for(p in pages){
            if(pages[p]._id === pid){
                pages.splice(p,1);
                return res.send(200);
            }
        }
    return res.send(400);
    }

    function addPage(req,res) {
        var page = req.body;
        var websiteId = req.params['wid'];
        var temp = Number.MIN_VALUE;
        for(w in pages){
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
        }
    }
}