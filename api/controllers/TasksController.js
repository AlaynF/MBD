/**
 * TasksController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_all: function (req, res) {
		Tasks.find().exec(function (err, tasks) {
			if (err) {
				console.log('Error: Tasks - get_all - ', err);
			}

			res.json(tasks);
		});
	},

	get_by_shop: function (req, res) {
		if (req.params.id) {
			Tasks.find({
				shop_id: req.params.id
			}).exec(function (err, tasks) {
				if (err) {
					console.log('Error: Tasks - get_by_shop - ', err);
				}

				res.json(tasks)
			});
		}
	},

	get_by_id: function (req, res) {
		if (req.params.id) {
			Tasks.findOne({
				id: req.params.id
			}).exec(function (err, task) {
				if (err) {
					console.log('Error: Tasks - get_by_id - ', err);
				}

				res.json(task)
			});
		} else {
			res.json({});
		}
	},

	create: function (req, res) {
		var data = req.body;


		if (data && data.name) {
			Tasks.create({
				name: data.name
			}).exec(function (err, shop) {
				if (err) {
					console.log('Error: Tasks - create - ', err);
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

		Tasks.update({
			id: data.id
		}, {
			name: data.name
		}).exec(function (err, task) {
			if (err) {
				console.log('Error: Tasks - edit - ', err);
				res.json({error: 'There was an error'});
				return;
			}

			res.send('OK');
		});
	}
};

