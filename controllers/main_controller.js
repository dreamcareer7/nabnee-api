
/**
 * Created by User Tnine on July 16 2019.
 **/

let Promise = require('bluebird');
let businesscatCtrl = require('./business_category_controller');
let inventorycatCtrl = require('./inventory_category_controller');
let inventorysubcatCtrl = require('./inventory_subcategory_controller');
let businesssubcatCtrl = require('./business_subcategory_controller');
let businessUserCtrl = require('./business_user_controller');
let inventoryCtrl = require('./inventory_controller');
let filterCtrl = require('./filter_controller');
let ColCtrl = require('./collection_controller');
let projectCtrl = require('./project_controller');
let blogCtrl = require('./blog_controller');
let countryCtrl = require('./country_controller');
let materiallistCtrl = require('./materiallist_controller');
let projectplanCtrl = require('./projectplan_controller');
let contractCtrl = require('./contract_controller');
let quoteCtrl = require('./quote_controller');
let quotesubmissionCtrl = require('./quotesubmission_controller');
let adminCtrl = require('./admin_controller');
let notifCtrl = require('./notification_controller');
let handlerCtrl = require('../utils/dbhandler.js');
let metadataCtrl = require('./metadata_controller');
let contentCtrl = require('./content_controller');
let fs = require('fs');
let mongoose = require('mongoose');
const { response } = require('../app');

//---------------Content handlers--------------------------------------------------------------------

//************************************** Business Category *****************************************************
this.create_business_category = function (req, res) {
	businesscatCtrl.create_business_category(req, res).then((response) => { res.send(response) })
}

this.read_business_category = function (req, res) {
	businesscatCtrl.read_business_category(req, res).then((response) => { res.send(response) })
}

this.read_business_category_admin = function (req, res) {
	businesscatCtrl.read_business_category_admin(req, res).then((response) => { res.send(response) })
}

this.update_business_category = function (req, res) {
	businesscatCtrl.update_business_category(req, res).then((response) => { res.send(response) })
}
this.delete_business_category = function (req, res) {
	businesscatCtrl.delete_business_category(req, res).then((response) => { res.send(response) })
}
//************************************** Business Category End *****************************************************

//************************************** Business Sub Category  *****************************************************
this.create_business_subcategory = function (req, res) {
	businesssubcatCtrl.create_business_subcategory(req, res).then((response) => { res.send(response) })
}

this.read_business_subcategory = function (req, res) {
	businesssubcatCtrl.read_business_subcategory(req, res).then((response) => { res.send(response) })
}
this.read_business_subcategory_admin = function (req, res) {
	businesssubcatCtrl.read_business_subcategory_admin(req, res).then((response) => { res.send(response) })
}
this.update_business_subcategory = function (req, res) {
	businesssubcatCtrl.update_business_subcategory(req, res).then((response) => { res.send(response) })
}
this.delete_business_subcategory = function (req, res) {
	businesssubcatCtrl.delete_business_subcategory(req, res).then((response) => { res.send(response) })
}

// //************************************** Business Sub Category End *****************************************************
//************************************** Inventory Category *****************************************************
this.create_inventory_category = function (req, res) {
	inventorycatCtrl.create_inventory_category(req, res).then((response) => { res.send(response) })
}

this.read_inventory_category = function (req, res) {
	inventorycatCtrl.read_inventory_category(req, res).then((response) => { res.send(response) })
}
this.read_inventory_category_admin = function (req, res) {
	inventorycatCtrl.read_inventory_category_admin(req, res).then((response) => { res.send(response) })
}
this.update_inventory_category = function (req, res) {
	inventorycatCtrl.update_inventory_category(req, res).then((response) => { res.send(response) })
}
this.delete_inventory_category = function (req, res) {
	inventorycatCtrl.delete_inventory_category(req, res).then((response) => { res.send(response) })
}

