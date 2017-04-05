(function() {
	angular
		.module("TravelApp")
		.service("TimelineService", TimelineService);

	function TimelineService($http) {
		var api = {
            "createTimeline": createTimeline,
            "deleteTimeline": deleteTimeline,
            "updateTimeline": updateTimeline,
            "reorderTimeline": reorderTimeline,
            "findTimelineById": findTimelineById
        };
        return api;

        // adds the timeline parameter instance to the local trip or plan array
        function createTimeline(tripId, timeline) {
            return $http.post("/api/timeline", timeline)
                .then(function (response) {
                    return response.data;
                });
        }

        // removes the timeline whose _id matches the timelineId parameter
        function deleteTimeline(timelineId) {
            return $http.delete("/api/timeline/"+timelineId)
                .then(function (response) {
                    return response.data;
                });
        }

        // updates the timeline in local timelines array whose _id matches the timelineId parameter
        function updateTimeline(timelineId, newTimeline) {
            return $http.put("/api/timeline/"+timelineId, newTimeline)
                .then(function (response) {
                    return response.data;
                });
        }

        function reorderTimeline(tripId, index1, index2) {
            return $http.put("/api/trip/"+tripId+"/timeline?initial="+index1+"&final="+index2)
                .then(function (response) {
                    return response.data;
                });
        }

        function findTimelineById(timelineId) {
            return $http.get("/api/timeline/"+timelineId)
                .then(function (response) {
                    return response.data;
                });
        }
	}
})