import joi from "joi";

export const createPostSchema = joi.object({
  title: joi.string().min(3).max(100).required(),
  content: joi.string().min(10).required(),
});

export const updatePostSchema = joi.object({
  title: joi.string().min(3).max(100),
  content: joi.string().min(10),
});
