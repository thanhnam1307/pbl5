const mongoose = require("mongoose");

const ProductSpecSchema = new mongoose.Schema({
  diameter: { type: Number, required: true }, // Đường kính (mm hoặc inch)
  length: { type: Number, required: true }, // Chiều dài (m hoặc feet)
  thickness: { type: Number, required: true }, // Độ dày (mm)
});

module.exports = mongoose.model("ProductSpec", ProductSpecSchema);
