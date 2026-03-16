import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { ProductList } from "../typescript/interface";



const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort");

  const [productList, setProductList] = useState<ProductList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      let sortedData = [...data.products];

      if (sortValue === "asc") {
        sortedData.sort((a, b) => a.price - b.price);
      } else if (sortValue === "desc") {
        sortedData.sort((a, b) => b.price - a.price);
      }

      setProductList(sortedData);
    };
    fetchData();
  }, [sortValue]);

  const handleSort = (order: string) => {
    setSearchParams({ sort: order });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen ">
      <h2 className="text-4xl text-center font-extrabold underline mb-10 text-gray-900 tracking-wide">
        Product List
      </h2>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-8">
        <select
          value={sortValue || ""}
          onChange={(e) => handleSort(e.target.value)}
          className="px-5 py-3 rounded-xl bg-white shadow-md text-gray-800 border-2 border-blue-500 focus:ring-4 focus:ring-blue-300 font-medium transition-all cursor-pointer"
        >
          <option value="">Sort by Price</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {productList.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg hover:shadow-2xl rounded-2xl border border-gray-300 hover:-translate-y-1 transition-all duration-300 border-[2px] border-black"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-45 w-full object-cover rounded-t-2xl"
            />

            <div className="p-5 flex flex-col">
              <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-1">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>

              <div className="grid grid-cols-1 gap-1 mb-5 text-sm text-gray-700">
                <span>
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category}
                </span>
                <span>
                  <span className="font-semibold">Price:</span> ₹{item.price}
                </span>
                <span>
                  <span className="font-semibold">Rating:</span> ⭐{" "}
                  {item.rating}
                </span>
              </div>

              <button
                className="
            mt-auto bg-green-600 text-white py-2.5 rounded-xl 
            font-semibold text-sm shadow-md 
            hover:bg-blue-700 hover:scale-105 transition-all
          "
                onClick={() => navigate(`/blog/${item.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
