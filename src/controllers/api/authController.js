import bcrypt from "bcrypt";
import systemApi from "../../libraries/systemApi.js";
import authJWT from "../../libraries/authJWT.js";
import userModel from "../../models/usersModel.js";

const auth = async (req, res) => {
  let data = req.body;
  let userData = await userModel.findOne({
    where: {
      username: data.username,
    },
  });

  //Username Check
  if (!userData) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 404,
        message: "Username or password not correct",
      },
      404
    );
  }

  //Password Check
  let confirm = await bcrypt.compare(data.password, userData.password);
  if (!confirm) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 404,
        message: "Username or password not correct",
      },
      404
    );
  }

  return systemApi.jsonResponse(
    res,
    {
      statusCode: 200,
      message: "Login Successful..",
      token_access: await authJWT.generateToken(res, userData),
    },
    200
  );
};

const refreshAuth = async (req, res) => {
  let cookieToken = req.cookies.refreshToken;
  if (!cookieToken) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 401,
        message: "Refresh token is required",
      },
      401
    );
  }

  let tokenAccess = await authJWT.refreshToken(res, cookieToken);
  if (!tokenAccess) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 403,
        message: "Refresh token is not valid",
      },
      403
    );
  }
  return systemApi.jsonResponse(res, {
    statusCode: 200,
    message: "Generate token successful..",
    token_access: tokenAccess,
  });
};

const logout = async (req, res) => {
  let cookieToken = req.cookies.refreshToken;
  if (!cookieToken) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 401,
        message: "Access token is required",
      },
      401
    );
  }
  let logoutAccess = await authJWT.destroyToken(res, cookieToken);
  if (!logoutAccess) {
    return systemApi.jsonResponse(
      res,
      {
        statusCode: 403,
        message: "Access token is not valid",
      },
      403
    );
  }

  return systemApi.jsonResponse(res, {
    statusCode: 200,
    message: "Logout successful..",
  });
};

export default {
  auth,
  refreshAuth,
  logout,
};
