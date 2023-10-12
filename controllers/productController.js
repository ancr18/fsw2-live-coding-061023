const imagekit = require("../lib/imagekit");
const { Product } = require("../models");

const addProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const file = req.file;
  console.log(file);

  try {
    // mengambil extension
    const split = file.originalname.split(".");
    const extension = split[split.length - 1];

    // upload imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });
    const newProduct = await Product.create({
      name,
      price,
      stock,
      imgUrl: img.url,
    });

    res.status(200).json({
      status: "success",
      message: "product added successfully",
      data: { newProduct },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const findProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      status: "success",
      message: "products fetched successfully",
      data: { products },
    });
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: err.message,
    });
  }
};

const findProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json({
      status: "success",
      message: "product fethced successfully",
      data: { product },
    });
  } catch (err) {}
};

const deleteProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const product = await Product.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "success",
      message: "product delete successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await Product.update(
      {
        name,
        price,
        stock,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(201).json({
      status: "success",
      message: "product updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  addProduct,
  findProducts,
  findProduct,
  deleteProduct,
  updateProduct,
};
