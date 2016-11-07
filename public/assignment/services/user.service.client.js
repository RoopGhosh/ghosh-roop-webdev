/**
 * Created by roopghosh on 10/13/16.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);
    
    function UserService($http) {
        var api = {
            findUserbyCredentials:findUserbyCredentials,
            findUserbyUserId:findUserbyUserId,
            addUser:addUser,
            updateUser:updateUser,
            deleteUser:deleteUser
        }
        return api;


        function  deleteUser(userId) {
            return $http.delete("/api/user/"+userId);
        }
        function updateUser(user) {
            return $http.put("/api/user/",user);
        }

        function findUserbyCredentials(username,password) {
            var user = {
                username: username,
                password : password
            };
            return $http.post("/api/user/",user);
        }

        function findUserbyUserId(userId) {
            return $http.get("/api/user/"+userId);
        }

        function addUser(username, password) {
            var user = {username : username,password:password};
            return $http.post("/api/user/new",user);
        }
    }
})();