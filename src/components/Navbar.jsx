// src/components/Navbar.jsx
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router"; // <-- IMPORTANT: react-router-dom
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ShopContext } from "../pages/ShopContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Men", path: "/men" },
  { name: "Women", path: "/women" },
  { name: "Products", path: "/products" },
  // { name: "Kids", path: "/kids" }, // add if you want kids link
];

const Navbar = () => {
  const { cartCount, fetchProducts } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCategoryClick = async (path) => {
    if (fetchProducts) {
      try {
        await fetchProducts();
      } catch (e) {
        console.warn("fetchProducts failed on nav click:", e);
      }
    }
    navigate(path);
  };

 return (
  <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      {/* LEFT: LOGO + BRAND */}
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_top,#22d3ee_0%,#0f172a_60%)] shadow-[0_12px_30px_rgba(15,23,42,0.8)]">
          <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain" />
        </div>
        <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-xl font-bold text-transparent">
          Rahul's Store
        </span>
      </div>

      {/* CENTER: NAV LINKS (DESKTOP) */}
      <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
        {navItems.map((item) => (
          <li key={item.path} className="relative">
            {["/men", "/women", "/products"].includes(item.path) ? (
              <button
                onClick={() => handleCategoryClick(item.path)}
                className="rounded-full px-3 py-1 text-slate-200 transition hover:text-cyan-300"
                style={{ background: "none", border: "none" }}
              >
                {item.name}
              </button>
            ) : (
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "relative rounded-full px-3 py-1 text-sm transition",
                    isActive
                      ? "bg-slate-900/80 text-cyan-300 shadow-[0_6px_18px_rgba(8,47,73,0.6)]"
                      : "text-slate-200 hover:text-cyan-300"
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <span className="relative inline-flex items-center">
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400" />
                    )}
                  </span>
                )}
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* RIGHT: LOGIN + CART */}
      <div className="flex items-center space-x-4">
        <NavLink
          to="/login"
          className="hidden rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 px-5 py-2 text-sm font-semibold text-slate-900 shadow-[0_10px_28px_rgba(56,189,248,0.45)] transition hover:scale-[1.02] md:inline-flex"
        >
          Login
        </NavLink>

        <div className="relative">
          <NavLink to="/cart" title="Cart">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-100 shadow-[0_10px_28px_rgba(15,23,42,0.85)] transition hover:bg-slate-800">
              <ShoppingCartIcon className="h-5 w-5" />
            </div>
          </NavLink>
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[0.65rem] font-semibold text-white shadow-md">
            {cartCount ?? 0}
          </span>
        </div>
      </div>
    </div>
  </nav>
);

};

export default Navbar;
