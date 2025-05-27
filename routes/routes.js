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
import { authorizeRole } from "../middleware/roleAllowed/authorizeUserCheck.js";

const route = express.Router();

//Auth Token

route.post("/RefreshToken", AuthUserRefreshToken);

//Auth cardinals
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

//Tests

route.get("/Test", AuthUserAccessToken, authorizeRole("admin","author"), Test);
export default route;
