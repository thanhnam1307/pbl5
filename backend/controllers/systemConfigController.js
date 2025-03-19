const SystemConfig = require("../models/SystemConfig");

// Tạo thông tin công ty
exports.createSystemConfig = async (req, res) => {
  try {
    const newConfig = new SystemConfig(req.body);
    const savedConfig = await newConfig.save();
    res.status(201).json(savedConfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách tất cả công ty
exports.getAllSystemConfigs = async (req, res) => {
  try {
    const configs = await SystemConfig.find();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin công ty theo ID
exports.getSystemConfigById = async (req, res) => {
  try {
    const config = await SystemConfig.findById(req.params.id);
    if (!config) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin công ty!" });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin công ty
exports.updateSystemConfig = async (req, res) => {
  try {
    const updatedConfig = await SystemConfig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedConfig) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin công ty!" });
    }
    res.json(updatedConfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa thông tin công ty
exports.deleteSystemConfig = async (req, res) => {
  try {
    const deletedConfig = await SystemConfig.findByIdAndDelete(req.params.id);
    if (!deletedConfig) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin công ty!" });
    }
    res.json({ message: "Đã xóa thông tin công ty!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
