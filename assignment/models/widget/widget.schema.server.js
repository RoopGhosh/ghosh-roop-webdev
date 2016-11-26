module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page:{type:mongoose.Schema.Types.ObjectId,ref:"PageModel"},
        name : String,
        widgetType:String,
        size:Number,
        text:String,
        width:String,
        url:String
    },{collection:"widget"});
    return WidgetSchema;
}