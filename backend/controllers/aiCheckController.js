const AICheck = require("../models/AICheck");
const Order = require("../models/Order");

// Tạo AI_Check mới
exports.createAICheck = async (req, res) => {
  try {
    const { order_id, detected_quantity, status, note, is_correct } = req.body;

    if (
      !order_id ||
      detected_quantity === undefined ||
      !status ||
      is_correct === undefined
    ) {
      return res.status(400).json({ message: "Thiếu thông tin AI_Check!" });
    }

    const newAICheck = new AICheck({
      order_id,
      detected_quantity,
      status,
      note,
      is_correct,
    });

    const savedAICheck = await newAICheck.save();
    res.status(201).json({
      message: "AI_Check đã được tạo!",
      aiId: savedAICheck._id,
      aiCheck: savedAICheck,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách AI_Check
exports.getAllAIChecks = async (req, res) => {
  try {
    const aiChecks = await AICheck.find()
      .populate("order_id", "user_id order_date")
      .populate("status", "status_name");
    res.json(aiChecks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy AI_Check theo ID
exports.getAICheckById = async (req, res) => {
  try {
    const aiCheck = await AICheck.findById(req.params.id)
      .populate("order_id", "user_id order_date")
      .populate("status", "status_name");

    if (!aiCheck) {
      return res.status(404).json({ message: "AI_Check không tồn tại!" });
    }

    res.json(aiCheck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật AI_Check
exports.updateAICheck = async (req, res) => {
  try {
    const { detected_quantity, status, note, is_correct } = req.body;
    const aiCheck = await AICheck.findById(req.params.id);

    if (!aiCheck) {
      return res.status(404).json({ message: "AI_Check không tồn tại!" });
    }

    aiCheck.detected_quantity = detected_quantity ?? aiCheck.detected_quantity;
    aiCheck.status = status ?? aiCheck.status;
    aiCheck.note = note ?? aiCheck.note;
    aiCheck.is_correct = is_correct ?? aiCheck.is_correct;

    await aiCheck.save();
    res.json({ message: "Cập nhật AI_Check thành công!", aiCheck });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa AI_Check
exports.deleteAICheck = async (req, res) => {
  try {
    const aiCheck = await AICheck.findById(req.params.id);
    if (!aiCheck) {
      return res.status(404).json({ message: "AI_Check không tồn tại!" });
    }

    await aiCheck.deleteOne();
    res.json({ message: "Xóa AI_Check thành công!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
