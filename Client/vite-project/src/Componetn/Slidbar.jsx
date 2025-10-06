import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { assets } from "../assets/data";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export const Slidbar = () => {
  const { navigate, User, isOwner } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const nvaitems = [
    { path: "/owner", label: "Dashboard", icon: assets.dashboard },
    { path: "/owner/add_product", label: "Add Product", icon: assets.squarePlus },
    { path: "/owner/list_product", label: "List Product", icon: assets.list },
  ];

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner]);

  return (
    <div className="flex">
      <aside className="hidden md:flex w-64 h-screen bg-white shadow-md flex-col justify-between p-4 fixed top-0 left-0 z-40">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Link to="/">
              <img src={assets.logoImg} alt="Logo" className="size-10" />
            </Link>
            <h1 className="text-orange-600 font-bold text-xl">Food</h1>
          </div>
          <nav className="flex flex-col gap-3">
            {nvaitems.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                end={link.path === "/owner"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-orange-100 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <img src={link.icon} alt="" className="w-6 h-6" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: "46px", height: "46px" },
              },
            }}
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium">{User?.firstname}</p>
            <p className="text-xs text-gray-500">{User?.lastname}</p>
          </div>
        </div>
      </aside>

      <header className="flex-1 h-16 flex items-center justify-between px-4 fixed top-0 left-0 right-0 bg-white shadow-md md:left-64 z-30">
        <button
          className="md:hidden p-2 rounded-md border border-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
        <div className="flex items-center gap-2">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: "36px", height: "36px" },
              },
            }}
          />
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            {User?.firstname} {User?.lastname}
          </span>
        </div>
      </header>

      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white shadow-md flex flex-col gap-3 p-4 z-20">
          {nvaitems.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              end={link.path === "/owner"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-orange-100 text-orange-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <img src={link.icon} alt="" className="w-6 h-6" />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      )}

      <main className="flex-1 md:ml-64 mt-16 p-4">
        <Outlet />
      </main>
    </div>
  );
};
