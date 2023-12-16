import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { usePost } from "../context/PostContext";
import { PostCard } from "../components/PostCard";


export const HomePage = () => {

  const { getAllPosts, post } = usePost();

  useEffect(() => {
    getAllPosts();
  }, []);
  
  if (post.length === 0) {
    return (
    <>
    <Navbar/>
    <h1>No hay publicaciones :( </h1>
    </>)
  }

  return (
    <>
      <Navbar />
      <h1>Publicaciones</h1>
      <div className="grid grid-cols-3 gap-2">
        {post.map((post, i) => (
          <PostCard post={post} key={i} />
        ))}
      </div>
    </>
  );
};
