module.exports = function (app) {
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
        var list=[];
        for(w in websites){
            if(websites[w].developerId === userid){
                list.push(websites[w]);
            }
        }
        return res.status(200).send(list);
    }

    function getWebsiteById(req,res){
        var websiteId = req.params.wid;
        for(w in websites){
            if(websites[w]._id === websiteId){
                return res.status(200).send(websites[w]);
            }
        }
        return res.status(400).send(null);
    }

    function deleteWebsite(req,res){
        var websiteId = req.params.wid;
        for(w in websites){
            if(websites[w]._id === websiteId){
                websites.splice(w,1);
                return res.status(200);
            }
        }
        return res.status(400);
    }

    function updateWebsite(req,res){
        var website = req.body;
        var websiteId = req.params.wid;
        var name = website.name;
        var description = website.description;
        for(w in websites){
            if(websites[w]._id === websiteId){
                var website = {_id:websites[w]._id,name:name,developerId:websites[w].developerId};
                websites[w]=website;
                return res.status(200).send(website[w]);
            }
        }
        return res.status(400);
    }

    function addWebsite(req,res) {
        var website = req.body;
        var name = website.name;
        var developerId= req.params.uid;
        var temp = Number.MIN_VALUE;
        for(w in websites){
            if(websites[w]._id>temp){
                temp = websites[w]._id;
            }
        }
        var website = {_id:++temp+'',name:name,developerId:developerId};
        websites.push(website);
        return res.status(200).send(website);
    }
}