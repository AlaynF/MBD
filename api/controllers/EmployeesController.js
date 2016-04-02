/**
 * EmployeesController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_all: function (req, res) {
		console.log('hello');
		Employees.find().exec(function (err, employees) {
			console.log(err, employees);
			res.json(employees);
		});
	}
};

