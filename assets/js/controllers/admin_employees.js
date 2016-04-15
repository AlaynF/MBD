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

	(getEmployees = function () {http.get('/api/employees/get_all')
	.success(function (data) {
		vm.employees = data;

		console.log(data);
	})})();

	http.get('/api/shops/get_all')
	.success(function (data) {
		vm.shops = data;
	});

	vm.newEmployee = function () {
		vm.newTaskTime = new Date();
		vm.openNewEmployee = true;
		vm.editing = false;
		vm.employee = {};
	}

	vm.editEmployee = function (employee) {
		vm.newTaskTime = new Date();
		vm.openNewEmployee = true;
		vm.editing = true;
		vm.employee = employee;
	}

	vm.createEmployee = function () {
		if (!vm.employee || !vm.employee.shop_id) {
			return;
		}

		if (!vm.employee.email || !vm.employee.name) {
			return;
		}

		if (!vm.employee.passcode) {
			return;
		}

		http.post('/api/employees/create', vm.employee)
		.success(function (data) {
			if (data) {
				if (data.error) {
					root.$broadcast('errorFlash', data.error);
				}
			}

			vm.openNewEmployee = false;
		});
	}

	vm.submitEditEmployee = function (){
		console.log(vm.employee);

		http.post('/api/employees/edit', vm.employee)
		.success(function (data) {
			if (data) {
				if (data.error) {
					root.$broadcast('errorFlash', data.error);
				}
			}

			vm.openNewEmployee = false;
		});
	}

	vm.deleteEmployee = function (employee) {
		http.post('/api/employees/delete', {
			id: employee.id
		}).success(function () {
			getEmployees();
		});
	}

	vm.goBack = function () {
		$window.history.back();
	};
}]);
