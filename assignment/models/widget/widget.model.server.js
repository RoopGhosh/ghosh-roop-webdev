module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel",WidgetSchema);

    var api = {
        createWidget:createWidget,
        getWidgetByPageId:getWidgetByPageId,
        getWidgetById:getWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        findOrderByIdAndOrder:findOrderByIdAndOrder,
        updateOrder:updateOrder,
        findWidgetsGreaterThanOrder:findWidgetsGreaterThanOrder,
        findWidgetSmallerThanOrder:findWidgetSmallerThanOrder
        
    }
    return api;

    function findWidgetsGreaterThanOrder(pid,end) {
        return WidgetModel.find(
        {
            _page:pid,
            order:{$lt:end+1}
        }
        );
    }
    
    function findWidgetSmallerThanOrder(pid,end) {
        return WidgetModel.find(
            {
                _page:pid,
                order:{$gt:end-1}
            }
        );
    }
    
    function updateOrder(id,end) {
        return WidgetModel.update(
            {
                _id: id
            },
            {
                order:end
            }
        );
    }

    function findOrderByIdAndOrder(pid,start){
        return WidgetModel.findOne({_page:pid,order:start});
    }

    function createWidget(widget) {
        return WidgetModel.create(widget);
    }
    function getWidgetByPageId(id) {
        return WidgetModel.find({
            _page:id
        }).sort('order');
    }

    function getWidgetById(id) {
        return WidgetModel.findOne({_id:id});
    }

    function updateWidget(id,widget) {
        if(widget.widgetType=='HEADER'){
            return WidgetModel.update(
                {
                    _id:id
                },
                {
                    name:widget.name,
                    size:widget.size,
                    text:widget.text,
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
                    url:widget.url,
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
                    text:widget.text,
                }
            );
        }
        if(widget.widgetType=='TEXT') {
            return WidgetModel.update(
                {
                    _id:id
                },
                {
                    text:widget.text,
                    rows:widget.rows,
                    placeholder:widget.placeholder,
                    formatted:widget.formatted
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