/**
 * WorkordersController
 *
 * @description :: Server-side logic for managing workorders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_all: function (req, res) {
		var query = '';

		query += 'SELECT workorders.*, shops.name as shop_name, times.shop_id, times.total_workorder_time ';
		query += 'FROM workorders ';
		query += 'LEFT JOIN ( ';
		query += '	SELECT task_times.workorder_id, employees.*, SUM(task_times.total_time) AS total_workorder_time ';
		query += '    FROM task_times ';
		query += '    INNER JOIN employees ON ( ';
		query += '		employees.id = task_times.employee_id ';
		query += '    ) ';
		query += '    GROUP BY workorder_id ';
		query += ') AS times ON ( ';
		query += '	times.workorder_id = workorders.id ';
		query += ') ';
		query += 'LEFT JOIN shops ON ( ';
		query += '	shops.id = times.shop_id ';
		query += ') ';
		query += 'ORDER BY createdAt DESC; ';

		Workorders.query(query, function (err, workorders) {
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

	get_by_id: function (req, res) {
		if (req.query.id) {
			Workorders.findOne({
				id: req.query.id
			}).exec(function (err, workorder) {
				if (err) {
					console.log('Error: Workorders - get_by_id - ', err);
				}

				res.json(workorder)
			});
		}
	},

	get_by_employee: function (req, res) {
		var query = '';

		query += 'SELECT workorders.*, shops.name as shop_name, times.shop_id, times.total_workorder_time ';
		query += 'FROM workorders ';
		query += 'INNER JOIN ( ';
		query += '	SELECT task_times.workorder_id, employees.*, SUM(task_times.total_time) AS total_workorder_time ';
		query += '    FROM task_times ';
		query += '    INNER JOIN employees ON ( ';
		query += '		employees.id = task_times.employee_id ';
		query += '    ) ';
		query += '    WHERE employee_id = ? ';
		query += '    GROUP BY workorder_id ';
		query += ') AS times ON ( ';
		query += '	times.workorder_id = workorders.id ';
		query += ') ';
		query += 'LEFT JOIN shops ON ( ';
		query += '	shops.id = times.shop_id ';
		query += ') ';
		query += 'ORDER BY createdAt DESC; ';

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
	},

	search: function (req, res) {
		var query = req.query.q;
		var skip = req.query.skip;

		if (!query) {
			res.json([]);
			return;
		}

		Workorders.find({
			or: [
				{id: {'contains': query}},
				{reference: {'contains': query}}
			]
		}).exec(function (err, workorders) {
			if (err) {
				console.log('Error: Workorders - search - ', err);
				res.json([]);
				return;
			}

			res.json(workorders);
		});
	}
};
