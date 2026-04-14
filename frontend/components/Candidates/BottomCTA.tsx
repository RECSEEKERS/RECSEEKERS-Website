"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cooper } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";

type CTAVariant = "tertiary" | "dark" | "pink";

interface BottomCTAProps {
  variant?: CTAVariant;
  eyebrowText?: string;
  headingText?: string;
  buttonText?: string;
  href?: string;
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

export function BottomCTA({
  variant = "tertiary",
  eyebrowText = "Ready to build your team?",
  headingText = "Let&apos;s find your next great recruiter.",
  buttonText = "Get in Touch",
  href = "/contact",
}: BottomCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const cfg = variantConfig[variant];

  return (
    <section className={`${cfg.sectionBg} px-8`}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 48 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className={`${cfg.bannerBg} rounded-3xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-black/10 shadow-lg`}
        >
          {/* Left: Text */}
          <div className="flex flex-col gap-2">
            <p className={`text-xs font-semibold tracking-widest uppercase ${cfg.eyebrow}`}>
              {eyebrowText}
            </p>
            <h3 className={`text-2xl lg:text-3xl leading-tight ${cfg.heading} ${cooper.className}`}>
              {headingText}
            </h3>
          </div>

          {/* Right: Button */}
          <div className="shrink-0 flex justify-center">
            <Link href={href}>
              <Button variant={cfg.buttonVariant} size="lg">
                {buttonText}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
