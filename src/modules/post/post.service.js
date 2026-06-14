import postModel from "./../../database/models/post.model.js";
export const getAllPosts = async (req, res) => {
  let posts = await postModel.find();
  if (posts.length === 0) {
    return res.status(404).json({ message: "no posts found" });
  }
  return res
    .status(200)
    .json({ message: "posts retrieved successfully", posts });
};

export const createPost = async (req, res) => {
  let user = req.user;
  let { title, content } = req.body;
  let newPost = await postModel.create({
    title,
    content,
    authorId: user._id,
  });
  return res
    .status(201)
    .json({ message: "post created successfully", post: newPost });
};
