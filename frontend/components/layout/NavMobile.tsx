"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useHeroStage } from "@/context/HeroStageContext";
import { CONTACT_ITEM, PILL_ITEMS } from "./navItems";

const MENU_ITEMS = [...PILL_ITEMS, CONTACT_ITEM] as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { y: "-100%", opacity: 0.8 },
  visible: { y: 0, opacity: 1 },
  exit: { y: "-100%", opacity: 0.8 },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 18 },
};

export function NavMobile() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isHeroStage1 } = useHeroStage();

  const showLogo = pathname !== "/" || !isHeroStage1;

  const getPreviewTitle = (href: string) => {
    if (href === CONTACT_ITEM.href) return "Talk to RECSEEKERS";
    return PILL_ITEMS.find((item) => item.href === href)?.previewTitle ?? "RECSEEKERS";
  };

  const getPreviewText = (href: string) => {
    if (href === CONTACT_ITEM.href) {
      return "Start a confidential conversation about your next hire or your next role.";
    }
    return PILL_ITEMS.find((item) => item.href === href)?.previewText ?? "Explore this page.";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between bg-primary/90 backdrop-blur-3xl shadow-lg border-b border-neutral-50/20 px-4 py-3 rounded-b-lg">
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
              >
                <Link href="/" aria-label="RECSEEKERS home">
                  <img src="/rec-logo.svg" alt="RECSEEKERS" className="h-8 w-auto" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-50/30 bg-white/20 text-primary-dark"
            aria-label={`Open navigation menu (${PILL_ITEMS.length} primary links)`}
            aria-expanded={isOpen}
            aria-controls="mobile-menu-overlay"
            onClick={() => setIsOpen(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-overlay"
            className="fixed inset-0 z-70 bg-black/35 overflow-x-hidden md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <motion.div
              className="h-full w-full bg-[#fff8f1]"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
            >
              <div
                className="relative mx-auto flex h-full w-full max-w-md flex-col px-6 py-6"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute right-7 top-4 inline-flex h-8 w-8 items-center justify-center text-black hover:text-pink-500 transition-colors"
                  aria-label="Close mobile navigation"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <motion.div
                  className="mt-8 flex flex-col gap-y-4"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {MENU_ITEMS.map((item) => {
                    const isActive = item.href === pathname;
                    const isContact = item.href === CONTACT_ITEM.href;
                    const previewTitle = getPreviewTitle(item.href);
                    const previewText = getPreviewText(item.href);

                    return (
                      <motion.div key={item.href} variants={itemVariants} transition={{ duration: 0.24, ease: "easeOut" }}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-label={previewText}
                          className={`block rounded-3xl border-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                            isContact
                              ? "border-black bg-[#1f0c1a] text-white p-4 shadow-[8px_8px_0px_0px_#FF69B4] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#FF69B4]"
                              : isActive
                                ? "border-black bg-[#ffeaf5] p-4 translate-x-1 translate-y-1 shadow-[2px_2px_0px_0px_black]"
                                : "border-black bg-white p-4 shadow-[6px_6px_0px_0px_black] hover:translate-x-px hover:translate-y-px hover:shadow-[7px_7px_0px_0px_#FF69B4]"
                          }`}
                        >
                          <div className="flex flex-col gap-1">
                            <p className={`text-[12px] font-bold uppercase tracking-[0.08em] ${isContact ? "text-pink-200" : "text-black"}`}>
                              {item.label}
                            </p>
                            <p
                              className={`text-[16px] leading-tight font-heading ${
                                isContact ? "text-white" : isActive ? "text-pink-700" : "text-black"
                              }`}
                            >
                              {previewTitle}
                            </p>
                            <p className={`line-clamp-2 text-[13px] leading-snug ${isContact ? "text-white/85" : "text-black/80"}`}>
                              {previewText}
                            </p>
                            {isContact && (
                              <p className="pt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-pink-200">
                                Fast reply | Confidential chat
                              </p>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>

                <motion.div
                  className="mt-auto flex flex-col items-center pt-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                >
                  <Link href="/" onClick={() => setIsOpen(false)} aria-label="RECSEEKERS home">
                    <img src="/rec-logo.svg" alt="RECSEEKERS" className="h-8 w-auto" />
                  </Link>
                  <p className="mt-1 text-xs font-medium text-black/70">Have a nice day</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavMobile;
