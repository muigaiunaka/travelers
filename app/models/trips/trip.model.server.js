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
        "findTripsByCountry": findTripsByCountry,
        "updateTrip": updateTrip,
        "deleteTrip": deleteTrip
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createTripFromBlank(userId, trip) {
        var deferred = q.defer();
        tripModel.create(trip, function(err, t) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                model.userModel
                    .findUserById(userId)
                    .then(function(u) {
                        t._user = u._id;
                        t.save();

                        u.trips.push(t);
                        u.save();
                        deferred.resolve(t);
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

    function findTripsByCountry(reqQ) {
        /* TODO: Fix for 'and' inclusion */

        var deferred = q.defer();
        console.log("Model "+reqQ);
        var array = reqQ.split("_");
        var query = '{';
        for (var a in array) {
            query += '"countries.list.name":"'+array[a]+'", ';
        }
        
        query = query.substr(0, query.length-2) + '}';

        tripModel.find(JSON.parse(query), function(err, trips) {
            if (err) {
                deferred.reject(new Error("Error!!"));
            } else {
                deferred.resolve(trips);
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
        tripModel.findById(tripId, function(err, t) {
            if(t) {
                model.userModel
                    .findUserById(t._user)
                    .then(function(u) {
                        var index = u.trips.indexOf(tripId);
                        u.trips.splice(index, 1);
                        u.save();

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