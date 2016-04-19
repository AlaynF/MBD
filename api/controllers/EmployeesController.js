/**
 * EmployeesController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_by_passcode: function (req, res) {
		var data = req.body;

		if (data.passcode) {
			Employees.findOne({
				passcode: data.passcode
			}).exec(function (err, employee) {
				if (err) {
					console.log('Error: Employees - get_by_passcode - ', err);
				}

				if (employee && employee.id) {
					//LETS SET COOKIE
					req.session.user = employee.id;

					res.json({
						success: true,
						user: employee
					});
				} else {
					res.json({
						success: false
					});
				}
			});
		}
	},

	get_all: function (req, res) {
		Employees.find().populate('shop_id').exec(function (err, employees) {
			if (err) {
				console.log('Error: Employees - get_all - ', err);
			}
			res.json(employees);
		});
	},

	get_by_shop: function (req, res) {
		if (req.query.id) {
			Employees.find({
				shop_id: req.params.id
			}).exec(function (err, employees) {
				if (err) {
					console.log('Error: Employees - get_by_shop - ', err);
				}
				res.json(employees)
			});
		}
	},

	get_by_id: function (req, res) {
		if (req.query.id) {
			Employees.findOne({
				id: req.query.id
			}).exec(function (err, employee) {
				if (err) {
					console.log('Error: Employees - get_by_id - ', err);
				}

				res.json(employee)
			});
		}
	},

	create: function (req, res) {
		var data = req.body;

		if (data && data.passcode) {

			if (data.passcode.length < 4) {
				res.json({error: 'The passcode chosen is not long enough.'});
				return;
			}

			if (!/^[0-9]*$/.test(data.passcode)) {
				res.json({error: 'The passcode can only be digits.'});
				return;
			}

			Employees.findOne({
				passcode: data.passcode
			}).exec(function (err, employee) {
				if (err) {
					console.log('Error: Employees (1) - create - ', err);
					res.json({error: 'There was an error'});
					return;
				}

				if (employee && employee.id) {
					res.json({error: 'That passcode is already taken.'});
					return;
				}

				Employees.create({
					passcode: data.passcode,
					name: data.name,
					email: data.email,
					shop_id: data.shop_id,
					admin: data.admin || 0
				}).exec(function (err, employee) {
					if (err) {
						console.log('Error: Employees (2) - create - ', err);
						res.json({error: 'There was an error'});
						return;
					}

					res.send("OK");
				});
			});
		}
	},

	edit: function (req, res) {
		var employee_id;
		var data = req.body;

		if (!data || !data.id) {
			res.json({error: 'There was an error processing your request.'});
			return;
		}

		employee_id = data.id;
		delete data.id;

		if (data.passcode.length < 5) {
			res.json({error: 'The passcode chosen is not long enough.'});
			return;
		}

		if (!/^[0-9]*$/.test(data.passcode)) {
			res.json({error: 'The passcode can only be digits.'});
			return;
		}

		delete data.createdAt;
		delete data.updatedAt;

		console.log(data);

		Employees.update({
			passcode: data.passcode
		}, data).exec(function (err, employee) {
			if (err) {
				console.log('Error: Employees - edit - ', err);
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

		Employees.destroy({
			id: data.id
		}).exec(function (err) {
			if (err) {
				console.log('Error: Employees - delete - ', err);
				res.json({error: 'There was an error'});
				return;
			}

			res.send('OK');
		});
	},

	search: function (req, res) {
		var query = req.query.q;

		if (!query) {
			res.json([]);
			return;
		}

		Employees.find({
			or: [
				{name: {'contains': query}},
				{email: {'contains': query}}
			]
		}).exec(function (err, employees) {
			if (err) {
				console.log('Error: Employees - search - ', err);
				res.json([]);
				return;
			}

			res.json(employees);
		});
	}
};

