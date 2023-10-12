const router = require("express").Router();

const Product = require("../controllers/productController");
const upload = require("../middlewares/uploader");

router.get("/", Product.findProducts);
// untuk upload hanya satu gambar menggunakan single('namafile')
router.post("/", upload.single("image"), Product.addProduct);

router.get("/:id", Product.findProduct);
router.delete("/:id", Product.deleteProduct);
router.put("/:id", Product.updateProduct);

module.exports = router;
