import React, { useEffect, useState } from "react";
import axios from "axios";

const NewCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🧭 Fetch data from FakeStore API
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products?limit=8");
        setCollections(response.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError("Failed to load collections. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

return (
  <section className="py-12 px-6 bg-[radial-gradient(circle_at_top,#1f2937_0%,#020617_50%,#000_100%)] text-slate-50">
    <div className="max-w-7xl mx-auto text-center">
      {/* Header */}
      <h1 className="text-3xl font-bold uppercase">
        New{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
          Collections
        </span>
      </h1>
      <hr className="mt-4 border-t-2 border-cyan-400 w-24 mx-auto mb-10" />

      {/* Loading State */}
      {loading && (
        <p className="text-slate-300 text-lg">
          Loading new collections...
        </p>
      )}

      {/* Error State */}
      {error && <p className="text-red-400 text-lg">{error}</p>}

      {/* Product Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
          {collections.map((item) => (
            <div
              key={item.id}
              className="group bg-slate-900/70 border border-slate-700/70 rounded-2xl p-4 text-center shadow-[0_18px_45px_rgba(0,0,0,0.7)] hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(8,47,73,0.9)] transition"
            >
              <div className="h-40 w-full flex items-center justify-center rounded-xl bg-[radial-gradient(circle_at_20%_0%,#22d3ee_0%,transparent_60%),radial-gradient(circle_at_80%_100%,#a855f7_0%,transparent_60%),#020617] mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-full object-contain drop-shadow-[0_22px_35px_rgba(0,0,0,0.7)] group-hover:scale-[1.05] transition-transform"
                />
              </div>

              <h3 className="text-slate-100 font-semibold text-sm mb-2 truncate">
                {item.title}
              </h3>

              <p className="font-bold text-sm bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

};

export default NewCollections;
