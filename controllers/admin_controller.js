let Promise = require('bluebird');
let dbhandler = require('../utils/dbhandler.js');
let resObj = require('../utils/response.js');
let bcrypt = require('bcryptjs');

/////////////////////// Admin /////////////////////////////////////////////////////////////////////////

module.exports.admin_create = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.admin_email) {
      dbhandler.search_admin(req.body.admin_email).then((resp) => {
        console.log(resp);
        if (resp === "Allowed") {
          resolve(dbhandler.admin_create(req, res))
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

module.exports.admin_login = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.admin_email && req.body.admin_password) {
      dbhandler.admin_login(req.body.admin_email)
        .then((resp) => {
          console.log(resp);
          if (resp[0].admin_password) {
            bcrypt.compare(req.body.admin_password, resp[0].admin_password, function (err, resb) {
              console.log(resb);
              if (resb) {
                resp.admin_password = undefined;
                resolve(resObj.register_resp("LoggedIn", resp[0]))
              } else {
                resolve(resObj.register_resp("PasswordMismatch", "NA"))
              }
            });
          }
          else {
            resolve(resObj.register_resp("ModeMismatch", "NA"))
          }
        })
        .catch(error => {
          reject(error);
        });
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}

module.exports.admin_forgotpassword = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.admin_email) {
      resolve(dbhandler.admin_forgotpassword(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}

module.exports.admin_changepassword = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.id) {
      resolve(dbhandler.admin_changepassword(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}

module.exports.admin_update = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.id) {
      resolve(dbhandler.admin_update(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}

//////////////////////////// Admin ////////////////////////////////////////////////////////////////////////////
