module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server.js')();

    var userModel = mongoose.model('User', userSchema);

    var api = {
        "createUser": createUser,
        "findUserById": findUserById,
        "findUserByUsername": findUserByUsername,
        "findUserByCredentials": findUserByCredentials,
        "findUserByFacebookId": findUserByFacebookId,
        "updateUser": updateUser,
        "deleteUser": deleteUser
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function(err, newuser) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(newuser);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        userModel.findById(userId, function(err, user) {
            if(err || !user) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({username: username}, function(err, user) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            }
             else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        userModel.findOne({username: username, password: password}, 
            function(err, user) {
                if (err) {
                    deferred.reject(new Error("Error!!"));
                }
                 else {
                    deferred.resolve(user);
                }
            });
            return deferred.promise;
    }

    function findUserByFacebookId(facebookId) {
        var deferred = q.defer();
        userModel.findOne({'facebook': {id: facebookId}},
            function(err, user) {
                if(err) {
                    deferred.reject(new Error("Error!!"));
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }


    function updateUser(userId, user) {
        var deferred = q.defer();
        userModel
            .update({_id: userId}, {$set: user})
            .then(function(status) {
                deferred.resolve(status);
            }, function(err) {
                deferred.reject(new Error("Error!!"));
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId}, function(err, status) {
            if(err) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }
};