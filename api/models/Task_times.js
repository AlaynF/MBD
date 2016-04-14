/**
* Task_times.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		task_id: {
			unique: true,
			model: 'tasks'
		},
		total_time: 'FLOAT',
		employee_id: 'INTEGER',
		start_time: 'DATETIME',
		pause_time: 'DATETIME',
		end_time: 'DATETIME',
		workorder_id: 'INTEGER',
		workorder_reference: 'STRING'
	},

	findOpen: function (user_id, callback) {
		var query = '';

		query += 'SELECT task_times.*, tasks.name as task_name ';
		query += 'FROM task_times  ';
		query += 'LEFT JOIN tasks ON ( ';
		query += '	tasks.id = task_times.task_id ';
		query += ') ';
		query += 'WHERE employee_id = ? AND end_time IS NULL ';
		query += '	AND end_time IS NULL; ';

		query = query.replace('?', user_id);

		Task_times.query(query, function (err, times) {
			if (err) {
				console.log('Error: Task_times - findOpen - ', err);
			}

			callback(err, times)
		});
	}
};

