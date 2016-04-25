mbd.controller('Unlock', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
	"$location",
function (vm, http, $timeout, $window, root, $location) {

	if ($window.localStorage.unlocked) {
		$location.path('/');
		return;
	}

	vm.submit = function() {
		http.post('/api/dashboard/unlock', {
			password: vm.password
		}).success(function () {
			$window.localStorage.unlocked = Date.now();

			$location.path('/');
		}).error(function() {
			console.log('NOPE');
		});
	}
}]);
