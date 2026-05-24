"use client";

import { useEffect, useRef, useState } from "react";

type FitPanel = {
  title: string;
  body: string;
  activeBg: string;
  icon: (active: boolean) => React.ReactNode;
};

const fitPanels: FitPanel[] = [
  {
    title: "Proven performance",
    body: "You care about standards, consistency, and doing great work in education recruitment.",
    activeBg: "bg-[#da8da0]",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className={`size-10 transition-colors duration-300 ${active ? "text-white" : "text-primary-dark"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m6 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Growth mindset",
    body: "You are looking for a clear upgrade in earnings, progression, or leadership opportunity.",
    activeBg: "bg-[#7c3f7a]",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className={`size-10 transition-colors duration-300 ${active ? "text-white" : "text-primary-dark"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5 9 10.5l4.5 4.5L21 7.5M14.25 7.5H21v6.75"
        />
      </svg>
    ),
  },
  {
    title: "Strategic moves",
    body: "You want confidential, honest guidance and introductions that make long-term sense.",
    activeBg: "bg-[#1e293b]",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className={`size-10 transition-colors duration-300 ${active ? "text-white" : "text-primary-dark"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14m0 0-4-4m4 4-4 4"
        />
      </svg>
    ),
  },
];

interface FitSplitCardProps {
  cooperClassName: string;
}

export function FitSplitCard({ cooperClassName }: FitSplitCardProps) {
  const [activePanel, setActivePanel] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const syncViewportState = () => {
      const mobile = mobileQuery.matches;
      setIsMobile(mobile);
      setActivePanel(mobile ? 1 : -1);
    };

    syncViewportState();
    mobileQuery.addEventListener("change", syncViewportState);

    return () => {
      mobileQuery.removeEventListener("change", syncViewportState);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isMobile) return;

    let frameId = 0;

    const updateActivePanel = () => {
      if (!containerRef.current) return;
      const viewportCenter = window.innerHeight / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;
        const rect = panel.getBoundingClientRect();
        const panelCenter = rect.top + rect.height / 2;
        const distance = Math.abs(panelCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActivePanel(closestIndex);
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        updateActivePanel();
        frameId = 0;
      });
    };

    updateActivePanel();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        {fitPanels.map((panel, index) => {
          const isActive = activePanel === index;

          return (
            <button
              key={panel.title}
              type="button"
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              data-index={index}
              onMouseEnter={() => {
                if (!isMobile) setActivePanel(index);
              }}
              onMouseLeave={() => {
                if (!isMobile) setActivePanel(-1);
              }}
              onFocus={() => {
                if (!isMobile) setActivePanel(index);
              }}
              onBlur={() => {
                if (!isMobile) setActivePanel(-1);
              }}
              onClick={() => {
                if (isMobile) setActivePanel(index);
              }}
              className={`text-left h-full p-7 md:p-8 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/35 ${
                index < fitPanels.length - 1
                  ? "border-b-4 md:border-b-0 md:border-r-4 border-black"
                  : ""
              } ${isActive ? panel.activeBg : "bg-white"}`}
              aria-pressed={isActive}
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  {panel.icon(isActive)}
                </div>

                <h3
                  className={`${cooperClassName} text-3xl leading-tight transition-colors duration-300 ${
                    isActive ? "text-white" : "text-black"
                  }`}
                >
                  {panel.title}
                </h3>

                <p
                  className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ${
                    isActive ? "text-white/90" : "text-primary-dark/80"
                  }`}
                >
                  {panel.body}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
