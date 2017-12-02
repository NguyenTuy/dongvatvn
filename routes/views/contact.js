var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contactus';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	var idx = 0;
	for (var type in locals.enquiryTypes) {
		if (idx == 0) {
			type.label = "Để lại tin nhắn";
		} else  if (idx == 1) {
			type.label = "Để lại câu hỏi";
		} else if (idx == 2) {
			type.label = "Nội dung khác ";
		}
		idx = idx + 1;
	}
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, message',
			errorMessage: 'Xuất hiện lỗi khi gửi tin nhắn của bạn:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('contact');
};
