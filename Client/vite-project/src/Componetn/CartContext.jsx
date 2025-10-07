
import { useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const {user}=useUser()
  const [isOwner , setOwner]=useState(true);
  const [User,setUser] = useState({firstname:"Dnyanesh" , lastname:"Dahiwadkar"})
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };
  console.log(cart)

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, count, addToCart, removeFromCart, clearFromCart ,user,User,navigate,isOwner }}
    >
      {children}
    </CartContext.Provider>
  );
};
