import express from "express";
import { CreatePosts, DeletePosts, GetAllPosts } from "../controller/posts.js";
import { UserLogin, UserRegister } from "../controller/users.js";
import { AuthUserRefreshToken } from "../middleware/authUser.js";
import {
  CreatePostChain,
  DeletePostChain,
  GetAllPostsChain,
  UserLoginChain,
  UserRegisterChain,
} from "./chainMiddleWares/middlechain.js";

const route = express.Router();

//Auth Token
route.post("/RefreshToken", AuthUserRefreshToken);

//UserAuth
route.post("/Users/UserRegister", UserRegisterChain, UserRegister);
route.post("/Users/UserLogin", UserLoginChain, UserLogin);

//posts
route.post("/Posts/CreatePost", CreatePostChain, CreatePosts);
route.get("/Posts/GetAllPosts", GetAllPostsChain, GetAllPosts);
route.delete("/Posts/DeletePost/:id", DeletePostChain, DeletePosts);

export default route;
