const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  companyInfo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "System_config",
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
