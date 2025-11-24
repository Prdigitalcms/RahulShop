import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Product = () => {
  const { productId } = useParams(); // URL se id
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "https://fakestoreapi.com"; // dummy product API (Google par sab use karte)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500 text-lg">Loading product...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500 text-lg">{error}</p>;

  if (!product)
    return <p className="text-center mt-10 text-gray-400">Product not found.</p>;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#020617_0%,#020617_40%,#000_100%)] text-slate-50">
  <div className="max-w-6xl mx-auto p-6 md:py-16">
    {/* PRODUCT DETAILS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* LEFT : IMAGE */}
      <div className="flex justify-center">
        <div className="relative w-80 h-80 rounded-3xl bg-[radial-gradient(circle_at_20%_0%,#22d3ee_0%,transparent_60%),radial-gradient(circle_at_80%_100%,#a855f7_0%,transparent_60%),#020617] shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-slate-700/60 overflow-hidden">
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl" />
          <div className="absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-2xl" />

          <img
            src={product.image}
            alt={product.title}
            className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.75)] transform hover:scale-105 transition-transform duration-300"
          />

          {/* subtle floor shadow */}
          <div className="absolute bottom-6 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.95),transparent_70%)] blur-md" />
        </div>
      </div>

      {/* RIGHT : INFO */}
      <div className="flex flex-col justify-center space-y-5">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-snug">
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
            {product.title}
          </span>
        </h1>

        <p className="text-2xl font-semibold">
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            ₹{product.price}
          </span>
        </p>

        <p className="text-sm md:text-base text-slate-200/90 leading-relaxed bg-slate-900/40 border border-slate-700/60 rounded-2xl px-4 py-3 backdrop-blur">
          {product.description}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-slate-600 bg-slate-900/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">
            Category
          </span>
          <span className="rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 px-3 py-1 text-xs font-medium text-cyan-200 border border-cyan-400/40">
            {product.category}
          </span>
        </div>

        {/* BUTTON */}
        <button
          className="mt-2 inline-flex w-52 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_18px_45px_rgba(56,189,248,0.55)] transition hover:scale-[1.02] hover:shadow-[0_22px_60px_rgba(56,189,248,0.75)]"
          onClick={() => alert("Added to cart! (demo)")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Product;
