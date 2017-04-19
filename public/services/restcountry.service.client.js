(function() {
	angular
		.module("TravelApp")
		.service("RESTcountry", RESTcountry);

	function RESTcountry($http) {
		var urlAll = "https://restcountries.eu/rest/v2/all";
		var api = {
			"getAll": getAll
		}
		return api;

		function getAll() {
			return $http.get(urlAll);;
		}
	}
})();