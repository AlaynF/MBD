mbd.controller('AdminEmployees', [
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

	http.get('/api/employees/get_all')
	.success(function (data) {
		vm.employees = data;

		console.log(data);
	});

	http.get('/api/shops/get_all')
	.success(function (data) {
		vm.shops = data;

		console.log(data);
	});

	vm.optionAction = function (action) {
		if (action.indexOf('/') == 0) {
			$location.path(action);
		} else {
			if (vm[action]) {
				vm[action]();
			}
		}
	}

	vm.newEmployee = function () {
		vm.newTaskTime = new Date();
		vm.openNewEmployee = true;
	}
}]);
