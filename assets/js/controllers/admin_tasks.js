mbd.controller('AdminTasks', [
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

	(getTasks = function () {http.get('/api/tasks/get_all')
	.success(function (data) {
		vm.tasks = data;

		console.log(data);
	})})();


	vm.newTask = function () {
		vm.newTaskTime = new Date();
		vm.openNewTask = true;
		vm.editing = false;
		vm.task = {};
	}

	vm.editTask = function (task) {
		vm.newTaskTime = new Date();
		vm.openNewTask = true;
		vm.editing = true;
		vm.task = task;
	}

	vm.createTask = function () {
		if (!vm.task || !vm.task.name) {
			return;
		}

		http.post('/api/tasks/create', vm.task)
		.success(function (data) {
			if (data) {
				if (data.error) {
					root.$broadcast('errorFlash', data.error);
				}
			}
			getTasks();

			vm.openNewTask = false;
		});
	}

	vm.submitEditTask = function (){
		console.log(vm.task);

		http.post('/api/tasks/edit', vm.task)
		.success(function (data) {
			if (data) {
				if (data.error) {
					root.$broadcast('errorFlash', data.error);
				}
			}
			getTasks();

			vm.openNewTask = false;
		});
	}

	vm.deleteTask = function (task) {
		http.post('/api/tasks/delete', {
			id: task.id
		}).success(function () {
			getTasks();
		});
	}

	vm.goBack = function () {
		$window.history.back();
	};
}]);
