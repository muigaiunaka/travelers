(function() {
	angular
		.module("TravelApp")
		.controller("profileController", profileController);

	function profileController($routeParams, UserService, TripService, $location, $rootScope) {
		var vm = this;
    	vm.userId = $routeParams["uid"];
        vm.logout = logout;
        vm.deleteTrip = deleteTrip;
        vm.isComplete = isComplete;
        vm.formatDate = formatDate;
        vm.markComplete = markComplete;
        vm.daysBetween = daysBetween;

		function init() {
            $('body')
                .removeAttr('class');
			UserService
                .findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user;
                    TripService
                        .findTripByUserId(vm.userId)
                        .then(function(trips) {
                            vm.trips = trips;
                        });
                });
		}
		init();

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                }, function (err) {
                    vm.error = "Something went wrong. Could not logout."
                })
        }

        function treatAsUTC(date) {
            var result = new Date(date);
            result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
            return result;
        }

        function daysBetween(startDate, endDate) {
            var millisecondsPerDay = 24 * 60 * 60 * 1000;
            return ((treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay)+1;
        }

        function deleteTrip(tripId) {
            TripService
                .deleteTrip(tripId)
                .then(function(response) {
                    TripService
                        .findTripByUserId(vm.userId)
                        .then(function(trips) {
                            vm.trips = trips;
                        });
                }, function (err) {
                    vm.error = "Could not delete trip."
                })
        }

        function isComplete(trip) {
            return trip.countries.status == 'COMPLETE'
                   && trip.interests.status == 'COMPLETE'
                   && trip.route.status == 'COMPLETE'
                   && trip.timeline.status == 'COMPLETE';
        }

        function markComplete(trip) {
            var newTrip = trip;
            newTrip.state = 'COMPLETE';
            TripService
                .updateTrip(trip._id, newTrip)
                .then(function(res) {
                }, function (err) {
                    vm.error = "Something went wrong. Could not update status."
                })
        }

        function formatDate(date) {
            return new Date(date);
        }

        var user = UserService.findUserById(vm.userId);
        vm.user = user;
	}
})();