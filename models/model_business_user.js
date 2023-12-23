const mongoose = require('mongoose');
let random = require('mongoose-random');

const Schema = mongoose.Schema;
const BusinessUserSchema = new Schema({
  user_id: String,
  user_type: { type: String, default: "General" },
  user_name: String,
  user_public_name: String,
  user_email: String,
  user_fcm: String,
  user_gid: String,
  user_fid: String,
  user_dp: String,
  user_password: String,
  user_permissions: [String],
  user_phone: String,
  user_language: String,
  user_country: String,
  user_status: { type: String, default: "approved" },
  business_name_english: String,
  business_name_arabic: String,
  business_category: { type: Schema.Types.ObjectId, ref: 'business_categories' },
  business_subcategory: { type: Schema.Types.ObjectId, ref: 'business_subcategories' },
  business_email: String,
  business_type: String,
  business_brand: String,
  business_brand_ar: String,
  business_space: String,
  business_space_ar: String,
  business_city: String,
  business_city_ar: String,
  business_hours: String,
  leisure_hours: String,
  location_lat: String,
  location_long: String,
  address: String,
  address_ar: String,
  logo: String,
  cover_image: String,
  noofquotes: { type: Number, default: 10 },
  deals_in: [String],
  business_description_english: String,
  business_description_arabic: String,
  web_link: String,
  fb_link: String,
  instagram_link: String,
  youtube_link: String,
  twitter_link: String,
  meta_title: String,
  meta_description: String,
  meta_keyword: String,
  og_url: String,
  og_type: String,
  og_title: String,
  og_description: String,
  og_image: String,
  ratings: { type: Number, default: 0 },
  business_featured: { type: Number, default: 0 },
  user_likes: [String],
  user_reviews: [{ rating: { type: Number, default: 0 }, comment: { type: String, default: "" }, comment_by: { type: Schema.Types.ObjectId, ref: 'business_users' } }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  business_user_since: Date,
  request_limit: { type: Number, default: 3 },
  request_count: { type: Number, default: 0 },
});
BusinessUserSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  return next();
});

BusinessUserSchema.plugin(random);
const BusinessUserSc = mongoose.model('business_users', BusinessUserSchema);

module.exports = BusinessUserSc;
