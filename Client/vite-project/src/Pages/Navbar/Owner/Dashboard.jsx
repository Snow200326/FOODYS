import React from "react";
import { dummyOrdersData } from "../../../assets/data";

export const Dashboard = () => {
  return (
    <div className="flex flex-col items-center mt-20 px-4">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8">Orders Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl">
            <h4 className="text-2xl font-semibold">{dummyOrdersData.length}</h4>
            <p className="text-gray-500 mt-2">Total Orders</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-xl">
            <h4 className="text-2xl font-semibold">
              ${dummyOrdersData.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}
            </h4>
            <p className="text-gray-500 mt-2">Total Revenue</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyOrdersData.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 hover:shadow-2xl transition-shadow"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-600">
                  Order ID: {order._id.slice(0, 8)}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status === "Delivered" ? "Delivered" : "Pending"}
                </span>
              </div>

              <div>
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-xs text-gray-500">{order.address.email}</p>
                <p className="text-xs text-gray-500">{order.address.phone}</p>
              </div>

              <div className="text-sm text-gray-600">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state} -{" "}
                  {order.address.zipcode}, {order.address.country}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-2">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col items-center border rounded-lg p-2 bg-gray-50 max-w-[140px] hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md mb-1"
                    />
                    <p className="font-medium text-xs truncate">{item.product.name}</p>
                    <p className="text-xs">
                      {item.quantity} x {item.size}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="font-semibold">${order.amount.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{order.paymentMethod}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
