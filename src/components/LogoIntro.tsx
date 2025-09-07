"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export default function LogoIntro() {
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const [start, setStart] = useState(false);
  const [done, setDone] = useState(false);
  const [viewport, setViewport] = useState<{ w: number; h: number } | null>(null);

  // Measure the header logo anchor after mount
  useEffect(() => {
    const el = document.getElementById("logo-anchor");
    if (el) setAnchor(el.getBoundingClientRect());
    // Small delay to ensure layout settled
    const resize = () => {
      const n = document.getElementById("logo-anchor");
      if (n) setAnchor(n.getBoundingClientRect());
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", resize);
    // set viewport once
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Hold for 1s, then start the fly animation
  useEffect(() => {
    const t = setTimeout(() => setStart(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // When animation completes, reveal header logo and unmount
  const onComplete = () => {
    window.dispatchEvent(new CustomEvent("yurt:intro:done"));
    setTimeout(() => setDone(true), 50);
  };

  const initialSize = 220; // px
  const targetSize = anchor?.width ?? 160;

  const initial = useMemo(() => {
    const w = viewport?.w ?? 0;
    const h = viewport?.h ?? 0;
    const cx = Math.max(0, w / 2 - initialSize / 2);
    const cy = Math.max(0, h / 2 - initialSize / 2);
    return { x: cx, y: cy, scale: 1 };
  }, [viewport]);

  const animate = useMemo(() => {
    if (!anchor) return initial;
    const x = anchor.left;
    const y = anchor.top;
    const scale = (targetSize || 168) / initialSize;
    return { x, y, scale };
  }, [anchor, initial, targetSize]);

  if (done || !anchor || !viewport) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {/* Centered large logo that flies to header */}
      <motion.div
        initial={initial}
        animate={start ? animate : initial}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={onComplete}
        style={{ position: "fixed", transformOrigin: "top left" }}
      >
        <Image src="/logo.png" alt="Batukaru Yurt" width={initialSize} height={initialSize} priority />
      </motion.div>
    </div>
  );
}


