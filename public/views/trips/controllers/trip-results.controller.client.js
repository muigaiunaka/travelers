(function() {
	angular
		.module("TravelApp")
		.controller("tripResultController", tripResultController);

	function tripResultController(UserService, TripService, $location) {
		var vm = this;
		vm.daysBetween = daysBetween;
		vm.getOwner = getOwner;

		function init() {
			TripService
				.findTripsByCountry($location.search().q)
				.then(function(trips) {
					vm.trips = trips;
				})
		}
		init();

		function treatAsUTC(date) {
		    var result = new Date(date);
		    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
		    return result;
		}

		function daysBetween(startDate, endDate) {
		    var millisecondsPerDay = 24 * 60 * 60 * 1000;
		    return ((treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay)+1;
		}

		function getOwner(userId) {
			UserService
				.findUserById(userId)
				.then(function(user) {
					return user;
				});
		}
	}
})();