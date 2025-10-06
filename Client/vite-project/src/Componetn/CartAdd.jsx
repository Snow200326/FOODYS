import React, { useContext, useState } from "react";
import { CartContext } from "../Componetn/CartContext.jsx";
import { assets, dummyProducts } from "../assets/data.js";
import { Address } from "./Address.jsx";

export const CartAdd = () => {
  const { cart, addToCart, removeFromCart, clearFromCart, count } =
    useContext(CartContext);
  const [showAddress, setShowAddress] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="w-screen h-full p-6 flex flex-col lg:flex-row gap-6">
      <div className="bg-white shadow rounded-lg p-4 flex-1 overflow-x-auto">
        {!showAddress ? (
          <>
            <h1 className="text-4xl font-bold mb-4">
              Cart <span className="text-[#fd882f] font-thin">Overview</span>
            </h1>

            <table className="table-auto border-collapse w-full">
              <thead className="text-left border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Subtotal</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((curr, index) => {
                  const product = dummyProducts.find((p) => p._id === curr._id);
                  if (!product) return null;

                  return (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 flex items-center gap-3">
                        <img
                          src={product.images}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">{product.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => removeFromCart(product._id)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="px-2">{curr.qty}</span>
                            <button
                              onClick={() => addToCart(product)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">{curr.qty}</td>
                      <td className="px-4 py-2 font-medium">
                        ₹{curr.price * curr.qty}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => clearFromCart(product._id)}
                          className="text-red-500 hover:scale-110 transition"
                        >
                          <img
                            src={assets.trash}
                            alt="remove"
                            className="size-6"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {cart.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Your cart is empty.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Change <span className="text-[#fd882f] font-thin">Address</span>
            </h1>
            <Address />
            <button
              onClick={() => setShowAddress(false)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back to Cart
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6 w-full lg:w-[30%] h-fit">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <div className="flex justify-between mb-2">
          <span>Total Items</span>
          <span className="font-semibold">{count}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total Price</span>
          <span className="font-semibold text-green-600">₹{totalPrice}</span>
        </div>
        <div className="my-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <p className="text-gray-600 text-sm">No address provided.</p>
          <button
            onClick={() => setShowAddress(true)}
            className="mt-2 px-4 py-2 bg-[#dc583e] text-white rounded hover:bg-[#c94c32]"
          >
            Change Address
          </button>
        </div>
        <hr className="my-3" />
        <button className="w-full bg-[#dc583e] text-white py-2 rounded-lg hover:bg-[#c94c32] transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
