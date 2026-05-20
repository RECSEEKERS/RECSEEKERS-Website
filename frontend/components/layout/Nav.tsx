"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { NavPreview } from "./NavPreview";
import { useHeroStage } from "@/context/HeroStageContext";
import { CONTACT_ITEM, PILL_ITEMS } from "./navItems";
import { cooper } from "@/lib/fonts";

export function Nav() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInside, setIsInside] = useState(false);

  const { isHeroStage1 } = useHeroStage();

  const isPreviewOpen = hoveredIndex !== null && isInside;
  // Hide logo only when on the home page AND the hero is still on Stage 1
  const showLogo = pathname !== "/" || !isHeroStage1;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block">
      <div className="relative flex items-center bg-primary/90 backdrop-blur-3xl hover:bg-primary hover:py-4 hover:shadow-xl shadow-lg border-b border-neutral-50/20 px-6 py-2 rounded-b-lg transition-all duration-300">
        {/* Logo */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              className="absolute left-10 top-2"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <Link href="/" className="flex flex-col items-center">
                <img src="/rec-logo.svg" alt="RECSEEKERS" className="h-8 w-auto" />
                <p className={`${cooper.className} italic mt-0.5 text-center text-[11px] font-bold leading-none tracking-[0.04em] text-black`}>
                  HAVE A NICE DAY!
                </p>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pill + preview — flex-1 so it fills the middle */}
        <div
          className="relative flex-1"
          onMouseEnter={() => setIsInside(true)}
          onMouseLeave={() => {
            setIsInside(false);
            setTimeout(() => setHoveredIndex(null), 120);
          }}
        >
          <div className="flex justify-center gap-3 px-2 py-1">
            {PILL_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <Button variant="text" size="md">
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
          <NavPreview
            items={PILL_ITEMS}
            hoveredIndex={hoveredIndex}
            isOpen={isPreviewOpen}
            onMouseEnter={() => setIsInside(true)}
            onMouseLeave={() => setIsInside(false)}
          />
        </div>

        {/* Contact button */}
        <div className="absolute right-10">
          <Link href={CONTACT_ITEM.href}>
            <Button variant="primary" size="md">
              {CONTACT_ITEM.label}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
