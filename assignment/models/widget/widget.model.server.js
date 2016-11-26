module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel",WidgetSchema);

    var api = {
        createWidget:createWidget,
        getWidgetByPageId:getWidgetByPageId,
        getWidgetById:getWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget
    }
    return api;

    function createWidget(widget) {
        return WidgetModel.create(widget);
    }
    function getWidgetByPageId(id) {
        return WidgetModel.find({
            _page:id
        });
    }

    function getWidgetById(id) {
        return WidgetModel.findOne({_id:id});
    }

    function updateWidget(id,widget) {
        if(widget.widgetType=='HEADER'|| widget.widgetType=='TEXT'){
            return WidgetModel.update(
                {
                    _id:id
                },
                {
                    name:widget.name,
                    size:widget.size,
                    text:widget.text
                }
            );
        }
        if(widget.widgetType=='IMAGE'|| widget.widgetType=='YOUTUBE'){
            return WidgetModel.update(
                {
                    _id:id
                },
                {
                    name:widget.name,
                    width:widget.width,
                    url:widget.url
                }
            );
        }
        if(widget.widgetType=='HTML') {
            return WidgetModel.update(
                {
                    _id:id
                },
                {
                    name:widget.name,
                    text:widget.text
                }
            );
        }
    }

    function deleteWidget(id) {
        return WidgetModel.remove({
            _id:id
        });
    }
}