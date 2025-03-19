const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  //
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  //
  spec: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductSpec",
    required: true,
  },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: String,
  image: { type: String }, // Lưu đường dẫn ảnh
});

module.exports = mongoose.model("Product", ProductSchema);
