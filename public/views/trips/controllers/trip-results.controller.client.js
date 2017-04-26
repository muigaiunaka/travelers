(function() {
	angular
		.module("TravelApp")
		.controller("tripResultController", tripResultController);

	function tripResultController(UserService, TripService, $location) {
		var vm = this;
		vm.daysBetween = daysBetween;
		vm.getOwner = getOwner;
		vm.users = [];

		function init() {
			TripService
				.findTripsByCountry($location.search().q)
				.then(function(trips) {
					vm.trips = trips;
					for (var t in vm.trips) {
						UserService
							.findUserById(vm.trips[t]._user)
							.then(function(user) {
								vm.users.push(user);
							}, function(err) {
								vm.trips.splice(t,1);
							})
					}

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
			var i = vm.users.map((e) => e._id).indexOf(userId);
			if (i != -1) {
				return vm.users[i].username;
			}
			return "";
		}
	}
})();