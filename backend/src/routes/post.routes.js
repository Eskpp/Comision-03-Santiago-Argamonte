import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostByID,
  updatePost,
} from "../controllers/post.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const routes = Router();

routes.get("/post", getAllPosts); //todos pueden ver los posts
routes.get("/post/:id", getPostByID); //ver implementacion

//se necesita estar logeado para esto
routes.post("/post", authRequired, createPost);
routes.put("/post/:id", authRequired, updatePost);
routes.delete("/post/:id", authRequired, deletePost);

export default routes;
