module.exports = function() {
    var mongoose = require('mongoose');
    var routeSchema = mongoose.Schema({
		_parent: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		state: {type: String, enum: ['INPROGRESS', 'COMPLETE']},
		name: String,
		countries: [String],
		cities: [String],
		start: Date,
		end: Date,
		cost: Number,
		dateCreated: {type: Date, default: Date.now}
    }, {collection: 'routes'});

    return tripSchema;
}