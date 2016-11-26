module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"},
        name : String
    },{collection:"website"});
    return WebsiteSchema;
}