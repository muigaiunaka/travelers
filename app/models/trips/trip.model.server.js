module.exports = function () {
    var model = {};
    var q = require('q');
    var mongoose = require('mongoose');
    var tripSchema = require('./trip.schema.server.js')();

    var tripModel = mongoose.model('trip', tripSchema);

    var api = {
        "setModel": setModel,
        "createTripFromBlank": createTripFromBlank,
        "createTripFromPlan": createTripFromPlan,
        "findAllTripsForUser": findAllTripsForUser,
        "findTripById": findTripById,
        "updateTrip": updateTrip,
        "deleteTrip": deleteTrip
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createTripFromBlank(userId, trip) {
        var deferred = q.defer();

        tripModel.create(trip, function(err, p) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                model.userModel
                    .findUserById(userId)
                    .then(function(w) {
                        p._user = w._id;
                        p.save();

                        w.trips.push(p);
                        w.save();
                        deferred.resolve(p);
                    });
            }
        });
        return deferred.promise;
    }

    function createTripFromPlan(userId, planId) {
        var deferred = q.defer();
        //getplanbyId, remove id and cost?
        // tripModel.create()
        return deferred.promise;
    }
    
    function findAllTripsForUser(userId) {
        var deferred = q.defer();
        
        tripModel.find({_user: userId}, function(err, trips) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(trips);
            }
        });
        return deferred.promise;
    }
    
    function findTripById(tripId) {
        var deferred = q.defer();

        tripModel.findById(tripId, function(err, p) {
            if (err || !p) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(p);
            }
        });
        return deferred.promise;
    }

    function updateTrip(tripId, trip) {
        var deferred = q.defer();

        tripModel.update({_id: tripId}, {$set: trip})
            .then(function(status) {
                    deferred.resolve(status);
            }, function(err) {
                deferred.reject(new Error("Error!!"));
            });
        return deferred.promise;
    }
    
    function deleteTrip(tripId) {
        var deferred = q.defer();
        tripModel.findById(tripId, function(err, p) {
            if(p) {
                model.userModel
                    .findUserById(p._user)
                    .then(function(w) {
                        var index = w.trips.indexOf(tripId);
                        w.trips.splice(index, 1);
                        w.save();

                        tripModel.remove({_id: tripId})
                            .then(function(status) {
                                deferred.resolve(status);
                            }, function(err) {
                                deferred.reject(new Error("Error!!"));
                            });
                    });
            }
        })
        return deferred.promise;
    }

};