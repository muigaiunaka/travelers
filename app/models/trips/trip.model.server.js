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
        "findAllTrips": findAllTrips,
        "updateTrip": updateTrip,
        "deleteTrip": deleteTrip,
        "deleteAllTripsByUser": deleteAllTripsByUser
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createTripFromBlank(userId, trip) {
        var deferred = q.defer();
        tripModel.create(trip, function(err, t) {
            if (err) {
                deferred.reject(new Error("Could not create Trip"));
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
        /* This has been put on hold for now */
        return deferred.promise;
    }
    
    function findAllTripsForUser(userId) {
        var deferred = q.defer();
        
        tripModel.find({_user: userId}, function(err, trips) {
            if (err) {
                deferred.reject(new Error("Could not find trips by user: " +userId));
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
                deferred.reject(new Error("Could not find trip: "+tripId));
            } else {
                deferred.resolve(p);
            }
        });
        return deferred.promise;
    }

    function findTripsByCountry(reqQ) {
        /* TODO: Fix for 'and' inclusion */

        var deferred = q.defer();
        var array = reqQ.split("_");
        var query = [];
        for (var a in array) {
            var temp = {
                $elemMatch: { name: array[a] }
            }
            query.push(temp);
        }

        /* {"countries.list": {$all: [{$elemMatch: {name:"France"}}, {$elemMatch: {name:"Germany"}}]}} */

        tripModel.find({"countries.list": {$all: query}}, function(err, trips) {
            if (err) {
                deferred.reject(new Error("Could not find trips"));
            } else {
                deferred.resolve(trips);
            }
        });
        return deferred.promise;
    }

    function findAllTrips() {
        var deferred = q.defer();
        tripModel.find({}, function(err, trips) {
            if (err) {
                deferred.reject(new Error("Could not get all trips"));
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
                deferred.reject(new Error("Could not update trip"));
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
                                deferred.reject(new Error("Could not delete trip"));
                            });
                    });
            }
        })
        return deferred.promise;
    }

    function deleteAllTripsByUser(userId) {
        var deferred = q.defer();
        model.userModel
            .findUserById(userId)
            .then(function(user) {
                user.trips = [];
                user.save();

                tripModel.remove({_user: userId}, function(err, response) {
                    if (err) {
                        deferred.reject(new Error("Could not remove all trips by user: "+userId));
                    } else {
                        deferred.resolve(response);
                    }
                });
            });
        return deferred.promise;
    }

};