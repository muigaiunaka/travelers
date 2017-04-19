(function() {
	angular
		.module("TravelApp")
		.controller("newPlanController", newPlanController);

	function newPlanController($routeParams, TripService, $location) {
		var vm = this;
		vm.userId = $routeParams["uid"];
    	vm.webId = $routeParams["wid"];
		vm.create = create;

		function init() {}
		init();

		function notEmpty(obj) {
			return !angular.isUndefined(obj)
					&& obj.name != ''
					&& !angular.isUndefined(obj.name);
		}

		function create(trip) {
			if (notEmpty(trip)) {
				TripService
					.createTrip(vm.userId, trip)
					.then(function(newTrip) {
						$location.url("/user/"+vm.userId+"/trip/"+newTrip._id+"/edit-plan-country");
					});
			} else {
				vm.error = 'Please create a title for your trip';
			}
		}
	}
})();