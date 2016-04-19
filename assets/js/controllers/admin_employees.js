mbd.controller('AdminEmployees', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
	"$location",
function (vm, http, $timeout, $window, root, $location) {
	vm.listedShops = {};

	document.title = 'Employees - MBD Repair Tools';

	root.$broadcast('changeTitle', {title: 'Employees'});

	if (!root.user || !root.user.admin) {
		// $location.path('/');
	}

	(getEmployees = function () {http.get('/api/employees/get_all')
	.success(function (data) {
		vm.employees = data;

		data.forEach(function (employee) {
			vm.listedShops[employee.shop_id.name] = true;
		});

		console.log(vm.listedShops);
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
				} else {
					vm.openNewEmployee = false;
					getEmployees();
				}
			}
		});
	}

	vm.submitEditEmployee = function (){
		console.log(vm.employee);

		http.post('/api/employees/edit', vm.employee)
		.success(function (data) {
			if (data) {
				if (data.error) {
					root.$broadcast('errorFlash', data.error);
				} else {
					vm.openNewEmployee = false;
				}
			}
		});
	}

	vm.deleteEmployee = function (employee) {
		var confirmDelete = (prompt("Are you sure you want to delete this user? This is not reversible. Type 'Delete' below to delete user.").toLowerCase() == "delete");

		if (confirmDelete) {
			http.post('/api/employees/delete', {
				id: employee.id
			}).success(function () {
				getEmployees();
			});
		}
	}

	vm.goBack = function () {
		$window.history.back();
	};


	vm.$watch('search.query', function() {
		if (vm.search && vm.search.query && vm.search.query.length > 2) {
			http.get('/api/employees/search?q=' + encodeURI(vm.search.query))
			.success(function (data) {
				vm.employees = data;
			});
		} else {
			getEmployees();
		}
	});


	vm.filterEmployees = function (employee) {
		if (vm.filter && vm.filter.shop) {
			if (vm.filter.shop != employee.shop_id.name) {
				return false;
			}
		}

		return true;
	};
}]);
