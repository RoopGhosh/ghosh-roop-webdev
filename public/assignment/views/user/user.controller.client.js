(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)
        .controller("ProfileController",ProfileController)
        .controller("RegisterController",RegisterController)

    function LoginController($routeParams,$location,UserService){
        var userId = $routeParams['uid'];
        var vm = this;
        vm.login =  function login(username, password){
            var promise = UserService.findUserbyCredentials(username,password);
            promise
                .success(function(user){
                    $location.url("/user/"+user._id);
                })
                .error(function() {
                    vm.error = "no valid user";
                });
        }
    }

    function ProfileController($location,$routeParams,UserService) {
        var userid = $routeParams['uid'];
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        function init(){
            var promise = UserService.findUserbyUserId(userid);
            promise
                .success(function(user){
                    vm.user = user
                })
                .error(function(error) {
                    console.log(error);
                });
        }
        init();
        function updateUser(user){
            var promise = UserService.updateUser(user);
            promise
                .success(function(user){
                    $location.url("/user/"+user._id);
                })
                .error(function(body) {
                    vm.error = "no valid user";
                });
        }

        function deleteUser(userid) {
            UserService.deleteUser(userid)
                .success(function () {
                    $location.url("/login");
                })
                .error(function (response) {
                    console.log(response);
                    vm.error= "could not delete user";
                    $location.url("/login");
                });
        }
    }

    function RegisterController($routeParams,$location,UserService){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.register =  register;
        function register(username, password){
            var promise = UserService.addUser(username,password);
            promise
                .success(function(userid){
                    $location.url("/user/"+userid);
                })
                .error(function (response) {
                    console.log(response);
                });
        }
    }

})();