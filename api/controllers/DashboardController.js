/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_options: function (req, res) {
		var options =[];

		if (req.user) {
			if (req.user.admin) {
				options.push({
					title: 'Employees',
					icon: 'fa fa-user',
					description: 'Create, View and Edit Employees',
					actions: [{
						'name': 'Go To Employees',
						'action': '/admin/employees'
					}]
				});

				options.push({
					title: 'Task Times',
					icon: 'fa fa-tasks',
					description: 'View and Edit Task Times',
					actions: [{
						'name': 'Go To Task Times',
						'action': '/admin/tasktimes'
					}]
				});

				options.push({
					title: 'Workorders',
					icon: 'fa fa-file-text',
					description: 'View and Edit Workorders',
					actions: [{
						'name': 'Go To Workorders',
						'action': '/admin/workorders'
					}]
				});

				options.push({
					title: 'Tasks',
					icon: 'fa fa-list-ol',
					description: 'Create, View and Edit Tasks',
					actions: [{
						'name': 'Go To Tasks',
						'action': '/admin/tasks'
					}]
				});

				options.push({
					title: 'Shops',
					icon: 'fa fa-home',
					description: 'Create, View and Edit Shops',
					actions: [{
						'name': 'Go To Workorders',
						'action': '/admin/shops'
					}]
				});
			}

			options.push({
				title: 'Start Task',
				icon: 'fa fa-clock-o',
				description: 'Start task..',
				actions: [{
					'name': 'New Workorder',
					'action': 'newTask'
				}]
			});
			res.send(options);
		} else {
			res.send([]);
		}
	},

	unlock: function (req, res) {
		var data = req.body;

		if (data && data.password) {
			if (sails.config.password == data.password) {
				res.json({
					success: true
				});
			} else {
				res.status('403');
				res.send('No.')
			}
		} else {
			res.status('403');
			res.send('No.')
		}
	}
};

