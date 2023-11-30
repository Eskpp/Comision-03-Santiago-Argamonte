import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const routes = Router();

//registro
routes.post("/register", register);

//login
routes.post("/login", login);

export default routes;