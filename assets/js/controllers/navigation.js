mbd.controller('Navigation', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
function (vm, http, $timeout, $window, root) {
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
}]);
