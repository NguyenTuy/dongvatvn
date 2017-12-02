var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Family Model
 * ==================
 */

var Family = new keystone.List('Family', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Family.add({
	name: { type: String, required: true },
	order: { type: Types.Relationship, ref: 'Order', many: false },
	description: {type: Types.Textarea, height: 50},
});

Family.relationship({ ref: 'Animal', path: 'animal-family', refPath: 'family' });

Family.register();
