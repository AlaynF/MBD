mbd.controller('Dashboard', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
function (vm, http, $timeout, $window, root) {
	document.title = 'Dashboard - MBD Repair Tools';

	root.$broadcast('changeTitle', {title: 'Dashboard'});

	http.get('/api/dashboard/get_options')
	.success(function (data) {
		vm.options = data;
	});

	http.get('/api/tasks/get_all')
	.success(function (data) {
		vm.tasks = data;
	});

	http.get('/api/task_times/get_open_by_employee')
	.success(function ( data) {
		vm.openTasks = data;
	});

	vm.sayHello = function () {
		console.log('hello');
	}

	vm.newTask = function () {
		vm.newTaskTime = new Date();
		vm.openNewTask = true;
	}

	vm.optionAction = function (action) {
		if (vm[action]) {
			vm[action]();
		}
	}

	vm.startTask = function () {
		var workorder_reference;

		if (!vm.workorder || !vm.task) {
			return;
		}

		workorder_reference = (vm.workorder_pre || "") + vm.workorder;

		console.log({
			workorder_reference: workorder_reference,
			task_id: vm.task
		});

		http.post('/api/task_times/create', {
			workorder_reference: workorder_reference,
			task_id: vm.task
		}).success(function (data) {
			console.log(data);
		});
	}
}]);
