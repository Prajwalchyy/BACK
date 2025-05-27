import express from "express";
import { CreatePosts } from "../controller/posts.js";
import { Test, UserLogin, UserRegister } from "../controller/users.js";
import {
  AuthUserAccessToken,
  AuthUserRefreshToken,
} from "../middleware/authUser.js";
import { AuthorizeRole } from "../middleware/roleAllowed/AuthorizeUserCheck.js";
import {
  CreatePostChain,
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

//Tests
route.get("/Test", AuthUserAccessToken, AuthorizeRole("admin", "author"), Test);
export default route;
