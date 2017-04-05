(function() {
	angular
		.module("TravelApp")
		.service("UserService", UserService);

	function UserService($http) {
		var api = {
            "createUser": createUser,
            "deleteUser": deleteUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername
        };
        return api;

        // returns the user in local users array whose _id matches the userId parameter
        function findUserById(userId) {
            return $http.get("/api/user/"+userId)
                .then(function (response) {
                    return response.data;
                });
        }

        // removes the user whose _id matches the userId parameter
        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId)
                .then(function (response) {
                    return response.data;
                });
        }

        // updates the user in local users array whose _id matches the userId parameter
        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser)
                .then(function (response) {
                    return response.data;
                }, function(err) {
                    return err.data;
                });
        }

        // returns the user whose username and password match the username and password parameters
        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password)
                .then(function (response) {
                    return response.data;
                });
        }

        // returns the user in local users array whose username matches the parameter username
        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username)
                .then(function (response) {
                    return response.data;
                });
        }

        // adds the user parameter instance to the local users array
        function createUser(user) {
            return $http.post("/api/user", user)
                .then(function (response) {
                    return response.data;
                });
        }
	}
})();