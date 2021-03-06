module.exports = function () {

   
    //var mongoose = require('mongoose');
    var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL|| 'mongodb://127.0.0.1:27017/wam-fall-2016';
    //mongoose.connect(connectionString);
    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel= require("./page/page.model.server")();
    var widgetModel= require("./widget/widget.model.server")();


    var model = {
        userModel : userModel,
        websiteModel:websiteModel,
        pageModel:pageModel,
        widgetModel:widgetModel
    };
    return model;
};
