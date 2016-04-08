mbd.controller('Login', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
function (vm, http, $timeout, $window, root) {
	document.title = 'Login - MBD Repair Tools';

	root.$broadcast('changeTitle', {title: 'Login'});

	vm.passcode = '';

    vm.keypadclick = function(number) {
        if (!number) {
            $scope.passcode = '';
            return;
        }

        vm.passcode += number;

        if (vm.passcode == "12345") {
            $window.location.href  = "/register";
        }

        if  (vm.passcode.length > 5) {
            alert("Password too long");
        }
    }
}]);
