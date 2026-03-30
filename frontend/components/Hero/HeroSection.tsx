"use client";

import { useEffect, useRef, useState } from "react";
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
const SCROLL_THRESHOLD = 60;
const MOBILE_SCROLL_THRESHOLD = 90;
// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const [stage, setStage]             = useState<1 | 2>(1);
  const [transitioning, setTransitioning] = useState(false);
  const [blobBlur, setBlobBlur]       = useState(BLOB_BLUR_STAGE1);
  const [blobSize, setBlobSize]       = useState(BLOB_SIZE_STAGE1);
  const { setIsHeroStage1 }           = useHeroStage();

  const stageRef = useRef<1 | 2>(1);
  const transitioningRef = useRef(false);

  const setStageSynced = (nextStage: 1 | 2) => {
    setStage(nextStage);
    stageRef.current = nextStage;
  };

  const setTransitioningSynced = (nextTransitioning: boolean) => {
    setTransitioning(nextTransitioning);
    transitioningRef.current = nextTransitioning;
  };

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const threshold = isMobile ? MOBILE_SCROLL_THRESHOLD : SCROLL_THRESHOLD;

    function syncInitialState() {
      if (window.scrollY > threshold) {
        setStageSynced(2);
        setIsHeroStage1(false);
        setBlobBlur(BLOB_BLUR_STAGE2);
        setBlobSize(BLOB_SIZE_STAGE2);
        setTransitioningSynced(false);
      } else {
        setStageSynced(1);
        setIsHeroStage1(true);
        setBlobBlur(BLOB_BLUR_STAGE1);
        setBlobSize(BLOB_SIZE_STAGE1);
        setTransitioningSynced(false);
      }
    }

    syncInitialState();

    function onScroll() {
      const scrollY = window.scrollY;

      if (scrollY > threshold && stageRef.current === 1 && !transitioningRef.current) {
        setTransitioningSynced(true);
        setIsHeroStage1(false);
        setBlobBlur(BLOB_BLUR_PEAK);

        t1 = setTimeout(() => {
          setStageSynced(2);
          setBlobBlur(BLOB_BLUR_STAGE2);
          setBlobSize(BLOB_SIZE_STAGE2);
        }, 350);

        t2 = setTimeout(() => {
          setTransitioningSynced(false);
        }, 750);
      } else if (scrollY <= threshold && stageRef.current === 2 && !transitioningRef.current) {
        setTransitioningSynced(true);
        setIsHeroStage1(true);
        setBlobBlur(BLOB_BLUR_PEAK);

        t1 = setTimeout(() => {
          setStageSynced(1);
          setBlobBlur(BLOB_BLUR_STAGE1);
          setBlobSize(BLOB_SIZE_STAGE1);
        }, 350);

        t2 = setTimeout(() => {
          setTransitioningSynced(false);
        }, 750);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
    };
  }, [setIsHeroStage1]);

  const stage1Visible = stage === 1 && !transitioning;
  const stage2Visible = stage === 2;
  const showChevron   = !transitioning && stage === 1;

  return (
    <section className="sticky top-0 z-10 isolate h-dvh w-full overflow-hidden md:h-screen" style={{ background: "#da8da0" }}>
      <BlobField size={blobSize} blurAmount={blobBlur} />
      
      {/* ── Stage 1: Centered logo + tagline ─────────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-8"
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
          className="my-2.5 w-auto max-w-[82vw] sm:max-w-136 md:max-w-2xl"
        />
        <h2 className={`-mt-1 text-3xl font-bold text-black sm:text-5xl md:-mt-4 md:text-6xl ${cooper.className}`}>
          &ldquo;Have a nice day&rdquo;
        </h2>
      </div>

      {/* ── Bouncing chevron ──────────────────────────────────────────────── */}
      <div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 sm:bottom-10 md:bottom-8"
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
        className="absolute inset-0"
        style={{
          opacity:       stage2Visible ? 1 : 0,
          transform:     stage2Visible ? "translateY(0)" : "translateY(28px)",
          transition:    "opacity 0.45s ease, transform 0.45s ease",
          pointerEvents: stage2Visible ? "auto" : "none",
        }}
      >
        {/* Mobile Stage 2: Illustration-first */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-sm flex-col items-center justify-start px-6 pt-24 pb-8 md:hidden">
          <h1 className={`mt-5 text-center text-3xl leading-tight text-black ${cooper.className}`}>
            We help education agencies hire proven recruiters.
          </h1>

          <p className="mt-3 text-center text-base leading-relaxed text-black/85 font-medium">
            Specialist education Rec2Rec connecting top billing consultants, team leaders, and managers across the UK and Australia.
          </p>

          <p className="mt-2 text-center text-sm leading-relaxed text-black/75 font-semibold">
            Quality over volume. Built on long-term relationships.
          </p>

          <div className="mt-4 w-full max-w-56">
            <div className="relative aspect-square w-full rounded-4xl">
              <Image
                src="/Illustrations/selection2.svg"
                alt="Education recruitment illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-5 grid w-full grid-cols-2 gap-3">
            <Link href="/candidates" className="w-full">
              <Button variant="secondary" size="lg" className={`w-full ${cooper.className} bg-white! text-primary-dark! border-2 border-primary-dark! hover:bg-primary-dark! hover:text-white! focus:ring-primary-dark!`}>
                For Recruiters
              </Button>
            </Link>
            <Link href="/employers" className="w-full">
              <Button variant="secondary" size="lg" className={`w-full ${cooper.className} bg-primary-dark! hover:bg-white! hover:text-primary-dark! hover:border-primary-dark! focus:ring-primary-dark!`}>
                For Agencies
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Stage 2: Original proportions */}
        <div className="relative z-10 mx-auto hidden w-full max-w-6xl flex-col items-center gap-12 px-8 pt-24 pb-16 md:flex lg:flex-row lg:gap-20">
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
                  For Recruiters
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
            <div className="relative w-full aspect-square rounded-4xl">
              <Image
                src="/Illustrations/selection1.svg"
                alt="Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
