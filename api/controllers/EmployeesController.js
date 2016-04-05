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
					res.json({
						success: true,
						user: employee
					});

					//LETS SET COOKIE
					req.session.user = employee.id;
				} else {
					res.json({
						success: false
					});
				}
			});
		}
	},

	get_all: function (req, res) {
		Employees.find().exec(function (err, employees) {
			if (err) {
				console.log('Error: Employees - get_all - ', err);
			}
			res.json(employees);
		});
	},

	get_by_shop: function (req, res) {
		if (req.params.id) {
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

	create: function (req, res) {
		var data = req.body;

		if (data && data.passcode) {
			Employees.create({
				passcode: data.passcode,
				name: data.name,
				email: data.email,
				shop_id: data.shop_id,
				admin: data.admin || 0
			}).exec(function (err, employee) {
				if (err) {
					console.log('Error: Employees - create - ', err);
				}
			});
		}
	}
};

