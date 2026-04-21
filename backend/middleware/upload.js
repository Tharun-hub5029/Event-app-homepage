const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

// ✅ Initialize S3 Client (AWS SDK v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};


const profileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME, // Ensure correct env variable
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileName = `profile_pics/${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`;
      cb(null, fileName);
    },
  }),
  fileFilter, // ✅ Apply file filter
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ 5MB limit
});


const generalUpload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME, 
  
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileName = `uploads/${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`;
      cb(null, fileName);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // ✅ 10MB limit for general files
});
module.exports.profileUpload = profileUpload;
module.exports.generalUpload = generalUpload;

