const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const mongoose = require("mongoose");

// 🛒 Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const { user_id, status, order_date } = req.body;

    if (!user_id || !status) {
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng!" });
    }

    // Nếu không có order_date thì lấy ngày hiện tại
    const newOrder = new Order({
      user_id,
      status,
      order_date: order_date || Date.now(),
    });

    const savedOrder = await newOrder.save();

    res
      .status(201)
      .json({ message: "Đơn hàng đã được tạo!", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📦 Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user_id", "name email")
      .populate("status", "status_name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Lấy chi tiết đơn hàng theo ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user_id", "name email")
      .populate("status", "status_name")
      .lean();

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
    }

    const orderDetails = await OrderDetail.find({
      order_id: order._id,
    }).populate("product_id", "name price");

    res.json({ order, orderDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔄 Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
    }

    order.status = status;
    await order.save();
    res.json({ message: "Cập nhật trạng thái thành công!", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑 Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
    }

    await OrderDetail.deleteMany({ order_id: order._id }); // Xóa chi tiết đơn hàng
    await order.deleteOne();

    res.json({ message: "Xóa đơn hàng thành công!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
