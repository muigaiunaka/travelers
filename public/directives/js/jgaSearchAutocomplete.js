(function() {
	angular
		.module("appDirectives")
		.directive("jgaSearchAuto", jgaSearchAuto);

	function jgaSearchAuto($routeParams, RESTcountry, TripService) {
		function linkFunction(scope, element) {
			var userId = $routeParams.uid;
			var tripId = $routeParams.tid;
			var availableTags = [];
			var selectedTerms = ["hello"];
			var fillInput = false;
			var save = true;
			var el;
			switch ($(element).attr('id')) {
				case "searchTrips":
					el = $(element).find('#search');
					fillInput = false;
					save = false;
					RESTcountry
						.getAll()
						.then(function(response) {
							var temp = response.data;
							for(var c in temp) {
								availableTags.push(temp[c].name);
							}
						});
					break;
				case "selectedCities":
					el = $(element).find('#dest');
					fillInput = true;
					availableTags = scope.model.destinations;
					break;
				default:
					el = $('#search');
					fillInput = false;
					RESTcountry
						.getAll()
						.then(function(response) {
							var temp = response.data;
							for(var c in temp) {
								availableTags.push(temp[c].name);
							}
						});
			}

		    function split( val ) {
		      return val.split( /,\s*/ );
		    }
		    function extractLast( term ) {
		      return split( term ).pop();
		    }

		    $(el).on( "keydown", function( event ) {
		        if ( event.keyCode === $.ui.keyCode.TAB &&
		            $( this ).autocomplete( "instance" ).menu.active ) {
		          event.preventDefault();
		        }
		      })
		      .autocomplete({
		        minLength: 0,
		        source: function( request, response ) {
		          // delegate back to autocomplete, but extract the last term
		          response( $.ui.autocomplete.filter(
		            availableTags, extractLast( request.term ) ) );
		        },
		        focus: function() {
		          // prevent value inserted on focus
		          return false;
		        },
		        select: function( event, ui ) {
		          if (fillInput) {
		          	this.value = ui.item.value;
		          	return false;
		          } else {
			          var terms = split( this.value );

			          // remove the current input
			          terms.pop();
			          // add the selected item
			          if (save) {
			          	  TripService
			          		.findTripById(tripId)
			          		.then(function(trip) {
			          			var selectedTerms = trip.countries.list;
			         			if (selectedTerms.map((e) => (e.name)).indexOf(ui.item.value) == -1) {
				          			var newTrip = trip;
				          			newTrip.countries.list.push({
				          				name: ui.item.value
				          			});
				          			TripService
				          				.updateTrip(tripId, newTrip)
				          				.then(function(status) {
				          					//make sure updates to the db are reflected in the view
				          					scope.model.update();
				          				});
			          			}
			          	  });
				          // add placeholder to get the comma-and-space at the end
				          terms.push( "" );
				          this.value = terms.join( ", " );
				          return false;
			          } else {
			          		this.value = '';
			          		if (scope.model.queryList.indexOf(ui.item.value) == -1) {
			          			scope.model.queryList.push(ui.item.value);
			          		}
			          		console.log(scope.model.queryList);
			          		return false;
			          }
			        }
			    }
		      });
		}

		return {
			link: linkFunction,
			scope: { model: '=' }
		}
	}
})();