(function() {
	angular
		.module("appDirectives")
		.directive("appHeader", appHeader)

	function appHeader() {
		function linkFunction() {
			// TODO: lol fix yo life. And add some code.
		}

		return {
			restrict: 'A',
			templateUrl: '/includes/header.template.html',
			link: linkFunction
		}
	}
})();
