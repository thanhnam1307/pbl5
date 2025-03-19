const mongoose = require("mongoose");

const AICheckSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  detected_quantity: { type: Number, required: true },
  check_date: { type: Date, default: Date.now },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
  note: { type: String },
  is_correct: { type: Boolean, required: true },
});

module.exports = mongoose.model("AICheck", AICheckSchema);
