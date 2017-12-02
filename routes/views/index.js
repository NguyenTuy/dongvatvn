var keystone = require('keystone');
var Animal = keystone.list('Animal');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	//set local
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.searchResults = {};
	locals.validateError = '';
	locals.searchKey = req.body.search;
	locals.searchStarted = 0;
	locals.resultLength = 0;

	// On POST requests, search animal in the database
	view.on('post', { action: 'search' }, function (next) {
		locals.searchStarted = 1;
		locals.searchKey = req.body.search;
		if (req.body.search != "") {
			// Animal.model.find({ 'science_name': { $regex: '.*' + req.body.search + '.*' } }).exec(function (err, results) {
			// 	if (err || !results.length) {
			// 		return next(err);
			// 	}
			// 	locals.searchResults = results;
			// 	console.log("Find the results: " + results[0]["commonName"]);
			// 	next();
			// });
			Animal.model.find({$text: {$search: req.body.search}}).exec(function (err, results) {
				if (err || !results.length) {
					console.log("Could not found the result");
					return next(err);
				}
				locals.searchResults = results;
				locals.resultLength = results.length;
				console.log("Find the results: " + results[0]["scienceName"]);
				next();
			});
		} else {
			locals.validateError = "The search value is empty";
			console.log(locals.validateError);
			next();
		}
		
	});

	// Render the view
	view.render('index');
};
