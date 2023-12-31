let Promise = require('bluebird');
let dbhandler = require('../utils/dbhandler.js');
let resObj = require('../utils/response.js');


//////////////////////Create Business filter/////////////////////////////////////////////////////////////////////////

module.exports.create_business_filter = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.filter_name) {
      dbhandler.search_business_filter(req.body.filter_name, req.body.filter_name_ar).then((resp) => {
        if (resp === "Allowed") {
          resolve(dbhandler.create_business_filter(req, res))
        }
        else if (resp === "Exists") {
          resolve(resObj.content_operation_responses("Exists", resp))
        }
        else {
          resolve(resObj.content_operation_responses("Error", resp))
        }
      })
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}


////////////////////Read Business Filter/////////////////////////////////////////////////////////////////////////////////

module.exports.read_business_filter_all = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.filters) {
      console.log(req.body.details);
      resolve(dbhandler.read_business_filter_all(req.body.filters))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

//////////////////Update Business Filters//////////////////////////////////////////////////////////////////////////////////

module.exports.update_business_filter = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.filter_id && req.body.created_by) {
      resolve(dbhandler.update_business_filter(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

//////////////////Delete Business Filters//////////////////////////////////////////////////////////////////////////////////

module.exports.delete_business_filter = function (req, res) {
  return new Promise(function (resolve, reject) {
    if ((req.body.filter_id) && (req.body.created_by)) {
      resolve(dbhandler.delete_business_filter(req.body.filter_id, req.body.created_by))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}


//***************************Product Filters***********************************************************************************

//////////////////////Create Business filter/////////////////////////////////////////////////////////////////////////

module.exports.create_inventory_filter = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.filter_name) {
      dbhandler.search_inventory_filter(req.body.filter_name, req.body.filter_name_ar).then((resp) => {
        if (resp === "Allowed") {
          resolve(dbhandler.create_inventory_filter(req, res))
        }
        else if (resp === "Exists") {
          resolve(resObj.content_operation_responses("Exists", resp))
        }
        else {
          resolve(resObj.content_operation_responses("Error", resp))
        }
      })
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}


////////////////////Read Business Filter/////////////////////////////////////////////////////////////////////////////////

module.exports.read_inventory_filter_all = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.filters) {
      resolve(dbhandler.read_inventory_filter_all(req.body.filters))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

//////////////////Update Inventory//////////////////////////////////////////////////////////////////////////////////

module.exports.update_inventory_filter = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.filter_id && req.body.created_by) {
      resolve(dbhandler.update_inventory_filter(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

//////////////////Delete Inventory//////////////////////////////////////////////////////////////////////////////////

module.exports.delete_inventory_filter = function (req, res) {
  return new Promise(function (resolve, reject) {
    if ((req.body.filter_id) && (req.body.created_by)) {
      resolve(dbhandler.delete_inventory_filter(req.body.filter_id, req.body.created_by))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}


//***************************Tags***********************************************************************************

module.exports.create_tag = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.tag) {
      dbhandler.search_tag(req.body.tag).then((resp) => {
        if (resp === "Allowed") {
          resolve(dbhandler.create_tag(req, res))
        }
        else if (resp === "Exists") {
          resolve(resObj.content_operation_responses("Exists", resp))
        }
        else {
          resolve(resObj.content_operation_responses("Error", resp))
        }
      })
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}


////////////////////Read Business Filter/////////////////////////////////////////////////////////////////////////////////

module.exports.read_tag_all = function (req, res) {
  return new Promise(function (resolve, reject) {
    resolve(dbhandler.read_tag_all())
  });
}

module.exports.update_tag = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.tag_id && req.body.tag) {
      resolve(dbhandler.update_tag(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}
module.exports.delete_tag = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.tag_id) {
      resolve(dbhandler.delete_tag(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}
