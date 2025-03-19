const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_company: { type: Boolean, default: false },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Mặc định là user
});

module.exports = mongoose.model("User", UserSchema);
