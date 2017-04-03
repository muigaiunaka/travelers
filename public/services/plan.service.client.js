(function() {
    angular
        .module("TravelApp")
        .factory("PlanService", PlanService);

    function PlanService($http) {

        var api = {
            "createPlan": createPlan,
            "updatePlan": updatePlan,
            "deletePlan": deletePlan,
            "findPlanByUserId": findPlanByUserId,
            "findPlanById": findPlanById
        }
        return api;

        // adds the plan parameter instance to the local plans array. The new plan's userId is set to the userId parameter
        function createPlan(userId, plan) {
            return $http.post("/api/user/"+userId+"/plan", plan)
                .then(function (response) {
                    return response.data;
                });
        }

        // retrieves the plans in local plans array whose userId matches the parameter userId
        function findPlanByUserId(userId) {
            return $http.get("/api/user/"+userId+"/plan")
                .then(function (response) {
                    return response.data;
                });
        }
        
        // retrieves the plan in local plans array whose _id matches the planId parameter
        function findPlanById(planId) {
            return $http.get("/api/plan/"+planId)
                .then(function (response) {
                    return response.data;
                });
        }
        
        // updates the plan in local plans array whose _id matches the planId parameter
        function updatePlan(planId, newPlan) {
            return $http.put("/api/plan/"+planId, newplan)
                .then(function (response) {
                    return response.data;
                });
        }

        // removes the plan from local plans array whose _id matches the planId parameter
        function deletePlan(planId) {
            return $http.delete("/api/plan/"+planId)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();