module.exports = function (app,model) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];



    app.get("/api/user/:uid/website",getWebsiteByUserId);
    app.get("/api/user/:uid/website/:wid",getWebsiteById);
    app.put("/api/user/:uid/website/:wid",updateWebsite);
    app.delete("/api/user/:uid/website/:wid",deleteWebsite);
    app.post("/api/user/:uid/website/new",addWebsite);

    function getWebsiteByUserId(req,res){
        var userid = req.params.uid;
        model.websiteModel.findWebsiteByUserId(userid)
            .then(
                function (body) {
                    res.send(body);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getWebsiteById(req,res){
        var websiteId = req.params.wid;
        model.websiteModel.findWebsiteById(websiteId)
            .then(
                function (body) {
                    res.send(body);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
        /*for(w in websites){
            if(websites[w]._id === websiteId){
                return res.status(200).send(websites[w]);
            }
        }
        return res.status(400).send(null);*/
    }

    function deleteWebsite(req,res){
        var websiteId = req.params.wid;
        model.websiteModel.deleteWebsite(websiteId)
            .then(
                function (body) {
                    res.send(body);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
        /*for(w in websites){
            if(websites[w]._id === websiteId){
                websites.splice(w,1);
                return res.status(200);
            }
        }
        return res.status(400);*/
    }

    function updateWebsite(req,res){
        var website = req.body;
        var websiteId = req.params.wid;
        model.websiteModel.updateWebsite(websiteId,website)
            .then(
                function (body) {
                    res.send(body);
                },
                function (error){
                    res.sendStatus(400).send(error);
                }
            );
        /*var description = website.description;
        for(w in websites){
            if(websites[w]._id === websiteId){
                var website = {_id:websites[w]._id,name:name,developerId:websites[w].developerId};
                websites[w]=website;
                return res.status(200).send(website[w]);
            }
        }
        return res.status(400);*/
    }

    function addWebsite(req,res) {
        var website = req.body;
        var name = website.name;
        var developerId= req.params.uid;
        var website = {name:name};
        model.websiteModel.createWebsite(developerId,website)
            .then(
                function (websiteObj) {
                    websiteObj._user = developerId;
                    websiteObj.save();
                    res.send(websiteObj);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
}