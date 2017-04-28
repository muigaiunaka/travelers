module.exports = function () {
    var mongoose = require('mongoose');
    var userSchema = mongoose.Schema({
    	facebook: {
    		id: String,
    		token: String
    	},
		username: {type: String, required: true},
		password: {type: String, required: true},
		firstName: String,
		lastName: String,
		email: String,
		phone: String,
		gender: String,
		hometown: String,
   		role: {type: String, enum: ['ADMIN', 'USER'], default: 'USER'},
		trips: [{type: mongoose.Schema.Types.ObjectId, ref: 'Trip'}],
		dateCreated: {type: Date, default: Date.now}
    }, {collection: 'users'});

    return userSchema;
};