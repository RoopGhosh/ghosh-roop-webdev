module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page:{type:mongoose.Schema.Types.ObjectId,ref:"PageModel"},
        widgetType:String,
        size:Number,
        text:String,
        width:String,
        url:String,
        order:{type:Number,default: 0},
        rows:Number,
        formatted:Boolean,
        placeholder:String
    },{collection:"widget"});
    return WidgetSchema;
}