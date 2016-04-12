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
}]);
