var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * AnimalCategory Model
 * ==================
 */

var VietnamArea = new keystone.List('VietnamArea', {
	autokey: { from: 'areaName', path: 'key', unique: true },
});

VietnamArea.add({
	name: { type: String, required: true },
	description: {type: Types.Textarea, height: 50},
});

VietnamArea.relationship({ ref: 'Animal', path: 'animals', refPath: 'area' });

VietnamArea.register();
