// const { render } = require("ejs");
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const multer = require("multer");
const { render } = require("ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, fil, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// CREATE

router.post("/", upload.single("img"), async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.redirect("/products");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted !");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET One Product

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("fruit_product_details", { ObjProduct: product });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET All Products

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const products = query
      ? await Product.find().sort({ createdAt: -1 }).limit(5)
      : await Product.find();
    res.render("products", { list_of_products: products});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
