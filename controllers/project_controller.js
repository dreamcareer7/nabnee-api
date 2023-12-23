let Promise = require('bluebird');
let dbhandler = require('../utils/dbhandler.js');
let resObj = require('../utils/response.js');


//////////////////////Create Project/////////////////////////////////////////////////////////////////////////

module.exports.create_project = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.project_name || req.body.project_name_ar) {
      resolve(dbhandler.create_project(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}


////////////////////Read Project/////////////////////////////////////////////////////////////////////////////////

module.exports.read_project_by_user = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.status && req.body.created_by) {
      resolve(dbhandler.read_project_by_user(req.body.created_by, req.body.status))
    }
  });
}

//////////////////Update Project//////////////////////////////////////////////////////////////////////////////////

module.exports.update_project = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.project_id && req.body.created_by) {
      resolve(dbhandler.update_project(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

//////////////////Delete Project//////////////////////////////////////////////////////////////////////////////////

module.exports.delete_project = function (req, res) {
  return new Promise(function (resolve, reject) {
    if ((req.body.project_id) && (req.body.created_by)) {
      resolve(dbhandler.delete_project(req.body.project_id, req.body.created_by))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

//////////////Read Project All//////////////////////////////////////////////////////////////////////////////////////

module.exports.read_project_all = function (req, res) {
  return new Promise(function (resolve, reject) {
    if ((req.body.details) && (req.body.offset)) {
      resolve(dbhandler.read_project_all(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}
