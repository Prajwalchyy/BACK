import express from "express";
import {
  CreatePosts,
  DeleteComment,
  DeletePosts,
  GetAllComment,
  GetAllPosts,
  GetMineComment,
  GetOnePost,
  GetOneUserPosts,
  PostComment,
  PostLike,
  UpdateComment,
  UpdatePost,
} from "../controller/posts.js";
import { UserLogin, UserRegister } from "../controller/users.js";
import { AuthUserRefreshToken } from "../middleware/authUser.js";
import {
  CreatePostChain,
  DeleteCommentChain,
  DeletePostChain,
  EditCommentChain,
  GetAllPostsChain,
  GetMyCommentChain,
  GetOnePostChain,
  GetOneUserPostsChain,
  PostCommentChain,
  PostlikeChain,
  UpdatePostChain,
  UserLoginChain,
  UserRegisterChain,
} from "./chainMiddleWares/middlechain.js";

const route = express.Router();

//Auth Token_________________________________________________________________
route.post("/RefreshToken", AuthUserRefreshToken);

//UserAuth__________________________________________________________________
route.post("/Users/UserRegister", UserRegisterChain, UserRegister);
route.post("/Users/UserLogin", UserLoginChain, UserLogin);

//posts_______________________________________________________________________
route.post("/Posts/CreatePost", CreatePostChain, CreatePosts);
route.get("/Posts/GetAllPosts", GetAllPostsChain, GetAllPosts);
route.get("/Posts/GetOnePost/:id", GetOnePostChain, GetOnePost);
route.get("/Posts/GetOneUserPosts", GetOneUserPostsChain, GetOneUserPosts);
route.put("/Posts/UpdatePost/:id", UpdatePostChain, UpdatePost);
route.delete("/Posts/DeletePost/:id", DeletePostChain, DeletePosts);

//posts Like and  Comments__________________________________________________________________________________________

route.post("/Posts/Like/Create/:postid", PostlikeChain, PostLike);
route.post("/Posts/Comment/Create/:postid", PostCommentChain, PostComment);
route.put("/Posts/Comment/Edit/:CommentId", EditCommentChain, UpdateComment);
route.get("/Posts/Comment/All/:postid", GetAllComment);
route.get("/Posts/Comment/Mine", GetMyCommentChain, GetMineComment);
route.delete(
  "/Posts/Comment/Delete/:commmentid",
  DeleteCommentChain,
  DeleteComment
);

//notificarion_________________________________________________________________________________________
// route.post("/Posts/Comment/Notification/Store/", StoreNotification);

export default route;
