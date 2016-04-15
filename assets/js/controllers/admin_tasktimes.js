mbd.controller('AdminTasktimes', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
	"$location",
	"$routeParams",
function (vm, http, $timeout, $window, root, $location, $routeParams) {
	console.log(root.user);

	if (!root.user || !root.user.admin) {
		// $location.path('/');
	}


	if ($routeParams.eid) {
		http.get('/api/task_times/get_by_employee?id=' + $routeParams.eid)
		.success(function (data) {
			vm.tasktimes = data;

			console.log(data);
		});

		http.get('/api/employees/get_by_id?id=' + $routeParams.eid)
		.success(function (data) {
			vm.employee = data;
		});
	} else if ($routeParams.wid) {
		http.get('/api/task_times/get_by_workorder?id=' + $routeParams.wid)
		.success(function (data) {
			vm.tasktimes = data;

			console.log(data);
		});

		http.get('/api/workorders/get_by_id?id=' + $routeParams.wid)
		.success(function (data) {
			vm.workorder = data;
		});
	} else {
		(getTasktimes = function () {http.get('/api/task_times/get_all')
		.success(function (data) {
			vm.tasktimes = data;

			console.log(data);
		})})();
	}

	vm.goBack = function () {
		$window.history.back();
	};
}]);
