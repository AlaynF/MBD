/**
 * Tasks_timesController
 *
 * @description :: Server-side logic for managing tasks_times
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_all: function (req, res) {
		Task_times.find().exec(function (err, times) {
			if (err) {
				console.log('Error: Task_times - get_all - ', err);
			}
			res.json(times);
		});
	},

	get_by_shop: function (req, res) {
		if (req.params.id) {
			Task_times.find({
				shop_id: req.params.id
			}).exec(function (err, times) {
				if (err) {
					console.log('Error: Task_times - get_by_shop - ', err);
				}

				res.json(times)
			});
		}
	},

	get_by_employee: function (req, res) {
		if (req.params.id) {
			Task_times.find({
				employee_id: req.params.id
			}).exec(function (err, times) {
				if (err) {
					console.log('Error: Task_times - get_by_employee - ', err);
				}

				res.json(times)
			});
		}
	},

	get_open_by_employee: function (req, res) {
		var data = req.body;
		var query = '';

		if (!data.id) {
			res.send('No Task Time ID.');
			return;
		}

		query += 'SELECT * from task_times WHERE account_id = ? AND end_time IS NULL;';
		query.replace('?', data.id);

		Task_times.query(query).exec(function (err, times) {
			if (err) {
				console.log('Error: Task_times - get_open_by_employee - ', err);
			}

			res.json(times);
		});
	},

	create: function (req, res) {
		var data = req.body;

		if (data && data.task_id) {
			Task_times.create({
				task_id: data.task_id,
				start_time: data.start_time,
				pause_time: data.pause_time,
				end_time: data.end_time,
				workorder_id: data.workorder_id
			}).exec(function (err, times) {
				if (err) {
					console.log('Error: Task_times - create - ', err);
				}
			});
		}
	},

	update: function (req, res) {
		var data = req.body;

		if (!data.id) {
			res.send('No Task Time ID.');
			return;
		}

		if (data.start_time) {
			Task_times.update({
				start_time: data.start_time
			}, {
				id: data.id
			}).exec(function (err, times) {
				if (err) {
					console.log(err);
				}
			});
		}

		if (data.pause_time) {
			Task_times.update({
				pause_time: data.pause_time
			}, {
				id: data.id
			}).exec(function (err, times) {
				if (err) {
					console.log(err);
				}
			});
		}

		if (data.end_time) {
			Task_times.update({
				end_time: data.end_time
			}, {
				id: data.id
			}).exec(function (err, times) {
				if (err) {
					console.log(err);
				}
			});
		}
	}
};
