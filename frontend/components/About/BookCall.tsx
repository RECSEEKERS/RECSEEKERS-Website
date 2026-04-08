"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cooper } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";
import { DoodleFloat } from "../ui/DoodleFloat";

type CTAVariant = "tertiary" | "dark" | "pink";

interface BottomCTAProps {
  variant?: CTAVariant;
}

const variantConfig: Record<CTAVariant, {
  sectionBg: string;
  bannerBg: string;
  eyebrow: string;
  heading: string;
  buttonVariant: "secondary" | "primary" | "text";
}> = {
  tertiary: {
    sectionBg: "bg-white",
    bannerBg: "bg-tertiary",
    eyebrow: "text-white/60",
    heading: "text-white",
    buttonVariant: "secondary",
  },
  dark: {
    sectionBg: "bg-white",
    bannerBg: "bg-primary-dark",
    eyebrow: "text-white/50",
    heading: "text-white",
    buttonVariant: "primary",
  },
  pink: {
    sectionBg: "bg-white",
    bannerBg: "bg-primary",
    eyebrow: "text-black/50",
    heading: "text-black",
    buttonVariant: "primary",
  },
};

export function BookCall({ variant = "tertiary" }: BottomCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const cfg = variantConfig[variant];

  return (
    <section className={`${cfg.sectionBg} px-8 pb-12`}>
      <div className="max-w-4xl mx-auto w-full">
      {/* <h2 className={`${cooper.className} block md:hidden text-4xl md:text-7xl text-black mb-6`}>
            Like what you see?
          </h2>
      <h2 className={`${cooper.className} hidden md:block text-6xl md:text-7xl text-black mb-6`}>
            Like what you see?
          </h2> */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className={`${cfg.bannerBg} rounded-3xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-black/10 shadow-lg`}
        >
          {/* Left: Text */}
          <div className="flex flex-col gap-2">
            {/* <p className={`text-xs font-semibold tracking-widest uppercase ${cfg.eyebrow}`}>
              Ready to build your team?
            </p> */}
            <h3 className={`text-1xl lg:text-2xl leading-tight ${cfg.heading} ${cooper.className}`}>
              Are you an established education recruiter looking to take your career up a level? 
            </h3>
          </div>
          {/* Right: Button */}
          <div className="shrink-0 flex justify-center">
            <Link href="/book-call">
              <Button variant={cfg.buttonVariant} size="lg">
                Book a call with Sam
              </Button>
            </Link>
          </div>
          
        </motion.div>
      </div>
    </section>
    
  );
}
