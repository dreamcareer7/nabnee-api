let BusinessCat = require('../models/model_business_category');
let InventoryCat = require('../models/model_inventory_category');
let BusinessSubCat = require('../models/model_business_subcategory');
let InventorySubCat = require('../models/model_inventory_subcategory');
let Inventory = require('../models/model_inventory');
let BusinessUser = require('../models/model_business_user');
let Collection = require('../models/model_collection');
let Project = require('../models/model_project');
let Blog = require('../models/model_blog');
let BusinessFilter = require('../models/model_business_filters');
let InventoryFilter = require('../models/model_inventory_filters');
let Admin = require('../models/model_admin');
let Search = require('../models/model_search');
let Tag = require('../models/model_tags');
let Country = require('../models/model_country');
let Materiallist = require('../models/model_materiallist');
let Projectplan = require('../models/model_projectplan');
let Contract = require('../models/model_contracts');
let Quote = require('../models/model_quotes');
let Quotesubmission = require('../models/model_quotesubmission');
let Notification = require('../controllers/notification_controller');
let Metadata = require('../models/model_metadata');
let Content = require('../models/model_contents');

// let Topic = require('../models/model_topic');
// let Question = require('../models/model_questions');
// let Megatest = require('../models/model_megatests');
// let Partner = require('../models/model_partners');
// let User = require('../models/model_users');
// let UserTests = require('../models/model_user_tests');
// let UserProfileAnalysis = require('../models/model_user_profile_analysis');
// let Stick = require('../models/model_streak');
let uniqid = require('uniqid');
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
let Promise = require('bluebird');
let resObj = require('./response.js');
let utilObj = require('./utility.js');
let ConstantCtrl = require('./constants.js');
let fs = require('fs');
let jwt = require('jsonwebtoken');
let mongoxlsx = require('mongo-xlsx');
let ObjectId = require('mongodb').ObjectID;
let Distance = require('geo-distance');
let isodate = require("isodate");
let _ = require('lodash');
let sortJsonArray = require('sort-json-array');



///////////////////Business Category Handlers////////////////////////////////////////////////////////////////////////////////


