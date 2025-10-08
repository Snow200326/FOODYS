import { useAuth, useUser } from "@clerk/clerk-react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ correct import
import { toast } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URI;

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOwner, setOwner] = useState(false);

  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();

  // ✅ safer check to avoid calling API before Clerk is ready
  const getUser = async () => {
    try {
      if (!isLoaded || !isSignedIn) return;

      const token = await getToken();
      if (!token) {
        console.warn("No Clerk token found");
        return;
      }

      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User data:", data);

      if (data.success) {
        setOwner(data.role === "owner");
        setCart(data.cartData || []);
      } else {
        // if backend still syncing, try again after 5 seconds
        setTimeout(() => getUser(), 5000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error("Get user failed:", error);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    if (user && isSignedIn) {
      getUser();
    }
  }, [user, isSignedIn]); // ✅ re-run only when Clerk user is ready

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        addToCart,
        navigate,
        removeFromCart,
        getUser,
        clearFromCart,
        user,
        isOwner,
        getToken,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
