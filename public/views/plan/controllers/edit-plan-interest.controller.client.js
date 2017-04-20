(function() {
	angular
		.module("TravelApp")
		.controller("editPlanInterestController", editPlanInterestController);

	function editPlanInterestController($routeParams, TripService, $location, GoogleService) {
		var vm = this;
		vm.userId = $routeParams.uid;
		vm.tripId = $routeParams.tid;
		// vm.getPhoto = getPhoto;
		vm.final = final;
		vm.revert = revert;
		vm.interests = [];
		vm.trip;

		function init() {
			TripService
				.findTripById(vm.tripId)
				.then(function(trip) {
					vm.trip = trip;

					var list = vm.trip.countries.list;
					var iList = vm.trip.interests.list;

					// Get points of interest for each country choosen by user
					for (var place = 0; place < list.length; place++) {
						var request = {
							query: list[place].name + ' tourist attractions'
						};
						var service = new google.maps.places.PlacesService(document.createElement('div'));
						service.textSearch(request, callback);

						// Function to run when points of interests have been retrieved.
						function callback(results, status) {
							if (status == google.maps.places.PlacesServiceStatus.OK) {
								for (var c = 0; c < list.length; c++) {
									if (results[0].formatted_address.includes(list[c].name)) {
										var temp = {
											key: list[c].name,
											poi: results
										}
										vm.interests.push(temp);
									}
								}

								/* 
									This callback function will be run as many times as there
									are countries in the user's list, so check when all the
									countries have been added to interests list.  The list of
									results do not come back in order, so find based on key
								*/
								if (vm.interests.length == list.length) {
									for (var i = 0; i < list.length; i++) {
										var n = vm.interests.map((e) => (e.key)).indexOf(list[i].name);
										vm.trip.countries.list[i].pois = vm.interests[n].poi;

										var pList = vm.interests[n].poi;
										for (var pl in pList) {
											var index = iList.map((e) => (e.id)).indexOf(pList[pl].id);
											if (index != -1) { pList[pl].status = 'SELECTED' };
										}
									}
								}
							}

							/* 
								NOTE: the callback function does not run directly after 
								service.textSearch, so calling update to display results in view
							*/

							TripService
								.updateTrip(vm.tripId, vm.trip)
								.then(function(status) {});
						}
					};
				});
		}
		init();

		function final() {
			var newTrip = vm.trip;
			newTrip.interests.status = 'COMPLETE';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
				})
		}

		function revert() {
			var newTrip = vm.trip;
			newTrip.interests.status = 'INPROGRESS';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
				})
		}
	}
})();