(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs:"model",
                factory:"UserService"
            })

            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs:"model",
                factory:"UserService"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs:"model",
                factory:"UserService",
                resolve:{
                    checkLogin:checkLogin
                }
            })
            .when("/user/", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                factory:"UserService",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteControllerList",
                controllerAs:"model",
                factory:"WebsiteService"
            })

            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "WebsiteControllerNew",
                controllerAs:"model",
                factory:"WebsiteService"
            })

            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "WebsiteControllerEdit",
                controllerAs:"model",
                factory:"WebsiteService"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageControllerList",
                controllerAs:"model",
                factory:"PageService"
            })

            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "PageControllerNew",
                controllerAs:"model",
                factory:"PageService"
            })

            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "PageControllerEdit",
                controllerAs:"model",
                factory:"PageService"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetControllerList",
                controllerAs:"model",
                factory:"WidgetService"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "WidgetControllerChooser",
                controllerAs:"model",
                factory:"WidgetService"
            })


            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "WidgetControllerEdit",
                controllerAs:"model",
                factory:"WidgetService"
            })
            .otherwise({
                redirectTo:"/login"
            });


        function checkLogin($q,UserService,$location) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(
                    function (user) {
                        if(user!=0){
                            deferred.resolve();
                        }else{
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }

        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        };
    }
})();