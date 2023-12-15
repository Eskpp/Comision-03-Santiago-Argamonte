import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const getAllCommentsFromPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid).populate("comments");
    const allComments = post.comments;
    res.status(200).json(allComments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar los comentarios", error: error });
  }
};

export const getCommentByID = async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid).populate("comments");
    const foundComment = post.comments.find(
      (comment) => comment._id == req.params.id
    );
    if (!foundComment) {
      return res.status(404).json({ message: "Comment not found in post" });
    }
    res.status(200).json(foundComment);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el comentario" });
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create({
      description: req.body.description,
      author: req.user.id,
    });

    const savedComment = await newComment.save();
    //hacer que el post conozca al comentario
    const post = await Post.findById(req.params.pid);
    post.comments.push(savedComment);
    post.save();
    //no se si esta logica tiene que estar aca o en el controlador de post
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error saving comment", error: error });
  }
};

export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) res.status(404).json({ message: 'Comment not found' });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
};

export const deleteComment = async (req, res) => {};
