// src/components/ProductDisplay.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; // <<-- correct import
import axios from "axios";
import { ShopContext } from "../../pages/ShopContext"; // <<-- ensure this path is correct

const API_BASE = "https://fakestoreapi.com";

const Price = ({ value }) => (
  <span className="text-2xl font-bold text-gray-900">₹{value}</span>
);

const RatingPill = ({ rate, count }) => (
  <div className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-medium px-2 py-1 rounded">
    <span>{rate?.toFixed?.(1) ?? "-"} ★</span>
    <span className="opacity-80">({count ?? 0})</span>
  </div>
);

export default function ProductDisplay() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, fetchProducts, cartCount, addToCart } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("[ProductDisplay] mounted, productId =", productId);
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1) Try find from context array first
        if (Array.isArray(products) && products.length > 0) {
          const found = products.find((p) => String(p.id) === String(productId));
          console.log("[ProductDisplay] found in context:", found);
          if (found) {
            if (!mounted) return;
            setProduct(found);
            setMainImage(
              found.image ||
                found.thumbnail ||
                (Array.isArray(found.images) && found.images[0]) ||
                "/placeholder.png"
            );
            setLoading(false);
            return;
          }
        }

        // 2) Fallback: fetch single product
        const url = `${API_BASE}/products/${productId}`;
        console.log("[ProductDisplay] fetching from API:", url);
        const res = await axios.get(url);
        console.log("[ProductDisplay] API response:", res.data);
        if (!mounted) return;
        setProduct(res.data);
        setMainImage(
          res.data.image ||
            res.data.thumbnail ||
            (Array.isArray(res.data.images) && res.data.images[0]) ||
            "/placeholder.png"
        );
      } catch (err) {
        console.error("[ProductDisplay] fetch error:", err);
        setError("Failed to load product.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [productId, products, fetchProducts]);

  // DEBUG / SAFE add to cart
  const handleAddToCart = () => {
    console.log("[ProductDisplay] handleAddToCart called. addToCart:", typeof addToCart);
    if (typeof addToCart === "function" && product) {
      addToCart(product, 1);
      console.log("[ProductDisplay] called addToCart for product id:", product.id);
    } else {
      console.warn("[ProductDisplay] addToCart not available or product missing");
    }

    // debug: show localStorage content right after add
    try {
      console.log("localStorage cart:", localStorage.getItem("myshop_cart_v1"));
    } catch (e) {
      console.warn("Unable to read localStorage:", e);
    }

    // Optional UX
    // you can replace alert with a toast
    alert("Added to cart");
  };

  const handleBuyNow = () => {
    if (typeof addToCart === "function" && product) addToCart(product, 1);
    // debug localStorage as well
    try {
      console.log("localStorage cart (buy now):", localStorage.getItem("myshop_cart_v1"));
    } catch (e) {
      console.warn("Unable to read localStorage:", e);
    }
    navigate("/cart");
  };

  if (loading) return <div className="p-8 text-center">Loading product...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-8 text-center">Product not found.</div>;

  const title = product.title ?? product.name ?? "Untitled Product";
  const price = product.price ?? 0;
  const description = product.description ?? product.desc ?? "";
  const images = [
    product.image,
    product.thumbnail,
    ...(Array.isArray(product.images) ? product.images : []),
  ].filter(Boolean);

  const rating = product.rating ?? product.ratings ?? product?.rate ?? null;
  const ratingCount = product?.rating?.count ?? product?.ratingsCount ?? product?.count ?? null;

return (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1f2937_0%,#020617_50%,#000_100%)] text-slate-50 py-10">
    <div className="max-w-6xl mx-auto px-6">
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-6 md:p-8 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT: Images */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="w-full rounded-2xl p-6 flex items-center justify-center bg-[radial-gradient(circle_at_20%_0%,#22d3ee_0%,transparent_60%),radial-gradient(circle_at_80%_100%,#a855f7_0%,transparent_60%),#020617] shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              <img
                src={mainImage || "/placeholder.png"}
                alt={title}
                className="max-h-96 object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.75)]"
                onError={(e) => (e.currentTarget.src = "/placeholder.png")}
              />
            </div>

            <div className="mt-4 w-full flex gap-3 overflow-x-auto">
              {images.length > 0 ? (
                images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(src)}
                    className={`flex-shrink-0 rounded-xl border border-slate-700/70 bg-slate-900/70 p-1 transition hover:border-cyan-400 ${
                      mainImage === src ? "ring-2 ring-cyan-400" : ""
                    }`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${idx}`}
                      className="w-20 h-20 object-contain"
                      onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                    />
                  </button>
                ))
              ) : (
                <div className="text-slate-400 text-sm">No images</div>
              )}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="md:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold leading-snug">
                  <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
                <div className="mt-3">
                  <RatingPill rate={rating?.rate ?? rating} count={ratingCount} />
                </div>
              </div>

              <div className="text-right space-y-2">
                <div className="text-xs text-slate-400">
                  Seller:{" "}
                  <span className="font-medium text-slate-100">
                    Default Seller
                  </span>
                </div>
                <div>
                  <Price value={price} />
                  <div className="text-xs text-slate-400 line-through opacity-70">
                    ₹{(price * 1.2).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={handleBuyNow}
                className="rounded-full bg-gradient-to-r from-orange-400 to-rose-500 px-6 py-2 text-sm font-semibold text-slate-900 shadow-[0_14px_35px_rgba(248,113,113,0.55)] transition hover:scale-[1.02]"
              >
                Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 px-6 py-2 text-sm font-semibold text-slate-900 shadow-[0_14px_35px_rgba(56,189,248,0.65)] transition hover:scale-[1.02]"
              >
                Add to Cart
                <span className="ml-3 rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-cyan-300">
                  {cartCount ?? 0}
                </span>
              </button>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-slate-100">
                Product Description
              </h3>
              <p className="text-sm md:text-base text-slate-200/90 leading-relaxed bg-slate-900/50 border border-slate-700/70 rounded-2xl px-4 py-3">
                {description}
              </p>
            </div>

            {/* Highlights + Details */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-900/60 border border-slate-700/70 p-4">
                <h4 className="font-semibold text-slate-100 mb-1">Highlights</h4>
                <ul className="list-disc list-inside text-sm text-slate-200/90 space-y-1">
                  <li>High quality product</li>
                  <li>Free delivery (demo)</li>
                  <li>7 days return policy</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-900/60 border border-slate-700/70 p-4">
                <h4 className="font-semibold text-slate-100 mb-2">Details</h4>
                <table className="text-xs md:text-sm text-slate-200/90">
                  <tbody>
                    <tr>
                      <td className="pr-4 py-1 font-medium text-slate-400">
                        Category
                      </td>
                      <td>{product.category ?? "—"}</td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-1 font-medium text-slate-400">
                        Brand
                      </td>
                      <td>{product.brand ?? "Generic"}</td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-1 font-medium text-slate-400">
                        Stock
                      </td>
                      <td>{product.stock ?? "In stock"}</td>
                    </tr>
                    <tr>
                      <td className="pr-4 py-1 font-medium text-slate-400">
                        SKU
                      </td>
                      <td>{product.id ?? "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <h4 className="text-base md:text-lg font-semibold mb-3 text-slate-100">
                Customer Reviews
              </h4>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-slate-100">Aman</div>
                    <div className="text-sm text-amber-300">5 ★</div>
                  </div>
                  <p className="text-sm text-slate-200 mt-2">
                    Great product, fast delivery!
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-slate-100">Sakshi</div>
                    <div className="text-sm text-amber-300">4 ★</div>
                  </div>
                  <p className="text-sm text-slate-200 mt-2">
                    Value for money.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
);

}
