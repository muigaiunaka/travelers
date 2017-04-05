// module.exports = function () {
//     var model = {};
//     var q = require('q');
//     var mongoose = require('mongoose');
//     var planSchema = require('./plan.schema.server.js')();

//     var planModel = mongoose.model('plan', planSchema);

//     var api = {
//         "setModel": setModel,
//         "createPlan": createPlan,
//         "findAllPlansForUser": findAllPlansForUser,
//         "findPlanById": findPlanById,
//         "updatePlan": updatePlan,
//         "deletePlan": deletePlan
//     };
//     return api;

//     function setModel(_model) {
//         model = _model;
//     }

//     function createPlan(userId, plan) {
//         var deferred = q.defer();

//         planModel.create(plan, function(err, p) {
//             if (err) {
//                 deferred.reject(new Error("Error!!"));
//             } else {
//                 model.userModel
//                     .findUserById(userId)
//                     .then(function(w) {
//                         p._user = w._id;
//                         p.save();

//                         w.plans.push(p);
//                         w.save();
//                         deferred.resolve(p);
//                     });
//             }
//         });
//         return deferred.promise;
//     }
    
//     function findAllPlansForUser(userId) {
//         var deferred = q.defer();
        
//         planModel.find({_user: userId}, function(err, plans) {
//             if (err) {
//                 deferred.reject(new Error("Error!!"));
//             } else {
//                 deferred.resolve(plans);
//             }
//         });
//         return deferred.promise;
//     }
    
//     function findPlanById(planId) {
//         var deferred = q.defer();

//         planModel.findById(planId, function(err, p) {
//             if (err || !p) {
//                 deferred.reject(new Error("Error!!"));
//             } else {
//                 deferred.resolve(p);
//             }
//         });
//         return deferred.promise;
//     }

//     function updatePlan(planId, plan) {
//         var deferred = q.defer();

//         planModel.update({_id: planId}, {$set: plan})
//             .then(function(status) {
//                     deferred.resolve(status);
//             }, function(err) {
//                 deferred.reject(new Error("Error!!"));
//             });
//         return deferred.promise;
//     }
    
//     function deletePlan(planId) {
//         var deferred = q.defer();
//         planModel.findById(planId, function(err, p) {
//             if(p) {
//                 model.userModel
//                     .findUserById(p._user)
//                     .then(function(w) {
//                         var index = w.plans.indexOf(planId);
//                         w.plans.splice(index, 1);
//                         w.save();

//                         planModel.remove({_id: planId})
//                             .then(function(status) {
//                                 deferred.resolve(status);
//                             }, function(err) {
//                                 deferred.reject(new Error("Error!!"));
//                             });
//                     });
//             }
//         })
//         return deferred.promise;
//     }

// };