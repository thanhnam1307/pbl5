const Status = require("../models/Status");

// Tạo trạng thái mới
exports.createStatus = async (req, res) => {
  try {
    const { status_name, description } = req.body;
    const newStatus = new Status({ status_name, description });
    await newStatus.save();
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách trạng thái
exports.getAllStatus = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy trạng thái theo ID
exports.getStatusById = async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ message: "Trạng thái không tồn tại!" });
    }
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái
exports.updateStatus = async (req, res) => {
  try {
    const { status_name, description } = req.body;
    const status = await Status.findByIdAndUpdate(
      req.params.id,
      { status_name, description },
      { new: true }
    );
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa trạng thái
exports.deleteStatus = async (req, res) => {
  try {
    await Status.findByIdAndDelete(req.params.id);
    res.json({ message: "Trạng thái đã bị xóa!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
