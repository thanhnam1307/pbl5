const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

// ✅ API CRUD cho danh mục
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", CategoryController.createCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