//************************************** Inventory Sub Category *****************************************************
this.create_inventory_subcategory = function (req, res) {
	inventorysubcatCtrl.create_inventory_subcategory(req, res).then((response) => { res.send(response) })
}

this.read_inventory_subcategory = function (req, res) {
	inventorysubcatCtrl.read_inventory_subcategory(req, res).then((response) => { res.send(response) })
}
this.read_inventory_subcategory_admin = function (req, res) {
	inventorysubcatCtrl.read_inventory_subcategory_admin(req, res).then((response) => { res.send(response) })
}
this.update_inventory_subcategory = function (req, res) {
	inventorysubcatCtrl.update_inventory_subcategory(req, res).then((response) => { res.send(response) })
}
this.delete_inventory_subcategory = function (req, res) {
	inventorysubcatCtrl.delete_inventory_subcategory(req, res).then((response) => { res.send(response) })
}

//************************************** Business User *****************************************************
this.create_business_user = function (req, res) {
	businessUserCtrl.create_user(req, res).then((response) => { res.send(response) })
}
this.search_business_user_name = function (req, res) {
	businessUserCtrl.search_business_user_name(req, res).then((response) => { res.send(response) })
}

this.update_business_user = function (req, res) {
	businessUserCtrl.update_business_user(req, res).then((response) => { res.send(response) })
}

this.update_business_public = function (req, res) {
	businessUserCtrl.update_business_public(req, res).then((response) => { res.send(response) })
}
this.deletecomment = function (req, res) {
	businessUserCtrl.deletecomment(req, res).then((response) => { res.send(response) })
}

this.delete_business_user = function (req, res) {
	businessUserCtrl.delete_business_user(req, res).then((response) => { res.send(response) })
}

this.read_business_user = function (req, res) {
	businessUserCtrl.read_business_user(req, res).then((response) => { res.send(response) })
}

this.read_user_details = function (req, res) {
	businessUserCtrl.read_user_details(req, res).then((response) => { res.send(response) })
}

this.read_business_user_public = function (req, res) {
	businessUserCtrl.read_business_user_public(req, res).then((response) => { res.send(response) })
}

this.read_business_user_all = function (req, res) {
	businessUserCtrl.read_business_user_all(req, res).then((response) => { res.send(response) })
}
this.read_businessuser_all = function (req, res) {
	businessUserCtrl.read_businessuser_all(req, res).then((response) => { res.send(response) })
}
this.read_business_user_by_id = function (req, res) {
	businessUserCtrl.read_business_user_by_id(req, res).then((response) => { res.send(response) })
}

this.read_business_user_by_oid = function (req, res) {
	businessUserCtrl.read_business_user_by_oid(req, res).then((response) => { res.send(response) })
}

this.read_business_user_by_timeline = function (req, res) {
	businessUserCtrl.read_business_user_by_timeline(req, res).then((response) => { res.send(response) })
}
this.read_user_by_timeline = function (req, res) {
	businessUserCtrl.read_user_by_timeline(req, res).then((response) => { res.send(response) })
}

this.forgotpassword = function (req, res) {
	businessUserCtrl.forgotpassword(req, res).then((response) => { res.send(response) })
}
this.changepassword = function (req, res) {
	businessUserCtrl.changepassword(req, res).then((response) => { res.send(response) })
}

this.get_request_count = function (req, res) {
	businessUserCtrl.get_request_count(req, res).then((response) => {
		res.send(response);
	});
}
this.increase_request_count = function (req, res) {
	businessUserCtrl.increase_request_count(req, res).then((response) => {
		res.send(response);
	});
}
this.update_request_limit = function (req, res) {
	businessUserCtrl.update_request_limit(req, res).then((response) => {
		res.send(response);
	});
}

//************************************** Business User End  *****************************************************

// //************************************** Collections *****************************************************
this.create_collection = function (req, res) {
	ColCtrl.create_collection(req, res).then((response) => { res.send(response) })
}
this.read_collection = function (req, res) {
	ColCtrl.read_collection(req, res).then((response) => { res.send(response) })
}

