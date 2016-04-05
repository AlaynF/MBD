/**
 * ShopsController
 *
 * @description :: Server-side logic for managing shops
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_all: function (req, res) {
		Shops.find().exec(function (err, shops) {
			if (err) {
				console.log('Error: Shops - get_all - ', err);
			}

			res.json(shops);
		});
	},

	create: function (req, res) {
		var data = req.body;

		if (data && data.name) {
			Shops.create({
				name: data.name,
				symbol: data.symbol
			}).exec(function (err, employee) {
				if (err) {
					console.log('Error: Shops - create - ', err);
				}
			});
		}
	}
};

