(function() {
	angular
		.module("TravelApp")
		.service("RouteService", RouteService);

	function RouteService($http) {
		var api = {
            "createRoute": createRoute,
            "deleteRoute": deleteRoute,
            "updateRoute": updateRoute,
            "reorderRoute": reorderRoute,
            "findRouteById": findRouteById
        };
        return api;

        // adds the route parameter instance to the local trip or plan array
        function createRoute(tripId, route) {
            return $http.post("/api/route", route)
                .then(function (response) {
                    return response.data;
                });
        }

        // removes the route whose _id matches the routeId parameter
        function deleteRoute(routeId) {
            return $http.delete("/api/route/"+routeId)
                .then(function (response) {
                    return response.data;
                });
        }

        // updates the route in local routes array whose _id matches the routeId parameter
        function updateRoute(routeId, newRoute) {
            return $http.put("/api/route/"+routeId, newRoute)
                .then(function (response) {
                    return response.data;
                });
        }

        function reorderRoute(tripId, index1, index2) {
            return $http.put("/api/trip/"+tripId+"/route?initial="+index1+"&final="+index2)
                .then(function (response) {
                    return response.data;
                });
        }

        function findRouteById(routeId) {
            return $http.get("/api/route"+routeId)
                .then(function (response) {
                    return response.data;
                });
        }
	}
})