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

		console.log(data);

		if (data && data.name) {
			Shops.create({
				name: data.name,
				symbol: data.symbol
			}).exec(function (err, shop) {
				if (err) {
					console.log('Error: Shops - create - ', err);
				}

				res.send('OK');
			});
		}
	},

	edit: function (req, res) {
		var data = req.body;

		if (!data || !data.id || !data.name) {
			res.json({error: 'There was an error processing your request.'});
			return;
		}

		Shops.update({
			id: data.id
		}, {
			name: data.name,
			symbol: data.symbol
		}).exec(function (err, shop) {
			if (err) {
				console.log('Error: Shops - edit - ', err);
				res.json({error: 'There was an error'});
				return;
			}

			res.send('OK');
		});
	},

	delete: function (req, res) {
		var data = req.body;

		if (!data || !data.id) {
			res.json({error: 'There was an error processing your request.'});
			return;
		}

		Shops.destroy({
			id: data.id
		}).exec(function (err) {
			if (err) {
				console.log('Error: Shops - delete - ', err);
				res.json({error: 'There was an error'});
				return;
			}

			res.send('OK');
		});
	}
};

