// src/components/popular/Popular.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard"; // ✅ naya import (path adjust kar lena)

const Popular = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
<section className="py-12 bg-[radial-gradient(circle_at_top,#1f2937_0%,#020617_50%,#000_100%)] text-white">
  <div className="max-w-7xl mx-auto px-6">
    {/* Header */}
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold uppercase">
        Popular in{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-white">
          Women
        </span>
      </h1>
      <hr className="mt-4 border-t-2 border-cyan-400 w-24 mx-auto" />
    </div>

    {/* Loading */}
    {loading && (
      <p className="text-center text-slate-300 text-lg">
        Loading products...
      </p>
    )}

    {/* Error */}
    {error && (
      <p className="text-center text-red-400 text-lg">{error}</p>
    )}

    {/* Product Grid */}
    {!loading && !error && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-white gap-8">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    )}
  </div>
</section>

  );
};

export default Popular;
