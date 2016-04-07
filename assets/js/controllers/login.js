mbd.controller('Login', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
function (vm, http, $timeout, $window, root) {
	document.title = 'Login - MBD Repair Tools';

	root.$broadcast('changeTitle', {title: 'Login'});
}]);
