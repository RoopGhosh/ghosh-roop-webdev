module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel =  mongoose.model("UserModel",UserSchema);

    var api = {
        createUser : createUser,
        findUserById:findUserById,
        findUserbyCredentials:findUserbyCredentials,
        deleteUser:deleteUser,
        updateUser:updateUser
    }
    return api;

    function findUserById(id) {
        return UserModel.findById(id);
    }
    function createUser(user) {
        return UserModel.create(user);
    }
    function findUserbyCredentials(username,password) {
        return UserModel.findOne({username:username,password:password});
    }
    function deleteUser(id) {
        return UserModel.remove({_id:id});
    }
    function updateUser(id,user) {
         return UserModel.update(
            {
                _id:id
            },
            {
                firstName:user.firstName,
                lastName:user.lastName
            }
        );
    }
};