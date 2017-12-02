var keystone = require('keystone');
var Animal = keystone.list('Animal');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	//set local
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'advancesearch';
	locals.searchResults = {};
	locals.validateError = '';
	locals.searchKey = req.body.search;
	locals.searchStarted = 0;
	locals.resultLength = 0;

	locals.data = {};
	locals.data.taxa = req.body.taxa;
	locals.data.genus = req.body.genus;
	locals.data.subspecies = req.body.subspecies;
	locals.data.epithet = req.body.epithet;
	locals.data.author = req.body.author;
	locals.data.year = req.body.year;
	locals.data.commonname = req.body.commonname;
	locals.data.distribution = req.body.distribution;
	locals.data.type = req.body.type;
	locals.data.reference = req.body.reference;

	// On POST requests, search animal in the database
	view.on('post', { action: 'search' }, function (next) {
		locals.searchStarted = 1;
		if (locals.data.taxa != "" || locals.data.genus != "" || locals.data.subspecies != "" || locals.data.epithet != ""
			 || locals.data.author != "" || locals.data.year != "" || locals.data.commonname != ""
			  || locals.data.distribution != "" || locals.data.type != "" || locals.data.reference != "") {
			var query = Animal.model.find();
			console.log("Start search advance...");

			if (locals.data.taxa) {
				query.where("higherTaxa",{ $regex: '.*' + locals.data.taxa + '.*' });
				console.log("Search " + locals.data.taxa);
			}

			if (locals.data.genus) {
				query.where("comments",{ $regex: '.*' + locals.data.genus + '.*' });
				console.log("Search " + locals.data.genus);
			}

			if (locals.data.subspecies) {
				query.where("subSpecies",{ $regex: '.*' + locals.data.subspecies + '.*' });
				console.log("Search " + locals.data.subspecies);
			}

			if (locals.data.epithet) {
			
			}

			if (locals.data.author) {
				
			}

			if (locals.data.year) {
				
			}

			if (locals.data.distribution) {
				query.where("distribution",{ $regex: '.*' + locals.data.distribution + '.*' });
				console.log("Search " + locals.data.subspecies);
			}

			if (locals.data.commonname) {
				query.where("commonName",{ $regex: '.*' + locals.data.commonname + '.*' });
				console.log("Search " + locals.data.commonname);
			}

			if (locals.data.type) {
				query.where("types",{ $regex: '.*' + locals.data.type + '.*' });
				console.log("Search " + locals.data.type);
			}
			if (locals.data.reference) {
				query.where("references",{ $regex: '.*' + locals.data.reference + '.*' });
				console.log("Search " + locals.data.references);
			}

			query.exec(function (err, results) {
				if (err || !results.length) {
					return next(err);
				}
				locals.searchResults = results;
				locals.resultLength = results.length;
				console.log("Find the results: " + results.length);
				next();
			});
		} else {
			locals.validateError = "The search value is empty";
			console.log(locals.validateError);
			next();
		}
		
	});

	view.render('advancesearch');
};
