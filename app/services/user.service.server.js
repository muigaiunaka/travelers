module.exports = function(app, model) {
	app.get("/api/user", findUser);
	app.get("/api/user/:uid", findUserById);
	app.put("/api/user/:uid", updateUser);
	app.delete("/api/user/:uid", deleteUser);
	app.post("/api/user", createUser);

	var userModel = model.userModel;

	function createUser(req, res) {
		var user = req.body;
		userModel
			.createUser(user)
			.then(function(user) {
				res.json(user);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function deleteUser(req, res) {
		var userId = req.params.uid;
		userModel
        	.deleteUser(userId)
        	.then(function(status) {
        		res.send(status);
        	}, function(err) {
        		res.sendStatus(500).send(err);
        	});
	}

	function updateUser(req, res) {
		var userId = req.params.uid;
		var newUser = req.body;

		userModel
			.updateUser(userId, newUser)
			.then(function(user) {
				res.json(user);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findUserById(req, res) {
		//retrieve the id from the path
		var userId = req.params.uid;

		userModel
			.findUserById(userId)
			.then(function(user) {
				res.json(user);
			}, function(err) {
				res.sendStatus(500).send(err);
			});
	}

	function findUser(req, res) {
		var username = req.query.username;
		var password = req.query.password;
		if (username && password) {
			findUserByCredentials(req, res);
		} else if (username) {
			findUserByUsername(req, res);
		}

	}

	function findUserByUsername(req, res) {
		userModel
			.findUserByUsername(req.query.username)
			.then(function(user) {
				if (!user) { // doing this to prevent console log 404 error
					res.json({message: "User Not Found"});
				} else { res.json(user); }
			}, function(err) {
				res.sendStatus(404).send({message: "User Not Found"});
			});
	}

	function findUserByCredentials(req, res) { //request and response
		var username = req.query.username;
		var password = req.query.password;
		
		userModel
			.findUserByCredentials(username, password)
			.then(function(user) {
				if (!user) {
					res.json({message: "User Not Found"});
				} else { res.json(user); }
			}, function(err) {
				res.sendStatus(404).send({message: "User Not Found"});
			});
	}
}