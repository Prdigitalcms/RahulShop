// src/components/ShopCatagory.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../pages/ShopContext";
import ProductCard from "./ProductCard"; // reuse the ProductCard we made earlier

const API_CATEGORY_MAP = {
  // map your route/category -> possible API values
  men: ["men", "men's clothing", "mens", "male"],
  women: ["women", "women's clothing", "womens", "female"],
  kids: ["kids", "children", "kids clothing", "child"],
};

const normalize = (s = "") => s.toString().toLowerCase().trim();

const ShopCatagory = ({ category = "women", banner }) => {
  const { products, fetchProducts } = useContext(ShopContext);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    // ensure we have fresh products on mount (and when category changes)
    // fetchProducts should be defined in context; if not, remove this line and ensure context fetches once.
    if (fetchProducts) {
      setLocalLoading(true);
      fetchProducts()
        .catch((e) => console.error("fetchProducts failed:", e))
        .finally(() => setLocalLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]); // refetch when category prop changes

  // compute allowed API category strings for this route
  const allowedApiCategories = useMemo(() => {
    const c = category.toString().toLowerCase();
    return API_CATEGORY_MAP[c] || [c];
  }, [category]);

  // filter products by checking product.category (safely)
  const filtered = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((p) => {
      const pc = normalize(p.category ?? p.type ?? p.gender ?? "");
      // match any possible api-category strings (normalized)
      return allowedApiCategories.some((a) => pc.includes(normalize(a)));
    });
  }, [products, allowedApiCategories]);

  // debug logs — remove when working
  useEffect(() => {
    console.log("ShopCatagory mount:", { category, allowedApiCategories, fetchedCount: products.length, filteredCount: filtered.length });
  }, [category, allowedApiCategories, products.length, filtered.length]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* {banner && <img src={banner} alt={`${category} banner`} className="w-full rounded-md mb-6 object-cover h-48" />} */}

      <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>

      {localLoading ? (
        <p>Loading products...</p>
      ) : filtered.length === 0 ? (
        <p>No products found for <strong>{category}</strong>. Try checking the console for raw product categories.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id ?? p._id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ShopCatagory;
