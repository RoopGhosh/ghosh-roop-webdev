module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        _website:{type:mongoose.Schema.Types.ObjectId,ref:"WebsiteModel"},
        name : String
    },{collection:"page"});
    return PageSchema;
}