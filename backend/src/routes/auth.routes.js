import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const routes = Router();

//registro
routes.post("/register", register);

//login
routes.post("/login", login);

routes.post("/logout", logout);

routes.get("/profile", authRequired, profile);

export default routes;
