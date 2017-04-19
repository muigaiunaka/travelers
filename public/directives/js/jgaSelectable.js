(function() {
	angular
		.module("appDirectives")
		.directive("jgaSelectable", jgaSelectable);

	function jgaSelectable($routeParams, TripService) {
		function linkFunction(scope, element) {
			var userId = $routeParams.uid;
			var tripId = $routeParams.tid;
			$( element ).selectable({
		        stop: function() {
		        	var cPOIs = scope.countryPois;
		            var results = scope.model.trip.interests.list;
		            $( ".ui-selected", this ).each(function() {
		            	var temp = {
		            		_id: $(this).attr('id')
		            	}
		            	var index = cPOIs.map((e) => (e.id)).indexOf(temp._id);
		            	var i = results.map((e) => (e.id)).indexOf(temp._id);
		            	if (index != -1) {
				            	var selectedPoi = cPOIs[index];
		            		if (i == -1) {
				            	results.push(selectedPoi);
				            	selectedPoi.status = 'SELECTED';
		            		} else {
		            			results.splice(i, 1);
				            	selectedPoi.status = '';
		            		}

		            		TripService
		            			.updateTrip(tripId, scope.model.trip)
		            			.then(function(res) {
		            				// scope.model.update();
		            			})
		            	}
		            });
		        }
		    });
		}
		return {
			link: linkFunction,
			scope: { 
				model: '=',
				countryPois: '='
			}
		}
	}
})();