import React from "react";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to real backend / service
    alert("Subscribed! (demo)");
  };

  return (
    <section className="py-16 px-6 bg-[radial-gradient(circle_at_top,#1f2937_0%,#020617_50%,#000_100%)] text-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-8 md:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl text-center">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Get{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
              Exclusive Offers
            </span>{" "}
            In Your Inbox
          </h1>
          <p className="text-sm md:text-base text-slate-300 mb-8">
            Subscribe to stay updated with fresh drops, secret discounts, and early access to new collections.
          </p>

          {/* Input & Button */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="w-full sm:w-2/3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full border border-slate-600 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder:text-slate-500"
                required
              />
              <p className="mt-2 text-[0.7rem] text-slate-400 text-left">
                No spam. Only curated deals and updates.
              </p>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 px-8 py-3 text-sm font-semibold text-slate-900 shadow-[0_18px_45px_rgba(56,189,248,0.65)] transition hover:scale-[1.03]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
