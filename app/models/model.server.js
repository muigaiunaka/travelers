module.exports = function(model) {
	var mongoose = require('mongoose');

	var userModel = require ('./user/user.model.server')();
	var tripModel = require ('./trips/trip.model.server')();

	var model = {
		userModel: userModel,
		tripModel: tripModel
	}
	tripModel.setModel(model);
	userModel.setModel(model);
	return model;

};