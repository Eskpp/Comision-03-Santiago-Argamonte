import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePost } from "../context/PostContext";
export const PostFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createPost, getPostById, updatePost } = usePost();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPost() {
      if (params.id) {
        const post = await getPostById(params.id);
        setValue("title", post.title);
        setValue("description", post.description);
        setValue("imageURL", post.imageURL);
        setValue("comments", post.comments);
      }
    }
    loadPost();
  }, []);




  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updatePost(params.id, data);
    } else {
      createPost(data);
    }
    navigate("/");
  });

  return (
    <>
      <Navbar />
      
      <div className="flex h-screen items-center justify-center">
        <div className="bg-zinc-800 max-w-md w-full px-10 py-8 rounded-md">
        <h1>PostFormPage</h1>
          <form onSubmit={onSubmit}>
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="text"
              placeholder="Titulo"
              {...register("title")}
              autoFocus
            />
            <textarea
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              rows="3"
              placeholder="Descripción"
              {...register("description")}
            ></textarea>
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="text"
              placeholder="Link de imagen"
              {...register("imageURL")}
              autoFocus
            />
            <button
              className="flex h-10 px-6 font-semibold rounded-md bg-blue-900 text-white my-5 py-2"
              type="submit"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
