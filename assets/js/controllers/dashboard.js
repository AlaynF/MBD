mbd.controller('Dashboard', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
	"$location",
function (vm, http, $timeout, $window, root, $location) {
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

	(getOpenTasks = function() {http.get('/api/task_times/get_open_by_employee')
	.success(function ( data) {
		vm.openTasks = data;
	})})();

	vm.sayHello = function () {
		console.log('hello');
	}

	vm.newTask = function () {
		vm.newTaskTime = new Date();
		vm.openNewTask = true;
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

	vm.startTask = function () {
		var workorder_reference;

		if (!vm.workorder || !vm.task) {
			return;
		}

		workorder_reference = (vm.workorder_pre || "") + vm.workorder;

		http.post('/api/task_times/create', {
			workorder_reference: workorder_reference,
			task_id: vm.task,
			notes: vm.notes
		}).success(function (data) {
			vm.openNewTask = false;
			getOpenTasks();
		});
	}

	vm.continueTask = function (task) {
		http.post('/api/task_times/continue_task', {
			id: task.id,
			workorder_id: task.workorder_id
		}).success(function () {
			getOpenTasks();
		});
	}

	vm.pauseTask = function (task) {
		http.post('/api/task_times/pause_task', {
			id: task.id,
			workorder_id: task.workorder_id
		}).success(function () {
			getOpenTasks();
		});
	}

	vm.stopTask = function (task) {
		http.post('/api/task_times/stop_task', {
			id: task.id,
			workorder_id: task.workorder_id
		}).success(function () {
			getOpenTasks();
		});
	}
}]);
