const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema({
  status_name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Status", StatusSchema);
