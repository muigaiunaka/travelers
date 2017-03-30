(function() {
  angular
    .module("TravelApp")
    .config(Config);
  function Config($routeProvider) {
    $routeProvider
		// .when("/", {
		// 	templateUrl: 'views/User/template/login.view.client.html',
		// 	controller: "loginController",
		// 	controllerAs: "logModel"
		// })
	}
})();