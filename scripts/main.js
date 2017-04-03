// where all scripts go so that they can be compiled
console.log("Main Scripts Loaded");

/* Dependencies */
require ('angular');
require ('angular-route');

/* Stylesheets */
require ('../styles/main.scss');

/* Directives */
require('../public/directives/js/appDirectives.js');
require('../public/directives/js/appHeader.js');
require('../public/directives/js/jgaSearchAutocomplete.js');

/* Scripts */
require ('../public/app.js');
require ('../public/config.js');

/* Controllers */
require('../public/views/user/controllers/login.controller.client.js');
require('../public/views/user/controllers/register.controller.client.js');
require('../public/views/user/controllers/profile.controller.client.js');
require('../public/views/trips/controllers/trip-results.controller.client.js');
require('../public/views/trips/controllers/trip-review.controller.client.js');
require('../public/views/trips/controllers/search.controller.client.js');
require('../public/views/plan/controllers/new-plan.controller.client.js');
require('../public/views/plan/controllers/edit-plan-country.controller.client.js');
require('../public/views/plan/controllers/edit-plan-interest.controller.client.js');
require('../public/views/plan/controllers/edit-plan-route.controller.client.js');
require('../public/views/plan/controllers/edit-plan-lodging.controller.client.js');
require('../public/views/plan/controllers/edit-plan-timeline.controller.client.js');