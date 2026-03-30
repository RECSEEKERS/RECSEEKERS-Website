"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BlobField } from "@/components/Blob/Blob";
import { useHeroStage } from "@/context/HeroStageContext";
import { cooper } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// ─── Adjust these to control blob appearance in each stage ───────────────────
const BLOB_SIZE_STAGE1  = "24vmax";   // blob size on the logo/tagline screen
const BLOB_SIZE_STAGE2  = "24vmax";   // blob size on the headline/CTA screen
const BLOB_BLUR_STAGE1  = "0px";      // blur on stage 1 (none — blobs are sharp)
const BLOB_BLUR_STAGE2  = "80px";     // blur on stage 2 (settled)
const BLOB_BLUR_PEAK    = "120px";    // blur at the height of the transition
const SCROLL_THRESHOLD  = 50; // pixels to scroll before stage 2 triggers
// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const [stage, setStage]             = useState<1 | 2>(1);
  const [transitioning, setTransitioning] = useState(false);
  const [blobBlur, setBlobBlur]       = useState(BLOB_BLUR_STAGE1);
  const [blobSize, setBlobSize]       = useState(BLOB_SIZE_STAGE1);
  const { setIsHeroStage1 }           = useHeroStage();

  // Refs to read latest state inside the scroll event without re-triggering the listener
  const stageRef = useRef(1);
  const transitioningRef = useRef(false);

  const updateStage = useCallback((newStage: 1 | 2) => {
    setStage(newStage);
    stageRef.current = newStage;
  }, []);

  const updateTransitioning = useCallback((isTrans: boolean) => {
    setTransitioning(isTrans);
    transitioningRef.current = isTrans;
  }, []);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    
    if (window.scrollY > SCROLL_THRESHOLD) {
      updateStage(2);
      setIsHeroStage1(false);
      setBlobBlur(BLOB_BLUR_STAGE2);
      setBlobSize(BLOB_SIZE_STAGE2);
      updateTransitioning(false); // Force transitioning to false so text appears
    } else {
      updateStage(1);
      setIsHeroStage1(true);
      setBlobBlur(BLOB_BLUR_STAGE1);
      setBlobSize(BLOB_SIZE_STAGE1);
      updateTransitioning(false);
    }

    // 2. STANDARD SCROLL LISTENER (for natural scrolling)
    function handleScroll() {
      const scrollY = window.scrollY;

      // Transition forward to Stage 2
      if (scrollY > SCROLL_THRESHOLD && stageRef.current === 1 && !transitioningRef.current) {
        updateTransitioning(true);
        setIsHeroStage1(false);
        setBlobBlur(BLOB_BLUR_PEAK);

        t1 = setTimeout(() => {
          updateStage(2);
          setBlobBlur(BLOB_BLUR_STAGE2);
          setBlobSize(BLOB_SIZE_STAGE2);
        }, 350);

        t2 = setTimeout(() => {
          updateTransitioning(false);
        }, 750);
      } 
      // Transition back to Stage 1
      else if (scrollY <= SCROLL_THRESHOLD && stageRef.current === 2 && !transitioningRef.current) {
        updateTransitioning(true);
        setIsHeroStage1(true);
        setBlobBlur(BLOB_BLUR_PEAK);

        t1 = setTimeout(() => {
          updateStage(1);
          setBlobBlur(BLOB_BLUR_STAGE1);
          setBlobSize(BLOB_SIZE_STAGE1);
        }, 350);

        t2 = setTimeout(() => {
          updateTransitioning(false);
        }, 750);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsHeroStage1, updateStage, updateTransitioning]);

  const stage1Visible = stage === 1 && !transitioning;
  const stage2Visible = stage === 2;
  const showChevron   = !transitioning && stage === 1;

  return (
    <section
      // CHANGED: From min-h-screen to h-screen w-full to ensure strict sticky sizing
      className="sticky top-0 z-10 isolate h-screen w-full overflow-hidden"
      style={{ background: "#da8da0" }}
    >
      <BlobField size={blobSize} blurAmount={blobBlur} />
      
      {/* ── Stage 1: Centered logo + tagline ─────────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
        style={{
          opacity:       stage1Visible ? 1 : 0,
          transform:     stage1Visible ? "translateY(0)" : "translateY(-40px)",
          transition:    "opacity 0.45s ease, transform 0.45s ease",
          pointerEvents: stage1Visible ? "auto" : "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/RecLogo.svg"
          alt="RecSeekers"
          className="w-auto max-w-2xl my-3.5"
        />
        <h2 className={`text-6xl font-bold text-black -mt-4 ${cooper.className}`}>
          &ldquo;Have a nice day&rdquo;
        </h2>
      </div>

      {/* ── Bouncing chevron ──────────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity:    showChevron ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        <svg
          className="chevron-bounce"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* ── Stage 2: Left / right hero layout ────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center px-8 py-16"
        style={{
          opacity:       stage2Visible ? 1 : 0,
          transform:     stage2Visible ? "translateY(0)" : "translateY(28px)",
          transition:    "opacity 0.45s ease, transform 0.45s ease",
          pointerEvents: stage2Visible ? "auto" : "none",
        }}
      >
        <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Headline + subtext + CTA */}
          <div className="flex-1 flex flex-col items-start">
            <h1 className={`text-6xl md:text-5xl text-black mb-4 leading-tight ${cooper.className}`}>
              We help education agencies hire proven recruiters.
            </h1>
            <p className="text-xl text-black/80 mb-10 leading-relaxed max-w-md font-medium">
              Specialist education Rec2Rec connecting top billing consultants,
              team leaders and managers with agencies across the UK and
              Australia.
            </p>
            <p className="text-base text-black/75 mb-8 leading-relaxed max-w-lg font-semibold">
              Quality over volume. Built on long-term relationships.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/candidates">
                <Button variant="secondary" size="xl" className={`${cooper.className} bg-white! text-primary-dark! border-2 border-primary-dark! hover:bg-primary-dark! hover:text-white! focus:ring-primary-dark!`}>
                  For Candidates
                </Button>
              </Link>
              <Link href="/employers">
                <Button variant="secondary" size="xl" className={`${cooper.className} bg-primary-dark! hover:bg-white! hover:text-primary-dark! hover:border-primary-dark! focus:ring-primary-dark!`}>
                  For Agencies
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Illustration */}
            <div className="flex-1 w-full max-w-xl lg:max-w-2xl">
            <div className="relative w-full aspect-square rounded-[2rem]">
              <Image
                src="/Illustrations/selection1.svg"
                alt="Illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
