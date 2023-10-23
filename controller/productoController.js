const Productos = require("../models/Productos");
const multer = require("multer");
const shortid = require("shortid");

const configuracionMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato No válido"));
    }
  },
};

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single("imagen");

//Uploading a file

exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      res.json({ mensaje: err });
    }
    return next();
  });
};

exports.newProduct = async (req, res) => {
  const product = new Productos(req.body);

  try {
    if (req.file.filename) {
      product.imagen = req.file.filename;
    }
    await product.save();
    res.status(201).json({ message: "New Product Created Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Productos.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const { query } = req.params;
    const product = await Productos.find({ nombre: new RegExp(query, "i") });
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Productos.findById(req.params.id);
    console.log(product);
    if (!product) {
      res.status(404).json({ mensaje: "Product Not Found" });
      return next();
    }
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProductById = async (req, res) => {
  try {
    //Attempting to find a product by its ID
    let prevProduct = await Productos.findById(req.params.id);

    // Building a new Product Object
    let newProduct = req.body;
    if (req.file) {
      newProduct.imagen = req.file.filename;
    } else {
      newProduct.imagen = prevProduct.imagen;
    }

    //Updating the Product Object
    const product = await Productos.findOneAndUpdate(
      { _id: req.params.id },
      newProduct,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    await Productos.findOneAndDelete({ _id: req.params.id });
    res.status(204).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
