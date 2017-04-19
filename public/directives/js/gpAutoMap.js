(function() {
	angular
		.module("appDirectives")
		.directive("gpAutoMap", gpAutoMap);

	function gpAutoMap($routeParams, TripService) {
        var userId = $routeParams.uid;
        var tripId = $routeParams.tid;
		function linkFunction(scope, element, attrs, model) {
            var id = 0;
            var options = {
                types: ['(cities)'],
                componentRestrictions: {'country': []}
            };

            // clears routes and markers from current map
            function clearMap() {
                function setMapNull(array) {
                    for(var i = 0; i < array.length; i++) {
                        array[i].setMap(null);
                    }
                }
                setMapNull(scope.model.markers);
                setMapNull(scope.model.dirDisplay);
                scope.model.markers = [];
                scope.model.dirDisplay = [];
            }
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {

                /* TODO: FIX THIS.  pretty inefficient to redraw the map every time */

                clearMap();

                /* *** Draw Updated Map **** */

                var interests = scope.model.trip.interests.list;
                var places = scope.model.routes;
                var count = $('ul.route').children('li').length;
                var bounds = new google.maps.LatLngBounds();
                var index;

                // get position for newly added input
                index = parseInt($(element).parents('li.route__item').attr('id')); 

                if (scope.model.trip.route.list[index] != null) {

                    // get place details for new input value
                    scope.model.routes[index].place = scope.gPlace.getPlace();
                }

                // Draw markers for interests
                for (var i = 0; i < interests.length; i++) {
                    var marker = new google.maps.Marker({
                        map: scope.model.map,
                        position: interests[i].geometry.location
                    });
                    var pinIcon = new google.maps.MarkerImage(
                        "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFFF00",
                        null, null, null, new google.maps.Size(10, 20)
                        );
                    marker.setIcon(pinIcon);
                    bounds.extend(interests[i].geometry.location);
                    scope.model.markers.push(marker);
                }

                // Draw markers for places
                for (var i = 0; i < places.length; i++) {
                    var marker = new google.maps.Marker({
                        map: scope.model.map,
                        position: places[i].place.geometry.location
                    });
                    bounds.extend(places[i].place.geometry.location);
                    scope.model.markers.push(marker);
                }
                scope.model.map.fitBounds(bounds);

                function renderDirections(result, index) {
                  var directionsRenderer = new google.maps.DirectionsRenderer;
                  directionsRenderer.setMap(scope.model.map);
                  directionsRenderer.setDirections(result);
                  scope.model.dirDisplay.push(directionsRenderer);
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
                    if ((i+1) != places.length) {
                        requestDirections(places[i].place.geometry.location,
                            places[i+1].place.geometry.location, i);
                    }
                }
                TripService
                    .updateTrip(tripId, scope.model.trip)
                    .then(function(status) {
                    });
                // scope.model.updateMap(element);
                // scope.$apply(function() {
                //     // model.$setViewValue(element.val());                
                // });

            });
            scope.model.gPlace = scope.gPlace;
        }
		return {
			required: 'ngModel',
            scope: { 
                type: '=',
                model: '='
            },
			link: linkFunction
		}
	}
})();