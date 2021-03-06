/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Trang chủ', key: 'home', href: '/' },
		{ label: 'Tìm kiếm nâng cao', key: 'advancesearch', href: '/advancesearch' },
		{ label: 'Tin tức', key: 'news', href: '/news' },
		{ label: 'Liên hệ', key: 'contactus', href: '/contactus' },
		{ label: 'Về chúng tôi', key: 'aboutus', href: '/aboutus' },
	];
	// res.locals.navLinks = [
	// 	{ label: 'Trang chủ', key: 'home', href: '/' },
	// 	{ label: 'Tìm kiếm nâng cao', key: 'advancesearch', href: '/advancesearch' },
	// 	{ label: 'Tin tức', key: 'news', href: '/news' },
	// 	{ label: 'Thư viện ảnh', key: 'gallery', href: '/gallery' },
	// 	{ label: 'Liên hệ', key: 'contactus', href: '/contactus' },
	// 	{ label: 'Về chúng tôi', key: 'aboutus', href: '/aboutus' },
	// ];
	// res.locals.navLinks = [
	// 	{ label: 'Home', key: 'home', href: '/' },
	// 	{ label: 'Advance Search', key: 'advancesearch', href: '/advancesearch' },
	// 	{ label: 'News', key: 'news', href: '/news' },
	// 	{ label: 'Contact us', key: 'contactus', href: '/contactus' },
	// 	{ label: 'About us', key: 'aboutus', href: '/aboutus' },
	// 	{ label: 'Blog', key: 'blog', href: '/blog' },
	// 	{ label: 'Gallery', key: 'gallery', href: '/gallery' },
	// 	{ label: 'Contact', key: 'contact', href: '/contact' },
	// ];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
