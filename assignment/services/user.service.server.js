module.exports = function (app,model) {
  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];
    app.get("/api/user/:uid",findUserbyUserId);
    app.post("/api/user",findUserbyCredentials);
    app.put("/api/user",updateUser);
    app.delete("/api/user/:uid",deleteUser);
    app.post("/api/user/new",addUser);


    function  addUser(req,res) {
        var user = req.body;
        var mainuser= {username:user.username,password:user.password,firstName:user.username,lastName:user.username};
        model.userModel.createUser(mainuser)
            .then(
                function (user) {
                    res.send(user._id);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req,res) {
        var user = req.body;
        model.userModel.updateUser(user._id,user)
            .then(
                function (body) {
                    res.send();
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteUser(req,res) {
        var uid= req.params['uid'];
        model.userModel.deleteUser(uid)
            .then(
                function (body) {
                    res.send(body)
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserbyUserId(req, res) {
      var uid = req.params['uid'];

        model.userModel.findUserById(uid)
            .then(
                function (body) {
                    res.send(body);
                },
                function (error) {
                  res.sendStatus(400).send(error);
                }
            );
    }

    function findUserbyCredentials(req,res) {
        var user  = req.body;
        var username = user.username;
        var password = user.password;
        model.userModel.findUserbyCredentials(username,password)
            .then(
                function (body) {
                    if(body){
                        res.send(body)
                    }else{
                        res.sendStatus(404).send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

};
