let Promise = require('bluebird');
let dbhandler = require('../utils/dbhandler.js');
let resObj = require('../utils/response.js');
let bcrypt = require('bcryptjs');


///////////// User Content //////////////////////////////////////////////////

module.exports.create_user = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_email) {

      dbhandler.find_business_user(req.body.user_email).then((resp) => {
        if (resp.length === 0) {
          if (req.body.user_email && req.body.user_password) {
            resolve(dbhandler.create_business_user_simple(req.body.user_type, req.body.user_public_name, req.body.user_email, req.body.user_password, req.body.user_fcm))
          }
          else if (req.body.user_email && req.body.user_gid) {
            resolve(dbhandler.create_business_user_gmail(req.body.user_type, req.body.user_public_name, req.body.user_email, req.body.user_fcm, req.body.user_gid, req.body.user_dp))
          }
          else if (req.body.user_email && req.body.user_fid) {
            resolve(dbhandler.create_business_user_fb(req.body.user_type, req.body.user_public_name, req.body.user_email, req.body.user_fcm, req.body.user_fid, req.body.user_dp))
          }
        }
        else if (resp.length > 0) {
          if (req.body.user_email && req.body.user_password) {
            if (resp[0].user_password) {
              bcrypt.compare(req.body.user_password, resp[0].user_password).then((res) => {
                if (res) {
                  resp[0].user_password = undefined;
                  resolve(resObj.register_resp("LoggedIn", resp[0]))
                }
                else {
                  resolve(resObj.register_resp("PasswordMismatch", "NA"))
                }
              });
            }
            else {
              resolve(resObj.register_resp("ModeMismatch", "NA"))
            }
          }
          else if (req.body.user_email && req.body.user_gid) {
            resolve(dbhandler.update_business_user_for_login_gmail(req.body.user_type, req.body.user_name, req.body.user_name_public, req.body.user_email, req.body.user_fcm, req.body.user_gid, req.body.user_dp))
          }
          else if (req.body.user_email && req.body.user_fid) {
            resolve(dbhandler.update_business_user_for_login_fb(req.body.user_type, req.body.user_name, req.body.user_name_public, req.body.user_email, req.body.user_fcm, req.body.user_fid, req.body.user_dp))
          }
          //resolve(resObj.content_operation_responses("Exists",resp))
        }
        else {
          resolve(resObj.content_operation_responses("Error", resp))
        }
      });
    }
  });
}

module.exports.read_business_user = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.offset) {
      resolve(dbhandler.read_business_user(req, res));
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}

module.exports.search_business_user_name = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_name) {
      resolve(dbhandler.search_business_by_user_name(req.body.user_name));
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}

module.exports.read_user_details = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_id) {
      resolve(dbhandler.read_user_details(req, res));
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}

module.exports.read_business_user_by_id = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_id) {
      resolve(dbhandler.read_business_user_by_id(req.body.user_id));
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}

module.exports.read_business_user_by_oid = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_oid) {
      resolve(dbhandler.read_business_user_by_oid(req.body.user_oid));
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}

module.exports.read_business_user_by_timeline = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.start && req.body.end) {
      resolve(dbhandler.read_business_user_by_timeline(req.body.start, req.body.end));
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}
module.exports.read_user_by_timeline = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.start && req.body.end) {
      resolve(dbhandler.read_user_by_timeline(req.body.start, req.body.end));
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}

module.exports.update_business_user = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_email) {
      resolve(dbhandler.update_business_user(req, res))
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}

module.exports.delete_business_user = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_email) {
      resolve(dbhandler.delete_business_user(req.body.user_email))
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }

  });
}

module.exports.read_business_user_public = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.offset && req.body.filter_type) {
      switch (req.body.filter_type) {
        case "general":
          resolve(dbhandler.read_business_user(req, res));
        case "distance":
          resolve(dbhandler.read_business_user_by_distance(req.body.lat, req.body.long, req.body.distance, req.body.offset));
          break;
        case "category":
          resolve(dbhandler.read_business_user_by_category(req.body.business_category, req.body.offset));
          break;
        case "subcategory":
          resolve(dbhandler.read_business_user_by_subcategory(req.body.business_category, req.body.business_subcategory, req.body.offset));
          break;
        case "type":
          resolve(dbhandler.read_business_user_by_type(req.body.business_type, req.body.offset));
          break;
        case "space":
          resolve(dbhandler.read_business_user_by_space(req.body.business_space, req.body.offset));
          break;
        case "city":
          resolve(dbhandler.read_business_user_by_city(req.body.city, req.body.offset));
          break;
        case "brand":
          resolve(dbhandler.read_business_user_by_brand(req.body.business_brand, req.body.offset));
          break;
      }
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}


module.exports.read_business_user_all = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.offset && req.body.details) {
      resolve(dbhandler.read_business_user_all(req, res));
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}
module.exports.read_businessuser_all = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.details) {
      resolve(dbhandler.read_businessuser_all(req, res));
    }
    else {
      resolve(resObj.user_operation_responses("Insufficient details", req));
    }
  });
}


module.exports.update_business_public = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_review) {
      if (req.body.business_id && req.body.user_review) {
        resolve(dbhandler.update_business_public(req, res))
      }
      else {
        resolve(resObj.content_operation_responses("Insufficient", req));
      }
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}


module.exports.deletecomment = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_review) {
      if (req.body.business_id && req.body.user_review) {
        resolve(dbhandler.deletecomment(req, res))
      }
      else {
        resolve(resObj.content_operation_responses("Insufficient", req));
      }
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}

module.exports.forgotpassword = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.user_email) {
      resolve(dbhandler.forgotpassword(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}

module.exports.changepassword = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.id) {
      resolve(dbhandler.changepassword(req, res))
    }
    else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }

  });
}

module.exports.get_request_count = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.data) {
      resolve(dbhandler.get_request_count(req.body.data));
    } else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

module.exports.increase_request_count = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body.data) {
      resolve(dbhandler.increase_request_count(req.body.data));
    } else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}

module.exports.update_request_limit = function (req, res) {
  return new Promise(function (resolve, reject) {
    if (req.body) {
      resolve(dbhandler.update_request_limit(req.body));
    } else {
      resolve(resObj.content_operation_responses("Insufficient", req));
    }
  });
}
