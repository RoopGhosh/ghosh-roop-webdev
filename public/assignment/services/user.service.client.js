/**
 * Created by roopghosh on 10/13/16.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);
    
    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            findUserbyCredentials:findUserbyCredentials,
            findUserbyUserId:findUserbyUserId,
            addUser:addUser
        }
        return api;

        function findUserbyCredentials(username,password) {
            for(user in users){
                if(users[user].username===username && users[user].password===password){
                    return users[user];
                }
            }
        }
        function findUserbyUserId(userId) {
            console.log("finduserbyuserID: "+ userId);
            for(user in users){
                if(users[user]._id===userId){
                    return users[user];
                }
            }
        }

        function addUser(username, password) {
            var temp = Number.MIN_VALUE;
            for(u in users){
                if(users[u]._id>temp){
                    temp = users[u]._id;
                }
            }
            var user = {_id:++temp+'',username:username,password:password,firstName:username+temp,lastName:username+temp};
            users.push(user);
            return user;
        }
    }
})();