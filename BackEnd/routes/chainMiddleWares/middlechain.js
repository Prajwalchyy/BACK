import { AuthUserAccessToken } from "../../middleware/authUser.js";
import limiter from "../../middleware/loginLimit.js";
import { QueryOptions } from "../../middleware/queryOptions/queryOptions.js";
import { AuthorizeRole } from "../../middleware/roleAllowed/authorizeUserCheck.js";
import ValidationError from "../../middleware/validation/validationError.js";
import {
  CreatePostsValidation,
  EditCommentValidation,
  PostCommentValidation,
  SendMessageValidation,
  UpdatePostsValidation,
  UserloginValidation,
  UserRegisterValidation,
} from "../../middleware/validation/validationResult.js";
import { PostsColums } from "../DbColumns/dbColumns.js";

//authUsers______________________________________________________________________________
export const UserRegisterChain = [UserRegisterValidation, ValidationError];
export const UserLoginChain = [UserloginValidation, ValidationError, limiter];

// Posts________________________________________________________________________________
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
  QueryOptions(PostsColums),
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

//Post Comments___________________________________________________________________
export const PostlikeChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];
export const PostCommentChain = [
  PostCommentValidation,
  ValidationError,
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];
export const EditCommentChain = [
  EditCommentValidation,
  ValidationError,
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];

export const GetMyCommentChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];
export const DeleteCommentChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];

//NOTIFICATION ______________________________________________________________________
export const UserNotificationChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];
export const NotificationSeenChain = [
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];

//CHAT_____________________________________________________________________________________
export const SendMessageChain = [
  SendMessageValidation,
  ValidationError,
  AuthUserAccessToken,
  AuthorizeRole("admin", "author", "viewer"),
];
