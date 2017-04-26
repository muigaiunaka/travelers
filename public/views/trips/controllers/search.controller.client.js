(function() {
	angular
		.module("TravelApp")
		.controller("searchController", searchController);

	function searchController($routeParams, TripService, $location) {
		var vm = this;
		vm.queryList = [];
		vm.search = search;

		function search() {
            var query = "";
            for (var t in vm.queryList) {
                query += vm.queryList[t]+"_";
            }
            query = query.substr(0, query.length-1);
			$location.url("/search/trip-results?q="+query);
		}
	}
})();