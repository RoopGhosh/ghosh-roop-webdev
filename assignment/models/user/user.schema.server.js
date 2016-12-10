module.exports = function () {
  var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
       username : String,
        password : String,
        firstName: String,
        lastName : String,
        email:String,
        google: {
            id:    String,
            token: String,
        }

    },{collection:"user"});
    return UserSchema;
};