(function() {
	angular
		.module("TravelApp")
		.controller("editPlanRouteController", editPlanRouteController);

	function editPlanRouteController($routeParams, TripService, GoogleService) {
		var vm = this;
		vm.userId = $routeParams.uid;
		vm.tripId = $routeParams.tid;
		vm.final = final;
		vm.revert = revert;
		vm.initMap = initMap;
		vm.addWaypoint = addWaypoint;
		vm.removeWaypoint = removeWaypoint;
		vm.gPlace;
		vm.routes;
		vm.map;
		vm.removed;
		vm.markers = [];
		vm.dirDisplay = [];

		function init() {
			TripService
				.findTripById(vm.tripId)
				.then(function(trip) {
					vm.trip = trip;

					if (vm.trip.route.list.length == 0) {
						var list = vm.trip.route.list;
						var count = $('ul.route').children('li').length;
						var temp = {
							id: count
						}
						list.push(temp);
						vm.routes = list;
					}

					GoogleService
						.generateMap()
						.then(function(map) {
							vm.initMap();
						});
				});
		}
		init();

		function initMap() {
			var bounds = new google.maps.LatLngBounds();
			var interests = vm.trip.interests.list;
			var places = vm.trip.route.list;

			// Create a new map
			vm.map = new google.maps.Map(document.getElementById('map'), {
				zoom: 4
			});

			// If user has selected interests, add them to the map
			for (var i = 0; i < interests.length; i++) {
                var marker = new google.maps.Marker({
                    map: vm.map,
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
                vm.markers.push(marker);
            }

            // if user has routes already, place them on map
            if (places[0].place != null) {
	            for (var i = 0; i < places.length; i++) {
	                var marker = new google.maps.Marker({
	                    map: vm.map,
	                    position: places[i].place.geometry.location
	                });
	                bounds.extend(places[i].place.geometry.location);
	                vm.markers.push(marker);
	            }
	        }
			vm.map.fitBounds(bounds);

			// Draw routes if user already has selected places
            if (places.length != 0) {
	            function renderDirections(result, index) {
	              var directionsRenderer = new google.maps.DirectionsRenderer;
	              directionsRenderer.setMap(vm.map);
	              directionsRenderer.setDirections(result);
	              vm.dirDisplay.push(directionsRenderer);
	              var duration = directionsRenderer.directions.routes[0].legs[0].duration.text;
	              var temp = '#'+index;
	              $(temp).find('.route__item__dir').html(duration);

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

	    function addWaypoint(e) {
	    	var routeItem = $(e.currentTarget).parent();
	    	if ($(routeItem).find('input').val().length != 0) {
		    	var count = $('ul.route').children('li').length;
		    	var list = vm.trip.route.list;
		    	var temp = { id: count };
				var init = $(routeItem).attr('id');

		    	list.splice(parseInt(init)+1, 0, temp);

		    	for(var i = 0; i < count+1; i++) {
		    		list[i].id = i;
		    	}
		    	vm.routes = list;
	    	} else {
	    		$(routeItem).find('input').focus();
	    	}
	    }

	    function removeWaypoint(e) {
	    	var routeItem = $(e.currentTarget).parent();
	    	var count = $('ul.route').children('li').length;
	    	var list = vm.trip.route.list;
			var init = parseInt($(routeItem).attr('id'));
			vm.removed = list.splice(init, 1);
			var markerId = vm.trip.interests.list.length + init; // lol this is so jank
			vm.markers[markerId].setMap(null);

	    	for(var i = 0; i < count-1; i++) {
	    		list[i].id = i;
	    	}
	    	vm.routes = list;
	    	google.maps.event.trigger(vm.gPlace, 'place_changed');

	    }

		function final() {
			var newTrip = vm.trip;
			newTrip.route.status = 'COMPLETE';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
				})
		}

		function revert() {
			var newTrip = vm.trip;
			newTrip.route.status = 'INPROGRESS';
			TripService
				.updateTrip(vm.tripId, newTrip)
				.then(function(res) {
				})
		}
	}
})();