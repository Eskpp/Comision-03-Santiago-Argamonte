/* eslint-disable react/prop-types */
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import { Link } from "react-router-dom";
import { CommentCard } from "./CommentCard";

export const PostCard = ({ post }) => {
  const { deletePost } = usePost();
  const { isAuth } = useAuth();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-semibold text-white">{post.title}</h1>
      </header>

      <p className="">{post.description}</p>
      <p className="text-2xl font-bold">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {isAuth &&
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-800 rounded-md p-2"
            onClick={() => {
              deletePost(post._id);
            }}
          >
            Eliminar
          </button>
          <Link className="bg-blue-800 rounded-md p-2" to={`/post/${post._id}`}>
            Editar
          </Link>
          <Link
            className="bg-green-800 rounded-md p-2"
            to={`/post/${post._id}`}
          >
            Comentar
          </Link>
        </div>
      }
      {post.comments.map((c, i) => (
        <CommentCard comment={c} key={i}/>
      ))}
    </div>
  );
};
