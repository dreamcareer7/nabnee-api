let Promise = require('bluebird');
let dbhandler = require('../utils/dbhandler.js');
let resObj = require('../utils/response.js');


//////////////////////Create content/////////////////////////////////////////////////////////////////////////

module.exports.create_content = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.page_name) {
      resolve(dbhandler.create_content(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}


// // // ////////////////////Read content/////////////////////////////////////////////////////////////////////////////////

module.exports.read_content = function (req, res) {
  return new Promise(function (resolve, reject) {
    //console.log(req.body.details);
    if (req.body.details) {
      resolve(dbhandler.read_content(req, res))
      //resolve(dbhandler.read_inventory_all(req.body.details, req.body.offset))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}


// // // // //////////////////Update content//////////////////////////////////////////////////////////////////////////////////

module.exports.update_content = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.content_id) {
      resolve(dbhandler.update_content(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

// // // // //////////////////Delete content//////////////////////////////////////////////////////////////////////////////////

module.exports.delete_content = function (req, res) {
  return new Promise(function (resolve, reject) {
    if ((req.body.content_id)) {
      resolve(dbhandler.delete_content(req.body.content_id))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}
