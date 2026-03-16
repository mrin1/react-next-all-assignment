import axios from "axios";
import { useParams } from "react-router-dom";
import type { productDetails } from "../typescript/interface";
import { useEffect, useState } from "react";


const BlogDetails = () => {
  const { id } = useParams();

  const [productDetails, setProductDetails] = useState<productDetails>({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      console.log("Response",response);
      
      setProductDetails(response?.data);
    };
    fetchData();
  }, [id]);
  console.log("product Detail", productDetails);

  return (
    <div className="px-6 py-10  min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-black tracking-wide drop-shadow-md">
        View Product : <span className="text-black">{id}</span>
      </h2>

      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-2xl border-[2px] p-6 text-center transform transition-all hover:scale-105 hover:shadow-yellow-500/40 border-black">
        <div className="bg-gray-100 rounded-2xl p-4 w-full flex justify-center">
          <img
            src={productDetails?.thumbnail}
            alt={productDetails?.title || "Product Image"}
            className="w-48 h-48 object-cover rounded-xl shadow-md"
          />
        </div>

        <h1 className="text-xl font-bold text-gray-900 mt-5 mb-2">
          {productDetails?.title}
        </h1>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {productDetails?.description}
        </p>

        <div className="flex justify-between w-full mt-3">
          <span className="text-lg font-bold text-green-600">
            ₹{productDetails?.price}
          </span>
          <span className="text-sm text-yellow-600 font-medium">
            ⭐ {productDetails?.rating}
          </span>
        </div>

        <button className="mt-5 w-full  bg-green-600 text-white py-2.5 rounded-xl 
            font-semibold text-sm shadow-md 
            hover:bg-blue-700 hover:scale-105 transition-all">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
