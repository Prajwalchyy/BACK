import express from "express";
import {
  CountLikePost,
  CreatePosts,
  DeleteComment,
  DeletePosts,
  GetAllComment,
  GetAllPosts,
  GetMineComment,
  GetOnePost,
  GetOneUserPosts,
  NotificationSeen,
  PostComment,
  PostLike,
  UpdateComment,
  UpdatePost,
  UserNotifications,
} from "../controller/posts.js";
import { AllUserList, UserLogin, UserRegister } from "../controller/users.js";
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
  NotificationSeenChain,
  PostCommentChain,
  PostlikeChain,
  SendMessageChain,
  UpdatePostChain,
  UserLoginChain,
  UserNotificationChain,
  UserRegisterChain,
} from "./chainMiddleWares/middlechain.js";
import { calculateSum } from "../controller/math.js";
import { SendMessage } from "../controller/chat.controller.js";

const route = express.Router();

//Auth Token_________________________________________________________________
route.get("/RefreshToken", AuthUserRefreshToken);

//UserAuth__________________________________________________________________
route.post("/Users/UserRegister", UserRegisterChain, UserRegister);
route.post("/Users/UserLogin", UserLoginChain, UserLogin);

//Users
route.get("/Users/All", AllUserList);

//posts_______________________________________________________________________
route.post("/Posts/CreatePost", CreatePostChain, CreatePosts);
route.get("/Posts/GetAllPosts", GetAllPostsChain, GetAllPosts);
route.get("/Posts/GetOnePost/:id", GetOnePostChain, GetOnePost);
route.get("/Posts/GetOneUserPosts", GetOneUserPostsChain, GetOneUserPosts);
route.put("/Posts/UpdatePost/:id", UpdatePostChain, UpdatePost);
route.delete("/Posts/DeletePost/:id", DeletePostChain, DeletePosts);

//posts Like and  Comments__________________________________________________________________________________________

route.post("/Posts/Like/Create/:postid", PostlikeChain, PostLike);
route.get("/Posts/Like/count/:postid", CountLikePost);
route.post("/Posts/Comment/Create/:postid", PostCommentChain, PostComment);
route.put("/Posts/Comment/Edit/:CommentId", EditCommentChain, UpdateComment);
route.get("/Posts/Comment/All/:postid", GetAllComment);
route.get("/Posts/Comment/Mine", GetMyCommentChain, GetMineComment);
route.delete(
  "/Posts/Comment/Delete/:commmentid",
  DeleteCommentChain,
  DeleteComment
);

//Notification_________________________________________________________________________________________
route.get(
  "/Posts/Comment/Notification/User",
  UserNotificationChain,
  UserNotifications
);
route.put(
  "/Posts/Comment/Notification/seen/:NotificationId",
  NotificationSeenChain,
  NotificationSeen
);

//CHAT MESSAGE_________________________________________________________________________________________________
route.post("/Chat/SendMessage", SendMessageChain, SendMessage);

//test

route.get("/sum", calculateSum);

export default route;
