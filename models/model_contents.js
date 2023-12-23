const mongoose = require('mongoose');
let random = require('mongoose-random');
const Schema = mongoose.Schema;
const ContentSchema = new Schema({
  content_id: String,
  page_name: String,
  hero_title: String,
  hero_description: String,
  hero_banner: String,
  why_us_title: String,
  why_us_description: String,
  image_1_title: String,
  image_2_title: String,
  image_1_subtitle: String,
  image_2_subtitle: String,
  image_1: String,
  image_2: String,
  services_title: String,
  services_description: String,
  block_1_title: String,
  block_1_description: String,
  block_1_icon: String,
  block_2_title: String,
  block_2_description: String,
  block_2_icon: String,
  block_3_title: String,
  block_3_description: String,
  block_3_icon: String,
  privacy_policy: String,
  terms_conditions_policy: String,
  return_refund_policy: String,
  created_by: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  status: { type: String, default: "approved" },
});

ContentSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  return next();
});

ContentSchema.plugin(random);
const ContentSc = mongoose.model('contents', ContentSchema);

module.exports = ContentSc;
