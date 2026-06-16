import jwt from "jsonwebtoken";
import env from "../../config/env.service.js";

export const generateBothTokens = (user) => {
  let accessToken = jwt.sign({ id: user._id }, env.userSignature, {
    expiresIn: "15m",
  });
  let refreshToken = jwt.sign({ id: user._id }, env.userSignature, {
    expiresIn: "7d",
  });
  let tokens = { accessToken, refreshToken };
  return tokens;
};

export const authenticate = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "you must be logged in" });
  }
  try {
    let [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Unauthorized. Token format must be 'Bearer <token>'",
      });
    }
    let decoded = jwt.verify(token, env.userSignature);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "you must be logged in" });
  }
};
