var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Order Model
 * ==================
 */

var Order = new keystone.List('Order', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Order.add({
	name: { type: String, required: true },
	class: { type: Types.Relationship, ref: 'Class', many: false },
	description: {type: Types.Textarea, height: 50},
});

Order.relationship({ ref: 'Animal', path: 'animal-order', refPath: 'order' });

Order.register();
