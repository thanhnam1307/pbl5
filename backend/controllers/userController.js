const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { name, email, password, address, phone, is_company, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }

    // Băm mật khẩu trước khi lưu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Lưu mật khẩu đã băm
      address,
      phone,
      is_company,
      role,
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server, vui lòng thử lại sau!" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });

    // Tạo token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // res.json({
    //   message: "Đăng nhập thành công",
    //   token,
    //   userId: user._id,
    //   role: user.role,
    // });
    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server, vui lòng thử lại sau!" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Không trả về mật khẩu
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server, vui lòng thử lại sau!" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "Xoá người dùng thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server, vui lòng thử lại sau!" });
  }
};
