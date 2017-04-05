module.exports = function(app, model) {
    app.post("/api/user/:uid/trip", createTrip);
    app.get("/api/user/:uid/trip", findTripsByUser);
    app.get("/api/trip/:tip", findTripById);
    app.put("/api/trip/:tip", updateTrip);
    app.delete("/api/trip/:tip", deleteTrip);

    var tripModel = model.tripModel;

	function createTrip(req, res) {
		if (req.query.blank) {
			createTripFromBlank(req, res);
		} else {
			createTripFromPlan(req, res);
		}
	}

	function createTripFromBlank(req, res) {
		var userId = req.params.uid;
		var trip = req.body;

		tripModel
			.createTripFromBlank(userId, trip)
			.then(function(p) {
				res.json(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function createTripFromPlan(req, res) {
		var userId = req.params.uid;
		var planId = req.body;

		tripModel
			.createTripFromPlan(userId, planId)
			.then(function(p) {
				res.json(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findTripsByUser(req, res) {
		var userId = req.params.uid;
		
		tripModel
			.findAllTripsForUser(userId)
			.then(function(trips) {
				res.json(trips);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findTripById(req, res) {
		var tripId = req.params.tip;

		tripModel
			.findTripById(tripId)
			.then(function(p) {
				res.json(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function updateTrip(req, res) {
		var tripId = req.params.tip;
		var newTrip = req.body;

		tripModel
			.updateTrip(tripId, newTrip)
			.then(function(p) {
				res.send(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function deleteTrip(req, res) {
		var tripId = req.params.tip;

		tripModel
			.deleteTrip(tripId)
			.then(function(status) {
				res.send(status);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}
}