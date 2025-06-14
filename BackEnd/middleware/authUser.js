import jwt from "jsonwebtoken";

export const AuthUserAccessToken = (req, res, next) => {
  const AccessTokenCookie = req.cookies.AccessToken;
  //   console.log(token);

  if (!AccessTokenCookie) {
    return res
      .status(401)
      .json({ message: "Authentication required. Please log in." });
  }
  try {
    const VerifyUser = jwt.verify(AccessTokenCookie, "AccessSecretKey");
    req.userid = VerifyUser.userid;
    req.userrole = VerifyUser.userrole;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(403).json({ message: "Token is invalid or expired" });
  }
};
//refress ********************************************************************

export const AuthUserRefreshToken = (req, res, next) => {
  const RefreshTokenCookie = req.cookies.RefreshToken;
  if (!RefreshTokenCookie) {
    return res
      .status(401)
      .json({ message: "Authentication required. Please log in 2." });
  }

  try {
    const RefreshTokenVerify = jwt.verify(
      RefreshTokenCookie,
      "RefreshSecretKey"
    );
    const NewAccessToken = jwt.sign(
      { userid: RefreshTokenVerify.userid },
      "NewAccessSecretKey",
      { expiresIn: "60m" }
    );

    res.cookie("AccessToken", NewAccessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
    console.log(NewAccessToken);
    return res.status(200).json({ accessToken: NewAccessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ message: "Refresh token expired or invalid" });
  }
};
