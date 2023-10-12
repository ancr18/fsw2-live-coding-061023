const router = require("express").Router()

const Admin = require("../controllers/adminController ")
const upload = require("../middlewares/uploader")

router.get("/dashboard/admin", Admin.viewProducts)
router.get("/dashboard/admin/create", Admin.viewCreate)

// untuk upload hanya satu gambar menggunakan single('namafile')
router.post("/products/create", upload.single("image"), Admin.addProduct)

module.exports = router