this.read_collection_by_collection_id = function (req, res) {
	ColCtrl.read_collection_by_collection_id(req, res).then((response) => { res.send(response) })
}
this.update_collection = function (req, res) {
	ColCtrl.update_collection(req, res).then((response) => { res.send(response) })
}
this.delete_collection = function (req, res) {
	ColCtrl.delete_collection(req, res).then((response) => { res.send(response) })
}

//************************************** Business Collection End  *****************************************************

// //************************************** Inventory *****************************************************
this.create_inventory = function (req, res) {
	inventoryCtrl.create_inventory(req, res).then((response) => { res.send(response) })
}
this.read_inventory_by_user = function (req, res) {
	inventoryCtrl.read_inventory_by_user(req, res).then((response) => { res.send(response) })
}
this.read_inventory_by_id = function (req, res) {
	inventoryCtrl.read_inventory_by_id(req, res).then((response) => { res.send(response) })
}
this.read_inventory_all = function (req, res) {
	inventoryCtrl.read_inventory_all(req, res).then((response) => { res.send(response) })
}
this.update_inventory = function (req, res) {
	inventoryCtrl.update_inventory(req, res).then((response) => { res.send(response) })
}
this.update_inventory_public = function (req, res) {
	inventoryCtrl.update_inventory_public(req, res).then((response) => { res.send(response) })
}
this.delete_inventory = function (req, res) {
	inventoryCtrl.delete_inventory(req, res).then((response) => { res.send(response) })
}

//************************************** Inventory End  *****************************************************

// //************************************** Business Filter *****************************************************
this.create_business_filter = function (req, res) {
	filterCtrl.create_business_filter(req, res).then((response) => { res.send(response) })
}
this.read_business_filter_all = function (req, res) {
	filterCtrl.read_business_filter_all(req, res).then((response) => { res.send(response) })
}
this.update_business_filter = function (req, res) {
	filterCtrl.update_business_filter(req, res).then((response) => { res.send(response) })
}
this.delete_business_filter = function (req, res) {
	filterCtrl.delete_business_filter(req, res).then((response) => { res.send(response) })
}

// //************************************** Inventory Filter *****************************************************
this.create_inventory_filter = function (req, res) {
	filterCtrl.create_inventory_filter(req, res).then((response) => { res.send(response) })
}
this.read_inventory_filter_all = function (req, res) {
	filterCtrl.read_inventory_filter_all(req, res).then((response) => { res.send(response) })
}
this.update_inventory_filter = function (req, res) {
	filterCtrl.update_inventory_filter(req, res).then((response) => { res.send(response) })
}
this.delete_inventory_filter = function (req, res) {
	filterCtrl.delete_inventory_filter(req, res).then((response) => { res.send(response) })
}

// //************************************** Projects *****************************************************
this.create_project = function (req, res) {
	projectCtrl.create_project(req, res).then((response) => { res.send(response) })
}
this.read_project_by_user = function (req, res) {
	projectCtrl.read_project_by_user(req, res).then((response) => { res.send(response) })
}
this.read_project_all = function (req, res) {
	projectCtrl.read_project_all(req, res).then((response) => { res.send(response) })
}
this.update_project = function (req, res) {
	projectCtrl.update_project(req, res).then((response) => { res.send(response) })
}
this.delete_project = function (req, res) {
	projectCtrl.delete_project(req, res).then((response) => { res.send(response) })
}

// //************************************** Blogs *****************************************************
this.create_blog = function (req, res) {
	blogCtrl.create_blog(req, res).then((response) => { res.send(response) })
}
this.read_blog_by_user = function (req, res) {
	blogCtrl.read_blog_by_user(req, res).then((response) => { res.send(response) })
}
this.read_blog_by_id = function (req, res) {
	blogCtrl.read_blog_by_id(req, res).then((response) => { res.send(response) })
}
this.read_blog_all = function (req, res) {
	blogCtrl.read_blog_all(req, res).then((response) => { res.send(response) })
}
this.update_blog = function (req, res) {
	blogCtrl.update_blog(req, res).then((response) => { res.send(response) })
}
this.delete_blog = function (req, res) {
	blogCtrl.delete_blog(req, res).then((response) => { res.send(response) })
}

