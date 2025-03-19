module.exports = function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized! Bạn cần đăng nhập." });
  }

  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Forbidden! Bạn không có quyền truy cập." });
  }

  next();
};
