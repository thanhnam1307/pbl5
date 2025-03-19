const ProductSpec = require("../models/ProductSpec");

// ✅ Lấy danh sách thông số sản phẩm
exports.getProductSpecs = async (req, res) => {
  try {
    const specs = await ProductSpec.find();
    res.json(specs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Lấy thông số sản phẩm theo ID
exports.getProductSpecById = async (req, res) => {
  try {
    const spec = await ProductSpec.findById(req.params.id);
    if (!spec)
      return res.status(404).json({ message: "Không tìm thấy thông số" });
    res.json(spec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Tạo mới thông số sản phẩm
exports.createProductSpec = async (req, res) => {
  try {
    const { diameter, length, thickness } = req.body;
    const newSpec = new ProductSpec({ diameter, length, thickness });
    await newSpec.save();
    res.status(201).json(newSpec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Cập nhật thông số sản phẩm
exports.updateProductSpec = async (req, res) => {
  try {
    const updatedSpec = await ProductSpec.findByIdAndUpdate(
      req.params.id,
      {
        diameter: req.body.diameter,
        length: req.body.length,
        thickness: req.body.thickness,
      },
      { new: true }
    );
    if (!updatedSpec)
      return res.status(404).json({ message: "Không tìm thấy thông số" });
    res.json(updatedSpec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Xóa thông số sản phẩm
exports.deleteProductSpec = async (req, res) => {
  try {
    const deletedSpec = await ProductSpec.findByIdAndDelete(req.params.id);
    if (!deletedSpec)
      return res.status(404).json({ message: "Không tìm thấy thông số" });
    res.json({ message: "Thông số đã bị xóa" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
