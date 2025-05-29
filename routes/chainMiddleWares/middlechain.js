import { AuthUserAccessToken } from "../../middleware/authUser.js";
import limiter from "../../middleware/loginLimit.js";
import { AuthorizeRole } from "../../middleware/roleAllowed/AuthorizeUserCheck.js";
import ValidationError from "../../middleware/validation/validationError.js";
import {
  CreatePostsValidation,
  PostCommentValidation,
  UpdatePostsValidation,
  UserloginValidation,
  UserRegisterValidation,
} from "../../middleware/validation/validationResult.js";

//authUsers
export const UserRegisterChain = [UserRegisterValidation, ValidationError];
export const UserLoginChain = [UserloginValidation, ValidationError, limiter];

// Posts
export const CreatePostChain = [
  CreatePostsValidation,
  ValidationError,
  AuthUserAccessToken,
  AuthorizeRole("admin", "author"),
];
export const UpdatePostChain = [
  UpdatePostsValidation,
  ValidationError,
  AuthUserAccessToken,
  AuthorizeRole("admin", "author"),
];
export const GetAllPostsChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];
export const GetOnePostChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];
export const GetOneUserPostsChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author"),
];

export const DeletePostChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author"),
];

//Post Comments
export const PostCommentChain = [
  PostCommentValidation,
  ValidationError,
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];
