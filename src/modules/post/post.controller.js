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

router.get("/", getAllPosts);
router.post("/", authenticate, validation(createPostSchema), createPost);
router.put(
  "/:id",
  authenticate,
  authorize,
  validation(updatePostSchema),
  updatePostById,
);
router.delete("/:id", authenticate, authorize, deletePostById);
export default router;
