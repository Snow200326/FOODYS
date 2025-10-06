import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Componetn/Layout.jsx";
import { Home } from "./Pages/HomePages/Home.jsx";
import { Blog } from "./Pages/Navbar/Blog.jsx";
import { Menu } from "./Pages/Navbar/Menu.jsx";
import { Contact } from "./Pages/Navbar/Contact.jsx";
import { CartAdd } from "./Componetn/CartAdd.jsx";
import { Login } from "./Pages/Profile/Login.jsx";
import { Dashboard } from "./Pages/Navbar/Owner/Dashboard.jsx";
import { AddProducts } from "./Pages/Navbar/Owner/AddProducts.jsx";
import { Slidbar } from "./Componetn/Slidbar.jsx";
import { ListProducts } from "./Pages/Navbar/Owner/ListProducts.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="menu" element={<Menu />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cartadd" element={<CartAdd />} />
        <Route path="login" element={<Login />} />

        <Route path="owner" element={<Slidbar />}>
          <Route index element={<Dashboard />} />
          <Route path="add_product" element={<AddProducts />} />
          <Route path="list_product" element={<ListProducts />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
