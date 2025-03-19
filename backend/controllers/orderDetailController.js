const OrderDetail = require("../models/OrderDetail");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Tạo chi tiết đơn hàng mới
exports.createOrderDetail = async (req, res) => {
  try {
    const { order_id, product_id, quantity } = req.body;

    // Kiểm tra đơn hàng tồn tại
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại!" });
    }

    // Kiểm tra sản phẩm tồn tại
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
    }

    // Kiểm tra số lượng tồn kho
    if (product.stock < quantity) {
      return res
        .status(400)
        .json({ message: "Số lượng sản phẩm không đủ tồn kho!" });
    }

    // Trừ số lượng tồn kho
    product.stock -= quantity;
    await product.save();

    // Tạo chi tiết đơn hàng
    const newOrderDetail = new OrderDetail({ order_id, product_id, quantity });
    await newOrderDetail.save();

    res.status(201).json({
      message: "Chi tiết đơn hàng đã được tạo!",
      orderDetail: newOrderDetail,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả chi tiết đơn hàng
exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetail.find()
      .populate("order_id", "order_date")
      .populate("product_id", "name price");
    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết đơn hàng theo ID
exports.getOrderDetailById = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findById(req.params.id)
      .populate("order_id", "order_date")
      .populate("product_id", "name price");

    if (!orderDetail) {
      return res
        .status(404)
        .json({ message: "Chi tiết đơn hàng không tồn tại!" });
    }

    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật số lượng sản phẩm trong chi tiết đơn hàng
exports.updateOrderDetail = async (req, res) => {
  try {
    const { quantity } = req.body;
    const orderDetail = await OrderDetail.findById(req.params.id);

    if (!orderDetail) {
      return res
        .status(404)
        .json({ message: "Chi tiết đơn hàng không tồn tại!" });
    }

    // Lấy sản phẩm liên quan
    const product = await Product.findById(orderDetail.product_id);

    // Tính toán số lượng cần thêm hoặc trừ
    const quantityChange = quantity - orderDetail.quantity;

    // Kiểm tra số lượng tồn kho nếu tăng số lượng
    if (quantityChange > 0 && product.stock < quantityChange) {
      return res.status(400).json({ message: "Không đủ số lượng tồn kho!" });
    }

    // Cập nhật số lượng tồn kho
    product.stock -= quantityChange;
    await product.save();

    // Cập nhật số lượng trong chi tiết đơn hàng
    orderDetail.quantity = quantity;
    await orderDetail.save();

    res.json({ message: "Cập nhật thành công!", orderDetail });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa chi tiết đơn hàng
exports.deleteOrderDetail = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findById(req.params.id);

    if (!orderDetail) {
      return res
        .status(404)
        .json({ message: "Chi tiết đơn hàng không tồn tại!" });
    }

    // Trả lại số lượng sản phẩm về kho
    const product = await Product.findById(orderDetail.product_id);
    product.stock += orderDetail.quantity;
    await product.save();

    // Xóa chi tiết đơn hàng
    await orderDetail.deleteOne();

    res.json({ message: "Chi tiết đơn hàng đã được xóa!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
