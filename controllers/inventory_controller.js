let Promise = require('bluebird');
let dbhandler = require('../utils/dbhandler.js');
let resObj = require('../utils/response.js');


//////////////////////Create Inventory/////////////////////////////////////////////////////////////////////////

module.exports.create_inventory = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.item_name) {
      dbhandler.search_inventory(req.body.item_name, req.body.item_name_ar).then((resp) => {
        if (resp === "Allowed") {
          resolve(dbhandler.create_inventory(req, res))
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


////////////////////Read Inventory/////////////////////////////////////////////////////////////////////////////////

module.exports.read_inventory_by_user = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.status && req.body.created_by) {
      resolve(dbhandler.read_inventory_by_user(req.body.created_by, req.body.status))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

module.exports.read_inventory_by_id = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.item_id) {
      resolve(dbhandler.read_inventory_by_id(req.body.item_id))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}


module.exports.read_inventory_all = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.details && req.body.offset) {
      resolve(dbhandler.read_inventory_all(req, res))
      //resolve(dbhandler.read_inventory_all(req.body.details, req.body.offset))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

//////////////////Update Inventory//////////////////////////////////////////////////////////////////////////////////

module.exports.update_inventory = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.item_id && req.body.created_by) {
      resolve(dbhandler.update_inventory(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

module.exports.update_inventory_public = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.comment) {
      console.log(req.body.comment);
      if (req.body.item_id && req.body.comment) {
        resolve(dbhandler.update_inventory_comment(req.body.optype, req.body.comment, req.body.item_id))
      }
      else {
        resolve(resObj.content_operation_responses("Insufficient", req));
      }
    }
    else {
      if (req.body.item_id && req.body.user_id) {
        resolve(dbhandler.update_inventory_public(req.body.item_id, req.body.optype, req.body.attribute, req.body.user_id))
      }
      else {
        resolve(resObj.content_operation_responses("Insufficient", req));
      }

    }

  });
}

//////////////////Delete Inventory//////////////////////////////////////////////////////////////////////////////////

module.exports.delete_inventory = function (req, res) {
  return new Promise(function (resolve, reject) {
    if ((req.body.item_id) && (req.body.created_by)) {
      resolve(dbhandler.delete_inventory(req.body.item_id, req.body.created_by))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}
