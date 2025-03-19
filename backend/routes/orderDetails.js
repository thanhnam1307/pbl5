const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers/orderDetailController");

// Routes cho Order_Details
router.post("/", orderDetailController.createOrderDetail);
router.get("/", orderDetailController.getAllOrderDetails);
router.get("/:id", orderDetailController.getOrderDetailById);
router.put("/:id", orderDetailController.updateOrderDetail);
router.delete("/:id", orderDetailController.deleteOrderDetail);

module.exports = router;
