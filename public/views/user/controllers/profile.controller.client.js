(function() {
	angular
		.module("TravelApp")
		.controller("profileController", profileController);

	function profileController($routeParams, UserService, TripService, $location) {
		var vm = this;
    	vm.userId = $routeParams["uid"];
        vm.update = update;
        vm.remove = remove;
        vm.deleteTrip = deleteTrip;
        vm.isComplete = isComplete;
        vm.formatDate = formatDate;

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

        function update(newUser) {
            UserService
            .updateUser(vm.userId, newUser)
            .then(function(user) {
                if(user == null) {
                    vm.error = "unable to update user";
                } else {
                    vm.success = "user successfully updated"
                }
            });
        };

        function remove(user) {
            UserService
                .deleteUser(vm.userId)
                .then(function(user) {
                    $location.url("/login");
                });
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
                })
        }

        function isComplete(trip) {
            return trip.countries.status == 'COMPLETE'
                   && trip.interests.status == 'COMPLETE'
                   && trip.route.status == 'COMPLETE'
                   && trip.timeline.status == 'COMPLETE';
        }

        function formatDate(date) {
            return new Date(date);
        }

        var user = UserService.findUserById(vm.userId);
        vm.user = user;
	}
})();