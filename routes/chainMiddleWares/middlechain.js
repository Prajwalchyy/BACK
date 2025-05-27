import { AuthUserAccessToken } from "../../middleware/authUser.js";
import limiter from "../../middleware/loginLimit.js";
import { AuthorizeRole } from "../../middleware/roleAllowed/AuthorizeUserCheck.js";
import ValidationError from "../../middleware/validationError.js";
import {
  CreatePostsValidation,
  UserloginValidation,
  UserRegisterValidation,
} from "../../validation/validationResult.js";



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
