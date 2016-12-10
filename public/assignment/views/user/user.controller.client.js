(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)
        .controller("ProfileController",ProfileController)
        .controller("RegisterController",RegisterController)

    function LoginController($routeParams,$location,UserService,$rootScope){
        var userId = $routeParams['uid'];
        var vm = this;
        vm.login =  function login(username, password){
            var user  = {username:username,password:password};
            UserService
                .login(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    },
                    function (error) {
                        vm.error= "username , password combination mismatch";
                    }
                );

        }
    }

    function ProfileController($location,$routeParams,UserService,$rootScope) {
        var userid = $routeParams['uid'];
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        function init(){
            var promise = UserService.findCurrentUser()
                .success(function(user){
                    if(user != '0') {
                        vm.user = user;
                    }
                })
                .error(function(){

                });
        }
        init();
        function updateUser(user){
            var promise = UserService.updateUser(user);
            promise
                .success(function(res){
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

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    }
                )
        }
    }

    function RegisterController($routeParams,$location,UserService,$rootScope){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.register =  register;
        function register(username, password){
            if(username ==null || password==null){
                vm.error = "please fill in all the details";
                return;
            }
            var promise = UserService.addUser(username,password);
            promise
                .success(function(response){
                    var user = response;
                    $rootScope.currentUser = user;
                    $location.url("/user/"+user._id);
                })
                .error(function (response) {
                    console.log(response);
                });
        }
    }

})();