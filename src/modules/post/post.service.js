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
  // console.log(user._id);
  let { title, content } = req.body;
  let newPost = await postModel.create({
    title,
    content,
    authorId: user.id,
  });
  return res
    .status(201)
    .json({ message: "post created successfully", post: newPost });
};

export const updatePostById = async (req, res) => {
  let { title, content } = req.body;
  title = title || req.post.title;
  content = content || req.post.content;
  let post = await postModel.findByIdAndUpdate(
    req.post._id,
    { title, content },
    { new: true },
  );
  return res.status(200).json({ message: "post updated successfully", post });
};

export const deletePostById = async (req, res) => {
  await postModel.findByIdAndDelete(req.post._id);
  return res.status(200).json({ message: "post deleted successfully" });
};
