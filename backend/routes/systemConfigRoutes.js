const express = require("express");
const router = express.Router();
const systemConfigController = require("../controllers/systemConfigController");

router.post("/", systemConfigController.createSystemConfig);
router.get("/", systemConfigController.getAllSystemConfigs);
router.get("/:id", systemConfigController.getSystemConfigById);
router.put("/:id", systemConfigController.updateSystemConfig);
router.delete("/:id", systemConfigController.deleteSystemConfig);

module.exports = router;
