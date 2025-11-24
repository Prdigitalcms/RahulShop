// src/Components/hero/Hero.jsx
import React, { useRef } from "react";
import v from "../../assets/v.png"

function App() {
  return (
    <img src={photo} alt="Pic" />
  );
}



const Hero = () => {
  const cardRef = useRef(null);


  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const x = (e.clientX / w - 0.5) * 2;
    const y = (e.clientY / h - 0.5) * 2;

    const rotateY = -14 - x * 6;
    const rotateX = 10 - y * 4;

    card.style.transform = `translateY(-6px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
  };

  return (
    <section
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#1f2937_0%,#020617_50%,#000_100%)] text-slate-50"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-screen w-80 rounded-full bg-cyan-400/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-pink-500/40 blur-3xl" />

      <div className="relative mx-auto flex h-screen w-full max-w-6xl flex-col gap-16 px-6 py-20 md:grid md:grid-cols-[1.3fr_1fr] md:items-center">
        {/* LEFT COPY */}
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-500/50 bg-slate-900/70 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-slate-200 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            New Drop Live • 24H Express
          </div>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-[3.1rem]">
            Upgrade your look with{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-transparent">
              next-gen streetwear.
            </span>
          </h1>

          <p className="max-w-xl text-sm text-slate-200/90 sm:text-base">
            Discover hand-picked, limited-run pieces that blend premium comfort
            with futuristic design. 3D-preview every product before you buy —
            what you see is exactly what ships.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-100/90">
            <div className="inline-flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-500 text-[0.6rem]">
                ⚡
              </span>
              50% off launch collection
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-500 text-[0.6rem]">
                ✔
              </span>
              Free returns for 30 days
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_35px_rgba(56,189,248,0.45)] transition hover:scale-[1.02] hover:shadow-[0_18px_45px_rgba(56,189,248,0.65)]">
              Shop Collection <span className="text-lg">➜</span>
            </button>
            <button className="rounded-full border border-slate-500/70 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900/80">
              View 3D Lookbook
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="w-[320px] transform-gpu animate-[cardFloat_6s_ease-in-out_infinite_alternate]"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-500/40 bg-slate-900/90 px-6 py-5 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              {/* header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-500/60 bg-slate-900/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em]">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.9)] animate-pulse" />
                  Featured Sneaker
                </div>
                <div className="flex gap-1">
                  <span className="h-1 w-1 rounded-full bg-slate-400/80" />
                  <span className="h-1 w-1 rounded-full bg-slate-400/80" />
                  <span className="h-1 w-1 rounded-full bg-slate-400/80" />
                </div>
              </div>

              {/* product area */}
              <div className="relative mb-5 flex h-86 items-center justify-center overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_20%_0%,#22d3ee_0%,transparent_55%),radial-gradient(circle_at_80%_100%,#a855f7_0%,transparent_55%),#020617] shadow-inner">
                {/* 3D shoe image */}
                <img


                  src= {v} // public/sneaker.png
                  alt="NovaPulse Runner"
                  className="relative z-10 h-40 w-auto drop-shadow-[0_35px_45px_rgba(0,0,0,0.65)]"
                />

                {/* shadow ellipse */}
                <div className="absolute bottom-6 h-8 w-3/4 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.95),transparent_70%)] blur-sm" />

                {/* floating tags */}
                <div className="absolute left-[-10%] top-6 flex items-center gap-2 rounded-full border border-slate-500/40 bg-slate-900/80 px-3 py-1 text-[0.7rem] backdrop-blur-md animate-[floatTag_6s_ease-in-out_infinite_alternate]">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  3D View Enabled
                </div>

                <div className="absolute bottom-3 right-[-6%] flex items-center gap-2 rounded-full border border-slate-500/40 bg-slate-900/80 px-3 py-1 text-[0.7rem] backdrop-blur-md animate-[floatTag_6s_ease-in-out_infinite_alternate] [animation-delay:1.5s]">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  Live Stock: 12
                </div>

                {/* label */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-slate-500/60 bg-slate-900/90 px-4 py-1 text-[0.7rem] uppercase tracking-[0.16em]">
                </div>
              </div>

              {/* footer */}
              <div className="flex items-end justify-between gap-4 text-xs">
                <div>
                  <div className="text-[0.7rem] uppercase tracking-[0.16em] text-indigo-200">
                    Launch price
                  </div>
                  <div className="text-xl font-semibold">
                    $149{" "}
                    <span className="align-top text-[0.75rem] text-slate-400">
                      USD
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <div className="flex items-center justify-end gap-1 text-amber-300">
                    ★★★★★{" "}
                    <span className="text-[0.7rem] text-slate-100">4.9</span>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex -space-x-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-900 bg-gradient-to-br from-cyan-400 to-violet-500 text-[0.65rem]">
                        A
                      </div>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-900 bg-gradient-to-br from-fuchsia-400 to-orange-500 text-[0.65rem]">
                        K
                      </div>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-900 bg-gradient-to-br from-sky-400 to-emerald-400 text-[0.65rem]">
                        M
                      </div>
                      <div className="flex h-6 w-8 items-center justify-center rounded-full border border-slate-900 bg-slate-800 text-[0.65rem]">
                        +9k
                      </div>
                    </div>
                  </div>
                  <div className="text-[0.7rem] text-slate-200/80">
                    Loved by 10,000+ shoppers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
