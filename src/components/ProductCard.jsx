// src/components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const navigate = useNavigate();

  const title = product.title ?? product.name ?? "Untitled product";
  const price = product.price ?? product.newPrice ?? 0;
  const image =
    product.image ||
    product.thumbnail ||
    (Array.isArray(product.images) && product.images[0]) ||
    "/placeholder.png";

  const handleOpen = (e) => {
    // debug log so we can see the click happened
    console.log("[ProductCard] clicked:", product?.id);
    // prevent default if inside an anchor/button
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    // navigate programmatically
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="border p-4 rounded-md flex flex-col shadow-sm hover:shadow-lg transition">
      <button
        onClick={handleOpen}
        className="block text-left p-0 bg-transparent border-0 cursor-pointer"
        style={{ padding: 0 }}
        aria-label={`Open ${title} details`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain mb-3"
          onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
        />

        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 font-medium">₹{price}</p>

        <div className="text-blue-600 mt-2 inline-block hover:underline">View</div>
      </button>
    </div>
  );
};

export default ProductCard;
