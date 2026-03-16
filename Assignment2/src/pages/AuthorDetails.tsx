import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PostDetails } from "../typescript/interface";


const AuthorDetails = () => {

  const { id } = useParams();

  const [postsDetails, setProductDetails] = useState<PostDetails>({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://dummyjson.com/posts/${id}`);
      console.log("Response", response);
      
      setProductDetails(response?.data);
    };
    fetchData();
  }, [id]);
  console.log("posts Detail", postsDetails);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl border-[2px] border-black p-5">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-black tracking-wide drop-shadow-lg">
          View Post : {id}
        </h2>

        <div className="bg-white rounded-xl p-7 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.01]">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            {postsDetails.title}
          </h3>

          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            {postsDetails.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
