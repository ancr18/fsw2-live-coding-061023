const imagekit = require("../lib/imagekit")
const { Product } = require("../models")

const viewProducts = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.render("dashboard", {
      products,
      title: "Dashboard",
    })
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    })
  }
}

const viewCreate = async (req, res) => {
  try {
    const products = await Product.findAll()
    res.render("add", {
      products,
      title: "Tambah Data",
    })
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    })
  }
}

const addProduct = async (req, res) => {
  const { name, price, stock } = req.body
  const file = req.file
  console.log(file)

  try {
    // mengambil extension
    const split = file.originalname.split(".")
    const extension = split[split.length - 1]

    // upload imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    })
    await Product.create({
      name,
      price,
      stock,
      imgUrl: img.url,
    })

    res.redirect("/dashboard/admin")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  addProduct,
  viewProducts,
  viewCreate,
}
