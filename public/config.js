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
		.when("/user/:uid/search", {
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
		.when("/admin", {
			templateUrl: 'views/user/templates/admin.view.client.html',
			controller: 'adminController',
			controllerAs: 'model',
			resolve: { adminUser: checkAdmin }
		})
		.when("/user/", {
			templateUrl: 'views/user/templates/profile.view.client.html',
			controller: 'profileController',
			controllerAs: 'model',
			resolve: { currentUser: checkLoggedin }
		})
		.when("/user/:uid", {
			templateUrl: 'views/user/templates/profile.view.client.html',
			controller: 'profileController',
			controllerAs: 'model',
			resolve: { currentUser: checkLoggedin }
		})
		.when("/user/:uid/edit", {
			templateUrl: 'views/user/templates/edit-profile.view.client.html',
			controller: 'editProfileController',
			controllerAs: 'model'
		})
		.when("/user/:uid/trip/new", {
			templateUrl: 'views/plan/templates/new-plan.view.client.html',
			controller: 'newPlanController',
			controllerAs: 'model'
		})
		.when("/user/:uid/trip/:tid/edit-plan-country", {
			templateUrl: 'views/plan/templates/edit-plan-country.view.client.html',
			controller: 'editPlanCountryController',
			controllerAs: 'model'
		})
		.when("/user/:uid/trip/:tid/edit-plan-interest", {
			templateUrl: 'views/plan/templates/edit-plan-interest.view.client.html',
			controller: 'editPlanInterestController',
			controllerAs: 'model'
		})
		.when("/user/:uid/trip/:tid/edit-plan-route", {
			templateUrl: 'views/plan/templates/edit-plan-route.view.client.html',
			controller: 'editPlanRouteController',
			controllerAs: 'model'
		})
		.when("/user/:uid/trip/:tid/edit-plan-lodging", {
			templateUrl: 'views/plan/templates/edit-plan-lodging.view.client.html',
			controller: 'editPlanLodgingController',
			controllerAs: 'model'
		})
		.when("/user/:uid/trip/:tid/edit-plan-timeline", {
			templateUrl: 'views/plan/templates/edit-plan-timeline.view.client.html',
			controller: 'editPlanTimelineController',
			controllerAs: 'model'
		})
		.when("/search/trip-results", {
			templateUrl: 'views/trips/templates/trip-results.view.client.html',
			controller: 'tripResultController',
			controllerAs: 'model'
		})
		.when("/user/:uid/search/trip-results", {
			templateUrl: 'views/trips/templates/trip-results.view.client.html',
			controller: 'tripResultController',
			controllerAs: 'model'
		})
		.when("/trip/:tid", {
			templateUrl: 'views/trips/templates/trip-review.view.client.html',
			controller: 'tripReviewController',
			controllerAs: 'model'
		})
		.when("/user/:uid/trip/:tid", {
			templateUrl: 'views/trips/templates/trip-review.view.client.html',
			controller: 'tripReviewController',
			controllerAs: 'model'
		})
		.otherwise({
			redirectTo: '/login'
		});
  }

    function checkLoggedin($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkLoggedin()
            .then(function(user) {
                if (user == '0') {
                    $location.url('/login');
                    deferred.reject();
                } else {
                    $location.url('/user/'+user._id);
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, UserService, $location) {
        var defer = $q.defer();
        UserService
            .isAdmin()
            .then(function (user) {
                if(user != '0') {
                    defer.resolve(user);
                } else {
                    defer.reject();
                    $location.url('/login');
                }
            });
        return defer.promise;
    }
})();