module.exports.create_business_category = function(req, res) {
    return new Promise(function(resolve, reject) {
        let businessCatID = uniqid();
        BusinessCat.create({
            business_category_id : businessCatID,
            business_category_name : req.body.business_category_name,
            business_category_name_ar : req.body.business_category_name_ar,
            business_category_type : req.body.business_category_type,
            business_category_icon : req.body.business_category_icon,
            business_category_img : req.body.business_category_img,
            business_category_theme_color : req.body.business_category_theme_color,
            created_by : req.body.created_by 
                })
        .then((businessContent) => {
           resolve(resObj.content_operation_responses("Created", businessContent))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};
module.exports.search_business_category = function(business_category_name, business_category_name_ar) {
    return new Promise(function(resolve, reject) {
        BusinessCat.find().or([{ business_category_name: business_category_name }, { business_category_name_ar: business_category_name_ar }])
        //find({ "business_category_name" : business_category_name, "status" : "approved"})
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.search_business_category_public= function(business_category_name) {
    return new Promise(function(resolve, reject) {
        BusinessCat.find({"status" : "approved"}).or([{ "business_category_name" : { $regex: business_category_name, $options: 'i' }}, { "business_category_name_ar" : { $regex: business_category_name, $options: 'i' }}])
        .exec()
        .then((resp) => {
            //console.log(resp.length);
            if (resp.length===0) {
                
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }
            else{
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};


module.exports.read_business_category_approved = function() {
    return new Promise(function(resolve,reject) {
        BusinessCat.find({'status' : 'approved'})
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_category_disapproved = function() {
    return new Promise(function(resolve,reject) {
        BusinessCat.find({'status' : 'disapproved'})
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_category_all = function() {
    return new Promise(function(resolve,reject) {
        BusinessCat.find()
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_category_admin = function(req, res) {
    return new Promise(function(resolve,reject) {
        BusinessCat.find(req.body.details)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.update_business_category = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        BusinessCat.findOne({ 'business_category_id': req.body.business_category_id, 'created_by' : req.body.created_by }, function (err, businessdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(businessdata){
                        businessdata.business_category_name = req.body.business_category_name || businessdata.business_category_name;
                        businessdata.business_category_name_ar = req.body.business_category_name_ar || businessdata.business_category_name_ar;
                        businessdata.created_by = req.body.created_by || businessdata.created_by;
                        businessdata.business_category_theme_color= req.body.business_category_theme_color || businessdata.business_category_theme_color;
                        businessdata.business_category_img= req.body.business_category_img || businessdata.business_category_img;
                        businessdata.business_category_icon= req.body.business_category_icon || businessdata.business_category_icon;
                        businessdata.business_category_type= req.body.business_category_type || businessdata.business_category_type;
                        businessdata.status= req.body.status || businessdata.status;
                        businessdata.save({new : true}).then((result) => {
                            
                        resolve(resObj.content_operation_responses("Updated", result))


                    }).catch((error) => {
                    //console.log(error);
                    resolve(resObj.content_operation_responses("Error", error))
                });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_business_category = function(business_category_id, created_by) {
    return new Promise(function(resolve, reject) {
        BusinessCat.findOne({'business_category_id': business_category_id , 'created_by' : created_by}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}


//////////////////Business Subcategory Handlers///////////////////////////////////////////////////////////////////////////////


module.exports.create_business_subcategory = function(req, res) {
    return new Promise(function(resolve, reject) {
        let businessSubCatID = uniqid();
        BusinessSubCat.create({
            business_subcategory_id : businessSubCatID,
            business_category_name : req.body.business_category_name,
            business_category_name_ar : req.body.business_category_name_ar,
            business_category_oid : req.body.business_category_oid,
            business_subcategory_name : req.body.business_subcategory_name,
            business_subcategory_name_ar : req.body.business_subcategory_name_ar,
            business_subcategory_type : req.body.business_subcategory_type,
            business_subcategory_img : req.body.business_subcategory_img,
            business_subcategory_icon : req.body.business_subcategory_icon,
            business_subcategory_theme_color : req.body.business_subcategory_theme_color,
            created_by : req.body.created_by 
                })
        .then((businessContent) => {
           resolve(resObj.content_operation_responses("Created", businessContent))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};


module.exports.search_business_subcategory = function(business_subcategory_name, business_subcategory_name_ar,business_category_oid) {
    return new Promise(function(resolve, reject) {
        BusinessSubCat.find().or([{ business_subcategory_name: business_subcategory_name }, { business_subcategory_name_ar: business_subcategory_name_ar }])
        //find({ "business_subcategory_name" : business_subcategory_name, "status" : "approved"})
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.search_business_subcategory_public= function(business_subcategory_name) {
    return new Promise(function(resolve, reject) {
        BusinessSubCat.find({"status" : "approved"}).or([{ "business_subcategory_name" : { $regex: business_subcategory_name, $options: 'i' }}, { "business_subcategory_name_ar" : { $regex: business_subcategory_name, $options: 'i' }}])
        //.find({ "business_subcategory_name" : { $regex: business_subcategory_name, $options: 'i' }, "status" : "approved"})
        .populate('business_category_oid')
        .exec()
        .then((resp) => {
            //console.log(resp.length);
            if (resp.length===0) {
                
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }
            else{
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};


module.exports.read_business_subcategory_approved = function() {
    return new Promise(function(resolve,reject) {
        BusinessSubCat.find({'status' : 'approved'})
        .populate('business_category_oid')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_subcategory_disapproved = function() {
    return new Promise(function(resolve,reject) {
        BusinessSubCat.find({'status' : 'disapproved'})
        .populate('business_category_oid')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_subcategory_all = function() {
    return new Promise(function(resolve,reject) {
        BusinessSubCat.find()
        .populate('business_category_oid')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_subcategory_admin = function(req, res) {
    return new Promise(function(resolve,reject) {
        BusinessSubCat.find(req.body.details)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_subcategory_by_category = function(category_oid) {
    return new Promise(function(resolve,reject) {
        category_oid = ObjectId(category_oid)
        BusinessSubCat.find({'status' : 'approved', 'business_category_oid' : category_oid})
        .populate('business_category_oid')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.update_business_subcategory = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        BusinessSubCat.findOne({ 'business_subcategory_id': req.body.business_subcategory_id, 'created_by' : req.body.created_by }, function (err, businessdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(businessdata){
                        businessdata.business_subcategory_name = req.body.business_subcategory_name || businessdata.business_subcategory_name;
                        businessdata.business_subcategory_name_ar = req.body.business_subcategory_name_ar || businessdata.business_subcategory_name_ar;
                        businessdata.business_subcategory_theme_color= req.body.business_subcategory_theme_color || businessdata.business_subcategory_theme_color;
                        businessdata.business_subcategory_img= req.body.business_subcategory_img || businessdata.business_subcategory_img;
                        businessdata.business_subcategory_icon= req.body.business_subcategory_icon || businessdata.business_subcategory_icon;
                        businessdata.business_subcategory_type= req.body.business_subcategory_type || businessdata.business_subcategory_type;
                        businessdata.business_category_name = req.body.business_category_name || businessdata.business_category_name;
                        businessdata.business_category_name_ar = req.body.business_category_name_ar || businessdata.business_category_name_ar;
                        businessdata.business_category_oid = ObjectId(req.body.business_category_oid) || businessdata.business_category_oid;
                        businessdata.status= req.body.status || businessdata.status;
                        businessdata.save({new : true}).then((result) => {
                            
                        resolve(resObj.content_operation_responses("Updated", result))


                    }).catch((error) => {
                    //console.log(error);
                    resolve(resObj.content_operation_responses("Error", error))
                });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_business_subcategory = function(business_subcategory_id, created_by) {
    return new Promise(function(resolve, reject) {
        BusinessSubCat.findOne({'business_subcategory_id': business_subcategory_id , 'created_by' : created_by}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}




////////////////////////Business User handlers/////////////////////////////////////////////////////////////////////


module.exports.find_business_user = function(user_email) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find({ "user_email" : user_email, "user_status" : "approved"})
        .populate('business_category')
        .populate('business_subcategory')
        .exec()
        .then((resp) => {
            resolve(resp);
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.search_business_by_user_name = function(user_name) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find({ "user_name" : { $regex: user_name, $options: 'i' }, user_name, "user_status" : "approved"})
        .populate('business_category')
        .populate('business_subcategory')
        .exec()
        .then((resp) => {
            console.log(resp)
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else {
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
            
        }).catch((error) => {
         resolve(resObj.user_operation_responses("Error", error))
     });
    })
};


module.exports.create_business_user_simple = function(user_type,user_public_name, user_email, user_password, user_fcm) {
    return new Promise(function(resolve, reject) {
        let businessuserID = uniqid();
        const saltRounds = 10;
        bcrypt.hash(user_password, saltRounds).then((hash) => {
            return hash
        }).then((password) => {
                BusinessUser.create({
                    user_id : businessuserID,
                    user_type : user_type,
                    user_email : user_email,
                    user_public_name : user_public_name,
                    user_fcm : user_fcm,
                    user_password : password
                })
            .then((userContent) => {
                userContent.user_password = undefined;
                resolve(resObj.register_resp("Registered", userContent))
            })
            .catch((error) => {
                console.log(error)
                resolve(resObj.register_resp("Error", error))
            });
        })
    })
};
module.exports.create_business_user_gmail = function(user_type, user_public_name, user_email, user_fcm, user_gid, user_dp) {
    return new Promise(function(resolve, reject) {
        let businessuserID = uniqid();
        BusinessUser.create({
                    user_id :businessuserID,
                    user_type : user_type,
                    user_public_name : user_public_name,
                    user_email : user_email,
                    user_fcm : user_fcm,
                    user_gid : user_gid,
                    user_dp : user_dp
                }).then((userContent) => {
                        userContent.user_password = undefined;
                        resolve(resObj.register_resp("Registered", userContent))
                    }).catch((error) => {
                        console.log(error)
                        resolve(resObj.content_operation_responses("Error", error))
                    });
    })
};
module.exports.create_business_user_fb = function(user_type, user_public_name, user_email, user_fcm, user_fid, user_dp) {
    return new Promise(function(resolve, reject) {
        let businessuserID = uniqid();
        BusinessUser.create({
                    user_id :businessuserID,
                    user_type : user_type,
                    user_public_name : user_public_name,
                    user_email : user_email,
                    user_fcm : user_fcm,
                    user_fid : user_fid,
                    user_dp : user_dp
                }).then((userContent) => {
                        userContent.user_password = undefined;
                        resolve(resObj.register_resp("Registered", userContent))
                    }).catch((error) => {
                        console.log(error)
                        resolve(resObj.content_operation_responses("Error", error))
                    });
    })
};
module.exports.read_business_user = function(req, res) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find({user_type : "Business", user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });
    })
};
module.exports.read_user_details = function(req, res) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find({user_id : req.body.user_id, user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .sort({'updated_at' : -1})
        .skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });
    })
};



module.exports.read_business_user_by_id = function(user_id) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find({user_id : user_id, user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_user_by_oid = function(user_oid) {
    return new Promise(function(resolve, reject) {
        //user_oid = ObjectId(user_oid);
        BusinessUser.find({_id : ObjectId(user_oid)},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_user_by_distance = function(lat, lon, distance, offset) {
    return new Promise(function(resolve, reject) {
        let resArr = []
        let usrLoc = {
              lat: lat,
              lon: lon
            };
        BusinessUser.find({user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .exec()
        .then((resp) => {
             Promise.each(resp, function(usrVal) {
                let destination = {
                    lat : usrVal.location_lat,
                    lon : usrVal.location_long
                }
               let dist = Distance.between(usrLoc, destination);
               if(dist<=Distance(distance)) {
                resArr.push({"businessData" :usrVal, "distance" : ''+dist.human_readable()});
                console.log("Here");

               }
               return "anything"
            }).then(function(result) {
               console.log(resArr);
                if(resArr.length>0) {
                resolve(resObj.user_operation_responses("DistanceFilter", resArr))
                }
                else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
                }
            });

        })
    })
};
calculate_distance_internal = function(data, lat, lon, distance) {
    return new Promise(function(resolve, reject) {
        console.log("Entered distance calculator");
        let resArr = []
        let usrLoc = {
              lat: lat,
              lon: lon
            };

        Promise.each(data, function(usrVal) {
            //console.log(usrVal);
                let destination = {
                    lat : usrVal.location_lat,
                    lon : usrVal.location_long
                }
               let dist = Distance.between(usrLoc, destination);
               console.log("---------------"+"Distance is"+dist+"-------------------------")
               if(dist<=Distance(distance)) {
                //console.log(dist);
                console.log("Entered distance logic");
                resArr.push({"businessData" :usrVal, "distance" : ''+dist.human_readable()});
                //console.log(resArr);
               }
               return "anything"
        }).then(function(result) {
               //console.log(resArr);
                if(resArr.length>0) {
                    //console.log("Touched here");
                    resolve(resArr);
                //resolve(resObj.user_operation_responses("DistanceFilter", resArr))
                }
                else {
                    resolve("Not found");
                }
                // else{
                // //resolve(resObj.user_operation_responses("Unavailable", "NA"))
                // }
        });
    })
};
module.exports.read_business_user_by_city = function(city, offset) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find({business_city : city, user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .sort({'updated_at' : -1})
        .skip(parseInt(offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });

    })
};
module.exports.read_business_user_by_category = function(business_category_oid, offset) {
    return new Promise(function(resolve, reject) {
        category_oid = ObjectId(business_category_oid)
        BusinessUser.find({'business_category' : category_oid, user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .sort({'updated_at' : -1})
        .skip(parseInt(offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });
    })
};
module.exports.read_business_user_by_subcategory = function(business_category_oid, business_subcategory_oid, offset) {
    return new Promise(function(resolve, reject) {
        subcategory_oid = ObjectId(business_subcategory_oid);
        category_oid = ObjectId(business_category_oid)
        BusinessUser.find({'business_category' :category_oid, 'business_subcategory' : subcategory_oid, user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .sort({'updated_at' : -1})
        .skip(parseInt(offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });

    })
};
module.exports.read_business_user_by_type = function(type, offset) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find({business_type : type, user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .sort({'updated_at' : -1})
        .skip(parseInt(offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });

    })
};
module.exports.read_business_user_by_space = function(space, offset) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find({business_space : space, user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .sort({'updated_at' : -1})
        .skip(parseInt(offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });

    })
};
module.exports.read_business_user_by_brand = function(brand, offset) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find({business_brand : brand, user_status : "approved"},{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .sort({'updated_at' : -1})
        .skip(parseInt(offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });
    })
};

module.exports.read_business_user_all = function(req, res) {
    return new Promise(function(resolve, reject) {
        if(req.body.search_term) {
            let date = new Date();
            date = date.toISOString().slice(0,10);
            // console.log(req.body.search_term);
            // console.log(req.body.search_type);
                Search.findOneAndUpdate({ search_term : req.body.search_term, search_type : req.body.search_type, updated_at : date },{$inc : { "search_count" : 1 }}, { upsert : true }).exec().then((response) => {
                if(response) {
                    console.log("Search term added/updated");
                }
            })
        }
        let detailValue = req.body.details;
        let details = {};

        console.log(detailValue);
        console.log("------------"+req.body.business_name_english+"----------------");
        //details = {$and : [{$or : [{item_name: { $regex: req.body.item_name, $options: 'i' }},{item_tags : {$regex : req.body.item_name, $options : 'i'}},{item_description : {$regex : req.body.item_name, $options : 'i'}},{item_name_ar : {$regex : req.body.item_name, $options : 'i'}},{item_description_ar : {$regex : req.body.item_name, $options : 'i'}}]},detailValue]};
        //details = {$and : [{$or : [{item_name: { $regex: req.body.item_name, $options: 'i' }},{item_tags : {$regex : req.body.item_name, $options : 'i'}},{item_description : {$regex : req.body.item_name, $options : 'i'}},{item_name_ar : {$regex : req.body.item_name, $options : 'i'}},{item_description_ar : {$regex : req.body.item_name, $options : 'i'}}]},detailValue]};

        if(req.body.business_name_english) {
            //details = {$and : [{$or : [{item_name: { $regex: req.body.item_name, $options: 'i' }},{item_tags : {$regex : req.body.item_name, $options : 'i'}},{item_description : {$regex : req.body.item_name, $options : 'i'}},{item_name_ar : {$regex : req.body.item_name, $options : 'i'}},{item_description_ar : {$regex : req.body.item_name, $options : 'i'}}]},detailValue]};
            details = {$and : [{$or : [{business_name_english: { $regex: req.body.business_name_english, $options: 'i' }}, {business_description_english : {$regex : req.body.business_name_english, $options : 'i'}},{business_name_arabic: { $regex: req.body.business_name_english, $options: 'i' }}, {business_description_arabic : {$regex : req.body.business_name_english, $options : 'i'}}]},detailValue]};
        }
        else if(req.body.business_name_arabic) {
            //details = {$or : [{business_name_arabic: { $regex: req.body.business_name_arabic, $options: 'i' }}, {business_description_arabic : {$regex : req.body.business_name_arabic, $options : 'i'}},{business_name_english: { $regex: req.body.business_name_arabic, $options: 'i' }}, {business_description_english : {$regex : req.body.business_name_arabic, $options : 'i'}}], ...detailValue};
            details = {$and : [{$or : [{business_name_arabic: { $regex: req.body.business_name_arabic, $options: 'i' }}, {business_description_arabic : {$regex : req.body.business_name_arabic, $options : 'i'}},{business_name_english: { $regex: req.body.business_name_arabic, $options: 'i' }}, {business_description_english : {$regex : req.body.business_name_arabic, $options : 'i'}}]},detailValue]};
        }
        else {
            details = detailValue;
        }

        console.log("query",details);


        // let details = req.body.details;
        // if(req.body.business_name_english) {
        //     details.business_name_english = { $regex: req.body.business_name_english, $options: 'i' };
        // }
        // else if(req.body.business_name_arabic) {
        //     details.business_name_arabic = { $regex: req.body.business_name_arabic, $options: 'i' };
        // }
        BusinessUser.find(details,{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .sort({'business_featured' : -1,'created_at' : -1})
        //.sort({'created_at' : -1})
        .skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {
                if(req.body.distance){
                    console.log("Entered Distance block");
                    this.calculate_distance_internal(resp, req.body.lat, req.body.long, req.body.distance).then((respArr) => {
                        if(respArr==="Not found") {
                            resolve(resObj.user_operation_responses("Unavailable", "NA"))
                        }
                        else{
                        resolve(resObj.user_operation_responses("DistanceFilter", respArr))
                        }
                    })
                }
                else {
                    resolve(resObj.user_operation_responses("Fetch", resp))
                }
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            console.log(error);
         resolve(resObj.user_operation_responses("Error", error))
     });
    })
};

module.exports.read_businessuser_all = function(req, res) {
    return new Promise(function(resolve, reject) {
        BusinessUser.find(req.body.details,{user_password : 0})
        .populate('business_category')
        .populate('business_subcategory')
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            resolve(resObj.user_operation_responses("Error", error))
        });
    })
};

module.exports.read_user_by_timeline = function(start, end) {
    return new Promise(function(resolve, reject) {
        let start_date = isodate(start);
        let end_date = isodate(end);
        BusinessUser.find({created_at: {
            $gte: start_date,
            $lt: end_date
            }})
        .count()
        .then((resp) => {
            console.log(resp);
            if(resp) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            console.log(error);
            resolve(resObj.user_operation_responses("Error", error))
        });

    })
};

module.exports.read_business_user_by_timeline = function(start, end) {
    return new Promise(function(resolve, reject) {
        let start_date = isodate(start);
        let end_date = isodate(end);
        BusinessUser.find({business_user_since: {
            $gte: start_date,
            $lt: end_date
            }})
        .count()
        .then((resp) => {
            console.log(resp);
            if(resp) {
                resolve(resObj.user_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.user_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            console.log(error);
            resolve(resObj.user_operation_responses("Error", error))
        });

    })
};


module.exports.update_business_user_for_login_gmail = function(user_type, user_name, user_name_public, user_email, user_fcm, user_gid, user_dp) {
    return new Promise(function(resolve, reject) {
        BusinessUser.findOne({ 'user_email': user_email}, function (err, businessdata) {
            if (err) {
                console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            }else{
                businessdata.user_email = user_email || businessdata.user_email;
                businessdata.user_name = user_name || businessdata.user_name;
                businessdata.user_name_public = user_name_public || businessdata.user_name_public;
                businessdata.user_fcm = user_fcm || businessdata.user_fcm;
                businessdata.user_type = user_type || businessdata.user_type;
                businessdata.user_gid = user_gid || businessdata.user_gid;
                businessdata.user_dp = user_dp || businessdata.user_dp;
                businessdata.save({new : true}).then((result) => {
                    BusinessUser.findOne(
                        { 'user_email': user_email},{user_password : 0}
                        ).populate('business_category').populate('business_subcategory').exec().then((resp) => {
                            resolve(resObj.register_resp("LoggedIn", resp))
                        })
                })
            }
        });
    })
}

module.exports.update_business_user_for_login_fb = function(user_type, user_name, user_name_public, user_email, user_fcm, user_fid, user_dp) {
    return new Promise(function(resolve, reject) {
        BusinessUser.findOne({ 'user_email': user_email}, function (err, businessdata) {
            if (err) {
                console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            }else{
                businessdata.user_email = user_email || businessdata.user_email;
                businessdata.user_name = user_name || businessdata.user_name;
                businessdata.user_name_public = user_name_public || businessdata.user_name_public;
                businessdata.user_fcm = user_fcm || businessdata.user_fcm;
                businessdata.user_type = user_type || businessdata.user_type;
                businessdata.user_fid = user_fid || businessdata.user_fid;
                businessdata.user_dp = user_dp || businessdata.user_dp;
                businessdata.save({new : true}).then((result) => {
                    BusinessUser.findOne(
                        { 'user_email': user_email},{user_password : 0}
                        ).populate('business_category').populate('business_subcategory').exec().then((resp) => {
                            resolve(resObj.register_resp("LoggedIn", resp))
                        })
                })
            }
        });
    })
}

module.exports.update_business_user = function(req, res) {
    let user_type='';
    return new Promise(function(resolve, reject) {
        BusinessUser.findOne({ 'user_email': req.body.user_email}, function (err, businessdata) {
            if (err) {
                console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else{
                console.log(businessdata);
                if(businessdata){
                    if(req.body.business_user_since) {
                        businessdata.business_user_since = isodate(req.body.business_user_since) || businessdata.business_user_since;
                    }
                    user_type=businessdata.user_type;
                    businessdata.user_type = req.body.user_type || businessdata.user_type;
                    businessdata.user_name = req.body.user_name || businessdata.user_name;
                    businessdata.user_public_name = req.body.user_public_name || businessdata.user_public_name;
                    businessdata.user_email = req.body.user_email || businessdata.user_email;
                    businessdata.user_fcm = req.body.user_fcm || businessdata.user_fcm;
                    businessdata.user_gid = req.body.user_gid || businessdata.user_gid;
                    businessdata.user_fid = req.body.user_fid || businessdata.user_fid;
                    businessdata.user_dp = req.body.user_dp || businessdata.user_dp;
                    businessdata.user_phone = req.body.user_phone || businessdata.user_phone;
                    businessdata.user_fid = req.body.user_fid || businessdata.user_fid;
                    businessdata.user_language = req.body.user_language || businessdata.user_language;
                    businessdata.user_country = req.body.user_country || businessdata.user_country;
                    businessdata.user_status = req.body.user_status || businessdata.user_status;
                    businessdata.business_name_english = req.body.business_name_english || businessdata.business_name_english;
                    businessdata.business_name_arabic = req.body.business_name_arabic || businessdata.business_name_arabic;
                    businessdata.business_category = req.body.business_category || businessdata.business_category;
                    businessdata.business_subcategory = req.body.business_subcategory || businessdata.business_subcategory;
                    businessdata.business_email = req.body.business_email || businessdata.business_email;
                    businessdata.business_type = req.body.business_type || businessdata.business_type;
                    businessdata.business_brand = req.body.business_brand || businessdata.business_brand;
                    businessdata.business_brand_ar = req.body.business_brand_ar || businessdata.business_brand_ar;
                    businessdata.business_space = req.body.business_space || businessdata.business_space;
                    businessdata.business_space_ar = req.body.business_space_ar || businessdata.business_space_ar;
                    businessdata.business_city = req.body.business_city || businessdata.business_city;
                    businessdata.business_city_ar = req.body.business_city_ar || businessdata.business_city_ar;
                    businessdata.location_lat = req.body.location_lat || businessdata.location_lat;
                    businessdata.location_long = req.body.location_long || businessdata.location_long;
                    businessdata.address = req.body.address || businessdata.address;
                    businessdata.address_ar = req.body.address_ar || businessdata.address_ar;
                    businessdata.logo = req.body.logo || businessdata.logo;
                    businessdata.cover_image = req.body.cover_image || businessdata.cover_image;
                    businessdata.deals_in = req.body.deals_in || businessdata.deals_in;
                    businessdata.noofquotes = req.body.noofquotes || businessdata.noofquotes;
                    businessdata.business_description_english = req.body.business_description_english || businessdata.business_description_english;
                    businessdata.business_description_arabic = req.body.business_description_arabic || businessdata.business_description_arabic;
                    businessdata.web_link = req.body.web_link || businessdata.web_link;
                    businessdata.fb_link = req.body.fb_link || businessdata.fb_link;
                    businessdata.instagram_link = req.body.instagram_link || businessdata.instagram_link;
                    businessdata.youtube_link = req.body.youtube_link || businessdata.youtube_link;
                    businessdata.twitter_link = req.body.twitter_link || businessdata.twitter_link;
                    businessdata.ratings = req.body.ratings || businessdata.ratings;
                    businessdata.business_featured = req.body.business_featured || businessdata.business_featured;
                    businessdata.meta_title = req.body.meta_title || businessdata.meta_title;
                    businessdata.meta_description = req.body.meta_description || businessdata.meta_description;
                    businessdata.meta_keyword = req.body.meta_keyword || businessdata.meta_keyword;
                    businessdata.og_url = req.body.og_url || businessdata.og_url;
                    businessdata.og_type = req.body.og_type || businessdata.og_type;
                    businessdata.og_title = req.body.og_title || businessdata.og_title;
                    businessdata.og_description = req.body.og_description || businessdata.og_description;
                    businessdata.og_image = req.body.og_image || businessdata.og_image;
                    businessdata.save({new : true}).then((result) => {
                        if(req.body.business_hours && req.body.leisure_hours){
                            this.update_business_hours(req.body.business_hours, req.body.leisure_hours, result.user_id).then((resp) => {
                                    resolve(resObj.content_operation_responses("Updated", resp))
                            })
                        }
                        BusinessUser.findOne(
                            { 'user_email': req.body.user_email},{user_password : 0}
                            ).populate('business_category').populate('business_subcategory').exec().then((resp) => {
                                if(user_type!='Business' && businessdata.user_type=='Business'){
                                      //newbusinessuser  mail 
                                        req.body.email=businessdata.user_email;
                                        req.body.subject_body="A new business user profile created.";
                                        req.body.user_name=businessdata.user_name;
                                        req.body.type="newbusinessuser";
                                        Notification.send_mail(req,res);
                                        console.log("A new business user profile created.");
                                }
                                resolve(resObj.user_operation_responses("Updated", resp))
                            })
                    })
            }
            else {
                resolve(resObj.content_operation_responses("Error", err))
            }
            }
        });
    })
}

update_business_hours=function(business_hours, leisure_hours, user_id) {
    return new Promise(function(resolve, reject) {
        let business_hoursdata=[];
        let leisure_hoursdata=[];
        return Promise.each(business_hours, function(Bhours) {
                let b_hoursdata=Bhours;
                if(Bhours.from.hh!=undefined){
                    b_hoursdata.from=Bhours.from.hh+':'+Bhours.from.mm+' '+Bhours.from.A;
                    b_hoursdata.to=Bhours.to.hh+':'+Bhours.to.mm+' '+Bhours.to.A;
                }
                if(Bhours.from=='undefined:undefined undefined'){
                    b_hoursdata.from='';
                    b_hoursdata.to='';
                }
                console.log(b_hoursdata);
                business_hoursdata.push(b_hoursdata);
                 
            }).then(function(result) {
                
                           return Promise.each(leisure_hours, function(Lhours) {
                                        let l_hoursdata=Lhours;
                                        if(Lhours.from.hh!=undefined){
                                            l_hoursdata.from=Lhours.from.hh+':'+Lhours.from.mm+' '+Lhours.from.A;
                                            l_hoursdata.to=Lhours.to.hh+':'+Lhours.to.mm+' '+Lhours.to.A;
                                        }
                                        if(Lhours.from=='undefined:undefined undefined'){
                                            l_hoursdata.from='';
                                            l_hoursdata.to='';
                                        }
                                        
                                        console.log(l_hoursdata);
                                        leisure_hoursdata.push(l_hoursdata);
                                     
                                }).then(function(result) {
                                    //console.log(result_arr);
                                        if(business_hoursdata.length>0) {
                                           business_hoursdata= JSON.stringify(business_hoursdata);
                                           leisure_hoursdata= JSON.stringify(leisure_hoursdata);
                                        BusinessUser.findOneAndUpdate(
                                                {'user_id' : user_id },
                                                { $set: { business_hours:business_hoursdata, leisure_hours:leisure_hoursdata} },{new : true}).exec().then((resp_data) => {
                                                    resolve(resp_data)
                                            })
                                            
                                        }else{
                                           resolve(resObj.fee_responses("Unavailable", "NA"))
                                        }
                                        
                                });
                
                        //resolve(resObj.fee_responses("Fetch", result_arr))
                    //}
                    
            });

         
    })
};

module.exports.update_business_public = function(req, res){
    return new Promise(function(resolve, reject) {
        BusinessUser.findOne({ 'user_id': req.body.business_id}, function (err, businessdata) {
                if (err) {
                    reject("Invalid")
                } else {
                    ratings = req.body.user_review.rating;
                        if(businessdata.ratings === 0) {
                            businessdata.ratings = parseFloat(ratings);
                            let index = businessdata.user_reviews.findIndex(x => x.comment_by===req.body.user_review.comment_by)
                            if(index === -1) {
                                businessdata.user_reviews.push(req.body.user_review);
                            }
                            else {
                                businessdata.user_reviews.splice(businessdata.user_reviews.findIndex(item => item.comment_by === req.body.user_review.comment_by), 1)
                                businessdata.user_reviews.push(req.body.user_review);
                                //console.log("Checked");
                            }
                        }
                        else{
                            businessdata.ratings = ((businessdata.ratings+parseFloat(ratings)))/2;
                            let index = businessdata.user_reviews.findIndex(x => x.comment_by==req.body.user_review.comment_by)
                            if(index === -1) {
                                businessdata.user_reviews.push(req.body.user_review);
                            }
                            else {
                                businessdata.user_reviews.splice(businessdata.user_reviews.findIndex(item => item.comment_by === req.body.user_review.comment_by), 1)
                                businessdata.user_reviews.push(req.body.user_review);

                            }
                        }
                        businessdata.save({new : true}).then((result) => {
                            BusinessUser.findOne(
                                {'user_id': req.body.business_id}
                                    ).populate('business_category').populate('business_subcategory').exec().then((resp) => {
                                        resolve(resObj.content_operation_responses("Updated", resp))
                                    })
                        })
                }
            });
    })
}

module.exports.deletecomment = function(req, res){
    return new Promise(function(resolve, reject) {
        BusinessUser.findOne({ 'user_id': req.body.business_id}, function (err, businessdata) {
                if (err) {
                    reject("Invalid")
                } else {
                    ratings = req.body.user_review.rating;
                        if(businessdata.ratings === 0) {
                            businessdata.ratings = parseFloat(ratings);
                            let index = businessdata.user_reviews.findIndex(x => x.comment_by===req.body.user_review.comment_by)
                            if(index === -1) {
                                //businessdata.user_reviews.push(req.body.user_review);
                            }
                            else {
                                businessdata.user_reviews.splice(businessdata.user_reviews.findIndex(item => item.comment_by === req.body.user_review.comment_by), 1)
                                //businessdata.user_reviews.push(req.body.user_review);
                                //console.log("Checked");
                            }
                        }
                        else{
                            businessdata.ratings = ((businessdata.ratings-parseFloat(ratings)))/2;
                            let index = businessdata.user_reviews.findIndex(x => x.comment_by==req.body.user_review.comment_by)
                            if(index === -1) {
                                //businessdata.user_reviews.push(req.body.user_review);
                            }
                            else {
                                businessdata.user_reviews.splice(businessdata.user_reviews.findIndex(item => item.comment_by === req.body.user_review.comment_by), 1)
                                //businessdata.user_reviews.push(req.body.user_review);

                            }
                        }
                        businessdata.save({new : true}).then((result) => {
                            BusinessUser.findOne(
                                {'user_id': req.body.business_id}
                                    ).populate('business_category').populate('business_subcategory').exec().then((resp) => {
                                        resolve(resObj.content_operation_responses("Updated", resp))
                                    })
                        })
                }
            });
    })
}

update_user_likes = function(optype, user_id, item_id){
    return new Promise(function(resolve, reject) {
        //item_oid = ObjectId(item_oid);
               
            if(optype==="Add") {

                    BusinessUser.findOneAndUpdate({'user_id': user_id},
                    { $addToSet: { 'user_likes' : item_id } },{new : true}).populate('business_category').populate('business_subcategory').exec().then((resp_data) => {
                        resolve(resp_data);
                                
                    }).catch((error) => {
                        console.log(error);
                        console.log("-----------------------------Not updated in user data------------------------------")             
                    })

            }
            else if(optype==="Remove") {

                    BusinessUser.findOneAndUpdate({'user_id': user_id},
                    { $pull: { user_likes: item_id} },{new : true}).populate('business_category').populate('business_subcategory').exec().then((resp_data) => {
                        resolve(resp_data);
                                
                    }).catch((error) => {
                        console.log()
                        console.log("-----------------------------Not updated in user data------------------------------")             
                    })

            }
            else {
                            
            }
    })
}



module.exports.delete_business_user = function(user_email) {
    return new Promise(function(resolve, reject) {
        BusinessUser.findOne({'user_email': user_email}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.user_operation_responses("DeleteUserError", result))
            }
            else
            {
                resolve(resObj.user_operation_responses("DeleteUser", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.user_operation_responses("Error", error))
     });

    })  
}

module.exports.forgotpassword = function(req, res) {
    return new Promise(function(resolve, reject) {
        BusinessUser.findOne({"user_email" :req.body.user_email}).populate('business_category').populate('business_subcategory')
        .sort({'updated_at' : -1})
        .exec()
        .then((resp) => {
            if(resp) {
                console.log(resp);
                //forgot password mail 
                req.body.email=resp.user_email;
                req.body.user_name=resp.user_name;
                
                if(req.body.user_lang=="arabic"){
                    req.body.subject_body="هل نسيت كلمة المرور؟";
                    req.body.type="forgotpassword_ar";
                }else{
                   req.body.subject_body="Forgot your password?";
                   req.body.type="forgotpassword"; 
                }
                req.body._id=resp._id;
                Notification.send_mail(req,res);

                resolve(resObj.user_operation_responses("Updated", resp))
          }else{
                resolve(resObj.content_operation_responses("Unavailable", "error"))
            }
            
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.changepassword = function(req, res) {
    return new Promise(function(resolve, reject) {
        BusinessUser.findOne({ "_id" :req.body.id, "user_status" : "approved"}, function (err, userdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
            if(userdata) {
                const saltRounds = 10;
                bcrypt.hash(req.body.user_password, saltRounds).then((hash) => {
                    return hash
                }).then((password) => {
                        userdata.user_password = password || userdata.user_password;
                        userdata.save({new : true}).then((result) => {
                        BusinessUser.find({"_id" :req.body.id}).populate('business_category').populate('business_subcategory')
                        .sort({'updated_at' : -1})
                        .exec()
                        .then((resp) => {
                        resolve(resObj.user_operation_responses("Updatedwithtoken", resp))
                       })
                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });
                })
            }else{
                resolve(resObj.content_operation_responses("Unavailable", "error"))
            }
        }
            
        }).catch((error) => {
         resolve("Try again")
     });

    })
};



//*****************************************Collections****************************************************************

module.exports.search_collection = function(collection_name) {
    return new Promise(function(resolve, reject) {
        Collection.find({ "collection_name" : collection_name, "status" : "approved"})
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_collection_by_user = function(created_by, status) {
    return new Promise(function(resolve, reject) {
        user_oid = ObjectId(created_by);
        Collection.find({ "created_by" : user_oid, "status" : status})
        .populate('created_by')
        .populate('collection_items')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.read_collection_by_collection_id = function(collection_id) {
    return new Promise(function(resolve, reject) {
        Collection.find({ "collection_id" : collection_id})
        .populate('created_by')
        .populate('collection_items')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};
module.exports.create_collection= function(req, res) {
    return new Promise(function(resolve, reject) {
        let ColID = uniqid();
        // let user_oid = req.body.created_by;
        Collection.create({
            collection_id : ColID,
            collection_name : req.body.collection_name,
            collection_description : req.body.collection_description,
            collection_type : req.body.collection_type,
            collection_img : req.body.collection_img,
            collection_theme_color : req.body.collection_theme_color,
            created_by : req.body.created_by
                })
        .then((Content) => {
           resolve(resObj.content_operation_responses("Created", Content))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};


module.exports.update_collection = function(req, res) {
    return new Promise(function(resolve, reject) {
        user_oid = ObjectId(req.body.created_by);
        Collection.findOne({ 'collection_id': req.body.collection_id, 'created_by' : user_oid}, function (err, data) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(data){
                        data.collection_name = req.body.collection_name || data.collection_name;
                        data.collection_description = req.body.collection_description || data.collection_description;
                        data.created_by = req.body.created_by || data.created_by;
                        data.collection_theme_color= req.body.collection_theme_color || data.collection_theme_color;
                        data.collection_img= req.body.collection_img || data.collection_img;
                        data.collection_type= req.body.collection_type || data.collection_type;
                        data.status= req.body.status || data.status;
                        data.save({new : true}).then((result) => {
                            if(req.body.items && req.body.optype) {
                                this.update_collection_item(req.body.optype, req.body.items, req.body.collection_id).then((resp) => {
                                    resolve(resObj.content_operation_responses("Updated", resp))
                                })
                            }
                            else {
                                    Collection.find({ "collection_id" : req.body.collection_id})
                                        .populate('collection_items')
                                        .exec()
                                        .then((resp) => {
                                            console.log(resp);
                                            if(resp.length>0) {
                                                resolve(resObj.content_operation_responses("Updated", resp))
                                            }
                                            else{
                                                resolve(resObj.content_operation_responses("Unavailable", "NA"))
                                            }
                                        }).catch((error) => {
                                         resolve(resObj.content_operation_responses("Error", error))
                                     });
                            }
                    }).catch((error) => {
                    resolve(resObj.content_operation_responses("Error", error))
                });
                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

update_collection_item=function(optype, items, collection_id) {
    return new Promise(function(resolve, reject) {
        if(optype==="Add") {
            items = items.split(",");
            Collection.findOneAndUpdate(
                {'collection_id' : collection_id },
                { $addToSet: { collection_items: { $each : items} } },{new : true}).populate('collection_items').exec().then((resp_data) => {
                    resolve(resp_data)
            })
        }
        else if(optype==="Remove") {

            Collection.findOneAndUpdate({ 'collection_id' : collection_id},
            { $pull: { collection_items: items } },{new : true}).populate('collection_items').exec().then((resp_data) => {
                resolve(resObj.content_operation_responses("Updated", resp_data))
            })

        }
        else {
            
        }

         
    })
};

module.exports.delete_collection = function(collection_id, created_by) {
    return new Promise(function(resolve, reject) {
        user_oid = ObjectId(created_by);
        Collection.findOne({'collection_id': collection_id , 'created_by' : user_oid}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

//*****************************************Projects****************************************************************

module.exports.search_project = function(project_name, project_name_ar) {
    return new Promise(function(resolve, reject) {
        let detail ={};
        //Project.find({ $or : [ {"project_name" : project_name}, {"project_name_ar" : project_name_ar} ] })
        //Project.find({$or : [{ project_name: project_name }, { project_name_ar: project_name_ar }]})
        if(project_name_ar) {
            detail = {$or:[{project_name: project_name},{project_name_ar:project_name_ar}]};
        }
        else {
            detail = {project_name : project_name};
        }
        Project.findOne(detail)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp) {
                resolve("Exists");
            }
            else{
                resolve("Allowed");
            }
        }).catch((error) => {
            console.log(error);
         resolve("Try again")
     });
    })
};

module.exports.read_project_by_user = function(created_by, status) {
    return new Promise(function(resolve, reject) {
        user_oid = ObjectId(created_by);
        Project.find({ "created_by" : user_oid, "status" : status})
        .populate('project_items')
        .populate('created_by')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.create_project= function(req, res) {
    return new Promise(function(resolve, reject) {
        let ProjectID = uniqid();
        // let user_oid = req.body.created_by;
        Project.create({
            project_id : ProjectID,
            project_name : req.body.project_name,
            project_name_ar : req.body.project_name_ar,
            project_description : req.body.project_description,
            project_description_ar : req.body.project_description_ar,
            project_type : req.body.project_type,
            project_img : req.body.project_img,
            project_theme_color : req.body.project_theme_color,
            created_by : ObjectId(req.body.created_by)
                })
        .then((Content) => {
           resolve(resObj.content_operation_responses("Created", Content))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};


module.exports.update_project = function(req, res) {
    return new Promise(function(resolve, reject) {
        user_oid = ObjectId(req.body.created_by);
        Project.findOne({ 'project_id': req.body.project_id, 'created_by' : user_oid}, function (err, data) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(data){
                        data.project_name = req.body.project_name || data.project_name;
                        data.project_name_ar = req.body.project_name_ar || data.project_name_ar;
                        data.project_description = req.body.project_description || data.project_description;
                        data.project_description_ar = req.body.project_description_ar || data.project_description_ar;
                        data.created_by = req.body.created_by || data.created_by;
                        data.project_theme_color= req.body.project_theme_color || data.project_theme_color;
                        data.project_img= req.body.project_img || data.project_img;
                        data.project_type= req.body.project_type || data.project_type;
                        data.status= req.body.status || data.status;
                        data.save({new : true}).then((result) => {
                            if(req.body.items && req.body.optype) {
                                this.update_project_item(req.body.optype, req.body.items, req.body.project_id).then((resp) => {
                                    resolve(resObj.content_operation_responses("Updated", resp))
                                })
                            }
                            else {
                                Project.findOne(
                                { 'project_id': req.body.project_id}
                                ).populate('project_items').populate('created_by').exec().then((resp) => {
                                    resolve(resObj.content_operation_responses("Updated", resp))
                                }) 
                            }
                            
                    }).catch((error) => {
                    //console.log(error);
                    resolve(resObj.content_operation_responses("Error",error))
                });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable","error"))
                }
                
            }
        });
    })
}

update_project_item=function(optype, items, project_id) {
    return new Promise(function(resolve, reject) {
        if(optype==="Add") {
            items = items.split(",");
            Project.findOneAndUpdate(
                {'project_id' : project_id },
                { $addToSet: { project_items: { $each : items} } },{new : true}).populate('project_items').exec().then((resp_data) => {
                    resolve(resp_data)
            })
        }
        else if(optype==="Remove") {

            Project.findOneAndUpdate({ 'project_id' : project_id},
            { $pull: { project_items: items } },{new : true}).populate('project_items').exec().then((resp_data) => {
                resolve(resObj.content_operation_responses("Updated", resp_data))
            })

        }
        else {
            
        }

         
    })
};

module.exports.delete_project = function(project_id, created_by) {
    return new Promise(function(resolve, reject) {
        user_oid = ObjectId(created_by);
        Project.findOne({'project_id': project_id , 'created_by' : user_oid}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

module.exports.read_project_all = function(req, res) {
    return new Promise(function(resolve, reject) {
        Project.find(req.body.details)
        .populate('project_items')
        .populate('created_by')
        .sort({'updated_at' : -1})
        .skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};



////////////////Inventory Category Handlers//////////////////////////////////////////////////////////////////////



module.exports.create_inventory_category = function(req, res) {
    return new Promise(function(resolve, reject) {
        let inventoryCatID = uniqid();
        InventoryCat.create({
            inventory_category_id : inventoryCatID,
            inventory_category_name : req.body.inventory_category_name,
            inventory_category_name_ar : req.body.inventory_category_name_ar,
            inventory_category_type : req.body.inventory_category_type,
            inventory_category_icon : req.body.inventory_category_icon,
            inventory_category_img : req.body.inventory_category_img,
            inventory_category_theme_color : req.body.inventory_category_theme_color,
            created_by : req.body.created_by 
                })
        .then((inventoryContent) => {
           resolve(resObj.content_operation_responses("Created", inventoryContent))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};
module.exports.search_inventory_category = function(inventory_category_name, inventory_category_name_ar) {
    return new Promise(function(resolve, reject) {
        let detail ={};
        if(inventory_category_name_ar) {
            detail = {$or:[{inventory_category_name: inventory_category_name},{inventory_category_name_ar:inventory_category_name_ar}]};
        }
        else {
            detail = {inventory_category_name : inventory_category_name};
        }

        InventoryCat.findOne(detail)
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp) {
                resolve("Exists");
            }
            else{
                resolve("Allowed");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.search_inventory_category_public= function(inventory_category_name, inventory_category_name_ar) {
    return new Promise(function(resolve, reject) {
        InventoryCat.find({"status" : "approved"}).or([{ "inventory_category_name" : { $regex: inventory_category_name, $options: 'i' }}, { "inventory_category_name_ar" : { $regex: inventory_category_name, $options: 'i' }}])
        .exec()
        .then((resp) => {
            //console.log(resp.length);
            if (resp.length===0) {
                
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }
            else{
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};


module.exports.read_inventory_category_approved = function() {
    return new Promise(function(resolve,reject) {
        InventoryCat.find({'status' : 'approved'})
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_inventory_category_disapproved = function() {
    return new Promise(function(resolve,reject) {
        InventoryCat.find({'status' : 'disapproved'})
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_inventory_category_all = function() {
    return new Promise(function(resolve,reject) {
        InventoryCat.find()
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_inventory_category_admin = function(req, res) {
    return new Promise(function(resolve,reject) {
        InventoryCat.find(req.body.details)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.update_inventory_category = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        InventoryCat.findOne({ 'inventory_category_id': req.body.inventory_category_id, 'created_by' : req.body.created_by }, function (err, inventorydata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(inventorydata){
                        inventorydata.inventory_category_name = req.body.inventory_category_name || inventorydata.inventory_category_name;
                        inventorydata.inventory_category_name_ar = req.body.inventory_category_name_ar || inventorydata.inventory_category_name_ar;
                        inventorydata.created_by = req.body.created_by || inventorydata.created_by;
                        inventorydata.inventory_category_theme_color= req.body.inventory_category_theme_color || inventorydata.inventory_category_theme_color;
                        inventorydata.inventory_category_img= req.body.inventory_category_img || inventorydata.inventory_category_img;
                        inventorydata.inventory_category_icon= req.body.inventory_category_icon || inventorydata.inventory_category_icon;
                        inventorydata.inventory_category_type= req.body.inventory_category_type || inventorydata.inventory_category_type;
                        inventorydata.status= req.body.status || inventorydata.status;
                        inventorydata.save({new : true}).then((result) => {
                            
                        resolve(resObj.content_operation_responses("Updated", result))


                    }).catch((error) => {
                    //console.log(error);
                    resolve(resObj.content_operation_responses("Error", error))
                });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_inventory_category = function(inventory_category_id, created_by) {
    return new Promise(function(resolve, reject) {
        InventoryCat.findOne({'inventory_category_id': inventory_category_id , 'created_by' : created_by}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

//////////////////Inventory Subcategory Handlers///////////////////////////////////////////////////////////////////////////////


module.exports.create_inventory_subcategory = function(req, res) {
    return new Promise(function(resolve, reject) {
        let inventorySubCatID = uniqid();
        InventorySubCat.create({
            inventory_subcategory_id : inventorySubCatID,
            inventory_category_name : req.body.inventory_category_name,
            inventory_category_name_ar : req.body.inventory_category_name_ar,
            inventory_category_oid : req.body.inventory_category_oid,
            inventory_subcategory_name : req.body.inventory_subcategory_name,
            inventory_subcategory_name_ar : req.body.inventory_subcategory_name_ar,
            inventory_subcategory_type : req.body.inventory_subcategory_type,
            inventory_subcategory_img : req.body.inventory_subcategory_img,
            inventory_subcategory_icon : req.body.inventory_subcategory_icon,
            inventory_subcategory_theme_color : req.body.inventory_subcategory_theme_color,
            created_by : req.body.created_by 
                })
        .then((inventoryContent) => {
           resolve(resObj.content_operation_responses("Created", inventoryContent))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};


module.exports.search_inventory_subcategory = function(inventory_subcategory_name, inventory_subcategory_name_ar,inventory_category_oid) {
    return new Promise(function(resolve, reject) {
        let detail ={};
        let category_oid=ObjectId(inventory_category_oid);
        if(inventory_subcategory_name_ar) {
            detail = {$or:[{inventory_subcategory_name: inventory_subcategory_name},{inventory_subcategory_name_ar:inventory_subcategory_name_ar}]};
        }
        else {
            detail ={inventory_subcategory_name : inventory_subcategory_name};
        }

        InventorySubCat.findOne(detail)
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp) {
                resolve("Exists");
                
            }
            else{
                resolve("Allowed");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.search_inventory_subcategory_public= function(inventory_subcategory_name) {
    return new Promise(function(resolve, reject) {
        InventorySubCat.find({"status" : "approved"}).or([{ "inventory_subcategory_name" : { $regex: inventory_subcategory_name, $options: 'i' }}, { "inventory_subcategory_name_ar" : { $regex: inventory_subcategory_name, $options: 'i' }}])
        .populate('inventory_category_oid')
        .exec()
        .then((resp) => {
            //console.log(resp.length);
            if (resp.length===0) {
                
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }
            else{
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};


module.exports.read_inventory_subcategory_approved = function() {
    return new Promise(function(resolve,reject) {
        InventorySubCat.find({'status' : 'approved'})
        .populate('inventory_category_oid')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_inventory_subcategory_disapproved = function() {
    return new Promise(function(resolve,reject) {
        InventorySubCat.find({'status' : 'disapproved'})
        .populate('inventory_category_oid')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_inventory_subcategory_all = function() {
    return new Promise(function(resolve,reject) {
        InventorySubCat.find()
        .populate('inventory_category_oid')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_inventory_subcategory_admin = function(req, res) {
    return new Promise(function(resolve,reject) {
        InventorySubCat.find(req.body.details)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.read_inventory_subcategory_by_category = function(category_oid) {
    return new Promise(function(resolve,reject) {
        category_oid = ObjectId(category_oid)
        InventorySubCat.find({'status' : 'approved', 'inventory_category_oid' : category_oid})
        .populate('inventory_category_oid')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch",resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable","NA"))
            }

        }).catch((error) => {
            console.log(error);
            resolve(resObj.content_operation_responses("Error", error))
        });
    })
};

module.exports.update_inventory_subcategory = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        InventorySubCat.findOne({ 'inventory_subcategory_id': req.body.inventory_subcategory_id, 'created_by' : req.body.created_by }, function (err, inventorydata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(inventorydata){
                        inventorydata.inventory_subcategory_name = req.body.inventory_subcategory_name || inventorydata.inventory_subcategory_name;
                        inventorydata.inventory_subcategory_name_ar = req.body.inventory_subcategory_name_ar || inventorydata.inventory_subcategory_name_ar;
                        inventorydata.inventory_subcategory_theme_color= req.body.inventory_subcategory_theme_color || inventorydata.inventory_subcategory_theme_color;
                        inventorydata.inventory_subcategory_img= req.body.inventory_subcategory_img || inventorydata.inventory_subcategory_img;
                        inventorydata.inventory_subcategory_icon= req.body.inventory_subcategory_icon || inventorydata.inventory_subcategory_icon;
                        inventorydata.inventory_subcategory_type= req.body.inventory_subcategory_type || inventorydata.inventory_subcategory_type;
                        inventorydata.inventory_category_name = req.body.inventory_category_name || inventorydata.inventory_category_name;
                        inventorydata.inventory_category_name_ar = req.body.inventory_category_name_ar || inventorydata.inventory_category_name_ar;
                        inventorydata.inventory_category_oid = ObjectId(req.body.inventory_category_oid) || inventorydata.inventory_category_oid;
                        inventorydata.status= req.body.status || inventorydata.status;
                        inventorydata.save({new : true}).then((result) => {
                            
                        resolve(resObj.content_operation_responses("Updated", result))


                    }).catch((error) => {
                    //console.log(error);
                    resolve(resObj.content_operation_responses("Error", error))
                });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_inventory_subcategory = function(inventory_subcategory_id, created_by) {
    return new Promise(function(resolve, reject) {
        InventorySubCat.findOne({'inventory_subcategory_id': inventory_subcategory_id , 'created_by' : created_by}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}


//*****************************************Inventory****************************************************************

module.exports.search_inventory = function(item_name, item_name_ar) {
    return new Promise(function(resolve, reject) {
        let detail ={};
        if(item_name_ar) {
            detail = {$or:[{item_name : item_name},{item_name_ar : item_name_ar}]};
        }
        else {
            detail = {item_name : item_name};
        }
        Inventory.findOne(detail)
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp) {
                resolve("Exists");
            }
            else{
                resolve("Allowed");
            }
        }).catch((error) => {
            console.log(error);
         resolve("Try again")
     });
    })
};

module.exports.read_inventory_all = function(req, res) {
    return new Promise(function(resolve, reject) {
        if(req.body.search_term) {
            let date = new Date();
            date = date.toISOString().slice(0,10);
            //date=date.toString().split("T");
                Search.findOneAndUpdate({ search_term : req.body.search_term, search_type : req.body.search_type, updated_at : date},{$inc : { "search_count" : 1 }},{ upsert : true }).exec().then((response) => {
                if(response) {
                    console.log("Search term added/updated");
                }
            })
        }
        
        let detailValue = req.body.details;
        console.log(req.body);
        console.log("--------------");
        let details = {};

        console.log(detailValue);
        if(req.body.item_name) {
            //details = {$or : [{item_name: { $regex: req.body.item_name, $options: 'i' }}, {item_tags : {$in : []}}], ...detailValue};
            //details = {$or : [{item_name: { $regex: req.body.item_name, $options: 'i' }}, {item_tags : {$regex : req.body.item_name, $options : 'i'}}, {item_description : {$regex : req.body.item_name, $options : 'i'}}, {item_name_ar : {$regex : req.body.item_name, $options : 'i'}}, {item_description_ar : {$regex : req.body.item_name, $options : 'i'}}], ...detailValue};
            details = {$and : [{$or : [{item_name: { $regex: req.body.item_name, $options: 'i' }},{item_tags : {$regex : req.body.item_name, $options : 'i'}},{item_description : {$regex : req.body.item_name, $options : 'i'}},{item_name_ar : {$regex : req.body.item_name, $options : 'i'}},{item_description_ar : {$regex : req.body.item_name, $options : 'i'}}]},detailValue]};
        }
        else if(req.body.item_name_ar) {
            //details = {$or : [{item_name_ar: { $regex: req.body.item_name_ar, $options: 'i' }}, {item_tags : {$regex : req.body.item_name_ar, $options : 'i'}}, {item_description_ar : {$regex : req.body.item_name_ar, $options : 'i'}}, {item_name : {$regex : req.body.item_name_ar, $options : 'i'}}, {item_description : {$regex : req.body.item_name_ar, $options : 'i'}}], ...detailValue};
            details = {$and : [{$or : [{item_name: { $regex: req.body.item_name, $options: 'i' }},{item_tags : {$regex : req.body.item_name, $options : 'i'}},{item_description : {$regex : req.body.item_name, $options : 'i'}},{item_name_ar : {$regex : req.body.item_name, $options : 'i'}},{item_description_ar : {$regex : req.body.item_name, $options : 'i'}}]},detailValue]};  
        }
        else {
            details = detailValue;
        }
        console.log(details);
        Inventory.find(details)
        .populate('created_by')
        .populate('item_category')
        .populate('item_subcategory')
        .populate('item_mentions', {'user_password' : 0})
        .sort({'item_featured' : -1,'created_at' : -1})
        //.sort({'created_at' : -1})
        .skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
            console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.read_inventory_by_id = function(item_id) {
    return new Promise(function(resolve, reject) {
        Inventory.find({'item_id' : item_id})
        .populate('created_by')
        .populate('item_category')
        .populate('item_subcategory')
        .populate('item_mentions', {'user_password' : 0})
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.read_inventory_by_user = function(created_by, status) {
    return new Promise(function(resolve, reject) {
        user_oid = ObjectId(created_by);
        Inventory.find({ "created_by" : user_oid, "status" : status})
        .populate('item_category')
        .populate('item_subcategory')
        .populate('item_mentions', {'user_password' : 0})
        .populate('created_by')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.create_inventory= function(req, res) {
    return new Promise(function(resolve, reject) {
        let InventoryID = uniqid();
        // let user_oid = req.body.created_by;
        Inventory.create({
            item_id : InventoryID,
            item_name : req.body.item_name,
            item_name_ar : req.body.item_name_ar,
            item_description: req.body.item_description,
            item_description_ar: req.body.item_description_ar,
            item_type: req.body.item_type,
            item_visibility : req.body.item_visibility,
            status: req.body.status,
            item_category: req.body.item_category,
            item_subcategory: req.body.item_subcategory,
            item_space: req.body.item_space,
            item_brand: req.body.item_brand,
            item_cost: req.body.item_cost,
            item_theme_color: req.body.item_theme_color,
            created_by : req.body.created_by,
            meta_title : req.body.meta_title,
            meta_description : req.body.meta_description,
            meta_keyword : req.body.meta_keyword,
            og_url :req.body.og_url,
            og_type :req.body.og_type,  
            og_title : req.body.og_title, 
            og_description :  req.body.og_description,  
            og_image :  req.body.og_image,
        }).then((Inv) => {
            if(req.body.optype) {
                if(req.body.optype === "Add") {

                    if(req.body.item_img && req.body.item_tags && req.body.item_mentions) {

                        this.update_inventory_arrays("Add",req.body.item_img, req.body.item_tags, req.body.item_mentions, InventoryID).then((response) =>{
                            resolve(resObj.content_operation_responses("Updated", response));
                        })
                    }
                    else if(req.body.item_img && req.body.item_tags && !req.body.item_mentions) {
                        this.update_inventory_img_tag("Add",req.body.item_img, req.body.item_tags, InventoryID).then((response) =>{
                            resolve(resObj.content_operation_responses("Updated", response));
                        })
                    }
                    else if(req.body.item_tags && req.body.item_mentions && !req.body.item_img) {
                        this.update_inventory_tag_mention("Add",req.body.item_tags, req.body.item_mentions, InventoryID).then((response) =>{
                            resolve(resObj.content_operation_responses("Updated", response));
                        })
                    }
                    else if(req.body.item_img && req.body.item_mentions && !req.body.item_tags) {
                        this.update_inventory_img_mention("Add",req.body.item_img, req.body.item_mentions, InventoryID).then((response) =>{
                            resolve(resObj.content_operation_responses("Updated", response));
                        })

                    }
                    else if(req.body.item_img && !req.body.item_tags && !req.body.item_mentions) {
                        this.update_inventory_img("Add", req.body.item_img, InventoryID).then((response) =>{
                            resolve(resObj.content_operation_responses("Updated", response));
                        })

                    }
                    else if(req.body.item_tags && !req.body.item_img && !req.body.item_mentions) {
                        this.update_inventory_tag("Add", req.body.item_tags, InventoryID).then((response) =>{
                            resolve(resObj.content_operation_responses("Updated", response));
                        })

                    }
                    else if(req.body.item_mentions && !req.body.item_tags && !req.body.item_img) {
                        this.update_inventory_mention("Add", req.body.item_mentions, InventoryID).then((response) =>{
                            resolve(resObj.content_operation_responses("Updated", response));
                        })

                    }
                    else {

                        resolve(resObj.content_operation_responses("Created", Inv))

                    }
                }
            }
            else {
                resolve(resObj.content_operation_responses("Created", Inv))
            }
           
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.update_inventory = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        Inventory.findOne({ 'item_id': req.body.item_id, 'created_by' : req.body.created_by }, function (err, inventorydata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(inventorydata){
                        inventorydata.item_name = req.body.item_name || inventorydata.item_name;
                        inventorydata.item_description = req.body.item_description || inventorydata.item_description;
                        inventorydata.item_name_ar = req.body.item_name_ar || inventorydata.item_name_ar;
                        inventorydata.item_description_ar = req.body.item_description_ar || inventorydata.item_description_ar;
                        inventorydata.item_type= req.body.item_type || inventorydata.item_type;
                        inventorydata.item_visibility= req.body.item_visibility || inventorydata.item_visibility;
                        inventorydata.status= req.body.status || inventorydata.status;
                        inventorydata.item_category= req.body.item_category || inventorydata.item_category;
                        inventorydata.item_subcategory= req.body.item_subcategory || inventorydata.item_subcategory;
                        inventorydata.item_space= req.body.item_space || inventorydata.item_space;
                        inventorydata.item_brand= req.body.item_brand || inventorydata.item_brand;
                        inventorydata.item_cost= req.body.item_cost || inventorydata.item_cost;
                        inventorydata.item_theme_color= req.body.item_theme_color || inventorydata.item_theme_color;
                        inventorydata.created_by= req.body.created_by || inventorydata.created_by;
                        inventorydata.item_featured= req.body.item_featured || inventorydata.item_featured;
                        inventorydata.meta_title = req.body.meta_title || inventorydata.meta_title;
                        inventorydata.meta_description = req.body.meta_description || inventorydata.meta_description;
                        inventorydata.meta_keyword = req.body.meta_keyword || inventorydata.meta_keyword;
                        inventorydata.og_url = req.body.og_url || inventorydata.og_url;
                        inventorydata.og_type = req.body.og_type || inventorydata.og_type;
                        inventorydata.og_title = req.body.og_title || inventorydata.og_title;
                        inventorydata.og_description = req.body.og_description || inventorydata.og_description;
                        inventorydata.og_image = req.body.og_image || inventorydata.og_image;
                        inventorydata.save({new : true}).then((result) => {
                            if(req.body.optype) {
                                    if(req.body.optype === "Add") {

                                        if(req.body.item_img && req.body.item_tags && req.body.item_mentions) {

                                            this.update_inventory_arrays("Add",req.body.item_img, req.body.item_tags, req.body.item_mentions, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })
                                        }
                                        else if(req.body.item_img && req.body.item_tags) {
                                            this.update_inventory_img_tag("Add",req.body.item_img, req.body.item_tags, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })
                                        }
                                        else if(req.body.item_tags && req.body.item_mentions) {
                                            this.update_inventory_tag_mention("Add",req.body.item_tags, req.body.item_mentions, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })
                                        }
                                        else if(req.body.item_img && req.body.item_mentions) {
                                            this.update_inventory_img_mention("Add",req.body.item_img, req.body.item_mentions, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })

                                        }
                                        else if(req.body.item_img && !req.body.item_tags && !req.body.item_mentions) {
                                            this.update_inventory_img("Add", req.body.item_img, req.body.item_id).then((response) =>{
                                                console.log(response);
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })

                                        }
                                        else if(req.body.item_tags && !req.body.item_img && !req.body.item_mentions) {
                                            this.update_inventory_tag("Add", req.body.item_tags, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })

                                        }
                                        else if(req.body.item_mentions && !req.body.item_tags && !req.body.item_img) {
                                            this.update_inventory_mention("Add", req.body.item_mentions, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })

                                        }
                                        else {

                                        }
                                    }
                                    else if(req.body.optype === "Remove") {

                                        if(req.body.item_img && req.body.item_tags && req.body.item_mentions) {

                                            this.update_inventory_arrays("Remove",req.body.item_img, req.body.item_tags, req.body.item_mentions, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })
                                        }
                                        else if(req.body.item_img && req.body.item_tags) {
                                            this.update_inventory_img_tag("Remove",req.body.item_img, req.body.item_tags, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })
                                        }
                                        else if(req.body.item_tags && req.body.item_mentions) {
                                            this.update_inventory_tag_mention("Remove",req.body.item_tags, req.body.item_mentions, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })
                                        }
                                        else if(req.body.item_img && req.body.item_mentions) {
                                            this.update_inventory_img_mention("Remove",req.body.item_img, req.body.item_mentions, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })

                                        }
                                        else if(req.body.item_img && !req.body.item_tags && !req.body.item_mentions) {
                                            this.update_inventory_img("Remove", req.body.item_img, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })

                                        }
                                        else if(req.body.item_tags && !req.body.item_img && !req.body.item_mentions) {
                                            this.update_inventory_tag("Remove", req.body.item_tags, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })

                                        }
                                        else if(req.body.item_mentions && !req.body.item_tags && !req.body.item_img) {
                                            this.update_inventory_mention("Remove", req.body.item_mentions, req.body.item_id).then((response) =>{
                                                resolve(resObj.content_operation_responses("Updated", response));
                                            })

                                        }
                                        else {

                                        }

                                    }
                            }
                            else {
                                Inventory.findOne(
                                {'item_id': req.body.item_id}
                                    ).populate('created_by').populate('item_category').populate('item_subcategory').exec().then((resp) => {
                                        resolve(resObj.content_operation_responses("Updated", resp))
                                    })

                            }
                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

update_inventory_img=function(optype, item_img, item_id) {
    return new Promise(function(resolve, reject) {
        if(optype==="Add") {
            item_img = item_img.split(",");
            Inventory.findOneAndUpdate({'item_id' : item_id },
            { $set : {item_img:[] }},{multi:true}).exec().then((resp_d) => {
                Inventory.findOneAndUpdate(
                    {'item_id' : item_id },
                    { $addToSet: { item_img: { $each : item_img} } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                        resolve(resp_data)
                })
            })
        }
        else if(optype==="Remove") {

            Inventory.findOneAndUpdate({ 'item_id' : item_id},
            { $pull: { item_img: item_img } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                resolve(resObj.content_operation_responses("Updated", resp_data))
            })

        }
        else {
            
        }

         
    })
};

update_inventory_tag=function(optype, item_tags, item_id) {
    return new Promise(function(resolve, reject) {
        if(optype==="Add") {
            item_tags = item_tags.split(",");
            Inventory.findOneAndUpdate({'item_id' : item_id },
            { $set : {item_tags:[] }},{multi:true}).exec().then((resp_d) => {
                Inventory.findOneAndUpdate(
                    {'item_id' : item_id },
                    { $addToSet: { item_tags: { $each : item_tags} } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                        console.log(resp_data);
                        resolve(resp_data)
                }).catch((error) => {
                    console.log(error);

                })
            })
        }
        else if(optype==="Remove") {

            Inventory.findOneAndUpdate({ 'item_id' : item_id},
            { $pull: { item_tags: item_tags } },{new : true}).populate('item_category').populate('item_mentions', {'user_password' : 0}).populate('item_subcategory').exec().then((resp_data) => {
                resolve(resObj.content_operation_responses("Updated", resp_data))
            })

        }
        else {
            
        }

         
    })
};

update_inventory_mention=function(optype, item_mentions, item_id) {
    return new Promise(function(resolve, reject) {
        if(optype==="Add") {
            item_mentions = item_mentions.split(",");
            Inventory.findOneAndUpdate({'item_id' : item_id },
            { $set : {item_mentions: []}},{multi:true}).exec().then((resp_d) => {
            Inventory.findOneAndUpdate(
                {'item_id' : item_id },
                { $addToSet: { item_mentions: { $each : item_mentions} } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                    console.log(resp_data);
                    resolve(resp_data)
            }).catch((error) => {
                console.log(error);

            })
         })
        }
        else if(optype==="Remove") {

            Inventory.findOneAndUpdate({ 'item_id' : item_id},
            { $pull: { item_mentions: item_mentions } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                resolve(resObj.content_operation_responses("Updated", resp_data))
            })

        }
        else {
            
        }

         
    })
};

update_inventory_arrays=function(optype, item_img, item_tags, item_mentions, item_id) {
    return new Promise(function(resolve, reject) {
        if(optype==="Add") {
            item_mentions = item_mentions.split(",");
            item_tags = item_tags.split(",");
            item_img = item_img.split(",");

            Inventory.findOneAndUpdate({'item_id' : item_id },
            { $set : {item_mentions: [],item_tags:[],item_img:[] }},{multi:true}).exec().then((resp_d) => {
            
            Inventory.findOneAndUpdate(
                {'item_id' : item_id },
                { $addToSet: { item_mentions : { $each : item_mentions}, item_tags : { $each : item_tags}, item_img : { $each : item_img} } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                    console.log(resp_data);
                    resolve(resp_data)
                    //resolve(resObj.content_operation_responses("Updated", resp_data))
            }).catch((error) => {
                console.log(error);

            })
            }).catch((error) => {
                console.log(error);

            })
        }
        else if(optype==="Remove") {

            Inventory.findOneAndUpdate({ 'item_id' : item_id},
            { $pull: { img_mentions : img_mentions, item_tags : item_tags, item_img : item_img  } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                //resolve(resObj.content_operation_responses("Updated", resp_data))
                resolve(resp_data)
            })

        }
        else {
            
        } 
    })
};

update_inventory_img_tag=function(optype, item_img, item_tags, item_id) {
    return new Promise(function(resolve, reject) {
        if(optype==="Add") {
            item_tags = item_tags.split(",");
            item_img = item_img.split(",");
            Inventory.findOneAndUpdate({'item_id' : item_id },
            { $set : {item_tags:[],item_img:[] }},{multi:true}).exec().then((resp_d) => {
                Inventory.findOneAndUpdate(
                    {'item_id' : item_id },
                    { $addToSet: { item_tags : { $each : item_tags}, item_img : { $each : item_img} } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                        console.log(resp_data);
                        resolve(resp_data)
                        //resolve(resObj.content_operation_responses("Updated", resp_data))
                }).catch((error) => {
                    console.log(error);

                })
            }).catch((error) => {
                console.log(error);

            })
        }
        else if(optype==="Remove") {

            Inventory.findOneAndUpdate({ 'item_id' : item_id},
            { $pull: { item_tags : item_tags, item_img : item_img  } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                //resolve(resObj.content_operation_responses("Updated", resp_data))
                resolve(resp_data)
            })

        }
        else {
            
        } 
    })
};

update_inventory_img_mention=function(optype, item_img, item_mentions, item_id) {
    return new Promise(function(resolve, reject) {
        if(optype==="Add") {
            item_mentions = item_mentions.split(",");
            item_img = item_img.split(",");
            Inventory.findOneAndUpdate({'item_id' : item_id },
            { $set : {item_mentions: [],item_img:[] }},{multi:true}).exec().then((resp_d) => {
                    Inventory.findOneAndUpdate(
                        {'item_id' : item_id },
                        { $addToSet: { item_mentions : { $each : item_mentions}, item_img : { $each : item_img} } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                            console.log(resp_data);
                            resolve(resp_data)
                            //resolve(resObj.content_operation_responses("Updated", resp_data))
                    }).catch((error) => {
                        console.log(error);

                    })
            }).catch((error) => {
                console.log(error);

            })
        }
        else if(optype==="Remove") {

            Inventory.findOneAndUpdate({ 'item_id' : item_id},
            { $pull: { item_mentions : item_mentions, item_img : item_img  } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                //resolve(resObj.content_operation_responses("Updated", resp_data))
                resolve(resp_data)
            })

        }
        else {
            
        } 
    })
};

update_inventory_tag_mention=function(optype, item_tags, item_mentions, item_id) {
    return new Promise(function(resolve, reject) {
        if(optype==="Add") {
            item_tags = item_tags.split(",");
            item_mentions = item_mentions.split(",");
            Inventory.findOneAndUpdate({'item_id' : item_id },
            { $set : {item_mentions: [],item_tags:[] }},{multi:true}).exec().then((resp_d) => {
                Inventory.findOneAndUpdate(
                    {'item_id' : item_id },
                    { $addToSet: { item_mentions : { $each : item_mentions}, item_tags : { $each : item_tags} } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                        console.log(resp_data);
                        resolve(resp_data)
                        //resolve(resObj.content_operation_responses("Updated", resp_data))
                }).catch((error) => {
                    console.log(error);

                })
            }).catch((error) => {
                console.log(error);

            })
        }
        else if(optype==="Remove") {

            Inventory.findOneAndUpdate({ 'item_id' : item_id},
            { $pull: { item_mentions : item_mentions, item_tags : item_tags  } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                //resolve(resObj.content_operation_responses("Updated", resp_data))
                resolve(resp_data)
            })

        }
        else {
            
        } 
    })
};


module.exports.update_inventory_public=function(item_id, optype, attribute, user_id) {
    return new Promise(function(resolve, reject) {
        Inventory.findOne({ 'item_id': item_id}, function (err, itemdata) {
            if (err) {
                reject("Invalid")
            } else {
                    switch(attribute) {
                        case "like" :
                            if(optype === "Add") {
                                this.update_user_likes(optype, user_id, item_id).then((resp) => {
                                    console.log("User like updated");
                                    itemdata.item_likes = (itemdata.item_likes+1);
                                    itemdata.save({new : true}).then((result) => {
                                    Inventory.findOne(
                                            {'item_id': item_id}
                                                ).populate('item_mentions', {'user_password' : 0}).populate('created_by').populate('item_category').populate('item_subcategory').exec().then((resp) => {
                                                    resolve(resObj.content_operation_responses("Updated", resp))
                                                })
                                    })
                                })
                            }
                            else if(optype === "Remove") {
                                this.update_user_likes(optype, user_id, item_id).then((resp) => {
                                    console.log("User like updated");
                                    if(itemdata.item_likes>0) {
                                        itemdata.item_likes = (itemdata.item_likes-1);
                                        itemdata.save({new : true}).then((result) => {
                                        Inventory.findOne(
                                                {'item_id': item_id}
                                                    ).populate('item_mentions', {'user_password' : 0}).populate('created_by').populate('item_category').populate('item_subcategory').exec().then((resp) => {
                                                        resolve(resObj.content_operation_responses("Updated", resp))
                                                    })
                                        })
                                    }
                                })
                            }
                        break;
                        case "share" :
                            if(optype === "Add") {
                                    itemdata.item_shares = (itemdata.item_shares+1);
                                    itemdata.save({new : true}).then((result) => {
                                    Inventory.findOne(
                                            {'item_id': item_id}
                                                ).populate('item_mentions', {'user_password' : 0}).populate('created_by').populate('item_category').populate('item_subcategory').exec().then((resp) => {
                                                    resolve(resObj.content_operation_responses("Updated", resp))
                                                })
                                    })
                            }
                            else if(optype === "Remove") {
                                if(itemdata.item_shares>0) {
                                    itemdata.item_shares = (itemdata.item_shares-1);
                                    itemdata.save({new : true}).then((result) => {
                                    Inventory.findOne(
                                            {'item_id': item_id}
                                                ).populate('item_mentions', {'user_password' : 0}).populate('created_by').populate('item_category').populate('item_subcategory').exec().then((resp) => {
                                                    resolve(resObj.content_operation_responses("Updated", resp))
                                                })
                                    })
                                }     
                            }
                        break;
                    }
                    
            }
        });
    })
};
module.exports.update_inventory_comment=function(optype, comment, item_id) {
    return new Promise(function(resolve, reject) {
        //user_oid = ObjectId(user_oid);
        if(optype==="Add") {
            Inventory.findOneAndUpdate(
                {'item_id' : item_id },
                { $push: { item_comments : comment } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('created_by').populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                    resolve(resObj.content_operation_responses("Updated", resp_data))
            })
        }
        else if(optype==="Remove") {
            Inventory.findOneAndUpdate(
                {'item_id' : item_id },
                { $pull: { item_comments : { _id : comment._id } } },{new : true}).populate('item_mentions', {'user_password' : 0}).populate('created_by').populate('item_category').populate('item_subcategory').exec().then((resp_data) => {
                    resolve(resObj.content_operation_responses("Updated", resp_data))
            })
        }
        else {
            
        }    
    })
};


module.exports.delete_inventory = function(item_id, created_by) {
    return new Promise(function(resolve, reject) {
        Inventory.findOne({'item_id': item_id , 'created_by' : created_by}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

////////////////////////////////Filters///////////////////////////////////////////////////////////

module.exports.search_business_filter = function(filter_name, filter_name_ar) {
    return new Promise(function(resolve, reject) {
        BusinessFilter.find().or([{ filter_name: filter_name }, { filter_name_ar: filter_name_ar }])
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_business_filter_all = function(details) {
    return new Promise(function(resolve, reject) {
        BusinessFilter.find(details)
        .sort({'updated_at' : -1})
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};


module.exports.create_business_filter= function(req, res) {
    return new Promise(function(resolve, reject) {
        let FilterID = uniqid();
        BusinessFilter.create({
            filter_id : FilterID,
            filter_name : req.body.filter_name,
            filter_name_ar : req.body.filter_name_ar,
            filter_type: req.body.filter_type,
            status: req.body.status,
            filter_img : req.body.filter_img,
            filter_category: req.body.filter_category,
            filter_category_ar: req.body.filter_category_ar,
            filter_subcategory: req.body.filter_subcategory,
            filter_subcategory_ar: req.body.filter_subcategory_ar,
            filter_theme_color: req.body.filter_theme_color,
            created_by : req.body.created_by
                })
        .then((Fil) => {
           resolve(resObj.content_operation_responses("Created", Fil))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.update_business_filter = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        BusinessFilter.findOne({ 'filter_id': req.body.filter_id, 'created_by' : req.body.created_by }, function (err, filterdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(filterdata){
                        filterdata.filter_name = req.body.filter_name || filterdata.filter_name;
                        filterdata.filter_name_ar = req.body.filter_name_ar || filterdata.filter_name_ar;
                        filterdata.filter_type= req.body.filter_type || filterdata.filter_type;
                        filterdata.filter_img= req.body.filter_img || filterdata.filter_img;
                        filterdata.status= req.body.status || filterdata.status;
                        filterdata.filter_category= req.body.filter_category || filterdata.filter_category;
                        filterdata.filter_category_ar= req.body.filter_category_ar || filterdata.filter_category_ar;
                        filterdata.filter_subcategory= req.body.filter_subcategory || filterdata.filter_subcategory;
                        filterdata.filter_subcategory_ar= req.body.filter_subcategory_ar || filterdata.filter_subcategory_ar;
                        filterdata.item_theme_color= req.body.filter_theme_color || filterdata.filter_theme_color;
                        filterdata.created_by= req.body.created_by || filterdata.created_by;
                        filterdata.save({new : true}).then((result) => {

                            if(req.body.filter_value && req.body.filter_value_ar && req.body.optype) {
                                if(req.body.optype === "Add") {
                                    this.update_business_filter_value("Add", req.body.filter_value, req.body.filter_value_ar, req.body.filter_id).then((response) =>{
                                        resolve(resObj.content_operation_responses("Updated", response));
                                    })
                                }
                                else if(req.body.optype === "Remove") {
                                    this.update_business_filter_value("Remove",req.body.filter_value, req.body.filter_value_ar, req.body.filter_id).then((response) =>{
                                        resolve(resObj.content_operation_responses("Updated", response));
                                    })
                                }
                            }
                            else {
                                resolve(resObj.content_operation_responses("Updated", result))
                            }
                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

update_business_filter_value=function(optype, filter_value, filter_value_ar, filter_id) {
    return new Promise(function(resolve, reject) {
        let fil_combined = {"value_en" : filter_value, "value_ar" : filter_value_ar}
        if(optype==="Add") {
            //filter_value = filter_value.split(",");
            //filter_value_ar = filter_value_ar.split(",");
            console.log(fil_combined);
            BusinessFilter.findOneAndUpdate(
                {'filter_id' : filter_id },
                { $addToSet: { filter_values: fil_combined, filter_values_ar: fil_combined } },{new : true}).exec().then((resp_data) => {
                    console.log(resp_data);
                    resolve(resp_data)
            }).catch((error) => {
                resolve(resObj.content_operation_responses("Error", error))

            })
        }
        else if(optype==="Remove") {

            BusinessFilter.findOneAndUpdate({ 'filter_id' : filter_id},
            { $pull: { filter_values: fil_combined, filter_values_ar: fil_combined } },{new : true}).exec().then((resp_data) => {
                resolve(resObj.content_operation_responses("Updated", resp_data))
            }).catch((error) => {
                resolve(resObj.content_operation_responses("Error", error))

            })

        }
        else {
            
        }

         
    })
};

module.exports.delete_business_filter = function(filter_id, created_by) {
    return new Promise(function(resolve, reject) {
        BusinessFilter.findOne({'filter_id': filter_id , 'created_by' : created_by}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

module.exports.search_inventory_filter = function(filter_name, filter_name_ar) {
    return new Promise(function(resolve, reject) {
        InventoryFilter.find().or([{ filter_name: filter_name }, { filter_name_ar: filter_name_ar }])
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
                
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_inventory_filter_all = function(details) {
    return new Promise(function(resolve, reject) {
        InventoryFilter.find(details)
        .sort({'updated_at' : -1})
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.create_inventory_filter= function(req, res) {
    return new Promise(function(resolve, reject) {
        let FilterID = uniqid();
        InventoryFilter.create({
            filter_id : FilterID,
            filter_name : req.body.filter_name,
            filter_name_ar : req.body.filter_name_ar,
            filter_type: req.body.filter_type,
            status: req.body.status,
            filter_img : req.body.filter_img,
            filter_category: req.body.filter_category,
            filter_category_ar: req.body.filter_category_ar,
            filter_subcategory: req.body.filter_subcategory,
            filter_subcategory_ar: req.body.filter_subcategory_ar,
            filter_theme_color: req.body.filter_theme_color,
            created_by : req.body.created_by
                })
        .then((Fil) => {
           resolve(resObj.content_operation_responses("Created", Fil))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.update_inventory_filter = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        InventoryFilter.findOne({ 'filter_id': req.body.filter_id, 'created_by' : req.body.created_by }, function (err, filterdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(filterdata){
                        filterdata.filter_name = req.body.filter_name || filterdata.filter_name;
                        filterdata.filter_name_ar = req.body.filter_name_ar || filterdata.filter_name_ar;
                        filterdata.filter_type= req.body.filter_type || filterdata.filter_type;
                        filterdata.filter_img= req.body.filter_img || filterdata.filter_img;
                        filterdata.status= req.body.status || filterdata.status;
                        filterdata.filter_category= req.body.filter_category || filterdata.filter_category;
                        filterdata.filter_category_ar= req.body.filter_category_ar || filterdata.filter_category_ar;
                        filterdata.filter_subcategory= req.body.filter_subcategory || filterdata.filter_subcategory;
                        filterdata.filter_subcategory_ar= req.body.filter_subcategory_ar || filterdata.filter_subcategory_ar;
                        filterdata.item_theme_color= req.body.filter_theme_color || filterdata.filter_theme_color;
                        filterdata.created_by= req.body.created_by || filterdata.created_by;
                        filterdata.save({new : true}).then((result) => {

                            if(req.body.filter_value && req.body.filter_value_ar && req.body.optype) {
                                if(req.body.optype === "Add") {
                                    this.update_inventory_filter_value("Add", req.body.filter_value, req.body.filter_value_ar, req.body.filter_id).then((response) =>{
                                        resolve(resObj.content_operation_responses("Updated", response));
                                    })
                                }
                                else if(req.body.optype === "Remove") {
                                    this.update_inventory_filter_value("Remove",req.body.filter_value, req.body.filter_value_ar, req.body.filter_id).then((response) =>{
                                        resolve(resObj.content_operation_responses("Updated", response));
                                    })
                                }
                            }
                            else {
                                resolve(resObj.content_operation_responses("Updated", result))
                            }
                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

update_inventory_filter_value=function(optype, filter_value, filter_value_ar, filter_id) {
    return new Promise(function(resolve, reject) {
        let fil_combined = {"value_en" : filter_value, "value_ar" : filter_value_ar}
        if(optype==="Add") {
            //filter_value = filter_value.split(",");
            //filter_value_ar = filter_value_ar.split(",");
            InventoryFilter.findOneAndUpdate(
                {'filter_id' : filter_id },
                { $addToSet: { filter_values: fil_combined , filter_values_ar: fil_combined } },{new : true}).exec().then((resp_data) => {
                    resolve(resp_data)
            }).catch((error) => {
                resolve(resObj.content_operation_responses("Error", error));
            })
        }
        else if(optype==="Remove") {

            InventoryFilter.findOneAndUpdate({ 'filter_id' : filter_id},
            { $pull: { filter_values : fil_combined, filter_values_ar : fil_combined }},{new : true}).exec().then((resp_data) => {
                resolve(resObj.content_operation_responses("Updated", resp_data))
            }).catch((error) => {
                resolve(resObj.content_operation_responses("Error", error));
            })

        }
        else {
            
        }  
    })
};

module.exports.delete_inventory_filter = function(filter_id, created_by) {
    return new Promise(function(resolve, reject) {
        InventoryFilter.findOne({'filter_id': filter_id , 'created_by' : created_by}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}


//*****************************************Blog****************************************************************

module.exports.search_blog = function(blog_title, blog_title_ar) {
    return new Promise(function(resolve, reject) {
        Blog.find().or([{ blog_title: blog_title }, { blog_title_ar: blog_title_ar }])
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_blog_all = function(req, res) {
    return new Promise(function(resolve, reject) {
        let details = req.body.details;
        if(req.body.blog_title) {
            details.blog_title = { $regex: req.body.blog_title, $options: 'i' };

        }
        if(req.body.blog_title_ar) {
            details.blog_title_ar = { $regex: req.body.blog_title_ar, $options: 'i' };

        }
        Blog.find(details)
        .sort({'updated_at' : -1})
        .skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.read_blog_by_user = function(created_by, status) {
    return new Promise(function(resolve, reject) {
        user_oid = ObjectId(created_by);
        Blog.find({ "created_by" : user_oid, "status" : status})
        .populate('created_by')
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.read_blog_by_id = function(blog_id, status) {
    return new Promise(function(resolve, reject) {
        Blog.find({"blog_id" : blog_id, "status" : status})
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.create_blog= function(req, res) {
    return new Promise(function(resolve, reject) {
        let BlogID = uniqid();
        // let user_oid = req.body.created_by;
        Blog.create({
            blog_id : BlogID,
            blog_title : req.body.blog_title,
            blog_title_ar : req.body.blog_title_ar,
            blog_body : req.body.blog_body,
            blog_body_ar : req.body.blog_body_ar,
            blog_img : req.body.blog_img,
            blog_theme_color : req.body.blog_theme_color,
            blog_type : req.body.blog_type,
            blog_likes : req.body.blog_likes,
            blog_shares : req.body.blog_shares,
            blog_bookmarks : req.body.blog_bookmarks,
            blog_comments : req.body.blog_comments,
            created_by : req.body.created_by,
            status: req.body.status
                }).then((Blog) => {
           resolve(resObj.content_operation_responses("Created", Blog))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.update_blog = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        Blog.findOne({ 'blog_id': req.body.blog_id, 'created_by' : req.body.created_by }, function (err, blogdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(blogdata){
                        blogdata.blog_title = req.body.blog_title || blogdata.blog_title;
                        blogdata.blog_title_ar = req.body.blog_title_ar || blogdata.blog_title_ar;
                        blogdata.blog_body = req.body.blog_body || blogdata.blog_body;
                        blogdata.blog_body_ar = req.body.blog_body_ar || blogdata.blog_body_ar;
                        blogdata.blog_img = req.body.blog_img || blogdata.blog_img;
                        blogdata.blog_theme_color = req.body.blog_theme_color || blogdata.blog_theme_color;
                        blogdata.blog_type = req.body.blog_type || blogdata.blog_type;
                        blogdata.created_by = req.body.created_by || blogdata.created_by;
                        blogdata.status = req.body.status || blogdata.status;
                        blogdata.save({new : true}).then((result) => {

                            Blog.findOne(
                            { 'blog_id': req.body.blog_id})
                            .exec().then((resp) => {
                                resolve(resObj.user_operation_responses("Updated", resp))
                            }).catch((error) =>{
                                console.log(error);
                                resolve(resObj.content_operation_responses("Error", error))
                            });

                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_blog = function(blog_id, created_by) {
    return new Promise(function(resolve, reject) {
        Blog.findOne({'blog_id': blog_id , 'created_by' : created_by}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}


///////////// admin Handler //////////////////////////////////////////////////

module.exports.admin_create = function(req, res) {
    return new Promise(function(resolve, reject) {
        let adminID = uniqid();
        const saltRounds = 10;
        bcrypt.hash(req.body.admin_password, saltRounds).then((hash) => {
            return hash
        }).then((password) => {
                Admin.create({
                    admin_id : adminID,
                    admin_name : req.body.admin_name,
                    admin_address : req.body.admin_address,
                    admin_img : req.body.admin_img,
                    admin_email: req.body.admin_email,
                    admin_password : password,
                    smtp_email: req.body.smtp_email,
                    smtp_password: req.body.smtp_password,
                })
            .then((adminContent) => {
                adminContent.user_password = undefined;
                resolve(resObj.register_resp("Registered", adminContent))
            })
            .catch((error) => {
                console.log(error)
                resolve(resObj.register_resp("Error", error))
            });
        })
    })
};

module.exports.search_admin = function(admin_email) {
    return new Promise(function(resolve, reject) {
        Admin.find({ "admin_email" :admin_email, "status" : "approved"})
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.admin_login = function(admin_email) {
    return new Promise(function(resolve, reject) {
        Admin.find({ "admin_email" :admin_email, "status" : "approved"})
        .exec()
        .then((resp) => {
                resolve(resp);
            
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.admin_forgotpassword = function(req, res) {
    return new Promise(function(resolve, reject) {
        Admin.findOne({ "admin_email" :req.body.admin_email, "status" : "approved"})
        .sort({'updated_at' : -1})
        .exec()
        .then((resp) => {
            if(resp) {
                console.log(resp);
                //forgot password mail 
                req.body.email=resp.admin_email;
                req.body.user_name=resp.admin_name;
                req.body.subject_body="Forgot Password";
                req.body.type="adminforgotpassword";
                req.body._id=resp._id;
                Notification.send_mail(req,res);

                resolve(resObj.user_operation_responses("Updated", resp))
          }else{
                resolve(resObj.content_operation_responses("Unavailable", "error"))
            }
            
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.admin_changepassword = function(req, res) {
    return new Promise(function(resolve, reject) {
        Admin.findOne({ "_id" :req.body.id, "status" : "approved"}, function (err, admindata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
            if(admindata) {
                const saltRounds = 10;
                bcrypt.hash(req.body.admin_password, saltRounds).then((hash) => {
                    return hash
                }).then((password) => {
                        admindata.admin_name = req.body.admin_name || admindata.admin_name;
                        admindata.admin_address = req.body.admin_address || admindata.admin_address;
                        admindata.admin_img = req.body.admin_img || admindata.admin_img;
                        admindata.admin_email = req.body.admin_email || admindata.admin_email;
                        admindata.smtp_email = req.body.smtp_email || admindata.smtp_email;
                        admindata.smtp_password = req.body.smtp_password || admindata.smtp_password;
                        admindata.admin_password = password || admindata.admin_password;
                        admindata.save({new : true}).then((result) => {
                        resolve(resObj.user_operation_responses("Updated", admindata))
                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });
                })
            }else{
                resolve(resObj.content_operation_responses("Unavailable", "error"))
            }
        }
            
        }).catch((error) => {
         resolve("Try again")
     });

    })
};
module.exports.admin_update = function(req, res) {
    return new Promise(function(resolve, reject) {
        Admin.findOne({ "_id" :req.body.id}, function (err, admindata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
            if(admindata) {
                
                        admindata.admin_name = req.body.admin_name || admindata.admin_name;
                        admindata.admin_address = req.body.admin_address || admindata.admin_address;
                        admindata.admin_img = req.body.admin_img || admindata.admin_img;
                        admindata.admin_email = req.body.admin_email || admindata.admin_email;
                        admindata.smtp_email = req.body.smtp_email || admindata.smtp_email;
                        admindata.smtp_password = req.body.smtp_password || admindata.smtp_password;
                        admindata.save({new : true}).then((result) => {
                        resolve(resObj.user_operation_responses("Updated", admindata))
                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });
            }else{
                resolve(resObj.content_operation_responses("Unavailable", "error"))
            }
        }
            
        }).catch((error) => {
         resolve("Try again")
     });

    })
};

//////////////////Searches/////////////////////////////////////////////////////////////////////////////
module.exports.search_stats = function(start, end, search_type) {
    return new Promise(function(resolve,reject) {
        let start_date = isodate(start);
        let end_date = isodate(end);
        Search.find({search_type : search_type, updated_at: {
            $gte: start_date,
            $lt: end_date
        }})
        .exec()
        .then((result) => {
            //console.log(result);
            const Property = "search_term";
            const search_terms = _.groupBy(result, Property);
            let search_arr = [];
            for(i in search_terms) {

              const evaluation = search_terms[i].reduce((evaluation, counter) =>     
                evaluation + counter.search_count, // reducer function
                0 // initial accumulator value
              );
              const search_val = search_terms[i].reduce((search_val, val) =>     
                val.search_term, // reducer function
                0 // initial accumulator value
              );
              search_arr.push({"search_term" : search_val, "search_count" : evaluation});

              
          }
          search_arr = sortJsonArray(search_arr, 'search_count','des');
          resolve(resObj.content_operation_responses("Fetch", search_arr));
        })
    })
}

////////////////////////////////Tag///////////////////////////////////////////////////////////

module.exports.search_tag = function(tag) {
    return new Promise(function(resolve, reject) {
        Tag.find({ tag: tag })
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
                
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.create_tag= function(req, res) {
    console.log("create")
    return new Promise(function(resolve, reject) {
        let tagID = uniqid();
        Tag.create({
            tag_id: tagID,
            tag : req.body.tag,
            })
        .then((Fil) => {
           resolve(resObj.content_operation_responses("Created", Fil))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.read_tag_all = function() {
    return new Promise(function(resolve, reject) {
        Tag.find()
        .sort({'updated_at' : -1})
        .exec()
        .then((resp) => {
            console.log(resp);
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.update_tag = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        Country.findOne({ 'tag_id': req.body.tag_id}, function (err, tagdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(tagdata){
                        tagdata.tag = req.body.tag || tagdata.tag;
                        tagdata.save({new : true}).then((result) => {
                            
                            resolve(resObj.user_operation_responses("Updated", result))
                            
                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_tag = function(tag_id) {
    return new Promise(function(resolve, reject) {
        Country.findOne({'tag_id': tag_id}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

//*****************************************country****************************************************************

module.exports.search_country = function(country_name) {
    return new Promise(function(resolve, reject) {
        Country.find({ country_name: country_name })
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_country = function(req, res) {
    return new Promise(function(resolve, reject) {
        let details = req.body.details;
        Country.find(details)
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.create_country= function(req, res) {
    return new Promise(function(resolve, reject) {
        let countryID = uniqid();
        // let user_oid = req.body.created_by;
        Country.create({
            country_id : countryID,
            country_name : req.body.country_name,
            code : req.body.code,
            status: req.body.status
            }).then((Blog) => {
           resolve(resObj.content_operation_responses("Created", Blog))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.update_country = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        Country.findOne({ '_id': req.body.id}, function (err, blogdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(blogdata){
                        blogdata.country_name = req.body.country_name || blogdata.country_name;
                        blogdata.code = req.body.code || blogdata.code;
                        blogdata.status = req.body.status || blogdata.status;
                        blogdata.save({new : true}).then((result) => {

                            Country.findOne(
                            { 'country_id': req.body.country_id})
                            .exec().then((resp) => {
                                resolve(resObj.user_operation_responses("Updated", resp))
                            }).catch((error) =>{
                                console.log(error);
                                resolve(resObj.content_operation_responses("Error", error))
                            });

                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_country = function(id) {
    return new Promise(function(resolve, reject) {
        Country.findOne({'_id': id}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

//*****************************************materiallist****************************************************************

module.exports.search_materiallist = function(item_name) {
    return new Promise(function(resolve, reject) {
        Materiallist.find({ item_name: item_name })
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_materiallist = function(req, res) {
    return new Promise(function(resolve, reject) {
        let details = req.body.details;
        Materiallist.find(details)
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.create_materiallist= function(req, res) {
    return new Promise(function(resolve, reject) {
        let materiallistID = uniqid();
        Materiallist.create({
            item_id : materiallistID,
            item_name : req.body.item_name,
            item_image : req.body.item_image,
            item_name_ar : req.body.item_name_ar,
            unit : req.body.unit,
            type : req.body.type,
            type_ar : req.body.type_ar,
            rate : req.body.rate,
            quantity : req.body.quantity,
            created_by : req.body.created_by,
            status: req.body.status,
            }).then((Blog) => {
           resolve(resObj.content_operation_responses("Created", Blog))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.update_materiallist = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        Materiallist.findOne({'item_id': req.body.item_id}, function (err, blogdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(blogdata){
                        blogdata.item_name = req.body.item_name || blogdata.item_name;
                        blogdata.item_image = req.body.item_image || blogdata.item_image;
                        blogdata.item_name_ar = req.body.item_name_ar || blogdata.item_name_ar;
                        blogdata.unit = req.body.unit || blogdata.unit;
                        blogdata.type = req.body.type || blogdata.type;
                        blogdata.type_ar = req.body.type_ar || blogdata.type_ar;
                        blogdata.rate = req.body.rate || blogdata.rate;
                        blogdata.quantity = req.body.quantity || blogdata.quantity;
                        blogdata.created_by = req.body.created_by || blogdata.created_by;
                        blogdata.status = req.body.status || blogdata.status;
                        blogdata.save({new : true}).then((result) => {

                            Materiallist.findOne(
                            { 'item_id': req.body.item_id})
                            .exec().then((resp) => {
                                resolve(resObj.user_operation_responses("Updated", resp))
                            }).catch((error) =>{
                                console.log(error);
                                resolve(resObj.content_operation_responses("Error", error))
                            });

                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_materiallist = function(id) {
    return new Promise(function(resolve, reject) {
        Materiallist.findOne({'item_id': id}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

//*****************************************projectplan****************************************************************

module.exports.search_projectplan = function(projectplan_name) {
    return new Promise(function(resolve, reject) {
        Projectplan.find({ projectplan_name: projectplan_name })
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_projectplan = function(req, res) {
    return new Promise(function(resolve, reject) {
        let details = req.body.details;
        Projectplan.find(details).populate('projectplan_contracts').populate('projectplan_quotes').populate('created_by')
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then(async respProjectPlans => {
            const projectPlans = respProjectPlans.slice();
            for (const [i, item] of projectPlans.entries()) {
                for (const [j, quote] of item.projectplan_quotes.entries()) {
                    await Quote.find({_id: quote._id}).populate('business_id')
                    .exec()
                    .then(async resp => {
                        for (const row of resp) {
                            if(row.business_id){
                            projectPlans[i].projectplan_quotes[j].business_id = row.business_id;
                            let category_id = await BusinessCat.find({_id: row.business_id.business_category})
                            projectPlans[i].projectplan_quotes[j].business_id["business_category"] = category_id[0];
                            console.log(projectPlans[i].projectplan_quotes[j].business_id["business_category_name"]); 
                   
                        }

                        }
                    });
                }
            }
            if (projectPlans.length > 0) {
                this.getquotesdata(projectPlans).then((respArr) => {
                        resolve(resObj.user_operation_responses("Fetch", respArr))
                });
                //resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else {
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        })
        .catch(error => {
            resolve(resObj.content_operation_responses("Error", error))
        });
        
    })
};

module.exports.create_projectplan= function(req, res) {
    return new Promise(function(resolve, reject) {
        let projectplanID = uniqid();
        Projectplan.create({
            projectplan_id : projectplanID,
            projectplan_name : req.body.projectplan_name,
            projectplan_name_ar : req.body.projectplan_name_ar,
            projectplan_contracts : req.body.projectplan_contracts,
            projectplan_quotes : req.body.projectplan_quotes,
            created_by : req.body.created_by,
            status: req.body.status,
            }).then((Blog) => {
           resolve(resObj.content_operation_responses("Created", Blog))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.update_projectplan = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        Projectplan.findOne({'projectplan_id': req.body.projectplan_id}, function (err, blogdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(blogdata){
                        blogdata.projectplan_name = req.body.projectplan_name || blogdata.projectplan_name;
                        blogdata.projectplan_name_ar = req.body.projectplan_name_ar || blogdata.projectplan_name_ar;
                        blogdata.projectplan_contracts = req.body.projectplan_contracts || blogdata.projectplan_contracts;
                        blogdata.projectplan_quotes = req.body.projectplan_quotes || blogdata.projectplan_quotes;
                        blogdata.created_by = req.body.created_by || blogdata.created_by;
                        blogdata.status = req.body.status || blogdata.status;
                        blogdata.save({new : true}).then((result) => {

                            Projectplan.findOne(
                            { 'projectplan_id': req.body.projectplan_id})
                            .exec().then((resp) => {
                                resolve(resObj.user_operation_responses("Updated", resp))
                            }).catch((error) =>{
                                console.log(error);
                                resolve(resObj.content_operation_responses("Error", error))
                            });

                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_projectplan = function(id) {
    return new Promise(function(resolve, reject) {
        Projectplan.find({'projectplan_id': id})
        .exec()
        .then((result) => {
            //console.log(result);
            if(result.length >0)
            {
                console.log(result);
                Contract.deleteMany({'projectplan_id': result[0]._id}).then((res)=>{
                    console.log(res)
                })
                Quote.deleteMany({'projectplan_id': result[0]._id}).then((res)=>{
                    console.log(res)
                })
                Quotesubmission.deleteMany({'projectplan_id': result[0]._id}).then((res)=>{
                    console.log(res)
                })
                Projectplan.findOne({'projectplan_id': id}).deleteOne().then((res)=>{
                    console.log(res)
                  resolve(resObj.content_operation_responses("DeleteContent", result)) 
                })
                
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

getquotesdata = function(data) {
    let planArr=[];
    //let resArr=[];
    return new Promise(function(resolve, reject) {
        return   Promise.each(data, function(plaVal) {
            let resArr=[];
            if(plaVal.projectplan_quotes.length >0){
         return  Promise.each(plaVal.projectplan_quotes, function(usrVal) {
              return  Quotesubmission.find({_id:usrVal.selectedsubmission}).populate('materiallist_id').populate('projectplan_id').populate('created_by').populate('selectedsubmission').populate("selectedsubmission.created_by")
                .sort({'updated_at' : -1})
                //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
                .exec()
                .then((resp) => {
                    var r = usrVal.toObject();
                    if(resp.length >0){
                        r.selectedsubmission=resp[0];
                    }else{
                        r.selectedsubmission=[];
                    }
                    resArr.push(r);
                })
            }).then(function(result) {
                   //console.log(resArr);
                    if(resArr.length>0) {
                        //console.log("Touched here");
                        var p = plaVal.toObject();
                        p.projectplan_quotes=resArr;
                        planArr.push(p);
                    //resolve(resObj.user_operation_responses("DistanceFilter", resArr))
                    }
                    // else{
                    // //resolve(resObj.user_operation_responses("Unavailable", "NA"))
                    // }
            });
         }else{
            planArr.push(plaVal);
         }
        }).then(function(result) {
               //console.log(resArr);
                if(planArr.length>0) {
                    //console.log("Touched here");
                    resolve(planArr);
                //resolve(resObj.user_operation_responses("DistanceFilter", resArr))
                }
                else{
                  resolve(data);
                }
        });

    })
};

//*****************************************contract****************************************************************

module.exports.search_contract = function(item_name,projectplan_id) {
    return new Promise(function(resolve, reject) {
        Contract.find({ item_name: item_name,projectplan_id:projectplan_id })
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_contract = function(req, res) {
    return new Promise(function(resolve, reject) {
        let details = req.body.details;
        Contract.find(details).populate('materiallist_id').populate('projectplan_id').populate('created_by')
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.create_contract= function(req, res) {
    return new Promise(function(resolve, reject) {
        let contractID = uniqid();
        Contract.create({
            contract_id : contractID,
            materiallist_id : req.body.materiallist_id,
            projectplan_id : req.body.projectplan_id,
            item_name : req.body.item_name,
            item_name_ar : req.body.item_name_ar,
            unit : req.body.unit,
            type : req.body.type,
            rate : req.body.rate,
            quantity : req.body.quantity,
            total : req.body.total,
            remark : req.body.remark,
            created_by : req.body.created_by,
            status: req.body.status,
            }).then((Blog) => {
           resolve(resObj.content_operation_responses("Created", Blog))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.update_contract = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        Contract.findOne({'contract_id': req.body.contract_id}, function (err, blogdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(blogdata){
                        blogdata.materiallist_id = req.body.materiallist_id || blogdata.materiallist_id;
                        blogdata.projectplan_id = req.body.projectplan_id || blogdata.projectplan_id;
                        blogdata.item_name = req.body.item_name || blogdata.item_name;
                        blogdata.item_name_ar = req.body.item_name_ar || blogdata.item_name_ar;
                        blogdata.unit = req.body.unit || blogdata.unit;
                        blogdata.type = req.body.type || blogdata.type;
                        blogdata.rate = req.body.rate || blogdata.rate;
                        blogdata.quantity = req.body.quantity || blogdata.quantity;
                        blogdata.total = req.body.total || blogdata.total;
                        blogdata.remark = req.body.remark || blogdata.remark;
                        blogdata.created_by = req.body.created_by || blogdata.created_by;
                        blogdata.status = req.body.status || blogdata.status;
                        blogdata.save({new : true}).then((result) => {

                            Contract.findOne(
                            { 'contract_id': req.body.contract_id})
                            .exec().then((resp) => {
                                resolve(resObj.user_operation_responses("Updated", resp))
                            }).catch((error) =>{
                                console.log(error);
                                resolve(resObj.content_operation_responses("Error", error))
                            });

                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_contract = function(id) {
    return new Promise(function(resolve, reject) {
        Contract.findOne({'contract_id': id}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

module.exports.delete_all_contractbyproject_id = function(id) {
    return new Promise(function(resolve, reject) {
        Contract.findOne({'projectplan_id': id}).deleteMany()
        .then((result) => {
            if(result.acknowledged===true)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}
//*****************************************quote****************************************************************

module.exports.search_quote = function(item_name,projectplan_id) {
    return new Promise(function(resolve, reject) {
        Quote.find({ item_name: item_name,projectplan_id:projectplan_id})
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_quote = function(req, res) {
    return new Promise(function(resolve, reject) {
        let details = req.body.details;
        Quote.find(details).populate('materiallist_id').populate('projectplan_id').populate('created_by').populate('selectedsubmission').populate('business_id')
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            console.log(resp)
            if(resp.length>0) {
                if(details.request_sendto){
                 this.getquotesubmission(resp,req.body.created_by).then((respArr) => {
                        resolve(resObj.user_operation_responses("Fetch", respArr))
                })
             }else{
                resolve(resObj.content_operation_responses("Fetch", resp))
             }
                
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

getquotesubmission = function(data,created_by) {
    let resArr=[];
    return new Promise(function(resolve, reject) {
         return   Promise.each(data, function(usrVal) {
              return  Quotesubmission.find({quote_id:usrVal._id,created_by:created_by}).populate('materiallist_id').populate('projectplan_id').populate('created_by')
                .sort({'updated_at' : -1})
                //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
                .exec()
                .then((resp) => {
                    var r = usrVal.toObject();
                    if(resp.length >0){
                        r.response=resp[0];
                    }else{
                        r.response={};
                    }
                    resArr.push(r);
                })
        }).then(function(result) {
               //console.log(resArr);
                if(resArr.length>0) {
                    //console.log("Touched here");
                    resolve(resArr);
                //resolve(resObj.user_operation_responses("DistanceFilter", resArr))
                }
                // else{
                // //resolve(resObj.user_operation_responses("Unavailable", "NA"))
                // }
        });
    })
};

module.exports.create_quote= function(req, res) {
    return new Promise(function(resolve, reject) {
        let businessOid=[];
        BusinessUser.find({deals_in: {$in:req.body.item_name}, user_status : "approved"},{user_password : 0})
        .exec()
        .then(async (resp) => {
            let quoteID = uniqid();
             console.log(resp);
            if(resp.length>0) {
                
                
               businessOid =  _.map(resp, users => (users._id));
                   let  i = businessOid.indexOf(req.body.created_by);
                    if(i >= 0) {
                       businessOid.splice(i,1);
                    }
                    let sendBlog = [];
                    for(let i = 0 ; i < req.body.business_id.length ; i++)
                    {
                        await Quote.create({
                            quote_id : quoteID,
                            materiallist_id : req.body.materiallist_id,
                            projectplan_id : req.body.projectplan_id,
                            item_name : req.body.item_name,
                            item_name_ar : req.body.item_name_ar,
                            unit : req.body.unit,
                            type : req.body.type,
                            type_ar: req.body.type_ar,
                            rate : req.body.rate,
                            quantity : req.body.quantity,
                            total : req.body.total,
                            remark : req.body.remark,
                            business_id: req.body.business_id[i],
                            business_remark : req.body.business_remark,
                            business_attachments : req.body.business_attachments,
                            request_sendto : businessOid,
                            created_by : req.body.created_by,
                            selectedsubmission:req.body.selectedsubmission,
                            status: req.body.status,
                            }).then((Blog) => {
                                for (var j = 0; j < resp.length; j++) {
                                    if(req.body.lang=='arabic'){
                                        req.body.email=resp[j].user_email;
                                        req.body._id=resp[j]._id;
                                        req.body.subject_body="لقد تلقيت طلب عرض أسعار جديد.";
                                        req.body.user_name=resp[j].user_name;
                                        req.body.type="newquotationrequest_ar";
                                        Notification.send_mail(req,res);

                                    }else{
                                        req.body.email=resp[j].user_email;
                                        req.body._id=resp[j]._id;
                                        req.body.subject_body="You have received a new quotation request";
                                        req.body.user_name=resp[j].user_name;
                                        req.body.type="newquotationrequest";
                                        Notification.send_mail(req,res);
                                    }
                                    
                                    console.log("A new business user profile created.");
                                }
                               sendBlog.push(Blog);
                        
                    }).catch((error) => {
                        console.log(error)
                        resolve(resObj.content_operation_responses("Error", error))
                    });
                    }
                    resolve(resObj.content_operation_responses("Created", sendBlog))
            }else{
                for(let i = 0 ; i < req.body.business_id.length ; i++)
                {
                    Quote.create({
                            quote_id : quoteID,
                            materiallist_id : req.body.materiallist_id,
                            projectplan_id : req.body.projectplan_id,
                            item_name : req.body.item_name,
                            item_name_ar : req.body.item_name_ar,
                            unit : req.body.unit,
                            type : req.body.type,
                            rate : req.body.rate,
                            quantity : req.body.quantity,
                            total : req.body.total,
                            remark : req.body.remark,
                            business_id: req.body.business_id[i],
                            business_remark : req.body.business_remark,
                            business_attachments : req.body.business_attachments,
                            request_sendto : businessOid,
                            created_by : req.body.created_by,
                            selectedsubmission:req.body.selectedsubmission,
                            status: req.body.status,
                            }).then((Blog) => {
                        resolve(resObj.content_operation_responses("Created", Blog))
                    }).catch((error) => {
                        console.log(error)
                        resolve(resObj.content_operation_responses("Error", error))
                    });
            }

            }
            })
        
   });
};

module.exports.update_quote = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        Quote.findOne({'quote_id': req.body.quote_id}, function (err, blogdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(blogdata){
                        blogdata.materiallist_id = req.body.materiallist_id || blogdata.materiallist_id;
                        blogdata.projectplan_id = req.body.projectplan_id || blogdata.projectplan_id;
                        blogdata.item_name = req.body.item_name || blogdata.item_name;
                        blogdata.item_name_ar = req.body.item_name_ar || blogdata.item_name_ar;
                        blogdata.unit = req.body.unit || blogdata.unit;
                        blogdata.type = req.body.type || blogdata.type;
                        blogdata.type_ar = req.body.type_ar || blogdata.type_ar;
                        blogdata.rate = req.body.rate || blogdata.rate;
                        blogdata.quantity = req.body.quantity || blogdata.quantity;
                        blogdata.total = req.body.total || blogdata.total;
                        blogdata.remark = req.body.remark || blogdata.remark;
                        blogdata.business_remark = req.body.business_remark || blogdata.business_remark;
                        blogdata.business_attachments = req.body.business_attachments || blogdata.business_attachments;
                        blogdata.request_sendto = req.body.request_sendto || blogdata.request_sendto;
                        blogdata.created_by = req.body.created_by || blogdata.created_by;
                        blogdata.selectedsubmission = req.body.selectedsubmission || blogdata.selectedsubmission;
                        blogdata.status = req.body.status || blogdata.status;
                        blogdata.save({new : true}).then((result) => {

                            Quote.findOne(
                            { 'quote_id': req.body.quote_id})
                            .exec().then((resp) => {
                                resolve(resObj.user_operation_responses("Updated", resp))
                            }).catch((error) =>{
                                console.log(error);
                                resolve(resObj.content_operation_responses("Error", error))
                            });

                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_quote = function(id) {
    return new Promise(function(resolve, reject) {
        Quote.findOne({'quote_id': id}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

module.exports.get_detail = function(id) {
    return new Promise(function(resolbe, reject) {
    })
}

//***************************************** quotesubmission ****************************************************************

module.exports.search_quotesubmission = function(quote_id,projectplan_id,created_by) {
    return new Promise(function(resolve, reject) {
        Quotesubmission.find({ quote_id: quote_id,projectplan_id:projectplan_id,created_by:created_by})
        .exec()
        .then((resp) => {
            console.log(resp);
            if (resp.length===0) {
                resolve("Allowed");
            }
            else{
                resolve("Exists");
            }
        }).catch((error) => {
         resolve("Try again")
     });
    })
};

module.exports.read_quotesubmission = function(req, res) {
    return new Promise(function(resolve, reject) {
        let details = req.body.details;
        Quotesubmission.find(details).populate('materiallist_id').populate('projectplan_id').populate('created_by').populate('quote_id')
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {

                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.create_quotesubmission= function(req, res) {
    return new Promise(function(resolve, reject) {
        let quotesubmissionID = uniqid();
        Quotesubmission.create({
            quotesubmission_id : quotesubmissionID,
            quote_id : req.body.quote_id,
            projectplan_id : req.body.projectplan_id,
            price : req.body.price,
            remark : req.body.remark,
            attachments : req.body.attachments,
            created_by : req.body.created_by,
            status: req.body.status,
            }).then((Blog) => {
           resolve(resObj.content_operation_responses("Created", Blog))
       }).catch((error) => {
        console.log(error)
        resolve(resObj.content_operation_responses("Error", error))
    });
   });
};

module.exports.update_quotesubmission = function(req, res) {
    return new Promise(function(resolve, reject) {
        
        Quotesubmission.findOne({'quotesubmission_id': req.body.quotesubmission_id}, function (err, blogdata) {
            if (err) {
                //console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else {
                if(blogdata){
                        blogdata.quote_id = req.body.quote_id || blogdata.quote_id;
                        blogdata.projectplan_id = req.body.projectplan_id || blogdata.projectplan_id;
                        blogdata.price = req.body.price || blogdata.price;
                        blogdata.remark = req.body.remark || blogdata.remark;
                        blogdata.attachments = req.body.attachments || blogdata.attachments;
                        blogdata.created_by = req.body.created_by || blogdata.created_by;
                        blogdata.status = req.body.status || blogdata.status;
                        blogdata.save({new : true}).then((result) => {

                            Quotesubmission.findOne(
                            { 'quotesubmission_id': req.body.quotesubmission_id})
                            .exec().then((resp) => {
                                resolve(resObj.user_operation_responses("Updated", resp))
                            }).catch((error) =>{
                                console.log(error);
                                resolve(resObj.content_operation_responses("Error", error))
                            });

                    }).catch((error) => {
                        console.log(error);
                        resolve(resObj.content_operation_responses("Error", error))
                    });

                }
                else {
                    resolve(resObj.content_operation_responses("Unavailable", "error"))
                }
                
            }
        });
    })
}

module.exports.delete_quotesubmission = function(id) {
    return new Promise(function(resolve, reject) {
        Quotesubmission.findOne({'quotesubmission_id': id}).deleteOne()
        .then((result) => {
            if(result.n===0)
            {
                resolve(resObj.content_operation_responses("DeleteContentError", result))
            }
            else
            {
                resolve(resObj.content_operation_responses("DeleteContent", result))
            }

        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

//***************************************** quote report ****************************************************************


module.exports.numberOfQuotationEequestsCreatedToday = function(req, res) {
    return new Promise(function(resolve, reject) {
        // let date=new Date();
        // date.setHours(0,0,0,0);
        Quote.find({ $where: function() { 
            today = new Date(); //
            today.setHours(0,0,0,0);
            return (this._id.getTimestamp() >= today)}}).populate('materiallist_id').populate('projectplan_id').populate('created_by')
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {

                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};
module.exports.numberOfRequestsTillDate = function(req, res) {
    return new Promise(function(resolve, reject) {
        Quote.find().populate('materiallist_id').populate('projectplan_id').populate('created_by')
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {

                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};
module.exports.numberOfQuotationsSentToRequestsByBusinessesToday = function(req, res) {
    return new Promise(function(resolve, reject) {
        // let date=new Date();
        // date.setHours(0,0,0,0);
        Quotesubmission.find({ $where: function() { 
            today = new Date(); //
            today.setHours(0,0,0,0);
            return (this._id.getTimestamp() >= today)}}).populate('materiallist_id').populate('projectplan_id').populate('created_by').populate('quote_id')
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {

                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};
module.exports.numberOfQuotationsSentToRequestsByBusinessesTillDate = function(req, res) {
    return new Promise(function(resolve, reject) {
        Quotesubmission.find().populate('materiallist_id').populate('projectplan_id').populate('created_by').populate('quote_id')
        .sort({'updated_at' : -1})
        //.skip(parseInt(req.body.offset)*ConstantCtrl.limit).limit(ConstantCtrl.limit)
        .exec()
        .then((resp) => {
            if(resp.length>0) {

                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else{
                resolve(resObj.content_operation_responses("Unavailable", "NA"))
            }
        }).catch((error) => {
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

/////////////////////////////metadata///////////////////////////////////////////////////////////////////////


module.exports.search_metadata = function(page_name,meta_title) {
    return new Promise(function(resolve, reject) {
        console.log("Reached Item handler");
        Metadata.find({"page_name" : page_name,"meta_title" : meta_title})
        .exec()
        .then((resp) => {
            if(resp.length>0) {
                resolve("Exists");
            }
            else {
                resolve("Allowed");
            }
            
        }).catch((error) => {
            console.log(error);
         resolve("Try again")
     });
    })
};

module.exports.create_metadata = function(req, res) {
    return new Promise(function(resolve, reject) {
            let metadataID = uniqid();
            Metadata.create({
                metadata_id : metadataID,
                page_name : req.body.page_name,
                page_url : req.body.page_url,
                meta_title : req.body.meta_title,
                meta_description : req.body.meta_description,
                meta_keyword : req.body.meta_keyword,
                og_url :req.body.og_url,
                og_type :req.body.og_type,  
                og_title : req.body.og_title, 
                og_description :  req.body.og_description,  
                og_image :  req.body.og_image,
                status : req.body.status,
                })
            .then((Content) => {
                resolve(resObj.content_operation_responses("Created", Content))   
            }).catch((error) => {
                console.log(error)
                resolve(resObj.register_resp("Error", error))
            });
        
    })
};

module.exports.read_metadata = function(req, res) {
    return new Promise(function(resolve, reject) {
        console.log("Reached DB Handler");
        Metadata.find(req.body.details).populate('item_oid').populate('user_oid')
        .sort({'created_at' : -1})
        .exec()
        .then((resp) => {
            if(resp.length>0){
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else {
                resolve(resObj.content_operation_responses("Unavailable", "Data not found"))

            }
        }).catch((error) => {
            console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.update_metadata = function(req, res) {
    return new Promise(function(resolve, reject) {
        Metadata.findOne({ 'metadata_id': req.body.metadata_id}, function (err, content) {
            if (err) {
                console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else{
                console.log(content);
                if(content){
                content.page_name = req.body.page_name || content.page_name;
                content.page_url = req.body.page_url || content.page_url;
                content.meta_title = req.body.meta_title || content.meta_title;
                content.meta_description = req.body.meta_description || content.meta_description;
                content.meta_keyword = req.body.meta_keyword || content.meta_keyword;
                content.og_url = req.body.og_url || content.og_url;
                content.og_type = req.body.og_type || content.og_type;
                content.og_title = req.body.og_title || content.og_title;
                content.og_description = req.body.og_description || content.og_description;
                content.og_image = req.body.og_image || content.og_image;
                content.status = req.body.status || content.status;
                content.save({new : true}).then((result) => {
                    if(result) {
                        resolve(resObj.content_operation_responses("Updated", result)); 
                    }
                    else {
                        resolve(resObj.content_operation_responses("Error", err))
                    }
                })
            }
            else {
                resolve(resObj.content_operation_responses("Error", err))
            }
            }
        });
    })
}

module.exports.delete_metadata = function(metadata_id) {
    return new Promise(function(resolve, reject) {
        //user_oid = ObjectId(created_by);
        Metadata.findOne({'metadata_id': metadata_id}).deleteOne()
        .then((result) => {
            if(result) {
                if(result.n===0)
                    {
                        resolve(resObj.content_operation_responses("DeleteContentError", result))
                    }
                    else
                    {
                        resolve(resObj.content_operation_responses("DeleteContent", result))
                    }
            }
            else {
                 resolve(resObj.content_operation_responses("Error", error))
            }
        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

/////////////////////////////content///////////////////////////////////////////////////////////////////////


module.exports.create_content = function(req, res) {
    return new Promise(function(resolve, reject) {
            let contentID = uniqid();
            Content.create({
                content_id : contentID,
                page_name : req.body.page_name,
                hero_title : req.body.hero_title,
                hero_description : req.body.hero_description,
                hero_banner : req.body.hero_banner,
                why_us_title : req.body.why_us_title,
                why_us_description : req.body.why_us_description,
                image_1_title : req.body.image_1_title,
                image_2_title : req.body.image_2_title,
                image_1_subtitle : req.body.image_1_subtitle,
                image_2_subtitle : req.body.image_2_subtitle,
                image_1 : req.body.image_1,
                image_2 : req.body.image_2,
                services_title : req.body.services_title,
                services_description : req.body.services_description,
                block_1_title : req.body.block_1_title,
                block_1_description : req.body.block_1_description,
                block_1_icon : req.body.block_1_icon,
                block_2_title : req.body.block_2_title,
                block_2_description : req.body.block_2_description,
                block_2_icon : req.body.block_2_icon,
                block_3_title : req.body.block_3_title,
                block_3_description : req.body.block_3_description,
                block_3_icon : req.body.block_3_icon,
                privacy_policy : req.body.privacy_policy,
                terms_conditions_policy : req.body.terms_conditions_policy,
                return_refund_policy : req.body.return_refund_policy,
                created_by : req.body.created_by,
                status : req.body.status,
                })
            .then((Content) => {
                resolve(resObj.content_operation_responses("Created", Content))   
            }).catch((error) => {
                console.log(error)
                resolve(resObj.register_resp("Error", error))
            });
        
    })
};

module.exports.read_content = function(req, res) {
    return new Promise(function(resolve, reject) {
        console.log("Reached DB Handler");
        Content.find(req.body.details).populate('property_oid').populate('user_oid')
        .sort({'month_date' : 1})
        .exec()
        .then((resp) => {
            if(resp.length>0){
                resolve(resObj.content_operation_responses("Fetch", resp))
            }
            else {
                resolve(resObj.content_operation_responses("Unavailable", "Data not found"))

            }
        }).catch((error) => {
            console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });
    })
};

module.exports.update_content = function(req, res) {
    return new Promise(function(resolve, reject) {
        Content.findOne({ 'content_id': req.body.content_id}, function (err, content) {
            if (err) {
                console.log(err);
                resolve(resObj.content_operation_responses("Error", err))
            } else{
                console.log(content);
                if(content){
                content.page_name = req.body.page_name || content.page_name;
                content.hero_title = req.body.hero_title || content.hero_title;
                content.hero_description = req.body.hero_description || content.hero_description;
                content.hero_banner = req.body.hero_banner || content.hero_banner;
                content.why_us_title = req.body.why_us_title || content.why_us_title;
                content.why_us_description = req.body.why_us_description || content.why_us_description;
                content.image_1_title = req.body.image_1_title || content.image_1_title;
                content.image_2_title = req.body.image_2_title || content.image_2_title;
                content.image_1_subtitle = req.body.image_1_subtitle || content.image_1_subtitle;
                content.image_2_subtitle = req.body.image_2_subtitle || content.image_2_subtitle;
                content.image_1 = req.body.image_1 || content.image_1;
                content.image_2 = req.body.image_2 || content.image_2;
                content.services_title = req.body.services_title || content.services_title;
                content.services_description = req.body.services_description || content.services_description;
                content.block_1_title = req.body.block_1_title || content.block_1_title;
                content.block_1_description = req.body.block_1_description || content.block_1_description;
                content.block_1_icon = req.body.block_1_icon || content.block_1_icon;
                content.block_2_title = req.body.block_2_title || content.block_2_title;
                content.block_2_description = req.body.block_2_description || content.block_2_description;
                content.block_2_icon = req.body.block_2_icon || content.block_2_icon;
                content.block_3_title = req.body.block_3_title || content.block_3_title;
                content.block_3_description = req.body.block_3_description || content.block_3_description;
                content.block_3_icon = req.body.block_3_icon || content.block_3_icon;
                content.privacy_policy = req.body.privacy_policy || content.privacy_policy;
                content.terms_conditions_policy = req.body.terms_conditions_policy || content.terms_conditions_policy;
                content.return_refund_policy = req.body.return_refund_policy || content.return_refund_policy;
                content.created_by = req.body.created_by || content.created_by;
                content.status = req.body.status || content.status;
                content.save({new : true}).then((result) => {
                    if(result) {
                        resolve(resObj.content_operation_responses("Updated", result)); 
                    }
                    else {
                        resolve(resObj.content_operation_responses("Error", err))
                    }
                })
            }
            else {
                resolve(resObj.content_operation_responses("Error", err))
            }
            }
        });
    })
}

module.exports.delete_content = function(content_id) {
    return new Promise(function(resolve, reject) {
        //user_oid = ObjectId(created_by);
        Content.findOne({'content_id': content_id}).deleteOne()
        .then((result) => {
            if(result) {
                if(result.n===0)
                    {
                        resolve(resObj.content_operation_responses("DeleteContentError", result))
                    }
                    else
                    {
                        resolve(resObj.content_operation_responses("DeleteContent", result))
                    }
            }
            else {
                 resolve(resObj.content_operation_responses("Error", error))
            }
        }).catch((error) => {
         console.log(error);
         resolve(resObj.content_operation_responses("Error", error))
     });

    })  
}

module.exports.get_request_count = function (data) {
  return new Promise(function (resolve, reject) {
    BusinessUser.findOne({'user_id': data.user_id, 'user_status': 'approved'})
      .then((userData) => {
        if (userData) {
          resolve(resObj.content_operation_responses("Fetch", { request_count: userData.request_count, request_limit: userData.request_limit }));
        } else {
          resolve(resObj.content_operation_responses("Unavailable", "error"));
        }
      })
      .catch((error) => {
        console.log(error);
        resolve("Try again");
      });
  });
}

module.exports.increase_request_count = function (data) {
  return new Promise(function (resolve, reject) {
    BusinessUser.findOne({'user_id': data.user_id, 'user_status': 'approved'})
      .then((userData) => {
        if (userData) {
          userData.request_count += data.amount;
          userData.save()
            .then((result) => {
              resolve(resObj.content_operation_responses("Updated", { request_count: userData.request_count }));
            })
            .catch((error) => {
              console.log(error);
              resolve(resObj.content_operation_responses("Error", error));
            });
        } else {
          resolve(resObj.content_operation_responses("Unavailable", "error"));
        }
      })
      .catch((error) => {
        console.log(error);
        resolve("Try again");
      });
  });
}

module.exports.update_request_limit = function (data) {
    return new Promise(function (resolve, reject) {
      BusinessUser.findOne({'user_id': data.user_id, 'user_status': 'approved'})
        .then((userData) => {
          if (userData) {
            userData.request_limit = data.request_limit;
            userData.save()
              .then((result) => {
                resolve(resObj.content_operation_responses("Updated"));
              })
              .catch((error) => {
                console.log(error);
                resolve(resObj.content_operation_responses("Error", error));
              });
          } else {
            resolve(resObj.content_operation_responses("Unavailable", "error"));
          }
        })
        .catch((error) => {
          console.log(error);
          resolve("Try again");
        });
    });
  }
