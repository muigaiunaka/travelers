module.exports = function() {
	var mongoose = require('mongoose');
	var timelineSchema = mongoose.Schema({
		_parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'},
		order: Number,
		arrival: Date,
		city: Number // place_id

	}, {collection: timelines});
	return timelineSchema
}