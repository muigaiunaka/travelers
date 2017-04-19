module.exports = function() {
    var mongoose = require('mongoose');
    var routeSchema = mongoose.Schema({
		_parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'},
		place: {},
		directions: [{}],
		markers: [{}],
		dateCreated: {type: Date, default: Date.now}
    }, {collection: 'routes'});

    return tripSchema;
}