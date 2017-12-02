var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';

	// Set locals
	locals.filters = {
		slug: req.params.slug,
	};
	locals.data = {};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Animal').model.findOne({
			state: 'published',
			slug: locals.filters.slug,
		});

		q.exec(function (err, result) {
			locals.data.animal = result;
			next(err);
		});

	});

	// Render the view
	view.render('animal');
};
