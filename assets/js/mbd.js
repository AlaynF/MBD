window.mbd = angular.module('mbd', ['ngRoute']);

// mbd.config(['$httpProvider', function ($httpProvider) {
// 	$httpProvider.interceptors.push('authInterceptor');
// }]);

mbd.run(function() {
    FastClick.attach(document.body);
});


mbd.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/api/view/render/homepage', // just fire controller
		controller: 'Login',
	})
	.when('/logout', {
		templateUrl: function (params) {
			return '/logout';
		},
		controller: 'Logout'
	})
	.when('/invite', {
		templateUrl: function (params) {
			return '/api/view/render/user_invite';
		},
		controller: 'Invite'
	})
	.when('/:controller', {
		templateUrl: function (params) {
			return '/api/view/render/' + params.controller + '_index';
		},
		controller: ['$scope', '$routeParams', '$controller', function ($scope, $routeParams, $controller) {
			var controller, nameRegEx;

			nameRegEx = /_([a-z])/g;
			controller = $routeParams.controller.replace(nameRegEx, function () {
				return arguments[1].toUpperCase();
			});

			controller = controller.charAt(0).toUpperCase() + controller.slice(1);
			$controller(controller, {$scope:$scope});
		}]
	})
	.when('/:controller/:action', {
		templateUrl: function (params) {
			return '/api/view/render/' + params.controller + '_' + params.action;
		},
		controller: ['$scope', '$routeParams', '$controller', function ($scope, $routeParams, $controller) {
			var controller, action, nameRegEx;

			nameRegEx = /_([a-z])/g;
			controller = $routeParams.controller.replace(nameRegEx, function () {
				return arguments[1].toUpperCase();
			});

			controller = controller.charAt(0).toUpperCase() + controller.slice(1);
			action = $routeParams.action.charAt(0).toUpperCase() + $routeParams.action.slice(1);
			$controller(controller + action, {$scope:$scope});
		}]
	});

	$locationProvider.html5Mode(true);
}]);
