const mongoose = require('mongoose');
let random = require('mongoose-random');
const Schema = mongoose.Schema;
const MetadataSchema = new Schema({
  metadata_id: String,
  page_name: String,
  page_url: String,
  meta_title: String,
  meta_description: String,
  meta_keyword: String,
  og_url: String,
  og_type: String,
  og_title: String,
  og_description: String,
  og_image: String,
  status: { type: String, default: "approved" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

MetadataSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  return next();
});

MetadataSchema.plugin(random);
const MetadataSc = mongoose.model('metadata', MetadataSchema);

module.exports = MetadataSc;