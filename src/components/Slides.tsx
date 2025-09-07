"use client";

import Hero from "./Hero";
import Slide from "./Slide";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Mousewheel, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

export default function Slides() {
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
      }}
      onSlideChange={(swiper) => {
        const evt = new CustomEvent("yurt:slide", { detail: swiper.activeIndex });
        window.dispatchEvent(evt);
      }}
      slidesPerView={1}
      className="h-full"
    >
      <SwiperSlide>
        <Hero />
      </SwiperSlide>

      <SwiperSlide>
        <Slide>
          <div className="relative z-10 flex min-h-screen items-center justify-between px-10">
            <div className="max-w-[680px]">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight">Opportunity & Solution</h2>
              <p className="mt-6 text-white/80 max-w-[640px] leading-7">
                Bali’s mainstream tourism is saturated. Travelers want privacy, nature, and purpose.
                We’re creating a single, design-led 8m yurt on Mount Batukaru—an intimate wellness
                stay with access to sauna, ice bath, and a yoga/meditation shala—positioned for
                authenticity and long-term appreciation.
              </p>
            </div>
            <div className="hidden md:block">
              <Image src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1400&auto=format&fit=crop" alt="Misty mountain" width={520} height={360} className="rounded-lg opacity-90 [filter:grayscale(100%)]" />
            </div>
          </div>
        </Slide>
      </SwiperSlide>

      <SwiperSlide>
        <Slide>
          <div className="relative z-10 flex min-h-screen items-center justify-between px-10">
            <div className="max-w-[680px]">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight">Location: Mount Batukaru</h2>
              <p className="mt-6 text-white/80 max-w-[640px] leading-7">
                Sacred forest reserve, cool climate, and profound tranquility at the end of a
                quiet mountain road—adjacent to a major temple and immersed in an organic garden.
              </p>
            </div>
            <div className="hidden md:block">
              <Image src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop" alt="Bali landscape" width={520} height={360} className="rounded-lg opacity-90 [filter:grayscale(100%)]" />
            </div>
          </div>
        </Slide>
      </SwiperSlide>

      <SwiperSlide>
        <Slide>
          <div className="relative z-10 flex min-h-screen items-center justify-between px-10">
            <div className="max-w-[680px]">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight">Partnership & Design</h2>
              <p className="mt-6 text-white/80 max-w-[640px] leading-7">
                De-risked by a proven on-site partner: existing utilities, staff, and hospitality
                know-how. The yurt is sustainably built—bamboo structure, custom Indonesian canvas,
                and a geodesic skylight—for a minimal, timeless interior.
              </p>
            </div>
          </div>
        </Slide>
      </SwiperSlide>

      <SwiperSlide>
        <Slide>
          <div className="relative z-10 flex min-h-screen items-center justify-between px-10">
            <div className="max-w-[680px]">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight">Financials & Investment</h2>
              <p className="mt-6 text-white/80 max-w-[640px] leading-7">
                $120–$180/night target, ~70% occupancy → ~US$38k projected gross per year. Seeking
                US$25–30k to build. Structure: 100% of net profits to investor until payback, then
                10–25% perpetual share plus annual owner nights. Timeline: Month 1 funding &
                permits; Month 2 build; Month 3 interiors/landscaping; Month 4 launch.
              </p>
            </div>
          </div>
        </Slide>
      </SwiperSlide>

      <SwiperSlide>
        <Slide>
          <div className="relative z-10 flex min-h-screen items-center justify-between px-10">
            <div className="max-w-[680px]">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight">Team & Contact</h2>
              <p className="mt-6 text-white/80 max-w-[640px] leading-7">
                Led by a hands-on founder with a trusted local operator. Purpose-driven,
                detail-obsessed, and committed to sustainability. Reach out for the detailed model
                and site photos.
              </p>
              <a href="mailto:invest@batukaruyurt.com" className="mt-8 inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm text-white/90 hover:bg-white/10">invest@batukaruyurt.com</a>
            </div>
            {/* Newsletter bottom-right overlay */}
            <div className="absolute bottom-6 right-6 w-[320px] max-w-[80vw]">
              <NewsletterForm compact showText />
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
      
      {/* Global arrows — visible on all slides */}
      <div className="pointer-events-auto fixed right-6 z-40 flex items-center gap-3" style={{ top: "58%" }}>
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
      </div>
    </div>
  );
}


