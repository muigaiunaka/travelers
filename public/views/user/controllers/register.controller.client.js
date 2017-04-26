(function() {
	angular
		.module("TravelApp")
		.controller("registerController", registerController);

	function registerController(UserService, $location, $rootScope) {
		var vm = this;
    	vm.register = register;

		function init() {
            $('body')
                .attr('class','bg--dirty-brown');
		}
		init();

    	function isValidRegistration(user) {
    		return !angular.isUndefined(user) 
    			&& !angular.isUndefined(user.username) 
    			&& !angular.isUndefined(user.password)
    			&& !angular.isUndefined(user.verify)
    			&& user.username != ''
    			&& user.password != ''
    			&& user.verify != ''
    			&& user.verify == user.password;
    	}

    	function register(user) {
    		if (isValidRegistration(user)) {
    			// UserService
       //              .findUserByUsername(user.username)
       //              .then(function(newUser) {
       //                  if(newUser.message) {
       //                      vm.error = 'Available';

                            UserService
                                .register(user)
                                .then(function(user) {
                                    $rootScope.currentUser = user;
                                    $location.url("/user/"+user._id);
                                });



                            // UserService
                            //     .createUser(user)
                            //     .then(function(user) {
                            //         $location.url("/user/" + user._id);
                            //     });
                    //     } else { vm.error = "That Username is taken"; }
                    // }, function(err) {
                    //     vm.error = "Something went horribly wrong...";
                    // });
    		} else {
    			vm.error = 'Please fill out all fields';
    		}
    	}
	}
})();