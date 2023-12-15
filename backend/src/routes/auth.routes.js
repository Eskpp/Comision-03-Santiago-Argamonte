import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import {validateLogin, validateRegister,handleErrorValidations} from "../middlewares/validateAuth.js"

const routes = Router();

//registro
routes.post("/register", validateRegister, handleErrorValidations, register);

//login
routes.post("/login", validateLogin, handleErrorValidations, login);

routes.post("/logout", logout);

routes.get("/profile", authRequired, profile);

export default routes;
