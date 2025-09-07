"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [opacity, setOpacity] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToIndex = (index: number) => {
    const swiper: any = (window as any).__yurtSwiper;
    if (swiper && typeof swiper.slideTo === "function") {
      swiper.slideTo(index);
    }
  };

  useEffect(() => {
    const onSlide = (e: any) => setActiveIndex(e.detail);
    const onScrollOpacity = () => setOpacity(Math.min(1, window.scrollX / window.innerWidth));
    window.addEventListener("yurt:slide", onSlide as any);
    window.addEventListener("scroll", onScrollOpacity, { passive: true });
    return () => {
      window.removeEventListener("yurt:slide", onSlide as any);
      window.removeEventListener("scroll", onScrollOpacity as any);
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-8 py-6">
      <div className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-sm" style={{ opacity }} />
      <div className="pointer-events-auto flex items-center">
        <Image src="/logo.png" alt="Batukaru Yurt" width={168} height={168} />
      </div>
      <nav className="pointer-events-auto hidden md:flex gap-16 text-white/80">
        {[
          { label: "Home", i: 0 },
          { label: "Opportunity", i: 1 },
          { label: "Location", i: 2 },
          { label: "Partnership", i: 3 },
          { label: "Financials", i: 4 },
          { label: "Team", i: 5 },
        ].map((item) => {
          const isActive = item.i === activeIndex;
          return (
            <button
              key={item.label}
              onClick={() => scrollToIndex(item.i)}
              className={`cursor-pointer text-base md:text-lg relative inline-flex items-center transition-transform duration-300 ${
                isActive ? "text-orange-500" : "hover:text-white/95"
              }`}
              style={{ transform: isActive ? "scale(1.15)" : "scale(1)" }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Mobile menu toggle */}
      <div className="pointer-events-auto md:hidden">
        <button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((v) => !v)}
          className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-white/20 text-white/90 active:scale-[0.98]"
        >
          {/* Simple hamburger / close icon */}
          <span className="sr-only">Menu</span>
          {!isMenuOpen ? (
            <span className="text-2xl leading-none">☰</span>
          ) : (
            <span className="text-2xl leading-none">×</span>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="pointer-events-auto absolute right-4 top-[84px] z-50 w-[72vw] max-w-[320px] rounded-lg border border-white/15 bg-black/70 p-4 text-white/90 shadow-xl backdrop-blur-md md:hidden">
          <ul className="flex flex-col divide-y divide-white/10">
            {[
              { label: "Home", i: 0 },
              { label: "Opportunity", i: 1 },
              { label: "Location", i: 2 },
              { label: "Partnership", i: 3 },
              { label: "Financials", i: 4 },
              { label: "Team", i: 5 },
            ].map((item) => {
              const isActive = item.i === activeIndex;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      scrollToIndex(item.i);
                    }}
                    className={`w-full text-left px-2 py-3 text-base ${
                      isActive ? "text-orange-500" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Global arrows — visible on all screens */}
      <div className="pointer-events-auto fixed right-6 top-[58%] z-40 -translate-y-1/2 flex items-center gap-3">
        <ArrowButton direction="left" />
        <ArrowButton direction="right" />
      </div>
    </header>
  );
}

function ArrowButton({ direction }: { direction: "left" | "right" }) {
  const animateScroll = (deltaX: number) => {
    const swiper: any = (window as any).__yurtSwiper;
    if (!swiper) return;
    if (deltaX > 0) swiper.slideNext();
    else swiper.slidePrev();
  };

  const onClick = () => {
    const delta = direction === "right" ? window.innerWidth : -window.innerWidth;
    animateScroll(delta);
  };

  return (
    <button
      onClick={onClick}
      aria-label={direction === "right" ? "Next" : "Previous"}
      className="h-16 w-16 rounded-full border border-white/30 text-white/95 text-2xl backdrop-blur-sm hover:bg-white/10 active:scale-[0.98]"
    >
      {direction === "right" ? "→" : "←"}
    </button>
  );
}


