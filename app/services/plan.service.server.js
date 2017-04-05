module.exports = function(app, model) {
    app.post("/api/user/:uid/plan", createPlan);
    app.get("/api/user/:uid/plan", findPlansByUser);
    app.get("/api/plan/:pid", findPlanById);
    app.put("/api/plan/:pid", updatePlan);
    app.delete("/api/plan/:pid", deletePlan);

    var planModel = model.planModel;

	function createPlan(req, res) {
		var userId = req.params.uid;
		var plan = req.body;

		planModel
			.createPlan(userId, plan)
			.then(function(p) {
				res.json(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findPlansByUser(req, res) {
		var userId = req.params.uid;
		
		planModel
			.findAllPlansForUser(userId)
			.then(function(plans) {
				res.json(plans);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findPlanById(req, res) {
		var planId = req.params.pid;

		planModel
			.findPlanById(planId)
			.then(function(p) {
				res.json(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function updatePlan(req, res) {
		var planId = req.params.pid;
		var newPlan = req.body;

		planModel
			.updatePlan(planId, newPlan)
			.then(function(p) {
				res.send(p);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function deletePlan(req, res) {
		var planId = req.params.pid;

		planModel
			.deletePlan(planId)
			.then(function(status) {
				res.send(status);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}
}