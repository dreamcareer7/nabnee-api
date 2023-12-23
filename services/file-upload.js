const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey:'lTV9yuDHi2HrdBFZd/XYQg6S1G3ilsaTZffQFF+W',
  accessKeyId:'AKIAID2STQX2M3DOTTPQ',
  region: 'me-south-1'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'nabnee',
    acl: 'public-read',
    key: function (_req, file, cb) {
      cb(null, Date.now().toString()+file.originalname)
    }
  })
})

module.exports = upload;
