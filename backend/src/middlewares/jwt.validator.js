import jwt from "jsonwebtoken";
import { settingDotEnvSecretKey } from "../config/dotenv.js";

const { secret } = settingDotEnvSecretKey();

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "10h" }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};
