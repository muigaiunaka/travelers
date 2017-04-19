module.exports = function(app) {

    var connectionString = 'mongodb://127.0.0.1:27017/globetrotter';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.createConnection(connectionString);


	var model = require('./models/model.server.js')();

    require ("./services/user.service.server.js")(app, model);
    // require ("./services/plan.service.server.js")(app, model);
    require ("./services/trip.service.server.js")(app, model);
};