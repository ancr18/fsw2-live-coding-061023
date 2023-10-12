const router = require("express").Router()

const Product = require("./productRoute")
const Admin = require("./adminRoute")

router.use("/api/v1/products", Product)
router.use("/", Admin)

module.exports = router
