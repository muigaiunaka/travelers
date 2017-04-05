(function() {
	angular
		.module("appDirectives")
		.directive("appHeader", appHeader)

	function appHeader() {
		function linkFunction(scope, element) {
			// TODO: lol fix yo life. And add some code.
			var pageId = $('main .container').attr('id');
			console.log(scope);
		}

		return {
			restrict: 'A',
			templateUrl: '/includes/header.template.html',
			link: linkFunction
		}
	}
})();
