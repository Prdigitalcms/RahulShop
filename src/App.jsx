// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router";
import ShopContextProvider from "./pages/ShopContext";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";
import ShopCatagory from "./Components/ShopCatagory";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import ProductsPage from "./Components/ProductsPage"; // agar use kar rahe ho

const App = () => {
  return (
    <ShopContextProvider>
      {/* Navbar sab pages pe common */}
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Product detail page */}
        <Route path="/product/:productId" element={<ProductDisplay />} />

        {/* Category routes */}
        <Route
          path="/men"
          element={<ShopCatagory category="men" banner="/images/men-banner.jpg" />}
        />
        <Route
          path="/women"
          element={<ShopCatagory category="women" banner="/images/women-banner.jpg" />}
        />
        <Route
          path="/kids"
          element={<ShopCatagory category="kids" banner="/images/kids-banner.jpg" />}
        />

        {/* All products page (optional) */}
        <Route path="/products" element={<ProductsPage />} />

        {/* Auth + cart */}
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </ShopContextProvider>
  );
};

export default App;
