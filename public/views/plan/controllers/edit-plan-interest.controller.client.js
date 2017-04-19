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

		function init() {
			TripService
				.findTripById(vm.tripId)
				.then(function(trip) {
					vm.trip = trip;

					var list = vm.trip.countries.list;
					var iList = vm.trip.interests.list;

					for (var p = 0; p < list.length; p++) {
						GoogleService
							.searchPOI(list[p].name)
							.then(function(res) {
								var temp = {
									key: res.place,
									poi: res.results
								}
								vm.interests.push(temp);
								if (vm.interests.length == list.length) {
									for (var i = 0; i < list.length; i++) {
										var p = vm.interests.map((e) => (e.key)).indexOf(list[i].name);
										vm.trip.countries.list[i].pois = vm.interests[p].poi;

										var pList = vm.interests[p].poi;
										for (var p in pList) {
											var index = iList.map((e) => (e.id)).indexOf(pList[p].id);
											if (index != -1) { pList[p].status = 'SELECTED' };
										}

										// TODO Finish photos. this returns an actual img

										// var pList = vm.interests[p].poi;
										// for (var poi in pList) {
										// 	console.log(pList[0]);
										// 	console.log(pList[0].name);
										// 	var p = pList[0].photos[0];
										// 	GoogleService
										// 		.getPhoto(p.photo_reference, 500)
										// 		.then(function(res) {
										// 			console.log(res);
										// 			p.src = res;
										// 		})
										// }
									}

								}
							});
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