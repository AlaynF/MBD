mbd.controller('AdminShops', [
	"$scope",
	"$http",
	"$timeout",
	"$window",
	"$rootScope",
	"$location",
function (vm, http, $timeout, $window, root, $location) {
	console.log(root.user);

	if (!root.user || !root.user.admin) {
		// $location.path('/');
	}

	(getShops = function () {http.get('/api/shops/get_all')
	.success(function (data) {
		vm.shops = data;

		console.log(data);
	})})();


	vm.newShop = function () {
		vm.newTaskTime = new Date();
		vm.openNewShop = true;
		vm.editing = false;
		vm.shop = {};
	}

	vm.editShop = function (shop) {
		vm.newTaskTime = new Date();
		vm.openNewShop = true;
		vm.editing = true;
		vm.shop = shop;
	}

	vm.createShop = function () {
		if (!vm.shop || !vm.shop.name) {
			return;
		}

		http.post('/api/shops/create', vm.shop)
		.success(function (data) {
			if (data) {
				if (data.error) {
					root.$broadcast('errorFlash', data.error);
				}
			}
			getShops();

			vm.openNewShop = false;
		});
	}

	vm.submitEditShop = function (){
		console.log(vm.shop);

		http.post('/api/shops/edit', vm.shop)
		.success(function (data) {
			if (data) {
				if (data.error) {
					root.$broadcast('errorFlash', data.error);
				}
			}
			getShops();

			vm.openNewShop = false;
		});
	}

	vm.deleteShop = function (shop) {
		http.post('/api/shops/delete', {
			id: shop.id
		}).success(function () {
			getShops();
		});
	}

	vm.goBack = function () {
		$window.history.back();
	};
}]);
