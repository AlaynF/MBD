/**
 * Tasks_timesController
 *
 * @description :: Server-side logic for managing tasks_times
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_all: function (req, res) {
		Task_times.find().populate('task_id').exec(function (err, times) {
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
		var employee_id;
		var data = req.body;

		if ((!data || !data.id) && !req.user.id) {
			res.send('No Task Time Employee ID.');
			res.status('400');
			return;
		}

		employee_id = data ? data.id : req.user.id;

		Task_times.findOpen(employee_id, function (err, times) {
			if (err) {
				console.log('Error: Task_times - get_open_by_employee - ', err);
			}

			res.json(times);
		});
	},

	create: function (req, res) {
		var saveData = {};
		var data = req.body;

		if (!data || !data.task_id) {
			res.send('No Task Info.');
			res.status('400');
			return;
		}

		if (req.user && req.user.id) {
			saveData.employee_id = req.user.id;
		}

		if (data.task_id) {
			saveData.task_id = data.task_id;
		}

		if (data.workorder_reference) {
			saveData.workorder_reference = data.workorder_reference;
		}

		if (data.notes) {
			saveDate.notes = notes;
		}

		Workorders.findOrCreate({
			reference:saveData.workorder_reference
		}, {
			reference:saveData.workorder_reference
		}).exec(function (err, workorder) {
			if (err) {
				console.log('Error: Task_times (Workorders) - get_open_by_employee - ', err);
			}

			if (workorder) {
				saveData.workorder_id = workorder.id;

				Task_times.findOpen((data.id || req.user.id), function (err, times) {
					if (!times || times.length == 0) {
						saveData.start_time = new Date();

						Task_times.create(saveData)
						.exec(function (err, times) {
							if (err) {
								console.log('Error: Task_times - create - ', err);
							}

							res.send('Ok');
						});
					} else if (times) {
						//CREATE BATCH!!!
					}
				});
			}
		});
	},

	continue_task: function (req, res) {
		var data = req.body;

		if (!req.user || !data.id || !data.workorder_id) {
			res.send('No Task Time ID.');
			return;
		}

		Task_times.findOne({
			id: data.id
		}).exec(function (err, time) {
			var add_time;

			if (err) {
				console.log('Error: Task_times (Task_times) - continue_task - ', err);
				return;
			}

			time.start_time = new Date();

			time.pause_time = null;

			time.save(function (err, t) {
				if (err) {
					console.log('Error: Task_times (Task_times / Save) - continue_task - ', err);
					return;
				}
			})

			res.send('OK');
		});
	},

	pause_task: function (req, res) {
		var data = req.body;

		if (!req.user || !data.id || !data.workorder_id) {
			res.send('No Task Time ID.');
			return;
		}

		Task_times.findOne({
			id: data.id
		}).exec(function (err, time) {
			var add_time;

			if (err) {
				console.log('Error: Task_times (Task_times) - pause_task - ', err);
				return;
			}

			if (time.start_time) {
				add_time = Math.abs(time.start_time - new Date()) / (1000 * 60); /// MiliSeconds -> Minutes
			}

			time.total_time = parseFloat(add_time);

			time.pause_time = new Date();

			time.save(function (err, t) {
				if (err) {
					console.log('Error: Task_times (Task_times / Save) - pause_task - ', err);
					return;
				}
			})

			res.send('OK');
		});
	},

	stop_task: function (req, res) {
		var data = req.body;

		if (!req.user || !data.id || !data.workorder_id) {
			res.send('No Task Time ID.');
			return;
		}

		Task_batches.findOne({
			status: 'opened',
			workorder_id: data.workorder_id
		}).exec(function (err, batch) {
			if (err) {
				console.log('Error: Task_times (Task_batches) - stop_task - ', err);
				return;
			}

			if (batch && batch.id) {

			} else {
				Task_times.findOne({
					id: data.id
				}).exec(function (err, time) {
					var add_time;

					if (err) {
						console.log('Error: Task_times (Task_times) - stop_task - ', err);
						return;
					}

					if (time.pause_time) {
						add_time = Math.abs(time.pause_time - new Date()) / (1000 * 60); /// MiliSeconds -> Minutes
					} else {
						add_time = Math.abs(time.start_time - new Date()) / (1000 * 60); /// MiliSeconds -> Minutes
					}

					time.total_time = parseFloat(add_time);

					time.end_time = new Date();

					time.save(function (err, t) {
						if (err) {
							console.log('Error: Task_times (Task_times / Save) - stop_task - ', err);
							return;
						}
					})

					res.send('OK');
				});
			}
		})
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
