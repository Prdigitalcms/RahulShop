// src/components/Cart.jsx
import React, { useContext } from "react";
import { ShopContext } from "../pages/ShopContext";
import { Link } from "react-router";

const Cart = () => {
  const { cart, cartCount, removeFromCart, updateQuantity, clearCart } = useContext(ShopContext);

  const total = cart.reduce((s, it) => s + (Number(it.price || 0) * (Number(it.quantity) || 0)), 0);

  if (!cart || cart.length === 0) {
if (cart.length === 0) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1f2937_0%,#020617_50%,#000_100%)] text-slate-50 flex items-center justify-center py-10">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/80 p-6 md:p-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
            Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
              Cart
            </span>
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-1">
            Your cart is currently empty.
          </p>

          <Link
            to="/products"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 px-6 py-2 text-sm font-semibold text-slate-900 shadow-[0_14px_35px_rgba(56,189,248,0.65)] transition hover:scale-[1.03]"
          >
            Browse products
          </Link>
        </div>
      </div>
    </div>
  );}
}


  return (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1f2937_0%,#020617_50%,#000_100%)] text-slate-50 py-10">
    <div className="max-w-4xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold">
          Your{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
            Cart
          </span>
        </h2>
        <span className="rounded-full border border-slate-600 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200">
          {cartCount} item{cartCount === 1 ? "" : "s"}
        </span>
      </div>

      {/* Empty state */}
      {cart.length === 0 && (
        <div className="rounded-2xl border border-slate-600 bg-slate-900/80 px-3 py-1 text-sm text-slate-100 outline-none focus:border-cyan-400">
          Your cart is empty. Start adding some products!
        </div>
      )}

      {/* Cart items */}
      {cart.length > 0 && (
        <>
          <div className="space-y-4">
            {cart.map((it) => (
              <div
                key={it.id}
                className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.7)]"
              >
                {/* Image */}
                <div className="h-24 w-24 flex items-center justify-center rounded-xl bg-[radial-gradient(circle_at_20%_0%,#22d3ee_0%,transparent_60%),radial-gradient(circle_at_80%_100%,#a855f7_0%,transparent_60%),#020617]">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="h-20 w-20 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.7)]"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <div className="font-semibold text-slate-100 line-clamp-2">
                        {it.title}
                      </div>
                      <div className="text-sm text-cyan-300 mt-1">
                        ₹{it.price}
                      </div>
                    </div>

                    <div className="text-right text-sm text-slate-300">
                      <div className="font-semibold text-slate-100">
                        Subtotal:
                      </div>
                      <div className="text-cyan-300 font-bold">
                        ₹{(it.price * it.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Qty + Remove */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <span>Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) =>
                          updateQuantity(it.id, Number(e.target.value))
                        }
                        className="w-20 rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1 text-sm text-slate-100 outline-none focus:border-cyan-400"
                      />
                    </div>

                    <button
                      onClick={() => removeFromCart(it.id)}
                      className="text-xs font-medium text-red-400 hover:text-red-300 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer / Total */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => clearCart()}
              className="text-sm font-medium text-red-400 hover:text-red-300 hover:underline"
            >
              Clear cart
            </button>

            <div className="text-right">
              <div className="text-sm text-slate-300">Total payable</div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                ₹{total.toFixed(2)}
              </div>
              <button className="mt-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 px-6 py-2 text-sm font-semibold text-slate-900 shadow-[0_18px_45px_rgba(56,189,248,0.65)] transition hover:scale-[1.02]">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);

  
};

export default Cart;
