const Category = require("../models/Category");

// ✅ Lấy danh sách danh mục
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Lấy một danh mục theo ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Thêm danh mục mới
exports.createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const newCategory = new Category({ category_name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Cập nhật danh mục
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { category_name: req.body.category_name },
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Xóa danh mục
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory)
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    res.json({ message: "Danh mục đã bị xóa" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
