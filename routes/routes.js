let express = require('express');
let multer = require("multer");
let Jimp = require("jimp");
let router = express.Router();
let mainCtrl = require('../controllers/main_controller');
let checkAuth = require('../middleware/is-auth');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './img_directory');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
})
let upload = multer({ storage: storage });

// s3 buket image upload
const uploads = require('../services/file-upload');

const singleUpload = uploads.single('image');

router.post('/upload_file', upload.single('image'), (req, res) => {
  Jimp.read(req.file.path)
    .then(lenna => {
      console.log(req.file.size);
      if (req.file.size > 250000) {
        lenna.resize(800, Jimp.AUTO).quality(85).write(req.file.path);
      }
      else {
        lenna.write(req.file.path);
      }
    }).then(val => {
      res.send({ success: true, path: req.file.path });
    })
    .catch(err => {
      console.error(err);
    });

})

router.post('/image-upload', function (req, res) {

  singleUpload(req, res, function (err) {

    if (err) {
      return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
    }

    return res.json({ 'imageUrl': req.file.location });
  });
});
// end s3 bucket image upload

////////////////////Business Category///////////////////////////////////
router.post('/create_business_category', (req, res) => {
  console.log("Hit route");
  mainCtrl.create_business_category(req, res);
});
router.post('/read_business_category', (req, res) => {
  mainCtrl.read_business_category(req, res);
});
router.post('/read_business_category_admin', (req, res) => {
  mainCtrl.read_business_category_admin(req, res);
});
router.post('/update_business_category', (req, res) => {
  mainCtrl.update_business_category(req, res);
});
router.post('/delete_business_category', (req, res) => {
  mainCtrl.delete_business_category(req, res);
});

////////////////////Inventory Category///////////////////////////////////
router.post('/create_inventory_category', (req, res) => {
  console.log("Hit route");
  mainCtrl.create_inventory_category(req, res);
});
router.post('/read_inventory_category', (req, res) => {
  mainCtrl.read_inventory_category(req, res);
});
router.post('/read_inventory_category_admin', (req, res) => {
  mainCtrl.read_inventory_category_admin(req, res);
});
router.post('/update_inventory_category', (req, res) => {
  mainCtrl.update_inventory_category(req, res);
});
router.post('/delete_inventory_category', (req, res) => {
  mainCtrl.delete_inventory_category(req, res);
});

// ///////////////////Business SubCategory////////////////////////////////
router.post('/create_business_subcategory', (req, res) => {
  console.log("Here");
  mainCtrl.create_business_subcategory(req, res);
});
router.post('/read_business_subcategory', (req, res) => {
  mainCtrl.read_business_subcategory(req, res);
});
router.post('/read_business_subcategory_admin', (req, res) => {
  mainCtrl.read_business_subcategory_admin(req, res);
});
router.post('/update_business_subcategory', (req, res) => {
  mainCtrl.update_business_subcategory(req, res);
});
router.post('/delete_business_subcategory', (req, res) => {
  mainCtrl.delete_business_subcategory(req, res);
});

// ///////////////////Inventory SubCategory////////////////////////////////
router.post('/create_inventory_subcategory', (req, res) => {
  console.log("Here");
  mainCtrl.create_inventory_subcategory(req, res);
});
router.post('/read_inventory_subcategory', (req, res) => {
  mainCtrl.read_inventory_subcategory(req, res);
});
router.post('/read_inventory_subcategory_admin', (req, res) => {
  mainCtrl.read_inventory_subcategory_admin(req, res);
});
router.post('/update_inventory_subcategory', (req, res) => {
  mainCtrl.update_inventory_subcategory(req, res);
});
router.post('/delete_inventory_subcategory', (req, res) => {
  mainCtrl.delete_inventory_subcategory(req, res);
});

// //////////////////Business User///////////////////////////////////////
router.post('/register_business', (req, res) => {
  mainCtrl.create_business_user(req, res);
});

router.post('/read_business', (req, res) => {
  mainCtrl.read_business_user(req, res);
});

router.post('/search_business_user_name', checkAuth, (req, res) => {
  mainCtrl.search_business_user_name(req, res);
});

router.post('/read_user_details', checkAuth, (req, res) => {
  mainCtrl.read_user_details(req, res);
});

