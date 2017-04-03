(function() {
  angular
    .module("TravelApp")
    .config(Config);
  function Config($routeProvider) {
    $routeProvider
		.when("/", {
			templateUrl: 'views/trips/templates/search.view.client.html',
			controller: 'searchController',
			controllerAs: 'model'
		})
		.when("/search", {
			templateUrl: 'views/trips/templates/search.view.client.html',
			controller: 'searchController',
			controllerAs: 'model'
		})
		.when("default", {
			templateUrl: 'views/trips/templates/search.view.client.html',
			controller: 'searchController',
			controllerAs: 'model'
		})
		.when("/login", {
			templateUrl: 'views/user/templates/login.view.client.html',
			controller: 'loginController',
			controllerAs: 'model'
		})
		.when("/register", {
			templateUrl: 'views/user/templates/register.view.client.html',
			controller: 'registerController',
			controllerAs: 'model'
		})
		.when("/profile", {
			templateUrl: 'views/user/templates/profile.view.client.html',
			controller: 'profileController',
			controllerAs: 'model'
		})
		.when("/new-plan", {
			templateUrl: 'views/plan/templates/new-plan.view.client.html',
			controller: 'newPlanController',
			controllerAs: 'model'
		})
		.when("/edit-plan-country", {
			templateUrl: 'views/plan/templates/edit-plan-country.view.client.html',
			controller: 'editPlanCountryController',
			controllerAs: 'model'
		})
		.when("/edit-plan-interest", {
			templateUrl: 'views/plan/templates/edit-plan-interest.view.client.html',
			controller: 'editPlanInterestController',
			controllerAs: 'model'
		})
		.when("/edit-plan-route", {
			templateUrl: 'views/plan/templates/edit-plan-route.view.client.html',
			controller: 'editPlanRouteController',
			controllerAs: 'model'
		})
		.when("/edit-plan-lodging", {
			templateUrl: 'views/plan/templates/edit-plan-lodging.view.client.html',
			controller: 'editPlanLodgingController',
			controllerAs: 'model'
		})
		.when("/edit-plan-timeline", {
			templateUrl: 'views/plan/templates/edit-plan-timeline.view.client.html',
			controller: 'editPlanTimelineController',
			controllerAs: 'model'
		})
		.when("/trip-results", {
			templateUrl: 'views/trips/templates/trip-results.view.client.html',
			controller: 'tripResultController',
			controllerAs: 'model'
		})
		.when("/trip-review", {
			templateUrl: 'views/trips/templates/trip-review.view.client.html',
			controller: 'tripReviewController',
			controllerAs: 'model'
		})
	}
})();