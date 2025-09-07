"use client";

import Hero from "./Hero";
import Slide from "./Slide";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Mousewheel, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

export default function Slides() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 4; // Home + Vision + Info + Invest
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === totalSlides - 1;

  useEffect(() => {
    const onSlide = (e: any) => setActiveIndex(e.detail as number);
    window.addEventListener("yurt:slide", onSlide as any);
    return () => window.removeEventListener("yurt:slide", onSlide as any);
  }, []);
  return (
    <div className="h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }} className="h-full">
      <Swiper
      modules={[Navigation, Keyboard, Mousewheel, EffectCreative]}
      effect="creative"
      creativeEffect={{ prev: { shadow: false, translate: ["-20%", 0, -1] }, next: { translate: ["100%", 0, 0] } }}
      speed={650}
      navigation={{ nextEl: ".global-next", prevEl: ".global-prev" }}
      keyboard={{ enabled: true }}
      mousewheel={{ forceToAxis: true }}
      onSwiper={(swiper) => {
        (window as any).__yurtSwiper = swiper;
        const evt = new CustomEvent("yurt:slide", { detail: swiper.activeIndex });
        window.dispatchEvent(evt);
        setActiveIndex(swiper.activeIndex);
      }}
      onSlideChange={(swiper) => {
        const evt = new CustomEvent("yurt:slide", { detail: swiper.activeIndex });
        window.dispatchEvent(evt);
        setActiveIndex(swiper.activeIndex);
      }}
      slidesPerView={1}
      className="h-full"
    >
      <SwiperSlide>
        <Hero />
      </SwiperSlide>

      {/* Vision */}
      <SwiperSlide>
        <Slide>
          <div className="relative z-10 flex min-h-screen items-center justify-between px-10">
            <div className="max-w-[760px]">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight">Vision</h2>
              <p className="mt-6 text-white/80 leading-7">
                I am creating a luxurious, eco‑friendly private retreat for wellness enthusiasts —
                as close to nature as it gets. The sanctuary centers around an 8 m yurt with a loft bed
                and skylight dome, complemented by a sauna, ice bath, yoga shala and possibly a small gym,
                plus a fireplace for slow evenings.
              </p>
            </div>
            <div className="hidden md:block">
              <Image src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop" alt="Organic grayscale form" width={520} height={360} className="rounded-lg opacity-90 [filter:grayscale(100%)]" />
            </div>
          </div>
        </Slide>
      </SwiperSlide>

      {/* Info */}
      <SwiperSlide>
        <Slide>
          <div className="relative z-10 flex min-h-screen items-center justify-between px-10">
            <div className="max-w-[760px]">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight">Info</h2>
              <ul className="mt-6 space-y-3 text-white/85 leading-7 list-disc pl-5">
                <li>Cooler mountain climate than the cities; profound tranquility at the end of the road.</li>
                <li>Pure spring water on site.</li>
                <li>Yurt placed within a lush garden: avocado, coffee, pineapple, banana, chamomile, pumpkin, jackfruit, coconuts, berries and more.</li>
                <li>Partnering with landowner Pusman — builder of 2 cabins on the land; he sources local materials and labour.</li>
                <li>Pusman receives 25% of profits for land use — aligned incentives for quality and cost.</li>
                <li>Nearby gems: “Fait Maison” boutique cafe/restaurant (5‑minute walk) and a major temple at the end of the mountain road.</li>
                <li>On clear days, distant views down to the cities — as far as Kuta.</li>
              </ul>
            </div>
          </div>
        </Slide>
      </SwiperSlide>

      {/* Invest */}
      <SwiperSlide>
        <Slide>
          <div className="relative z-10 flex min-h-screen items-center justify-between px-10">
            <div className="max-w-[760px]">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight">Invest</h2>
              <p className="mt-6 text-white/80 leading-7">
                Investors receive <strong className="text-white">100% of net profits until the initial investment is recouped</strong>.
                After payback, investors receive an ongoing profit share plus a set number of free stays per year.
              </p>
              <a href="mailto:dennis@batukaruyurt.com" className="mt-8 inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm text-white/90 hover:bg-white/10">dennis@batukaruyurt.com</a>
              <div className="mt-6 max-w-[520px]"><NewsletterForm compact showText /></div>
            </div>
          </div>
        </Slide>
      </SwiperSlide>
      </Swiper>
      </motion.div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-0 z-50 bg-black"
      />
      
      {/* Global arrows: visibility rules */}
      {/* Desktop: both on the right (except first/last constraints) */}
      <div className="pointer-events-auto fixed right-6 z-40 hidden md:flex items-center gap-3" style={{ top: "58%" }}>
        {!isFirst && (
          <button
            onClick={() => {
              const swiper = (window as any).__yurtSwiper;
              if (swiper) swiper.slidePrev();
            }}
            aria-label="Previous"
            className="h-16 w-16 rounded-full border border-white/30 text-white/95 text-2xl backdrop-blur-sm hover:bg-white/10 active:scale-[0.98]"
          >
            ←
          </button>
        )}
        {!isLast && (
          <button
            onClick={() => {
              const swiper = (window as any).__yurtSwiper;
              if (swiper) swiper.slideNext();
            }}
            aria-label="Next"
            className="h-16 w-16 rounded-full border border-white/30 text-white/95 text-2xl backdrop-blur-sm hover:bg-white/10 active:scale-[0.98]"
          >
            →
          </button>
        )}
      </div>

      {/* Mobile: split arrows left/right; show based on first/last */}
      {!isFirst && (
        <div className="pointer-events-auto fixed z-40 md:hidden" style={{ top: "58%", left: "max(env(safe-area-inset-left), 24px)" }}>
          <button
            onClick={() => {
              const swiper = (window as any).__yurtSwiper;
              if (swiper) swiper.slidePrev();
            }}
            aria-label="Previous"
            className="h-14 w-14 rounded-full border border-white/30 text-white/95 text-2xl backdrop-blur-sm hover:bg-white/10 active:scale-[0.98]"
          >
            ←
          </button>
        </div>
      )}
      {!isLast && (
        <div className="pointer-events-auto fixed right-6 z-40 md:hidden" style={{ top: "58%" }}>
          <button
            onClick={() => {
              const swiper = (window as any).__yurtSwiper;
              if (swiper) swiper.slideNext();
            }}
            aria-label="Next"
            className="h-14 w-14 rounded-full border border-white/30 text-white/95 text-2xl backdrop-blur-sm hover:bg-white/10 active:scale-[0.98]"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}


