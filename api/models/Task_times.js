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
	}
};

