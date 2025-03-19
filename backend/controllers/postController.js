const Post = require("../models/Post");

// Tạo bài viết mới
exports.createPost = async (req, res) => {
  try {
    const { title, content, companyInfo_id } = req.body;
    if (!title || !content || !companyInfo_id) {
      return res.status(400).json({ message: "Thiếu thông tin bài viết!" });
    }

    const newPost = new Post({ title, content, companyInfo_id });
    const savedPost = await newPost.save();

    res.status(201).json({ message: "Bài viết đã được tạo!", post: savedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy tất cả bài viết
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("companyInfo_id", "name");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy bài viết theo ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "companyInfo_id",
      "name"
    );
    if (!post)
      return res.status(404).json({ message: "Bài viết không tồn tại!" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật bài viết
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Bài viết không tồn tại!" });

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.json({ message: "Cập nhật bài viết thành công!", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Bài viết không tồn tại!" });

    await post.deleteOne();
    res.json({ message: "Xóa bài viết thành công!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
