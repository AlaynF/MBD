/**
* Task_times.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	attributes: {
		id: 'INTEGER',
		task_id: 'INTEGER',
		start_time: 'DATETIME',
		pause_time: 'DATETIME',
		end_time: 'DATETIME',
		workorder_id: 'INTEGER',
		workorder_reference: 'STRING'
	},

	findOpen: function (user_id, callback) {
		var query = '';

		query += 'SELECT * from task_times WHERE account_id = ? AND end_time IS NULL;';
		query.replace('?', user_id);

		Task_times.query(query).exec(function (err, times) {
			if (err) {
				console.log('Error: Task_times - findOpen - ', err);
			}

			callback(err, times)
		});
	}
};

