import jwt from "jsonwebtoken";

export const AuthUserAccessToken = (req, res, next) => {
  const AccessToken = req.cookies.AccessToken;
  //   console.log(token);

  if (!AccessToken) {
    return res
      .status(401)
      .json({ message: "Authentication required. Please log in." });
  }

  try {
    const VerifyUser = jwt.verify(AccessToken, "AccessSecretKey");
    req.userid = VerifyUser.userid;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(403).json({ message: "Token is invalid or expired" });
  }
};

//refress ********************************************************************

export const AuthUserRefreshToken = (req, res, next) => {
  const RefreshToken = req.cookies.RefreshToken;
  console.log("reftoken runned");
  if (!RefreshToken) {
    return res.status(401).json({ message: "No Refresh Token" });
  }

  try {
    const RefreshToken = jwt.verify("RefreshSecretKey", RefreshToken);
    const NewAccessToken = jwt.sign(
      { userid: RefreshToken.userid },
      "NewAccessSecretKey",
      { expireIn: "60m" }
    );

    res.cookie("AccessToken", NewAccessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 1000,
    });
    console.log(NewAccessToken);
    return res.status(200).json({ accessToken: NewAccessToken });
  } catch (error) {
    // console.log(error)
    return res
      .status(403)
      .json({ message: "Refresh token expired or invalid" });
  }
};
