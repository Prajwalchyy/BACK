import { AuthUserAccessToken } from "../../middleware/authUser.js";
import limiter from "../../middleware/loginLimit.js";
import { AuthorizeRole } from "../../middleware/roleAllowed/AuthorizeUserCheck.js";
import ValidationError from "../../middleware/roleAllowed/validation/validationError.js";
import {
  CreatePostsValidation,
  UserloginValidation,
  UserRegisterValidation,
} from "../../middleware/roleAllowed/validation/validationResult.js";

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
export const GetAllPostsChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];
export const DeletePostChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author"),
];
