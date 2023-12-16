import Post from "../models/post.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).json(allPosts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar los posts", error: error });
  }
};

export const getPostByID = async (req, res) => {
  const { id } = req.params;

  try {
    const foundPost = await Post.findById(id);
    if (!foundPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(foundPost);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el post" });
  }
};

export const createPost = async (req, res) => {
  const { title, description, imageURL } = req.body;

  try {
    const newPost = new Post({
      title,
      description,
      imageURL,
      author: req.user.id, //req.user viene de validateToken
    });

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Error saving post", error: error });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); //new true permite ver los cambios sin actualizar la pagina
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id, {
      new: true,
    }); //new true permite ver los cambios sin actualizar la pagina
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};
