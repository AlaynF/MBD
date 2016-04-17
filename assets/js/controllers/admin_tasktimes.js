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

	var getTasktimes = function () {
		http.get('/api/task_times/get_all')
		.success(function (data) {
			vm.tasktimes = data;

			console.log(data);
		});
	};


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

		vm.exportUrl = '/api/task_times/export?eid=' + $routeParams.eid;
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

		vm.exportUrl = '/api/task_times/export?wid=' + $routeParams.wid;
	} else if ($routeParams.tid) {
		http.get('/api/task_times/get_by_task?id=' + $routeParams.tid)
		.success(function (data) {
			vm.tasktimes = data;

			console.log(data);
		});

		http.get('/api/tasks/get_by_id?id=' + $routeParams.tid)
		.success(function (data) {
			vm.task = data;
		});

		vm.exportUrl = '/api/task_times/export?tid=' + $routeParams.tid;
	} else if ($routeParams.sid) {
		http.get('/api/task_times/get_by_shop?id=' + $routeParams.sid)
		.success(function (data) {
			vm.tasktimes = data;

			console.log(data);
		});

		http.get('/api/shops/get_by_id?id=' + $routeParams.sid)
		.success(function (data) {
			vm.shop = data;
		});

		vm.exportUrl = '/api/task_times/export?tid=' + $routeParams.tid;
	} else {
		vm.exportUrl = '/api/task_times/export?all=t';
		getTasktimes();
	}

	vm.goBack = function () {
		$window.history.back();
	};

	vm.$watch('search.query', function(a,b) {
		console.log('hmm', a,b);
		if (vm.search && vm.search.query && vm.search.query.length > 2) {
			http.get('/api/task_times/search?q=' + encodeURI(vm.search.query))
			.success(function (data) {
				vm.tasktimes = data;
			});
		} else if (a || b) {
			getTasktimes();
		}
	});

	vm.export = function () {
		if ($routeParams.eid) {
			http.get('/api/task_times/export?eid=' + $routeParams.eid);
		}
	}
}]);
