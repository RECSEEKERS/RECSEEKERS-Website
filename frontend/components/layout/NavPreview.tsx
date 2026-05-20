"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { NavPreviewItem } from "./navItems";

interface NavPreviewProps {
  items: NavPreviewItem[];
  hoveredIndex: number | null;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function NavPreview({
  items,
  hoveredIndex,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: NavPreviewProps) {
  return (
    <AnimatePresence>
      {isOpen && hoveredIndex !== null && (
        <motion.div
          key="nav-preview"
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 8, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="
            absolute left-1/2 -translate-x-1/2 top-full mt-2 w-96
            rounded-2xl bg-white/95 border border-neutral-200 shadow-2xl
            overflow-hidden
          "
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <motion.div
            key={items[hoveredIndex].label}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-[9.5rem_1fr] items-stretch"
          >
            {/* Image */}
            <div className="h-full min-h-34 shrink-0 overflow-hidden">
              <img
                src={items[hoveredIndex].previewImage}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>

            {/* Text */}
            <div className="p-5 pl-4">
              <p className="text-base font-semibold text-neutral-900 leading-snug">
                {items[hoveredIndex].previewTitle}
              </p>
              <p className="text-sm text-neutral-600 mt-1 leading-snug">
                {items[hoveredIndex].previewText}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
