mbd.controller('AdminPrefix', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
	"$location",
function (vm, http, $timeout, $window, root, $location) {

    if (!root.user || !root.user.admin) {
		// $location.path('/');
	}

	(getPrefixes = function () {http.get('/api/Workorders/get_prefixes')
	.success(function (data) {
		vm.prefixes = data;

		console.log(data);
	})})();

    vm.newPrefix = function () {
		vm.editing = false;
		vm.openCreatePrefix = true;
		vm.prefix = {};

	}

    vm.createPrefix = function () {
        if (!vm.prefix || !vm.prefix.prefix) {
            return;
        }

		http.post('/api/Workorders/createPrefix', vm.prefix)
	    .success(function (data) {
	    	if (data) {
	        	if (data.error) {
	            	root.$broadcast('errorFlash', data.error);
	        	}
	    	}

			getPrefixes();
	    	vm.openCreatePrefix = false;
	    });

    }

    vm.deletePrefix = function (prefix) {
	    http.post('/api/Workorders/deletePrefix', {
	        id: prefix.id
		}).success(function () {
	        getPrefixes();
    	});
	}

    vm.goBack = function () {
	    $window.history.back();
    };

}])
