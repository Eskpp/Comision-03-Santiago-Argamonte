import jwt from "jsonwebtoken";
import { settingDotEnvSecretKey } from "../config/dotenv.js";

const { secret } = settingDotEnvSecretKey();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "Authentication required" });
  jwt.verify(token, secret,(err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
  });
  next();
};
