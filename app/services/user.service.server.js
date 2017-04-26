module.exports = function(app, model) {
	var passport = require('passport');
	var FacebookStrategy = require('passport-facebook').Strategy;
	var bcrypt = require("bcrypt-nodejs");
	var auth = authorized;

	app.post('/api/login', passport.authenticate('local'), login);
	app.post('/api/logout', logout);
	app.post('/api/register', register);
	app.post('/api/user', auth, createUser);
	app.get('/api/loggedin', loggedin);
	app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
	app.get('/auth/facebook/callback',
	   passport.authenticate('facebook', {
	       successRedirect: '/#!/user/',
	       failureRedirect: '/#!/login'
	}));
	app.get("/api/user", auth, findUser);
	app.get("/api/user/:uid", findUserById);
	app.put("/api/user/:uid", auth, updateUser);
	app.delete("/api/user/:uid", auth, deleteUser);

	var facebookConfig = {
	    clientID     : process.env.FACEBOOK_CLIENT_ID,
	    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
	    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
	    passReqToCallback: true
	};

	var userModel = model.userModel;
	var LocalStrategy = require('passport-local').Strategy;
	passport.use(new LocalStrategy(localStrategy));
	passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
	passport.serializeUser(serializeUser);
	passport.deserializeUser(deserializeUser);


	function facebookStrategy(req, token, refreshToken, profile, done) {
	    userModel
	        .findUserByFacebookId(profile.id)
	        .then(function (user) {
	            if(user) {
	            	done(null, user)
	            } else {
	                var newuser = {
	                    username: profile.displayName.replace(" ",''),
	                    password: bcrypt.hashSync("password"),
	                    facebook: {
	                        id:    profile.id
	                    }
	                };
	                userModel
	                	.createUser(newuser)
	                	.then(function(nuser) {
	                		done(null, nuser);
	                	});
	            }
	        })
	}

	function serializeUser(user, done) {
		done(null, user);
	}

	function deserializeUser(user, done) {
		userModel
			.findUserById(user._id)
			.then(function(user) {
				done(null, user);
			}, function(err) {
				done(err, null);
			});
	}

	function localStrategy(username, password, done) {
		userModel
			.findUserByUsername(username)
			.then(
				function(user) {
					if (!user) { console.log("woah"); return done(null, false); }
					else if (user.username === username && bcrypt.compareSync(password, user.password)) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				}, function(err) {
					if (err) { return done(err); }
				});
	}

	function authorized(req, res, next) {
		if(!req.isAuthenticated()) {
			res.send(401);
		} else { next() }
	}

	function register(req, res) {
		var user = req.body;
		user.password = bcrypt.hashSync(user.password);
		userModel
			.createUser(user)
			.then(function(user) {
				if(user) {
					req.login(user, function(err) {
						if (err) {
							res.status(400).send(err);
						} else {
							res.json(user);
						}
					})
				}
			})
	}

	function login(req, res) {
		var user = req.user;
		res.json(user);
	}

	function logout(req, res) {
		req.logOut();
		res.send(200);
	}

	function loggedin(req, res) {
		if(req.isAuthenticated()) {
	        res.json(req.user);
	    } else {
	        res.send('0');
	    }
	}

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