(function() {
  angular
    .module("TravelApp")
    .config(Config);
  function Config($routeProvider) {
    $routeProvider
		.when("/", {
			templateUrl: 'views/user/templates/login.view.client.html',
			controller: "loginController",
			controllerAs: "model"
		})
	}
})();