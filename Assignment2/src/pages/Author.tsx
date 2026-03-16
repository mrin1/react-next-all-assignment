import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PostList } from "../typescript/interface";


const Author: React.FC = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState<PostList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();
        console.log("response", data);

        setPostList(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-6 py-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-black underline mb-12 tracking-wide">
        Author Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {postList.map((post) => (
          <div
            key={post.id}
            className="
          bg-white rounded-2xl shadow-lg hover:shadow-2xl 
           border-transparent hover:border-blue-400 
          transition-all duration-300
          flex flex-col p-6 relative border-[2px] border-black
        "
          >
            <span className="absolute -top-3 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
              #{post.id}
            </span>

            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 hover:text-blue-700 transition">
              {post.title}
            </h3>

            <p className="text-gray-600 text-sm line-clamp-3 mb-6">
              {post.body}
            </p>

            <button
              onClick={() => navigate(`/author/${post.id}`)}
              className="
            mt-auto bg-green-600 text-white py-2.5 rounded-xl 
            font-semibold text-sm shadow-md 
            hover:bg-blue-700 hover:scale-105 transition-all
          "
            >
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Author;
