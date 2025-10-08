
import { useAuth, useUser } from "@clerk/clerk-react";
import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router";
import {toast} from "react-toastify"
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URI;

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOwner , setOwner]=useState(false);

  const navigate = useNavigate();
  const {getToken} = useAuth()
  const {user}=useUser()
  console.log(user)

  const getuser = async () =>{
    try {
      const {data} = await axios.get("/api/user",{headers:{Authorization :`Bearer ${ await getToken()}`}})
      console.log(data.role)
      if(data.success)
      {
        setOwner(data.role === "owner")
        setCart(data.cartData || {})
      }else
      {
        setTimeout(() => {
          getuser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
      
    }
  }

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
  useEffect(()=>{
    if(user){
      getuser()
    }
  },[user])

  return (
    <CartContext.Provider
      value={{ cart, count, addToCart, removeFromCart, getuser, clearFromCart ,user,navigate,isOwner }}
    >
      {children}
    </CartContext.Provider>
  );
};
