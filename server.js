// var env = require('node-env-file');
var express = require('express');
var app = express();

// install, load, and configure body parser module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true, limit:'50mb'}));
app.use(bodyParser.json({limit:'50mb'}));

// var passport = require('passport');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');

// app.use(session({
// 	secret: 'this is the secret', //proc.env.session_secret
// 	resave: true,
// 	saveUninitialized: true
// }));
// app.use(cookieParser());
// app.use(passport.initialize());
// app.use(passport.session());

// app.set('view engine', 'ejs');

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var connectionString = 'mongodb://127.0.0.1:27017/globetrotter';

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MONGODB_URI
}

var mongoose = require("mongoose");
mongoose.createConnection(connectionString);

require ("./app/app.js")(app);
// require ("./assignment/app.js")(app); //executes the function in server app

var port = process.env.PORT || 3000;

app.listen(port);