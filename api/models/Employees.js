/**
* Employees.js
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
		shop_id: {
			model: 'shops'
		},
		name: 'STRING',
		passcode: 'STRING',
		name: 'STRING',
		email:{
			type: 'email'
		},
		admin: 'BOOLEAN',


		task_times: {
			collection: 'task_times',
			via: 'employee_id'
		}
	}
};

