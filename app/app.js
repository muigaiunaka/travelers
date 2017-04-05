module.exports = function(app) {
	var model = require('./models/model.server.js')();

    require ("./services/user.service.server.js")(app, model);
    // require ("./services/plan.service.server.js")(app, model);
    require ("./services/trip.service.server.js")(app, model);
};