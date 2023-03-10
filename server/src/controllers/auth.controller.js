const UserService = require("../services/auth.service");
const { HttpStatusCode } = require("../utilities/constants");
const Jwt = require("jsonwebtoken");
const passport = require("passport");
let userInfo = null;
let refreshTokenList = [];

const secret = async (req, res, next) => {
  res.status(HttpStatusCode.OK).json({ User: req.user });
};

const login = async (req, res, next) => {
  try {
    const result = await UserService.login(req.body.email, req.body.password);
    if (result.status === true) {
      const accessToken = UserService.encodedAccessToken(result.data._id);
      const refreshToken = UserService.encodedRefreshToken(result.data._id);
      const { password, ...other } = result;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      refreshTokenList.push(refreshToken);
      res.setHeader("token", "Bearer " + accessToken);
      userInfo = other.data;
      res.status(HttpStatusCode.OK).json({
        result: {
          data: { ...other.data, accessToken: accessToken },
          status: true,
          message: "successfully",
        },
      });
    } else if (result.status === false) {
      res.status(401).json({ result });
    }
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const register = async (req, res, next) => {
  try {
    const result = await UserService.register(req.body);
    //encoded
    const accessToken = UserService.encodedAccessToken(result._id);
    const refreshToken = UserService.encodedRefreshToken(result._id);
    const { password, ...other } = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    refreshTokenList.push(refreshToken);
    res.setHeader("token", "Bearer " + accessToken);
    res
      .status(HttpStatusCode.OK)
      .json({ user: other, accessToken: accessToken });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const signUpFailed = (req, res, next) => {
  res.status(401).json({ error: 404 });
};
const signInSuccess = async (req, res) => {
  if (userInfo !== null) {
    const accessToken = await UserService.encodedAccessToken(userInfo._id);
    const refreshToken = UserService.encodedRefreshToken(userInfo._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    refreshTokenList.push(refreshToken);
    res.status(HttpStatusCode.OK).json({
      result: {
        status: true,
        message: "successfully",
        data: {
          ...userInfo,
          accessToken: accessToken,
        },
      },
    });
  } else {
    res.status(400).json({ status: false, message: "not authenticated" });
    userInfo = null;
  }
};
const googleCallBack = [
  passport.authenticate("google", {
    failureRedirect: "/signIn/failed",
  }),
  (req, res) => {
    userInfo = req.user;
    res.redirect(
      `http://${process.env.APP_HOST}:${process.env.APP_CLIENT_PORT}`
    );
  },
];
const githubCallBack = [
  passport.authenticate("github", {
    failureRedirect: "/signIn/failed",
  }),
  (req, res) => {
    userInfo = req.user;
    res.redirect(
      `http://${process.env.APP_HOST}:${process.env.APP_CLIENT_PORT}`
    );
  },
];
const logout = (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    userInfo = null;
    refreshTokenList = refreshTokenList.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res
      .status(200)
      .json({ result: { status: true, msg: "Logged out successfully" } });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokenList.includes(refreshToken)) {
      return res.status(403).json("RefreshToken is not valid");
    }
    Jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
      console.log(user);
      if (err) {
        console.log(err);
      }
      // console.log("truoc khi refresh: " + refreshTokenList);
      // refreshTokenList = refreshTokenList.filter(
      //   (token) => token !== refreshToken
      // );
      const newAccessToken = UserService.encodedAccessToken(user.sub);
      // const newRefreshToken = UserService.encodedRefreshToken(user.sub);
      // refreshTokenList.push(newRefreshToken);
      // console.log("sau khi refresh: " + refreshTokenList);
      // res.cookie("refreshToken", newRefreshToken, {
      //   httpOnly: true,
      //   secure: false,
      //   path: "/",
      //   sameSite: "strict",
      // });
      res.status(200).json({ accessToken: newAccessToken, status: true });
    });
  } catch (error) {
    res.status(400).json({
      error: new Error(error).message,
      msg: "refresh token expired",
    });
  }
};

module.exports = {
  secret,
  login,
  register,
  signUpFailed,
  signInSuccess,
  logout,
  googleCallBack,
  githubCallBack,
  refresh,
};
