module.exports = function (app) {
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
        var temp = Number.MIN_VALUE;
        for(u in users){
            if(users[u]._id>temp){
                temp = users[u]._id;
            }
        }
        temp++;
        var mainuser= {_id:temp+'',username:user.username,password:user.password,firstName:user.username+temp,lastName:user.username+temp};
        users.push(mainuser );
        return res.status(200).send(mainuser._id);
    }

    function updateUser(req,res) {
        var user = req.body;
        for(u in users){
            if(users[u].username == user.username){
                users[u] = user;
                return res.status(200).send(user);
            }
        }
        return res.status(400).send("user not found");
    }


    function deleteUser(req,res) {
        var uid= req.params['uid'];
        for(u in users){
            if(users[u]._id == uid){
                users.splice(u,1);
                return res.status(200).send(users[u]);
            }
        }
        return res.status(400).send("user not found");
    }

    function findUserbyUserId(req, res) {
      var uid = req.params['uid'];
      for(var u in users){
        if(users[u]._id==uid){
          return res.send(users[u]);
        }
      }
      return res.status(400).send("user not there findUserByID");
    }

    function findUserbyCredentials(req,res) {
        var user  = req.body;
      var username = user.username;
      var password = user.password;
      for(var u in users){
        if(users[u].username===username && users[u].password===password){
          return res.send(users[u]);
        }
      }
      return res.send(null);
    }

};
