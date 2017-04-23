(function() {
	angular
		.module("TravelApp")
		.controller("tripReviewController", tripReviewController);

	function tripReviewController($routeParams, UserService, TripService, $location) {
		var vm = this;
		vm.userId = $routeParams.uid;
		vm.tripId = $routeParams.tid;
		vm.daysBetween = daysBetween;
		vm.initMap = initMap;
		vm.final = final;
		vm.revert = revert;
		vm.travelTimes = [];

		function init() {
			TripService
				.findTripById(vm.tripId)
				.then(function(trip) {
					vm.trip = trip;
					vm.initMap();
					formatDate(vm.trip, trip);

					UserService
						.findUserById(vm.trip._user)
						.then(function(user) {
							vm.user = user;
						})
				});
		}
		init();

		// Draw route of planned trip
		function initMap() {
			var bounds = new google.maps.LatLngBounds();
			var interests = vm.trip.interests.list;
			var places = vm.trip.route.list;
			var markers = [];
			var dirDisplay = [];

			// Create a new map
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 4,
				disableDefaultUI: true
			});

			// If user has selected interests, add them to the map
			for (var i = 0; i < interests.length; i++) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: interests[i].geometry.location
                });
                var pinIcon = new google.maps.MarkerImage(
                    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFFF00",
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(10, 20)
                    );
                marker.setIcon(pinIcon);
                bounds.extend(interests[i].geometry.location);
                markers.push(marker);
            }

            // if user has routes already, place them on map
            if (places[0].place != null) {
	            for (var i = 0; i < places.length; i++) {
	                var marker = new google.maps.Marker({
	                    map: map,
	                    position: places[i].place.geometry.location
	                });
	                bounds.extend(places[i].place.geometry.location);
	                markers.push(marker);
	            }
	        }
			map.fitBounds(bounds);

			// Draw routes if user already has selected places
            if (places.length != 0) {
	            function renderDirections(result, index) {
	              var options = {
	              	preserveViewport: true
	              }
	              var directionsRenderer = new google.maps.DirectionsRenderer(options);
	              directionsRenderer.setMap(map);
	              directionsRenderer.setDirections(result);
	              dirDisplay.push(directionsRenderer);
	              var duration = directionsRenderer.directions.routes[0].legs[0].duration.text;
	              var temp = '#'+index;
	              $(temp).find('.route__item__dir').html(duration);
	              var temp = {
	              	start: directionsRenderer.directions.routes[0].legs[0].start_address,
	              	end: directionsRenderer.directions.routes[0].legs[0].end_address,
	              	duration: duration
	              }
	              TripService
	              	.findTripById(vm.tripId)
	              	.then(function(trip) {
	              		vm.travelTimes[index] = temp; // couldn't find a better way to make this update
	              	})

	            }

	            var directionsService = new google.maps.DirectionsService;
	            function requestDirections(start, end, index) {
	              directionsService.route({
	                origin: start,
	                destination: end,
	                travelMode: google.maps.DirectionsTravelMode.DRIVING // TRANSIT
	              }, function(result) {
	                renderDirections(result, index);
	              });
	            }
	            for (var i = 0; i < places.length; i++) {
	            	var input = '#'+i+' input';
	            	if (places[i].place) {
		            	$(input).val(places[i].place.formatted_address);
		                if ((i+1) != places.length) {
		                    requestDirections(places[i].place.geometry.location,
		                        places[i+1].place.geometry.location, i);
		                }
	            	}
	            }
	        }
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

		function formatDate(t1, t2) {
			t1.start = new Date(t2.start);
			t1.end = new Date(t2.end);
			for (var day in t1.timeline.list) {
				var list = t1.timeline.list;
				list[day].arrival = new Date(list[day].arrival);
			}
		}

		function final() {
			var newTrip = vm.trip;
			newTrip.state = 'UPCOMING';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
					$location.url("/user/" + vm.userId);
				})
		}

		function revert() {
			var newTrip = vm.trip;
			newTrip.state = 'PLANNING';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
					$location.url("/user/" + vm.userId);
				})
		}
	}
})();