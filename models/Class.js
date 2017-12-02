var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Class Model
 * ==================
 */

var Class = new keystone.List('Class', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Class.add({
	name: { type: String, required: true },
	description: {type: Types.Textarea, height: 50},
});

Class.relationship({ ref: 'Animal', path: 'animal-classes', refPath: 'class' });

Class.register();