router.post('/read_business_by_id', (req, res) => {
  mainCtrl.read_business_user_by_id(req, res);
});

router.post('/read_business_by_oid', (req, res) => {
  mainCtrl.read_business_user_by_oid(req, res);
});

router.post('/read_user_by_timeline', (req, res) => {
  mainCtrl.read_user_by_timeline(req, res);
});
router.post('/read_business_user_by_timeline', (req, res) => {
  mainCtrl.read_business_user_by_timeline(req, res);
});

router.post('/read_business_public', checkAuth, (req, res) => {
  mainCtrl.read_business_user_public(req, res);
});

router.post('/read_business_all', (req, res) => {
  mainCtrl.read_business_user_all(req, res);
});
router.post('/read_businessuser_all', (req, res) => {
  mainCtrl.read_businessuser_all(req, res);
});


router.post('/profile_business', checkAuth, (req, res) => {
  mainCtrl.update_business_user(req, res);
});

// router.post('/get_business_details',checkAuth, (req, res) => {
//     mainCtrl.read_business_user(req, res);
// });
router.post('/update_business_profile', checkAuth, (req, res) => {
  mainCtrl.update_business_user(req, res);
});

router.post('/update_business_public', checkAuth, (req, res) => {
  mainCtrl.update_business_public(req, res);
});

router.post('/deletecomment', checkAuth, (req, res) => {
  mainCtrl.deletecomment(req, res);
});
router.post('/delete_business', checkAuth, (req, res) => {
  mainCtrl.delete_business_user(req, res);
});

router.post('/forgotpassword', (req, res) => {
  mainCtrl.forgotpassword(req, res);
});
router.post('/changepassword', (req, res) => {
  mainCtrl.changepassword(req, res);
});

// /////////////////Collections/////////////////////////////////////////
router.post('/create_collection', checkAuth, (req, res) => {
  mainCtrl.create_collection(req, res);
});
router.post('/read_collection', checkAuth, (req, res) => {
  mainCtrl.read_collection(req, res);
});

router.post('/read_collection_by_collection_id', checkAuth, (req, res) => {
  mainCtrl.read_collection_by_collection_id(req, res);
});
router.post('/update_collection', checkAuth, (req, res) => {
  mainCtrl.update_collection(req, res);
});
router.post('/delete_collection', checkAuth, (req, res) => {
  mainCtrl.delete_collection(req, res);
});

// /////////////////Projects/////////////////////////////////////////
router.post('/create_project', checkAuth, (req, res) => {
  mainCtrl.create_project(req, res);
});
router.post('/read_project_by_user', (req, res) => {
  mainCtrl.read_project_by_user(req, res);
});
router.post('/read_project_all', (req, res) => {
  mainCtrl.read_project_all(req, res);
});
router.post('/update_project', checkAuth, (req, res) => {
  mainCtrl.update_project(req, res);
});
router.post('/delete_project', checkAuth, (req, res) => {
  mainCtrl.delete_project(req, res);
});

// /////////////////Inventory/////////////////////////////////////////
router.post('/create_inventory', checkAuth, (req, res) => {
  mainCtrl.create_inventory(req, res);
});
router.post('/read_inventory_by_user', checkAuth, (req, res) => {
  mainCtrl.read_inventory_by_user(req, res);
});
router.post('/read_inventory_by_id', (req, res) => {
  mainCtrl.read_inventory_by_id(req, res);
});
router.post('/read_inventory_all', (req, res) => {
  mainCtrl.read_inventory_all(req, res);
});
router.post('/update_inventory', checkAuth, (req, res) => {
  mainCtrl.update_inventory(req, res);
});
router.post('/update_inventory_public', checkAuth, (req, res) => {
  mainCtrl.update_inventory_public(req, res);
});
router.post('/delete_inventory', checkAuth, (req, res) => {
  mainCtrl.delete_inventory(req, res);
});

// /////////////////Business Filters/////////////////////////////////////////
router.post('/create_business_filter', (req, res) => {
  mainCtrl.create_business_filter(req, res);
});
router.post('/read_business_filter_all', (req, res) => {
  console.log("Here");
  mainCtrl.read_business_filter_all(req, res);
});
router.post('/update_business_filter', (req, res) => {
  mainCtrl.update_business_filter(req, res);
});
router.post('/delete_business_filter', (req, res) => {
  mainCtrl.delete_business_filter(req, res);
});

