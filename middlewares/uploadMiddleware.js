const multer = require("multer");
const path = require("path");
const uniqid = require("uniqid");

const imageDir = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uniqid()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = { uploadMiddleware };
