(function() {
	angular
		.module("TravelApp")
		.controller("globalController", globalController);

	function globalController($scope, $routeParams) {
		var toState = $routeParams.state;
		console.log("Global loaded");
		var vm = this;
	    $scope.$on('$stateChangeStart', function(event, toState, toParams) {
	        vm.bodyClass = toState.name + '-page';
	        console.log("worked"+toState);
	    });
	        console.log("maybe"+toState);
	}
})();