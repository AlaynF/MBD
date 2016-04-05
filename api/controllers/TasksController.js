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
	}
};

