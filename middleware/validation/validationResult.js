import { body } from "express-validator";

export const UserRegisterValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be 5 character long"),
];

export const UserloginValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const CreatePostsValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content are required"),
];
export const UpdatePostsValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
];

export const PostCommentValidation = [
  body("comment").notEmpty().withMessage("Comment is required"),
  body("postid")
    .notEmpty()
    .withMessage("postid required")
    .isNumeric()
    .withMessage("postid must be a number")
    .isLength({ max: 500 })
    .withMessage("The comment size is 500 only"),
];
