module.exports = function (app,model) {


    var passport      = require('passport');
    var LocalStrategy    = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');
    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get("/api/user/:uid",findUserbyUserId);
    //app.post("/api/user",passport.authenticate('local'),findUserbyCredentials);
    app.put("/api/user",updateUser);
    app.get("/api/user",findCurrentUser);
    app.delete("/api/user/:uid",deleteUser);
    app.post("/api/user/new",addUser);
    app.post("/api/checkLogin",checkLogin);
    app.post("/api/logout",logout);
    app.get ('/api/loggedin', loggedin);
    app.get("/auth/google/callback",
        passport.authenticate('google', {
            successRedirect: '/assignment/#/user/',
            failureRedirect: '/assignment/#/login'
        }));

    var googleConfig = {
        clientID     : process.env.clientID||'386397546436-p05skr626rqua6lm3ht7la1ibniecebu.apps.googleusercontent.com',
        clientSecret : process.env.clientSecret||'wYd4R_LuiBQxGq-hgxrYkr_J',
        callbackURL  : process.env.callbackURL||'http://localhost:3000/auth/google/callback'
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    /*function googleStrategy(token, refreshToken, profile, done) {
        var username = profile.emails[0].value.split("@")[0];
        var password = profile.id;
        model.userModel.findUserByGoogleId(username)
       /!* model.userModel.findUserbyCredentials(username,password)
            .then(
                function(user){
                    if(user){
                        refreshToken
                    }else{
                        //create user
                        var user = {
                            username:profile.emails?profile.emails[0].value.split("@")[0]:"",
                            password:profile.id,
                            firstname:profile.name.givenName,
                            lastname:profile.name.familyName
                        }
                        return model.userModel.createUser(user);
                    }
                },
                function (error) {
                    done(error);
                }
            )
            /!*.then(
                function (user) {
                    return done(null,user);
                },
                function (error) {
                    done(error);
                }
            );*!/!*!/
    }*/


    function findCurrentUser(req,res) {
            var params = req.params;
            var query = req.query;
            if(query.password && query.username) {
                findUserByCredentials(req, res);
            } else if(query.username) {
                findUserByUsername(req, res);
            } else {
                res.json(req.user);
            }
    }

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        model.userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser)
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }




        function logout(req,res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function checkLogin(req,res) {
         res.send(req.isAuthenticated()?req.user:'0');
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    function localStrategy(username,password,done) {
    model.userModel.findUserbyCredentials(username,password)
        .then(
            function (user) {
                if(user){
                    return done(null,user);
                    //res.send(body)
                }else{
                    return done(null,false);
                    //res.sendStatus(404).send('0');
                }
            },
            function (error) {
                if (error) { return done(error); }
            }
        );
}

    function findUserbyCredentials(req,res) {
        var user = req.user;
        res.json(user);
    }
    function  addUser(req,res) {
        var user = req.body;
        var mainuser= {username:user.username,password:user.password,firstName:user.username,lastName:user.username};
        model.userModel.createUser(mainuser)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
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

};