// //************************************** Notifications *****************************************************
this.send_mail = function (req, res) {
	notifCtrl.send_mail(req, res).then((response) => { res.send(response) })
}
this.send_notification = function (req, res) {
	notifCtrl.send_notification(req, res).then((response) => { res.send(response) })
}

// //************************************** Admin *****************************************************
this.admin_create = function (req, res) {
	console.log("main");
	adminCtrl.admin_create(req, res).then((response) => { res.send(response) })
}
this.admin_login = function (req, res) {
	adminCtrl.admin_login(req, res).then((response) => { res.send(response) })
}
this.admin_forgotpassword = function (req, res) {
	adminCtrl.admin_forgotpassword(req, res).then((response) => { res.send(response) })
}
this.admin_changepassword = function (req, res) {
	adminCtrl.admin_changepassword(req, res).then((response) => { res.send(response) })
}

this.admin_update = function (req, res) {
	adminCtrl.admin_update(req, res).then((response) => { res.send(response) })
}
// ************************************* Search *********************************************************
this.search_stats = function (req, res) {
	handlerCtrl.search_stats(req.body.start, req.body.end, req.body.search_type).then((response) => { res.send(response) })
}
// //************************************** Tags *****************************************************
this.create_tag = function (req, res) {
	filterCtrl.create_tag(req, res).then((response) => { res.send(response) })
}
this.read_tag_all = function (req, res) {
	filterCtrl.read_tag_all(req, res).then((response) => { res.send(response) })
}
this.update_tag = function (req, res) {
	filterCtrl.update_tag(req, res).then((response) => { res.send(response) })
}
this.delete_tag = function (req, res) {
	filterCtrl.delete_tag(req, res).then((response) => { res.send(response) })
}

// //************************************** country *****************************************************
this.create_country = function (req, res) {
	countryCtrl.create_country(req, res).then((response) => { res.send(response) })
}
this.read_country = function (req, res) {
	countryCtrl.read_country(req, res).then((response) => { res.send(response) })
}
this.update_country = function (req, res) {
	countryCtrl.update_country(req, res).then((response) => { res.send(response) })
}
this.delete_country = function (req, res) {
	countryCtrl.delete_country(req, res).then((response) => { res.send(response) })
}

// //************************************** materiallist *****************************************************
this.create_materiallist = function (req, res) {
	materiallistCtrl.create_materiallist(req, res).then((response) => { res.send(response) })
}
this.read_materiallist = function (req, res) {
	materiallistCtrl.read_materiallist(req, res).then((response) => { res.send(response) })
}
this.update_materiallist = function (req, res) {
	materiallistCtrl.update_materiallist(req, res).then((response) => { res.send(response) })
}
this.delete_materiallist = function (req, res) {
	materiallistCtrl.delete_materiallist(req, res).then((response) => { res.send(response) })
}

// //************************************** projectplan *****************************************************
this.create_projectplan = function (req, res) {
	projectplanCtrl.create_projectplan(req, res).then((response) => { res.send(response) })
}
this.read_projectplan = function (req, res) {
	projectplanCtrl.read_projectplan(req, res).then((response) => { res.send(response) })
}
this.update_projectplan = function (req, res) {
	projectplanCtrl.update_projectplan(req, res).then((response) => { res.send(response) })
}
this.delete_projectplan = function (req, res) {
	projectplanCtrl.delete_projectplan(req, res).then((response) => { res.send(response) })
}

