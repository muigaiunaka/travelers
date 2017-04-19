(function() {
	angular
		.module("TravelApp")
		.controller("editPlanTimelineController", editPlanTimelineController);

	function editPlanTimelineController($routeParams, TripService) {
		var vm = this;
		vm.userId = $routeParams.uid;
		vm.tripId = $routeParams.tid;
		vm.setDateRange = setDateRange;
		vm.saveDay = saveDay;
		vm.insertDay = insertDay;
		vm.deleteDay = deleteDay;
		vm.daysBetween = daysBetween;
		vm.final = final;
		vm.revert = revert;
		vm.update = update;
		vm.destinations = [];

		function init() {
			TripService
				.findTripById(vm.tripId)
				.then(function(trip) {
					vm.trip = trip;
					vm.trip.start = new Date(trip.start);
					vm.trip.end = new Date(trip.end);
					for (var day in vm.trip.timeline.list) {
						var list = vm.trip.timeline.list;
						list[day].arrival = new Date(list[day].arrival);
					}
					for (var p in vm.trip.route.list) {
						vm.destinations.push(vm.trip.route.list[p].place.formatted_address);
					}
				});
		}
		init();

		function setDateRange(trip) {
			var today = new Date();
			if (trip.start < trip.end && trip.start > today) {
				var start = new Date(trip.start);
				var end = new Date(trip.end);
				var newTrip = vm.trip;

				newTrip.start = trip.start;
				newTrip.end = trip.end;
				TripService
					.updateTrip(vm.tripId, trip)
					.then(function(status) {
						vm.success = 'Updated';
						if (vm.trip.timeline.list.length == 0) {
							createDay();
						}
					});
			} else { vm.error = 'Please select a valid date range' }
		}

		function createDay(order) {
			order = (order == null) ? 0 : parseInt(order)+1;
			var temp = {
				_parent: vm.tripId,
				arrival: vm.trip.start,
				order: null,
				city: null //place_id
			}
			vm.trip.timeline.list.splice(order, 0, temp);

			for (var day in vm.trip.timeline.list) {
				vm.trip.timeline.list[day].order = day;
			}
			TripService
				.updateTrip(vm.tripId, vm.trip)
				.then(function(status){});
		}

		function saveDay(dayId, day) {
			var newTrip = vm.trip;
			var i = newTrip.timeline.list.map((e)=> e._id).indexOf(dayId);

			newTrip.timeline.list[i] = day;
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(status){});
		}

		function insertDay(dayId) {
			createDay(dayId);
		}

		function deleteDay(dayId) {
			var newTrip = vm.trip;
			var i = newTrip.timeline.list.map((e)=> e._id).indexOf(dayId);
			newTrip.timeline.list.splice(i, 1);
			for (var day in vm.trip.timeline.list) {
				vm.trip.timeline.list[day].order = day;
			}
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(status){});
		}

		function update() {
			TripService
				.findTripById(vm.tripId)
				.then(function(trip) {
					vm.trip = trip;
				});
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

		function final() {
			var newTrip = vm.trip;
			newTrip.timeline.status = 'COMPLETE';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
				})
		}

		function revert() {
			var newTrip = vm.trip;
			newTrip.timeline.status = 'INPROGRESS';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
				})
		}
	}
})();