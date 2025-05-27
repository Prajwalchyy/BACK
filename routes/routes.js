import express from "express";
import { Test, UserLogin, UserRegister } from "../controller/users.js";
import ValidationError from "../middleware/validationError.js";
import {
  UserloginValidation,
  UserRegisterValidation,
} from "../validation/validationResult.js";
import limiter from "../middleware/loginLimit.js";
import {
  AuthUserAccessToken,
  AuthUserRefreshToken,
} from "../middleware/authUser.js";

const route = express.Router();

//Auth
route.post(
  "/Users/UserRegister",
  UserRegisterValidation,
  ValidationError,
  UserRegister
);
route.post(
  "/Users/UserLogin",
  UserloginValidation,
  ValidationError,
  limiter,
  UserLogin
);
route.post("/RefreshToken", AuthUserRefreshToken);

//datas

route.get("/Test", AuthUserAccessToken, Test);
export default route;
