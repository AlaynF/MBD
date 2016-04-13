/**
* Tasks.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			required: true
		},
		name: 'STRING',


		task_times: {
			collection: 'task_times',
			via: 'task_id'
		}
	}
};

