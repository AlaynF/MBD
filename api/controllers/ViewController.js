/**
 * ViewController
 *
 * @description :: Server-side logic for managing Views
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	render: function (req, res) {
		var i       = 0,
			file    = '',
			view    = req.params.id.split('_');

		view.map(function (path) {
			file += path;

			if (++i != view.length) {
				file += '/';
			}
		});

		res.render(file, {}, function(err) {
			if (err) {
				console.log(err);
				res.status(404)
				return res.end();
			}

			// Otherwise, serve the `views/mySpecialView.*` page
			res.render(file);
		});
	},

	default: function (req, res) {
		res.view('blank', {layout: 'private_layout'});
	}
};
