module.exports = function(model) {
	var mongoose = require('mongoose');
	
	mongoose.connect('mongodb://127.0.0.1:27017/globetrotter');

	var userModel = require ('./user/user.model.server')();
	// var planModel = require ('./plans/plan.model.server')();
	var tripModel = require ('./trips/trip.model.server')();

	var model = {
		userModel: userModel,
		// planModel: planModel,
		tripModel: tripModel
	}
	// userModel.setModel(model);
	// planModel.setModel(model);
	tripModel.setModel(model);
	return model;

};