module.exports = function () {
    var mongoose = require('mongoose');
    var tripSchema = mongoose.Schema({
		_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		state: {
			type: String, 
			enum: ['PLANNING', 'UPCOMING', 'INPROGRESS', 'COMPLETE'],
			default: 'PLANNING'
		},
		name: String,
		countries: {
			list: [{
				name: String
			}], 
			status: {
				type: String, 
				enum: ['INPROGRESS', 'COMPLETE'],
				default: 'INPROGRESS'
			}
		},
		interests: {
			list: [{}], 
			status: {
				type: String, 
				enum: ['INPROGRESS', 'COMPLETE'],
				default: 'INPROGRESS'
			}
		},
		route: {
			list: [{}],
			status: {
				type: String, 
				enum: ['INPROGRESS', 'COMPLETE'],
				default: 'INPROGRESS'
			}

		},
		lodging: {
			list: [String], 
			status: {
				type: String, 
				enum: ['INPROGRESS', 'COMPLETE'],
				default: 'INPROGRESS'
			}
		},
		timeline: {
			list: [{
				_parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Trip'},
				arrival: Date,
				order: Number,
				city: String
			}], 
			status: {
				type: String, 
				enum: ['INPROGRESS', 'COMPLETE'],
				default: 'INPROGRESS'
			}
		},
		start: Date,
		end: Date,
		cost: Number,
		dateCreated: {type: Date, default: Date.now}
    }, {collection: 'trips'});

    return tripSchema;
};