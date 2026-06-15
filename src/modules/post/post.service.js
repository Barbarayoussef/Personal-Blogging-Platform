import postModel from "./../../database/models/post.model.js";
export const getAllPosts = async (req, res) => {
  try {
    let posts = await postModel.find();
    if (posts.length === 0) {
      return res
        .status(200)
        .json({ message: "There are no posts available yet." });
    }
    return res
      .status(200)
      .json({ message: "posts retrieved successfully", posts });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createPost = async (req, res) => {
  try {
    let user = req.user;
    let { title, content } = req.body;
    let newPost = await postModel.create({
      title,
      content,
      authorId: user.id,
    });
    return res
      .status(201)
      .json({ message: "post created successfully", post: newPost });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePostById = async (req, res) => {
  try {
    let { title, content } = req.body;
    title = title || req.post.title;
    content = content || req.post.content;
    let post = await postModel.findByIdAndUpdate(
      req.post._id,
      { title, content },
      { new: true }
    );
    return res.status(200).json({ message: "post updated successfully", post });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePostById = async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.post._id);
    return res.status(200).json({ message: "post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
