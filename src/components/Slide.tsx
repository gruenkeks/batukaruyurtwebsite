"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type SlideProps = PropsWithChildren<{
  dark?: boolean;
  className?: string;
  id?: string;
}>;

export default function Slide({ children, dark = true, className, id }: SlideProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative min-h-screen w-full overflow-hidden snap-section",
        dark ? "bg-[#0b0b0b] text-white" : "bg-white text-black",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </section>
  );
}


