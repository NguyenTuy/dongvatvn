var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Animal Model
 * ==========
 */

var Animal = new keystone.List('Animal', {
	map: { name: 'scienceName' },
	autokey: { path: 'slug', from: 'scienceName', unique: true },
});

Animal.add({
	scienceName: { type: String, required: true },
	class: { type: Types.Relationship, ref: 'Class' },
	order: { type: Types.Relationship, ref: 'Order', filters: { class: ':class' } },
	family: { type: Types.Relationship, ref: 'Family', filters: { order: ':order' } },
	genus: { type: Types.Relationship, ref: 'Genus', filters: { family: ':family' } },
	subSpecies: { type: Types.Textarea, height: 50 },
	vietnameseName: { type: Types.Textarea, height: 50 },
	commonName: { type: Types.Textarea, height: 70 },
	synonym: {type: Types.Textarea, height: 150},
	distributionInVietnam: { type: Types.Relationship, ref: 'VietnamArea', many: true, height: 50 },
	distributionElsewhere: { type: Types.Textarea, height: 150 },
	reproduction: { type: Types.Textarea, height: 50 },
	types: { type: Types.Textarea, height: 50 },
	mophologicalCharecter: { type: Types.Html, wysiwyg: true, height: 150 },
	comments: { type: Types.Html, wysiwyg: true, height: 150 },
	references: { type: Types.Html, wysiwyg: true, height: 150 },
	external_link: { type: Types.Html, wysiwyg: true, height: 150 },
	images: { type: Types.CloudinaryImages },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

Animal.schema.virtual('references.full').get(function () {
	return this.references.extended || this.references.brief;
});
Animal.schema.virtual('comments.full').get(function () {
	return this.comments.extended || this.comments.brief;
});

Animal.defaultColumns = 'scienceName, state|20%, author|20%, publishedDate|20%';
Animal.register();
