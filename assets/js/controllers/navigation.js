mbd.controller('Navigation', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
function (vm, http, $timeout, $window) {
	vm.$on('changeTitle', function (event, args) {
		vm.title = args.title;
	});

	if (window.localStorage.last_user) {
		vm.last_user = JSON.parse(window.localStorage.last_user);
	}
}]);
