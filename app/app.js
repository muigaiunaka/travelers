module.exports = function(app) {

    var connectionString = 'mongodb://127.0.0.1:27017/globetrotter';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MONGODB_URI
    }
    console.log(connectionString)l

    var mongoose = require("mongoose");
    mongoose.createConnection(connectionString);


	var model = require('./models/model.server.js')();

    require ("./services/user.service.server.js")(app, model);
    // require ("./services/plan.service.server.js")(app, model);
    require ("./services/trip.service.server.js")(app, model);
};