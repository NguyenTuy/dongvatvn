var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Genus Model
 * ==================
 */

var Genus = new keystone.List('Genus', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Genus.add({
	name: { type: String, required: true },
	family: { type: Types.Relationship, ref: 'Family', many: false },
	description: {type: Types.Textarea, height: 50},
});

Genus.relationship({ ref: 'Animal', path: 'animal-genus', refPath: 'genus' });

Genus.register();
