import postModel from "./../../database/models/post.model.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         authorId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal Server Error
 */
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
    console.error("DEBUG ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: This is the content of my first blog post.
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
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
    console.error("DEBUG ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post (owner only)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Title
 *               content:
 *                 type: string
 *                 example: Updated content.
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid post ID or validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — you do not own this post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
export const updatePostById = async (req, res) => {
  try {
    let { title, content } = req.body;
    title = title || req.post.title;
    content = content || req.post.content;
    let post = await postModel.findByIdAndUpdate(
      req.post._id,
      { title, content },
      { new: true },
    );
    return res.status(200).json({ message: "post updated successfully", post });
  } catch (err) {
    console.error("DEBUG ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post (owner only)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       400:
 *         description: Invalid post ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden — you do not own this post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
export const deletePostById = async (req, res) => {
  try {
    await postModel.findByIdAndDelete(req.post._id);
    return res.status(200).json({ message: "post deleted successfully" });
  } catch (err) {
    console.error("DEBUG ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
