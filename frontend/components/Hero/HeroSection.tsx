"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const [stage, setStage]             = useState<1 | 2>(1);
  const [transitioning, setTransitioning] = useState(false);
  const [blobBlur, setBlobBlur]       = useState(BLOB_BLUR_STAGE1);
  const [blobSize, setBlobSize]       = useState(BLOB_SIZE_STAGE1);
  const { setIsHeroStage1 }           = useHeroStage();

  const hasTransitioned = useRef(false);
  const accumulated = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const scrollLockSnapshot = useRef<{
    scrollY: number;
    htmlOverflow: string;
    htmlHeight: string;
    htmlOverscrollBehavior: string;
    bodyOverflow: string;
    bodyHeight: string;
    bodyPosition: string;
    bodyTop: string;
    bodyWidth: string;
    bodyOverscrollBehavior: string;
  } | null>(null);

  const lockScroll = () => {
    if (scrollLockSnapshot.current) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    scrollLockSnapshot.current = {
      scrollY,
      htmlOverflow: html.style.overflow,
      htmlHeight: html.style.height,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyHeight: body.style.height,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
    };

    html.style.overflow = "hidden";
    html.style.height = "100%";
    html.style.overscrollBehavior = "none";

    body.style.overflow = "hidden";
    body.style.height = "100%";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overscrollBehavior = "none";
  };

  const unlockScroll = () => {
    const snapshot = scrollLockSnapshot.current;
    if (!snapshot) return;

    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = snapshot.htmlOverflow;
    html.style.height = snapshot.htmlHeight;
    html.style.overscrollBehavior = snapshot.htmlOverscrollBehavior;

    body.style.overflow = snapshot.bodyOverflow;
    body.style.height = snapshot.bodyHeight;
    body.style.position = snapshot.bodyPosition;
    body.style.top = snapshot.bodyTop;
    body.style.width = snapshot.bodyWidth;
    body.style.overscrollBehavior = snapshot.bodyOverscrollBehavior;

    window.scrollTo(0, snapshot.scrollY);
    scrollLockSnapshot.current = null;
  };

  useLayoutEffect(() => {
    // Lock before first paint to avoid initial touch/scroll slipping through.
    window.scrollTo(0, 0);
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    // Keep users in Stage 1 until they intentionally scroll/swipe to transition.
    lockScroll();

    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    function triggerTransition() {
      if (hasTransitioned.current) return;
      hasTransitioned.current = true;

      setTransitioning(true);
      setIsHeroStage1(false);
      setBlobBlur(BLOB_BLUR_PEAK);

      t1 = setTimeout(() => {
        setStage(2);
        setBlobBlur(BLOB_BLUR_STAGE2);
        setBlobSize(BLOB_SIZE_STAGE2);
      }, 350);

      t2 = setTimeout(() => {
        setTransitioning(false);
        unlockScroll();
      }, 750);
    }

    function onWheel(e: WheelEvent) {
      if (hasTransitioned.current) return;
      if (e.deltaY > 0) {
        accumulated.current += e.deltaY;
        if (accumulated.current >= SCROLL_THRESHOLD) {
          triggerTransition();
        }
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      if (hasTransitioned.current || touchStartY.current === null) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      if (delta > 30) triggerTransition();
    }

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      unlockScroll();
    };
  }, [setIsHeroStage1]);

  const stage1Visible = stage === 1 && !transitioning;
  const stage2Visible = stage === 2;
  const showChevron   = !transitioning && (stage === 1 || stage === 2);

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
          src="/rec-logo.svg"
          alt="RECSEEKERS"
          className="my-2.5 w-auto max-w-[82vw] sm:max-w-136 md:max-w-2xl"
        />
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
        <div className="relative z-10 mx-auto flex h-full w-full max-w-sm flex-col items-center justify-center px-6 pb-6 md:hidden">
          <div className="w-full max-w-68">
            <div className="relative aspect-square w-full rounded-4xl">
              <Image
                src="/Illustrations/selection2.svg"
                alt="Education recruitment illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className={`mt-3 text-center text-3xl leading-tight text-black ${cooper.className}`}>
            We Help Education Agencies Hire Proven Recruiters.
          </h1>

          <p className="mt-1.5 text-center text-sm leading-relaxed text-black/75 font-semibold">
            Quality over volume. Built on long-term relationships.
          </p>

          <div className="mt-4 grid w-full grid-cols-2 gap-3">
            <Link href="/candidates" className="w-full">
              <Button variant="secondary" size="lg" className={`w-full ${cooper.className} bg-white! text-primary-dark! border-2 border-primary-dark! shadow-[0_7px_0_0_rgba(20,22,26,0.24)] hover:-translate-y-0.5 hover:bg-primary-dark! hover:text-white! focus:ring-primary-dark!`}>
                Find My Next Role
              </Button>
            </Link>
            <Link href="/employers" className="w-full">
              <Button variant="secondary" size="lg" className={`w-full ${cooper.className} bg-primary-dark! shadow-[0_7px_0_0_rgba(20,22,26,0.22)] hover:-translate-y-0.5 hover:bg-white! hover:text-primary-dark! hover:border-primary-dark! focus:ring-primary-dark!`}>
                Hire With Confidence
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Stage 2: Original proportions */}
        <div className="relative z-10 mx-auto hidden h-full w-full max-w-6xl flex-col items-center justify-center gap-10 px-8 pt-18 pb-10 md:flex lg:flex-row lg:gap-16">
          {/* Left: Headline + subtext + CTA */}
          <div className="flex-1 flex flex-col items-start">
            <h1 className={`text-6xl md:text-5xl text-black mb-4 leading-tight ${cooper.className}`}>
            We Help Education Agencies Hire Proven Recruiters
            </h1>
            <p className="text-xl text-black/80 mb-10 leading-relaxed max-w-md font-medium">
              Specialist education and EdTech Rec2Rec with a network of 25,000 education professionals across the UK and Australia.
            </p>
            <p className="text-base text-black/75 mb-8 leading-relaxed max-w-lg font-semibold">
              Get connected with the top 5% of clients and candidates in the UK and Australia education space👇
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/candidates">
                <Button variant="secondary" size="xl" className={`${cooper.className} bg-white! text-black! border-2 border-black! hover:bg-black! hover:text-white! focus:ring-black!`}>
                  For Candidates
                </Button>
              </Link>
              <Link href="/employers">
                <Button variant="secondary" size="xl" className={`${cooper.className} bg-black! hover:bg-white! hover:text-black! hover:border-black! focus:ring-black!`}>
                  For Agencies
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-3xl">
            <div className="relative w-full aspect-square rounded-4xl">
              <Image
                src="/Illustrations/selection2.svg"
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