// //************************************** contract *****************************************************
this.create_contract = function (req, res) {
	contractCtrl.create_contract(req, res).then((response) => { res.send(response) })
}
this.read_contract = function (req, res) {
	contractCtrl.read_contract(req, res).then((response) => { res.send(response) })
}
this.update_contract = function (req, res) {
	contractCtrl.update_contract(req, res).then((response) => { res.send(response) })
}
this.delete_contract = function (req, res) {
	contractCtrl.delete_contract(req, res).then((response) => { res.send(response) })
}
this.delete_all_contractbyproject_id = function (req, res) {
	contractCtrl.delete_all_contractbyproject_id(req, res).then((response) => { res.send(response) })
}

// //************************************** quote *****************************************************
this.create_quote = function (req, res) {
	quoteCtrl.create_quote(req, res).then((response) => { res.send(response) })
}
this.read_quote = function (req, res) {
	quoteCtrl.read_quote(req, res).then((response) => { res.send(response) })
}
this.update_quote = function (req, res) {
	quoteCtrl.update_quote(req, res).then((response) => { res.send(response) })
}
this.delete_quote = function (req, res) {
	quoteCtrl.delete_quote(req, res).then((response) => { res.send(response) })
}

// //************************************** quotesubmission *****************************************************
this.create_quotesubmission = function (req, res) {
	quotesubmissionCtrl.create_quotesubmission(req, res).then((response) => { res.send(response) })
}
this.read_quotesubmission = function (req, res) {
	quotesubmissionCtrl.read_quotesubmission(req, res).then((response) => { res.send(response) })
}
this.update_quotesubmission = function (req, res) {
	quotesubmissionCtrl.update_quotesubmission(req, res).then((response) => { res.send(response) })
}
this.delete_quotesubmission = function (req, res) {
	quotesubmissionCtrl.delete_quotesubmission(req, res).then((response) => { res.send(response) })
}

// //************************************** quote Report *****************************************************
this.numberOfQuotationEequestsCreatedToday = function (req, res) {
	quotesubmissionCtrl.numberOfQuotationEequestsCreatedToday(req, res).then((response) => { res.send(response) })
}
this.numberOfRequestsTillDate = function (req, res) {
	quotesubmissionCtrl.numberOfRequestsTillDate(req, res).then((response) => { res.send(response) })
}
this.numberOfQuotationsSentToRequestsByBusinessesToday = function (req, res) {
	quotesubmissionCtrl.numberOfQuotationsSentToRequestsByBusinessesToday(req, res).then((response) => { res.send(response) })
}
this.numberOfQuotationsSentToRequestsByBusinessesTillDate = function (req, res) {
	quotesubmissionCtrl.numberOfQuotationsSentToRequestsByBusinessesTillDate(req, res).then((response) => { res.send(response) })
}

// // //************************************** metadata *****************************************************
this.create_metadata = function (req, res) {
	metadataCtrl.create_metadata(req, res).then((response) => { res.send(response) })
}
this.read_metadata = function (req, res) {
	metadataCtrl.read_metadata(req, res).then((response) => { res.send(response) })
}
this.update_metadata = function (req, res) {
	metadataCtrl.update_metadata(req, res).then((response) => { res.send(response) })
}
this.delete_metadata = function (req, res) {
	metadataCtrl.delete_metadata(req, res).then((response) => { res.send(response) })
}

// // //************************************** content *****************************************************
this.create_content = function (req, res) {
	contentCtrl.create_content(req, res).then((response) => { res.send(response) })
}
this.read_content = function (req, res) {
	contentCtrl.read_content(req, res).then((response) => { res.send(response) })
}
this.update_content = function (req, res) {
	contentCtrl.update_content(req, res).then((response) => { res.send(response) })
}
this.delete_content = function (req, res) {
	contentCtrl.delete_content(req, res).then((response) => { res.send(response) })
}
this.get_project_plan_detail = function (req, res) {
	projectplanCtrl.get_detail(req, res).then((response) => { res.send(response) })
}
