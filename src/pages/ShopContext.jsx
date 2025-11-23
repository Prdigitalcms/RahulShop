// src/pages/ShopContext.jsx
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const API_BASE = "https://fakestoreapi.com";
const CART_LS_KEY = "myshop_cart_v1";

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Fetch products once (keeps existing behavior)
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      setProducts(Array.isArray(res.data) ? res.data : []);
      console.log("[ShopContext] fetched products:", Array.isArray(res.data) ? res.data.length : 0);
      return res.data;
    } catch (err) {
      console.error("[ShopContext] fetchProducts error:", err);
      setProducts([]);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchProducts().catch(() => {});
  }, [fetchProducts]);

  // persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_LS_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn("[ShopContext] failed to persist cart:", e);
    }
  }, [cart]);

  // helper: compute count
  const cartCount = useMemo(() => {
    return cart.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
  }, [cart]);

  // addToCart implementation with debug logs
  const addToCart = useCallback((product, qty = 1) => {
    if (!product) {
      console.warn("[ShopContext] addToCart called with empty product");
      return;
    }

    setCart((prev) => {
      const id = product.id ?? product._id;
      const existing = prev.find((p) => String(p.id) === String(id));
      if (existing) {
        const updated = prev.map((p) =>
          String(p.id) === String(id) ? { ...p, quantity: Number(p.quantity || 0) + Number(qty) } : p
        );
        console.log("[ShopContext] addToCart - incremented qty:", id, qty, updated);
        return updated;
      } else {
        const item = {
          id,
          title: product.title ?? product.name ?? "Untitled",
          price: product.price ?? 0,
          image: product.image ?? product.thumbnail ?? (product.images && product.images[0]) ?? "/placeholder.png",
          quantity: Number(qty) || 1,
          raw: product,
        };
        const updated = [...prev, item];
        console.log("[ShopContext] addToCart - added new item:", item);
        return updated;
      }
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const updated = prev.filter((p) => String(p.id) !== String(id));
      console.log("[ShopContext] removeFromCart:", id, updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((prev) => {
      const updated = prev
        .map((p) => (String(p.id) === String(id) ? { ...p, quantity: Number(quantity) || 0 } : p))
        .filter((p) => (Number(p.quantity) || 0) > 0); // remove zero qty
      console.log("[ShopContext] updateQuantity:", id, quantity, updated);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    console.log("[ShopContext] clearCart");
  }, []);

  const value = {
    products,
    setProducts,
    fetchProducts,

    // cart API
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
