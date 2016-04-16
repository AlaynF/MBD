mbd.controller('AdminWorkorders', [
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

	console.log($routeParams.eid);

	if ($routeParams.eid) {
		http.get('/api/workorders/get_by_employee?eid=' + $routeParams.eid)
		.success(function (data) {
			vm.workorders = data;

			console.log(data);
		});

		http.get('/api/employees/get_by_id?id=' + $routeParams.eid)
		.success(function (data) {
			vm.employee = data;
		});
	} else {
		(getWorkorders = function () {http.get('/api/workorders/get_all')
		.success(function (data) {
			vm.workorders = data;

			console.log(data);
		})})();
	}

	vm.goBack = function () {
		$window.history.back();
	};

	vm.$watch('search.query', function() {
		if (vm.search && vm.search.query && vm.search.query.length > 2) {
			http.get('/api/workorders/search?q=' + encodeURI(vm.search.query))
			.success(function (data) {
				vm.workorders = data;
			});
		} else {
			getWorkorders();
		}
	});
}]);
