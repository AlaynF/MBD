mbd.controller('Admin', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
	"$location",
function (vm, http, $timeout, $window, root, $location) {
	console.log(root.user);

	if (!root.user || !root.user.admin) {
		// $location.path('/');
	}

	vm.optionAction = function (action) {
		if (action.indexOf('/') == 0) {
			$location.path(action);
		} else {
			if (vm[action]) {
				vm[action]();
			}
		}
	}
}]);
