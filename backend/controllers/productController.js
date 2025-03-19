const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// Cấu hình Multer để upload ảnh vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file ngẫu nhiên
  },
});
const upload = multer({ storage });

// 🟢 Lấy danh sách sản phẩm (Hiển thị cả category và spec)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name") // Lấy thông tin category (chỉ name)
      .populate("spec", "details") // Lấy thông tin spec (chỉ details)
      .exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟢 Lấy chi tiết sản phẩm theo ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("spec", "details");
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔴 Tạo sản phẩm (Chỉ Admin)
exports.createProduct = async (req, res) => {
  try {
    // Kiểm tra nếu có upload file ảnh
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Tạo sản phẩm mới
    const newProduct = new Product({ ...req.body, image: imagePath });
    await newProduct.save();
    res.status(201).json({ message: "Sản phẩm đã được thêm", newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔴 Cập nhật sản phẩm (Chỉ Admin)
exports.updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Nếu có ảnh mới, cập nhật đường dẫn ảnh
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔴 Xóa sản phẩm (Chỉ Admin)
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json({ message: "Sản phẩm đã bị xóa" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware upload ảnh
exports.uploadImage = upload.single("image");
