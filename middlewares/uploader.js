const multer = require("multer");

// untuk validasi
const multerFiltering = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true); //null = tidak ada kesalahan(error), maka true = dijalankan
  } else {
    cb("Image types are only PNG, JPG, or JPEG!");
  }
};

// untuk menyimpan url gambar
const upload = multer({
  fileFilter: multerFiltering,
});

module.exports = upload;
