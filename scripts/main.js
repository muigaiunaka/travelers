// where all scripts go so that they can be compiled
console.log("Main Scripts Loaded");

/* Dependencies */
require ('angular');
require ('angular-route');

/* Stylesheets */
require ('../styles/main.scss');

/* Scripts */
require ('../public/app.js');
require ('../public/config.js');

/* Controllers */
require('../public/views/user/controllers/login.controller.client.js');