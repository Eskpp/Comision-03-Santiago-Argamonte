import { Router } from "express";
import {
  createComment,
  deleteComment,
  getAllCommentsFromPost,
  getCommentByID,
  updateComment,
} from "../controllers/comment.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const routes = Router();

routes.get("/post/:pid/comment", getAllCommentsFromPost); //todos pueden ver los comentarios
routes.get("/post/:pid/comment/:id", getCommentByID); //ver implementacion

//se necesita estar logeado para esto
routes.post("/post/:pid/comment", authRequired, createComment);
routes.put("/post/:pid/comment/:id", authRequired, updateComment);
routes.delete("/post/:pid/comment/:id", authRequired, deleteComment);

export default routes;
