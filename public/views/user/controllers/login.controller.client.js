(function() {
	angular
		.module("TravelApp")
		.controller("loginController", loginController);

	function loginController($location, UserService, $rootScope) {
		var vm = this;
    	vm.login = login;

    	function isValidLogin(user) {
    		return !angular.isUndefined(user) 
    			&& !angular.isUndefined(user.username) 
    			&& !angular.isUndefined(user.password)
    			&& user.username != ''
    			&& user.password != '';
    	}

	    function login(user) {
	    	if (isValidLogin(user)) {
		        // UserService
          //           .findUserByCredentials(user.username, user.password)
          //           .then(function(user) { //returns the object that we get from the server
          //               if(user.message) {
          //                   vm.error = 'User not found';
          //               } else { $location.url("/user/" + user._id); }
          //           }, function(err) { vm.error = 'Something went horribly wrong...'; });

                UserService
		    		.login(user)
		    		.then(function(user) {
		    			$rootScope.currentUser = user;
		    			$location.url("/user/" + user._id);
		    		});
		        
			} else {
	        	vm.error = 'Please fill out all fields';
	        }
	    }
	}
})();