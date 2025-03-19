const mongoose = require("mongoose");

const SystemConfigSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    website: { type: String },
    mail: { type: String },
    phone: { type: String, required: true },
    tax: { type: String, unique: true },
    policy: { type: String },
    about_us: { type: String },
    terms_of_use: { type: String },
    shipping_info: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SystemConfig", SystemConfigSchema);