// /////////////////Inventory Filters/////////////////////////////////////////
router.post('/create_inventory_filter', (req, res) => {
  mainCtrl.create_inventory_filter(req, res);
});
router.post('/read_inventory_filter_all', (req, res) => {
  console.log("Here");
  mainCtrl.read_inventory_filter_all(req, res);
});
router.post('/update_inventory_filter', (req, res) => {
  mainCtrl.update_inventory_filter(req, res);
});
router.post('/delete_inventory_filter', (req, res) => {
  mainCtrl.delete_inventory_filter(req, res);
});

// /////////////Blog//////////////////////////////////////////////////
router.post('/create_blog', (req, res) => {
  mainCtrl.create_blog(req, res);
});
router.post('/read_blog_by_user', (req, res) => {
  mainCtrl.read_blog_by_user(req, res);
});
router.post('/read_blog_by_id', (req, res) => {
  mainCtrl.read_blog_by_id(req, res);
});
router.post('/read_blog_all', (req, res) => {
  mainCtrl.read_blog_all(req, res);
});
router.post('/update_blog', (req, res) => {
  mainCtrl.update_blog(req, res);
});
router.post('/delete_blog', (req, res) => {
  mainCtrl.delete_blog(req, res);
});

//////////////////Notification//////////////////////////////////////////////////
router.post('/push_notification', checkAuth, (req, res) => {
  mainCtrl.send_notification(req, res);
});
router.post('/send_mail', (req, res) => {
  mainCtrl.send_mail(req, res);
});

//////////////////Admin//////////////////////////////////////////////////
router.post('/admin_create', (req, res) => {
  mainCtrl.admin_create(req, res);
});
router.post('/admin_login', (req, res) => {
  mainCtrl.admin_login(req, res);
});
router.post('/admin_forgotpassword', (req, res) => {
  mainCtrl.admin_forgotpassword(req, res);
});
router.post('/admin_changepassword', (req, res) => {
  mainCtrl.admin_changepassword(req, res);
});
router.post('/admin_update', (req, res) => {
  mainCtrl.admin_update(req, res);
});

// ////////////Search/////////////////////////////////////////
router.post('/search_stats', (req, res) => {

  mainCtrl.search_stats(req, res);
  console.log("API hit");
});

// /////////////////Tags/////////////////////////////////////////
router.post('/create_tag', (req, res) => {
  console.log("here");
  mainCtrl.create_tag(req, res);
});
router.post('/read_tag_all', (req, res) => {
  console.log("Here");
  mainCtrl.read_tag_all(req, res);
});
router.post('/update_tag', (req, res) => {
  console.log("Here");
  mainCtrl.update_tag(req, res);
});
router.post('/delete_tag', (req, res) => {
  console.log("Here");
  mainCtrl.delete_tag(req, res);
});
// ///////////////////country///////////////////////////////////////
router.post('/create_country', (req, res) => {
  mainCtrl.create_country(req, res);
});
router.post('/read_country', (req, res) => {
  console.log("Here");
  mainCtrl.read_country(req, res);
});
router.post('/update_country', (req, res) => {
  mainCtrl.update_country(req, res);
});
router.post('/delete_country', (req, res) => {
  mainCtrl.delete_country(req, res);
});

// ///////////////////materiallist///////////////////////////////////////
router.post('/create_materiallist', (req, res) => {
  mainCtrl.create_materiallist(req, res);
});
router.post('/read_materiallist', (req, res) => {
  console.log("Here");
  mainCtrl.read_materiallist(req, res);
});
router.post('/update_materiallist', (req, res) => {
  mainCtrl.update_materiallist(req, res);
});
router.post('/delete_materiallist', (req, res) => {
  mainCtrl.delete_materiallist(req, res);
});

// ///////////////////projectplan///////////////////////////////////////
router.post('/create_projectplan', (req, res) => {
  mainCtrl.create_projectplan(req, res);
});
router.post('/read_projectplan', (req, res) => {
  console.log("Here");
  mainCtrl.read_projectplan(req, res);
});
router.post('/update_projectplan', (req, res) => {
  mainCtrl.update_projectplan(req, res);
});
router.post('/delete_projectplan', (req, res) => {
  mainCtrl.delete_projectplan(req, res);
});

