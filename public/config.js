(function() {
  angular
    .module("TravelApp")
    .config(Config);
  function Config($routeProvider) {
    $routeProvider
		.when("/", {
			templateUrl: 'views/search.view.client.html',
			controller: "searchController",
			controllerAs: "model"
		})
		.when("/login", {
			templateUrl: 'views/user/templates/login.view.client.html',
			controller: "loginController",
			controllerAs: "model"
		})
	}
})();