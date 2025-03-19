const express = require("express");
const router = express.Router();
const ProductSpecController = require("../controllers/ProductSpecController");

// ✅ API CRUD cho thông số sản phẩm
router.get("/", ProductSpecController.getProductSpecs);
router.get("/:id", ProductSpecController.getProductSpecById);
router.post("/", ProductSpecController.createProductSpec);
router.put("/:id", ProductSpecController.updateProductSpec);
router.delete("/:id", ProductSpecController.deleteProductSpec);

module.exports = router;
