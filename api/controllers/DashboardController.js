/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_options: function (req, res) {
		var options = [{
			title: 'Start Task',
			icon: 'fa fa-clock-o',
			description: 'Start task..',
			actions: [{
				'name': 'New Workorder',
				'action': 'newTask'
			}]
		}];

		if (req.user) {
			if (req.user.admin) {
				options.push({
					title: 'Administration',
					icon: 'fa fa-file-text',
					description: 'All the administration options..',
					actions: [{
						'name': 'Go To Admin',
						'action': 'sayHello'
					}]
				})
			}
			res.send(options);
		} else {
			res.send([]);
		}
	}
};

