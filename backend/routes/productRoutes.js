const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

const authMiddleware = require("../middleware/auth"); // 🔹 Import middleware xác thực
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// 🟢 Lấy danh sách sản phẩm (Ai cũng xem được)
router.get("/", getAllProducts);

// 🔴 Tạo sản phẩm (Chỉ Admin)
router.post("/", authMiddleware, isAdmin, uploadImage, createProduct);

// 🔴 Cập nhật sản phẩm (Chỉ Admin)
router.put("/:id", authMiddleware, isAdmin, uploadImage, updateProduct);

// 🔴 Xóa sản phẩm (Chỉ Admin)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
