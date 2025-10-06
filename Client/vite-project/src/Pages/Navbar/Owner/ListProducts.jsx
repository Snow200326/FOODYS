import React, { useState } from "react";
import { dummyProducts } from "../../../assets/data";

export const ListProducts = () => {
  const [products, setProducts] = useState(dummyProducts);

  const toggleStock = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product, inStock: !product.inStock } : product
      )
    );
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Products Table</h2>
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-white rounded-xl">
          <thead className="bg-[#dc5b41]">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Image</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Title</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Category</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Price</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-4">{product.title}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-700">
                <p className="font-bold">From ${product.price[Object.keys(product.price)[0]]}</p>
                </td>
                <td className="py-3 px-4">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.inStock}
                      onChange={() => toggleStock(product._id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6  peer-focus:outline-none peer-focus:ring-2 bg-red-600 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-green-500 transition"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {product.inStock ? "In Stock" : "Out of Stock"} 
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
