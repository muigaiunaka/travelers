module.exports = function () {
    var mongoose = require('mongoose');
    var tripSchema = mongoose.Schema({
		_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		state: {type: String, enum: ['PLANNING', 'UPCOMING', 'INPROGRESS', 'COMPLETE']},
		name: String,
		countries: [String],
		cities: [String],
		route: [{type: mongoose.Schema.Types.ObjectId, ref: 'Route'}],
		lodging: [String],
		timeline: [{type: mongoose.Schema.Types.ObjectId, ref: 'Timeline'}],
		start: Date,
		end: Date,
		cost: Number,
		dateCreated: {type: Date, default: Date.now}
    }, {collection: 'trips'});

    return tripSchema;
};