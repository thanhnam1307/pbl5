const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized! Bạn cần đăng nhập." });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    console.log("Decoded Token:", decoded); // 🔹 Debug xem token giải mã đúng chưa
    req.user = decoded; // Gán thông tin user vào req.user
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token không hợp lệ." });
  }
};