// ///////////////////contract///////////////////////////////////////
router.post('/create_contract', (req, res) => {
  mainCtrl.create_contract(req, res);
});
router.post('/read_contract', (req, res) => {
  console.log("Here");
  mainCtrl.read_contract(req, res);
});
router.post('/update_contract', (req, res) => {
  mainCtrl.update_contract(req, res);
});
router.post('/delete_contract', (req, res) => {
  mainCtrl.delete_contract(req, res);
});
router.post('/delete_all_contractbyproject_id', (req, res) => {
  mainCtrl.delete_all_contractbyproject_id(req, res);
});

// ///////////////////quote///////////////////////////////////////
router.post('/create_quote', (req, res) => {
  mainCtrl.create_quote(req, res);
});
router.post('/read_quote', (req, res) => {
  console.log("Here");
  mainCtrl.read_quote(req, res);
});
router.post('/update_quote', (req, res) => {
  mainCtrl.update_quote(req, res);
});
router.post('/delete_quote', (req, res) => {
  mainCtrl.delete_quote(req, res);
});

// ///////////////////quotesubmission///////////////////////////////////////
router.post('/create_quotesubmission', (req, res) => {
  mainCtrl.create_quotesubmission(req, res);
});
router.post('/read_quotesubmission', (req, res) => {
  console.log("Here");
  mainCtrl.read_quotesubmission(req, res);
});
router.post('/update_quotesubmission', (req, res) => {
  mainCtrl.update_quotesubmission(req, res);
});
router.post('/delete_quotesubmission', (req, res) => {
  mainCtrl.delete_quotesubmission(req, res);
});

// ///////////////////admin quote report///////////////////////////////////////
router.post('/numberOfQuotationEequestsCreatedToday', (req, res) => {
  mainCtrl.numberOfQuotationEequestsCreatedToday(req, res);
});
router.post('/numberOfRequestsTillDate', (req, res) => {
  console.log("Here");
  mainCtrl.numberOfRequestsTillDate(req, res);
});
router.post('/numberOfQuotationsSentToRequestsByBusinessesToday', (req, res) => {
  mainCtrl.numberOfQuotationsSentToRequestsByBusinessesToday(req, res);
});
router.post('/numberOfQuotationsSentToRequestsByBusinessesTillDate', (req, res) => {
  mainCtrl.numberOfQuotationsSentToRequestsByBusinessesTillDate(req, res);
});
///////////////////////metadata////////////////////////////
router.post('/create_metadata', checkAuth, (req, res) => {
  mainCtrl.create_metadata(req, res);
});
router.post('/read_metadata', (req, res) => {
  mainCtrl.read_metadata(req, res);
});
router.post('/update_metadata', checkAuth, (req, res) => {
  mainCtrl.update_metadata(req, res);
});
router.post('/delete_metadata', checkAuth, (req, res) => {
  mainCtrl.delete_metadata(req, res);
});

///////////////////////content////////////////////////////
router.post('/create_content', checkAuth, (req, res) => {
  mainCtrl.create_content(req, res);
});
router.post('/read_content', (req, res) => {
  mainCtrl.read_content(req, res);
});
router.post('/update_content', checkAuth, (req, res) => {
  mainCtrl.update_content(req, res);
});
router.post('/delete_content', checkAuth, (req, res) => {
  mainCtrl.delete_content(req, res);
});

/**
 * business_user request_count
 */
router.post('/get_request_count', checkAuth, (req, res) => {
  console.log(`${req.method} >> ${req.url}`)
  mainCtrl.get_request_count(req, res);
});
router.post('/increase_request_count', checkAuth, (req, res) => {
  console.log(`${req.method} >> ${req.url}`)
  mainCtrl.increase_request_count(req, res);
});
router.post('/update_request_limit', checkAuth, (req, res) => {
  console.log(`${req.method} >> ${req.url}`)
  mainCtrl.update_request_limit(req, res);
});
router.post('/get_project_plan_detail', (req, res) => {
  project
})

module.exports = router;
