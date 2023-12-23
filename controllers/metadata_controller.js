let Promise = require('bluebird');
let dbhandler = require('../utils/dbhandler.js');
let resObj = require('../utils/response.js');


//////////////////////Create metadata/////////////////////////////////////////////////////////////////////////

module.exports.create_metadata = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.page_name, req.body.meta_title) {

      dbhandler.search_metadata(req.body.page_name, req.body.meta_title).then((resp) => {
        //console.log(resp);
        if (resp === "Allowed") {
          resolve(dbhandler.create_metadata(req, res))
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


// // // ////////////////////Read metadata/////////////////////////////////////////////////////////////////////////////////

module.exports.read_metadata = function (req, res) {
  return new Promise(function (resolve, reject) {
    //console.log(req.body.details);
    if (req.body.details) {
      resolve(dbhandler.read_metadata(req, res))
      //resolve(dbhandler.read_inventory_all(req.body.details, req.body.offset))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}


// // // // //////////////////Update metadata//////////////////////////////////////////////////////////////////////////////////

module.exports.update_metadata = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.metadata_id) {
      resolve(dbhandler.update_metadata(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

// // // // //////////////////Delete metadata//////////////////////////////////////////////////////////////////////////////////

module.exports.delete_metadata = function (req, res) {
  return new Promise(function (resolve, reject) {
    if ((req.body.metadata_id)) {
      resolve(dbhandler.delete_metadata(req.body.metadata_id))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}
