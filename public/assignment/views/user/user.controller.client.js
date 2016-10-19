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
            var user = UserService.findUserbyCredentials(username,password);
            if(user == null){
                vm.error = "no valid user";
            }else{
                $location.url("/user/"+user._id);
            }
        }
    }

    function ProfileController($routeParams,UserService) {
        var userid = $routeParams['uid'];
        var vm = this;
        vm.user = UserService.findUserbyUserId(userid);
    }

    function RegisterController($routeParams,$location,UserService){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.register =  register;
        function register(username, password){
            var user = UserService.addUser(username,password);
            $location.url("/user/"+user._id);
        }
    }

})();