mbd.controller('Login', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
	'$location',
function (vm, http, $timeout, $window, root, $location) {
	document.title = 'Login - MBD Repair Tools';

	root.$broadcast('changeTitle', {title: ''});

	if (!$window.localStorage.unlocked) {
		$location.path('/unlock');
		return;
	}

	vm.unlocked = true;

	vm.passcode = '';

	vm.keypadclick = function(number) {
		if (!number) {
			vm.passcode = '';
			return;
		}

		vm.passcode += number;

		if  (vm.passcode.length > 8) {
			vm.passcode = '';
			return;
		}

		if  (vm.passcode.length > 3) {
			http.post('/api/employees/get_by_passcode', {
				passcode: vm.passcode
			}).success(function (data) {
				if (data.success) {
					if (data.user) {
						delete data.user.passcode;

						root.user = data.user;

						$location.path('/dashboard');
					}
				}
			});
		}
	}
}]);
