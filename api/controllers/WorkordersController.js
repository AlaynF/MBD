/**
 * WorkordersController
 *
 * @description :: Server-side logic for managing workorders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_all: function (req, res) {
		Workorders.find().exec(function (err, workorders) {
			if (err) {
				console.log('Error: Workorders - get_all - ', err);
			}
			res.json(workorders);
		});
	},

	get_by_shop: function (req, res) {
		if (req.params.id) {
			Workorders.find({
				shop_id: req.params.id
			}).exec(function (err, workorders) {
				if (err) {
					console.log('Error: Workorders - get_by_shop - ', err);
				}

				res.json(workorders)
			});
		}
	},

	get_by_employee: function (req, res) {
		var query = '';

		query += 'SELECT * ';
		query += 'FROM workorders ';
		query += 'WHERE id IN ( ';
		query += '	SELECT workorder_id ';
		query += '    FROM task_times ';
		query += '    WHERE employee_id = ? ';
		query += ') ';

		if (req.query.eid) {
			query = query.replace('?', req.query.eid);

			Workorders.query(query, function (err, workorders) {
				if (err) {
					console.log('Error: Workorders - get_by_employee - ', err);
				}

				res.json(workorders)
			});
		}
	},

	create: function (req, res) {
		var data = req.body;

		if (data && data.reference) {
			Workorders.create({
				reference: data.reference
			}).exec(function (err, employee) {
				if (err) {
					console.log('Error: Workorders - create - ', err);
				}
			});
		}
	}
};
