(function() {
	angular
		.module("TravelApp")
		.controller("editPlanCountryController", editPlanCountryController);

	function editPlanCountryController($routeParams, TripService, $location) {
		var vm = this;
		vm.userId = $routeParams.uid;
		vm.tripId = $routeParams.tid;
		vm.update = update;
		vm.final = final;
		vm.revert = revert;
		vm.removeCountry = removeCountry;
		vm.gPlace;
		function init() {
			TripService
				.findTripById(vm.tripId)
				.then(function(trip) {
					vm.trip = trip;
				});
		}
		init();

		function update() {
			TripService
				.findTripById(vm.tripId)
				.then(function(trip) {
					vm.trip = trip;
				});
		}

		function final() {
			var newTrip = vm.trip;
			newTrip.countries.status = 'COMPLETE';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
				})
		}

		function revert() {
			var newTrip = vm.trip;
			newTrip.countries.status = 'INPROGRESS';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
				})
		}

		function removeCountry(countryId) {
			var newArray = vm.trip.countries.list;
			var i = newArray.map((e) => (e._id)).indexOf(countryId);
			newArray.splice(i, 1);
			TripService
				.updateTrip(vm.tripId, vm.trip)
				.then(function(res) {
				})
		}
	}
})();