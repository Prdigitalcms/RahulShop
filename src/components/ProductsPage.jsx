// src/components/ProductsPage.jsx
import React, { useContext, useEffect } from "react";
import { ShopContext } from "../pages/ShopContext";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const { products, fetchProducts } = useContext(ShopContext);

  useEffect(() => {
    if (fetchProducts) fetchProducts(); // refresh when page mounts
  }, [fetchProducts]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <p>Loading / No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
