import postModel from ".././database/models/post.model.js";
export const authorize = async (req, res, next) => {
  try {
    let { id } = req.params;
    let post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (post.authorId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized. You do not own this post." });
    }
    req.post = post;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
