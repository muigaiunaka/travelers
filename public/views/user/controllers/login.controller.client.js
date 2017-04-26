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
                UserService
		    		.login(user)
		    		.then(function(user) {
		    			$rootScope.currentUser = user;
		    			$location.url("/user/" + user._id);
		    		}, function(err) {
		    			vm.error = 'Invalid username/password combination'
		    		});
		        
			} else {
	        	vm.error = 'Please fill out all fields';
	        }
	    }
	}
})();