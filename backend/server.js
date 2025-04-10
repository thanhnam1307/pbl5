const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productSpecRoutes = require("./routes/productSpecRoutes");
const orderRoutes = require("./routes/orders");
const orderDetailRoutes = require("./routes/orderDetails");
const statusRoutes = require("./routes/status");
const aiCheckRoutes = require("./routes/aiCheckRoutes");
const postRoutes = require("./routes/postRoutes");
const systemConfigRoutes = require("./routes/systemConfigRoutes");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:3001", // Cho phép frontend truy cập
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// 🟢 Cấu hình cho phép truy cập thư mục uploads mà không cần `/api`
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/product-specs", productSpecRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-details", orderDetailRoutes);
app.use("/api/statuses", statusRoutes);
app.use("/api/ai-checks", aiCheckRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/system-configs", systemConfigRoutes);

const PORT = process.env.PORT || 5000;
const main = async () => {
  // Kết nối đến MongoDB
  try {
    await connectDB(); // Đảm bảo kết nối DB thành công
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1); // Thoát nếu không thể kết nối DB
  }
};

main();
