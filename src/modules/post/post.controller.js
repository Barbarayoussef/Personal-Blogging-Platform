import { Router } from "express";
import {
  getAllPosts,
  createPost,
  updatePostById,
  deletePostById,
} from "./post.service.js";
import { validation } from "../../utils/validation.js";
import { createPostSchema, updatePostSchema } from "./post.validation.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

let router = Router();

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
router.get("/", getAllPosts);
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
router.post("/", authenticate, validation(createPostSchema), createPost);

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
router.put(
  "/:id",
  authenticate,
  authorize,
  validation(updatePostSchema),
  updatePostById,
);
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
router.delete("/:id", authenticate, authorize, deletePostById);
export default router;
