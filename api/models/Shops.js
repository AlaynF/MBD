/**
* Shop.js
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
		symbol: 'STRING',
		name: 'STRING',

		employees: {
			collection: 'employees',
			via: 'shop_id'
		}
	}
};

