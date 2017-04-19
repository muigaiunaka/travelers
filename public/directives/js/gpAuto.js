(function() {
	angular
		.module("appDirectives")
		.directive("gpAuto", gpAuto);

	function gpAuto() {
		function linkFunction(scope, element, attrs, model) {
            var options = {
                types: ['(regions)'],
                componentRestrictions: {'country': []}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    // model.$setViewValue(element.val());                
                });
            });
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