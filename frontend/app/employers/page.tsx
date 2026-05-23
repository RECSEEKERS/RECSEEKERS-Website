import Link from "next/link";
import { cooper } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";
import { FeatureCards } from "@/components/employers/FeatureCards";
import { BottomCTA } from "@/components/employers/BottomCTA";
import { DoodleFloat } from "@/components/ui/DoodleFloat"; // Make sure this path matches your project structure

export default function EmployersPage() {
  return (
    <main className="w-full">
      {/* ── CTA BANNER ── */}
      <section
        className="relative min-h-[30vh] flex items-center overflow-hidden"
        style={{ background: "#ffa4bb" }}
      >
        {/* Soft background blob accent */}
        <div className="absolute -top-32 -right-32 w-150 h-150 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-primary-dark/10 blur-2xl pointer-events-none" />

        {/* Reduced top padding (pt-28) for mobile, falls back to pt-24 on desktop */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-8 pt-28 pb-14 md:pt-24 md:pb-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* --- Background Doodles --- */}
          {/* Desktop Top Left (Compass - Hidden on mobile) */}
          <div className="absolute top-16 -left-14 lg:-left-24 xl:-left-30 hidden md:block z-40 pointer-events-none">
            <DoodleFloat name={"compass"} size={96} delay={0.1} />
          </div>

          {/* Desktop Bottom Right (Backpack - Hidden on mobile) */}
          <div className="absolute bottom-12 -right-12 lg:-right-24 xl:-right-30 hidden md:block z-40 pointer-events-none">
            <DoodleFloat name={"backpack-1"} size={124} delay={1.2} />
          </div>

          {/* ── LEFT: Copy + CTA ── */}
          <div className="relative z-10 flex flex-col gap-6">
            <h1
              className={`block md:hidden text-5xl lg:text-6xl leading-tight text-primary-dark ${cooper.className}`}
            >
              Find recruiters who{" "}
              <span className="italic text-white">already get it.</span>
            </h1>

            <h1
              className={`hidden md:block text-5xl lg:text-6xl leading-tight text-primary-dark ${cooper.className}`}
            >
              Find recruiters who{" "}
              <span className="italic text-white">already get it.</span>
            </h1>

            <p className="block md:hidden text-lg text-primary-dark/80 max-w-md leading-relaxed">
              We place niche-specific recruitment professionals who hit the ground
              running-already fluent in your market, your roles, and your
              growth targets.
            </p>

            <p className="hidden md:block text-lg text-primary-dark/80 max-w-md leading-relaxed">
              Stop onboarding recruiters who need six months to ramp. We place
              niche-specific recruitment professionals who hit the ground
              running-already fluent in your market, your roles, and your
              growth targets.
            </p>

            <div className="mt-2 flex justify-start">
              <Link href="/contact">
                <Button variant="primary" className={`${cooper.className}`} size="lg">
                  Let&apos;s Talk Hiring
                </Button>
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Image ── */}
          <div className="relative z-10 flex justify-center mt-8 md:mt-0">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Offset border for neo-brutalist feel */}
              <div className="absolute inset-0 rounded-3xl border-4 border-primary-dark translate-x-3 translate-y-3" />
              <div className="relative h-full w-full rounded-3xl border-4 border-primary-dark overflow-hidden bg-white/30">
                <img
                  src="/Illustrations/FindingIdeas2.svg"
                  alt="Employer hiring illustration"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WHY WORK WITH US ── */}
      {/* Reduced padding (pt-12 pb-12) for mobile spacing, resets to py-0 on md screens */}
      <section className="relative min-h-screen flex flex-col justify-center border-t-4 border-black bg-white px-8 pt-12 pb-12 md:py-0 overflow-hidden">
        <div className="relative max-w-6xl mx-auto w-full">

          {/* --- Background Doodles --- */}
          {/* Desktop Top Right */}
          <div className="absolute -top-10 -right-14 lg:-right-24 xl:-right-30 hidden md:block z-40 pointer-events-none">
            <DoodleFloat name={"lightbulb"} size={96} delay={0.2} />
          </div>
          {/* Mobile Top Right */}
          <div className="absolute top-0 -right-4 block md:hidden z-40 pointer-events-none opacity-60">
            <DoodleFloat name={"lightbulb"} size={48} delay={0.2} />
          </div>

          {/* Desktop Bottom Left */}
          <div className="absolute -bottom-10 -left-12 lg:-left-24 xl:-left-30 hidden md:block z-40 pointer-events-none">
            <DoodleFloat name={"atom"} size={124} delay={1.4} />
          </div>
          {/* Mobile Bottom Left */}
          <div className="absolute bottom-0 -left-6 hidden md:block  z-40 pointer-events-none opacity-60">
            <DoodleFloat name={"atom"} size={64} delay={1.4} />
          </div>

          {/* Section title */}
          <h2 className={`relative z-10 text-4xl lg:text-5xl text-neutral-900 mb-16 ${cooper.className}`}>
            Why work with{" "}
            <span className="text-primary italic">RECSEEKERS?</span>
          </h2>

          {/* Two-column layout */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* LEFT: Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 rounded-3xl border-4 border-neutral-900 translate-x-3 translate-y-3" />
                <div className="relative h-full w-full rounded-3xl border-4 border-neutral-900 overflow-hidden bg-neutral-100">
                  <img
                    src="/Illustrations/BusinessDeal1.svg"
                    alt="Why work with RECSEEKERS"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Feature cards */}
            <FeatureCards />

          </div>
        </div>
      </section>

      {/* ── TYPES OF RECRUITMENT ── */}
      <section className="relative border-t-4 border-black bg-[#fff8f1] px-8 py-14 md:py-18 overflow-hidden">
        <DoodleFloat
          name={"paper-plane"}
          size={86}
          delay={0.2}
          className="absolute top-6 right-2 md:hidden z-40 pointer-events-none opacity-55"
        />
        <div className="absolute bottom-8 left-6 hidden md:block z-40 pointer-events-none opacity-80">
          <DoodleFloat name={"open-book"} size={120} delay={0.45} />
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <h2 className={`text-4xl md:text-5xl text-neutral-900 mb-7 ${cooper.className}`}>
            Types of Recruitment
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
            <article className="rounded-3xl border-4 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className={`${cooper.className} text-3xl md:text-4xl text-black mb-4`}>
                Contingent Search
              </h3>
              <p className="text-base md:text-lg text-black/85 leading-relaxed mb-4">
                Our contingent model is flexible and performance-based, you only pay once we successfully place a candidate.
              </p>
              <p className="text-base md:text-lg text-black/85 leading-relaxed mb-4">
                We work selectively, sharing high-quality, relevant profiles when we come across individuals we believe would add value. This allows you to engage us alongside your existing hiring efforts, without any upfront commitment.
              </p>
              <p className="text-sm md:text-base text-black/70 font-medium leading-relaxed">
                Best suited if you want access to standout talent as it appears, without a dedicated search process.
              </p>
            </article>

            <article className="rounded-3xl border-4 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className={`${cooper.className} text-3xl md:text-4xl text-black mb-4`}>
                Retained Search
              </h3>
              <p className="text-base md:text-lg text-black/85 leading-relaxed mb-4">
                Retained search is a more committed, partnership-led approach, where RECSEEKERS is exclusively engaged on a specific hire or project.
              </p>
              <p className="text-base md:text-lg text-black/85 leading-relaxed mb-4">
                This gives you full access to our time, network, and process. We run a structured search, mapping the market, approaching candidates directly, and providing weekly updates and insights throughout.
              </p>
              <p className="text-sm md:text-base text-black/70 font-medium leading-relaxed">
                Best suited for senior or business-critical hires where a focused, high-quality process is key.
              </p>
            </article>
          </div>
        </div>
      </section>

       {/* ── BOTTOM CTA ── */}
       {/* Reduced top margin (mt-12) for mobile */}
      <div className="block md:hidden mt-1 md:mt-0">
        <BottomCTA />
      </div>

      <div className="hidden md:block mt-12 md:mt-0">
        <BottomCTA />
      </div>
    </main>
  );
}