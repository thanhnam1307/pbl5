import React, { useState } from "react";
import useProducts from "../hooks/useProducts";

const categories = [
  "PVC Pipes",
  "Steel Pipes",
  "Copper Pipes",
  "HDPE Pipes",
  "PVC Fittings",
  "Steel Fittings",
];

const Marketplace = () => {
  const { products, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Hiển thị 3 sản phẩm mỗi trang

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  // Tính toán danh sách sản phẩm theo trang
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex">
      {/* Sidebar Categories */}
      <div className="w-1/4 p-4 border-r">
        <h2 className="font-bold text-lg mb-2">Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className="py-1 text-gray-700 hover:text-blue-500 cursor-pointer"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Product List */}
      <div className="w-3/4 p-4">
        <h1 className="text-xl font-bold mb-4">Featured Products</h1>
        <div className="grid grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <img
                src={`${import.meta.env.VITE_SERVER_URI_IMAGE}${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
              <p className="text-red-500 font-bold">${product.price}</p>
              <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
