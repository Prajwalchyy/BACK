import { validationResult } from "express-validator";
import db from "../database/dbconfig.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemon from "nodemon";

export const UserRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const InsertUserQuery =
      "INSERT INTO users (username,useremail,userrole,userpassword) VALUES (?,?,?,?)";

    const [result] = await db.query(InsertUserQuery, [
      name,
      email,
      role,
      hashPassword,
    ]);

    return res
      .status(201)
      .json({ message: "User Registered Successfully", result });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.sqlMessage.includes("username")) {
        return res
          .status(400)
          .json({ message: ` Username ${name} is already taken` });
      }
      if (err.sqlMessage.includes("useremail")) {
        return res
          .status(400)
          .json({ message: `Email ${email} is already registered` });
      }
    }
    // console.log(err)
    return res.status(500).json({ err, message: "Error while Inserting user" });
  }
};

export const UserLogin = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const CheckUserQuery =
      "SELECT * FROM users WHERE useremail=? AND userrole=?";
    const [result] = await db.query(CheckUserQuery, [email, role]);
    const LoginRemaining = req.rateLimit.remaining; //req from loglimit
    const notmatch = () => {
      return res.status(400).json({
        message: "Username or Password didn't match",
        loglimit: LoginRemaining,
      });
    };
    const user = result[0];
    if (!user) {
      return notmatch();
    }
    const DecodePassword = await bcrypt.compare(password, user.userpassword);
    if (!DecodePassword) {
      return notmatch();
    }
    // console.log(user);

    //JWT cookies and Tokens

    const AccessToken = jwt.sign(
      { userid: user.userid, userrole: user.userrole },
      "AccessSecretKey",
      {
        expiresIn: "60m",
      }
    );

    const RefreshToken = jwt.sign(
      { userid: user.userid, userrole: user.userrole },
      "RefreshSecretKey",
      {
        expiresIn: "7d",
      }
    );
    //store token to cookie
    res.cookie("AccessToken", AccessToken, {
      httponly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
    res.cookie("RefreshToken", RefreshToken, {
      httponly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ message: "User Login Sucessfully", token: AccessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err, message: "Error with Userlogin" });
  }
};

export const Test = (req, res) => {
  res.status(200).json({ message: "You are valid user" });
};
