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
];
export const EditCommentValidation = [
  body("comment").notEmpty().withMessage("Comment is required"),
];

//CHAT______________________________________________
export const SendMessageValidation = [
  body("message").notEmpty().withMessage("Messae cannot be empty"),
  body("receiver")
    .notEmpty()
    .withMessage("Receiver cannot be empty")
    .isNumeric()
    .withMessage("receiver must be number"),
];
