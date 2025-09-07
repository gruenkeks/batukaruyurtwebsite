"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";
import NewsletterForm from "./NewsletterForm";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - left - width / 2;
    const posY = e.clientY - top - height / 2;
    x.set(Math.max(-50, Math.min(50, posX / (width / 2) * 50)));
    y.set(Math.max(-50, Math.min(50, posY / (height / 2) * 50)));
  }, [x, y]);

  const scrollContainer = () => document.querySelector<HTMLDivElement>(".snap-container");
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const animateScroll = (deltaX: number, duration = 550) => {
    const el = scrollContainer();
    if (!el) return;
    const start = el.scrollLeft;
    const target = start + deltaX;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      el.scrollLeft = start + (target - start) * eased;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const handleNext = () => animateScroll(window.innerWidth);
  const handlePrev = () => animateScroll(-window.innerWidth);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#0b0b0b] text-white snap-section"
      onMouseMove={handleMouseMove}
    >
      {/* Header moved to fixed global component */}

      {/* Hero media with subtle parallax/tilt */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative h-[70vh] w-[70vw] max-w-[1100px] max-h-[650px]"
        >
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
            alt="Organic grayscale form"
            fill
            priority
            className="object-cover object-center rounded-[12px] opacity-90 [filter:grayscale(100%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Right copy block (hidden on small screens to keep layout minimal) */}
      <div className="absolute right-14 top-1/2 z-20 hidden max-w-[360px] -translate-y-1/2 text-right md:block">
        <p className="text-sm leading-6 text-white/80">
          We craft a serene, eco-conscious retreat on the slopes of Mount Batukaru—
          the one and <em>only</em> yurt in Bali. An investor-first concept focused on
          authentic wellness, simplicity, and timeless design.
        </p>
      </div>

      {/* Local arrows removed (global arrows handle navigation) */}

      {/* Big headline */}
      <div className="absolute left-10 bottom-24 z-20">
        <h1 className="text-[9.5vw] leading-none font-medium tracking-[0.01em] md:text-[120px]">
          THE BATUKARU YURT
        </h1>
      </div>

      {/* Gradient bar */}
      <div className="absolute inset-x-10 bottom-12 z-20">
        <div className="h-[14px] rounded-sm bg-gradient-to-r from-teal-400 via-amber-300 to-orange-500" />
      </div>

      {/* Newsletter bottom-right */}
      <div className="absolute bottom-6 right-6 z-30 w-[320px] max-w-[80vw]">
        <NewsletterForm compact showText />
      </div>
    </section>
  );
}


