mbd.controller('Navigation', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
	"$timeout",
function (vm, http, $timeout, $window, root, $timeout) {
	vm.$on('changeTitle', function (event, args) {
		vm.title = args.title;
	});

	if (window.localStorage.last_user) {
		vm.last_user = JSON.parse(window.localStorage.last_user);
	}

	root.$watch('user', function () {
		if (root.user) {
			window.localStorage.last_user = JSON.stringify(root.user);
			vm.last_user = root.user;
		}
	});

	vm.$on('errorFlash', function (event, message) {
		vm.errorMessage = message;
		vm.showError = true;

		$timeout(function () {
			vm.showError = false;
		}, 7000);
	});

	vm.dismissError = function () {
		vm.showError = false;
	}
}]);
