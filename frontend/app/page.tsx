import { client } from "@/sanity/client";
import { TEMPLATE_STATUS_QUERY } from "@/sanity/queries";
import { HeroSection } from "@/components/Hero/HeroSection";
import { cooper } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DoodleFloat } from "@/components/ui/DoodleFloat";
import { WhoWeWorkWithCard } from "@/components/Home/WhoWeWorkWithCard";
import { HowItWorksTimeline } from "@/components/Home/HowItWorksTimeline";
import { TestimonialsSection } from "@/components/Home/TestimonialsSection";

const iconBase = "h-7 w-7 text-primary-dark";

const TopFiveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconBase} aria-hidden="true">
    <path d="M6 5h12v3l-2 2-4-2-4 2-2-2V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 10v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8.5 21h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
  </svg>
);

const EducationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconBase} aria-hidden="true">
    <path d="M4 7.5 12 4l8 3.5L12 11 4 7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10v6.5c2 1.7 10 1.7 12 0V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 11v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const RelationshipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconBase} aria-hidden="true">
    <path d="M7 10c1.4-1.8 3.2-2.7 5-2.7s3.6.9 5 2.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4.5 11.5 9 16l3-2.5 3 2.5 4.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 19h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const NetworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconBase} aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 4c2.5 2.2 2.5 13.8 0 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 4c-2.5 2.2-2.5 13.8 0 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default async function HomePage() {
  return (
    <main className="relative -mt-16 md:-mt-16 w-full bg-white">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[112dvh] md:h-[120vh]">
        <HeroSection />
      </div>
      
      {/* --- Who We Work With --- */}
      <section className="relative z-20 bg-gray-100 pt-4 pb-10 lg:pt-6 lg:pb-14 px-6 md:px-10 flex flex-col items-center border-t-4 border-black overflow-hidden">
        {/* Soft background blob accents (matched to employers page language) */}
        <div className="absolute -bottom-20 right-0 w-120 h-120 rounded-full blur-2xl pointer-events-none" />
        <DoodleFloat
          name="paper-plane"
          size={140}
          delay={0.1}
          className="absolute -top-4 right-2 lg:top-2 lg:right-8 hidden md:block pointer-events-none"
        />
        <DoodleFloat
          name="pencil-1"
          size={150}
          delay={0.4}
          className="absolute bottom-10 left-2 lg:bottom-14 lg:left-8 hidden md:block pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl w-full">
          <div className="flex flex-col gap-4 mb-8 lg:mb-10">
            <h2 className={`text-5xl lg:text-6xl leading-tight text-primary-dark ${cooper.className}`}>
              Who We Work With
            </h2>
            <p className="text-base text-primary-dark/80 max-w-3xl leading-relaxed">
              Relationship-led, specialist support for both sides of the education recruitment market.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-8 lg:gap-10 justify-items-center">
            <WhoWeWorkWithCard
              title="Education recruiters"
              description="We support top billers with confidential, strategic career moves across the UK and Australia, focused on stronger earnings, better progression, and the right cultural fit."
              ctaLabel="Elevate Your Career"
              href="/candidates"
              cooperClassName={cooper.className}
              illustrationSrc="/Illustrations/communicator2.svg"
              cardBgClassName="bg-tertiary"
            />
            <WhoWeWorkWithCard
              title="Education recruitment agencies"
              description="We help agency leaders hire proven consultants and team builders who can scale high-performing desks, launch new offices, and accelerate revenue with less hiring risk."
              ctaLabel="Find Your Next Top Recruiter"
              href="/employers"
              cooperClassName={cooper.className}
              illustrationSrc="/Illustrations/office.svg"
              cardBgClassName="bg-tertiary"
            />
          </div>
        </div>
      </section>

      {/* --- Why RecSeekers (Top 5% Positioning) --- */}
      <section className="relative z-20 bg-primary py-18 md:py-22 px-6 md:px-10 flex flex-col items-center border-t-4 border-black overflow-hidden">
        <div className="relative z-10 max-w-7xl w-full">
          <div className="flex flex-col gap-4 mb-8 lg:mb-10">
            <h2 className={`text-5xl lg:text-6xl leading-tight text-primary-dark ${cooper.className}`}>
              Why RecSeekers
            </h2>
            <p className="text-base md:text-lg text-primary-dark/80 max-w-3xl leading-relaxed">
              Built for quality over volume, with a specialist model designed around elite education recruitment operators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            <article className="rounded-4xl border-4 border-primary-dark bg-[#fff8f1] p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(37,8,33,1)]">
              <div className="mb-4 h-12 w-12 rounded-full border-2 border-primary-dark bg-white grid place-items-center">
                <TopFiveIcon />
              </div>
              <h3 className={`text-2xl text-primary-dark mb-2 leading-tight ${cooper.className}`}>
                Top 5% focus
              </h3>
              <p className="text-sm md:text-base text-primary-dark/85 leading-relaxed">
                We typically work with what we would describe as the top 5% of operators in education recruitment.
              </p>
            </article>

            <article className="rounded-4xl border-4 border-primary-dark bg-[#fff8f1] p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(37,8,33,1)]">
              <div className="mb-4 h-12 w-12 rounded-full border-2 border-primary-dark bg-white grid place-items-center">
                <EducationIcon />
              </div>
              <h3 className={`text-2xl text-primary-dark mb-2 leading-tight ${cooper.className}`}>
                Education-only Rec2Rec
              </h3>
              <p className="text-sm md:text-base text-primary-dark/85 leading-relaxed">
                Specialist in education recruitment, not a generalist recruiter trying to cover every market.
              </p>
            </article>

            <article className="rounded-4xl border-4 border-primary-dark bg-[#fff8f1] p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(37,8,33,1)]">
              <div className="mb-4 h-12 w-12 rounded-full border-2 border-primary-dark bg-white grid place-items-center">
                <RelationshipIcon />
              </div>
              <h3 className={`text-2xl text-primary-dark mb-2 leading-tight ${cooper.className}`}>
                Relationship-led, not transactional
              </h3>
              <p className="text-sm md:text-base text-primary-dark/85 leading-relaxed">
                Built on trust and long-standing relationships, not one-off CV flinging and short-term placement chasing.
              </p>
            </article>

            <article className="rounded-4xl border-4 border-primary-dark bg-[#fff8f1] p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(37,8,33,1)]">
              <div className="mb-4 h-12 w-12 rounded-full border-2 border-primary-dark bg-white grid place-items-center">
                <NetworkIcon />
              </div>
              <h3 className={`text-2xl text-primary-dark mb-2 leading-tight ${cooper.className}`}>
                UK ↔ Australia network
              </h3>
              <p className="text-sm md:text-base text-primary-dark/85 leading-relaxed">
                Deep UK network with the same relationship-driven model expanding across Australia.
              </p>
            </article>
          </div>
        </div>
      </section>

      <HowItWorksTimeline cooperClassName={cooper.className} />

      
      <section className="relative z-20 bg-tertiary py-20 md:py-24 px-6 md:px-10 flex flex-col items-center border-t-4 border-black overflow-hidden">
        <div className="absolute top-6 right-6 w-40 h-40 rounded-full bg-white/20 blur-2xl pointer-events-none" />
        <DoodleFloat
          name="gradcap-2"
          size={96}
          delay={0.38}
          className="absolute top-16 right-2 lg:right-10 hidden md:block pointer-events-none"
        />
        <DoodleFloat
          name="open-book"
          size={120}
          delay={0.45}
          className="absolute bottom-8 left-2 lg:left-12 hidden md:block pointer-events-none"
        />

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Copy */}
          <div className="w-full order-2 lg:order-1">
            <h2 className={`text-4xl md:text-5xl text-primary-dark leading-tight mb-5 ${cooper.className}`}>
              For recruiters planning their next move
            </h2>

            <p className="text-primary-dark/85 text-base md:text-lg leading-relaxed mb-6">
              Many top recruiters are underpaid for their output, boxed into the wrong market or leadership setup, and lack a clear view of genuinely better opportunities.
            </p>

            <ul className="space-y-3 text-primary-dark/90 text-base md:text-lg mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary-dark shrink-0" />
                <span>Confidential career conversations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary-dark shrink-0" />
                <span>Better commission and progression</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary-dark shrink-0" />
                <span>Leadership and equity routes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary-dark shrink-0" />
                <span>UK and Australia roles</span>
              </li>
            </ul>

            <Link href="/candidates">
              <Button variant="secondary" size="lg" className={`${cooper.className} bg-primary-dark! focus:ring-primary-dark!`}>
                Start a confidential chat
              </Button>
            </Link>
          </div>

          {/* Right: Illustration */}
          <div className="w-full order-1 lg:order-2">
            <div className="relative w-full aspect-4/3 rounded-4xl border-4 border-primary-dark shadow-[8px_8px_0px_0px_rgba(37,8,33,1)] overflow-hidden bg-white">
              <Image
                src="/Illustrations/JobHunt1.svg"
                alt="Recruiter evaluating career paths"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Deeper Split: For Agencies / For Recruiters --- */}
      <section className="relative z-20 bg-[#fff8f1] py-20 md:py-24 px-6 md:px-10 flex flex-col items-center border-t-4 border-black overflow-hidden">
        <DoodleFloat
          name="pie-chart"
          size={95}
          delay={0.35}
          className="absolute top-18 right-2 lg:right-12 hidden md:block pointer-events-none"
        />

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Illustration */}
          <div className="w-full">
            <div className="relative w-full aspect-4/3 rounded-4xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white">
              <Image
                src="/Illustrations/GroupDiscussion1.svg"
                alt="Agency team collaborating"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Copy */}
          <div className="w-full">
            <h2 className={`text-4xl md:text-5xl text-primary-dark leading-tight mb-5 ${cooper.className}`}>
              For agencies hiring proven performers
            </h2>

            <p className="text-primary-dark/85 text-base md:text-lg leading-relaxed mb-6">
              Top recruiters rarely apply openly. Moves are usually confidential, and most leaders do not have enough time or market coverage to map competitor talent deeply.
            </p>

            <ul className="space-y-3 text-primary-dark/90 text-base md:text-lg mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary-dark shrink-0" />
                <span>Access to proven education billers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary-dark shrink-0" />
                <span>Reduced hiring risk</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary-dark shrink-0" />
                <span>Faster impact on NFI</span>
              </li>
            </ul>

            <Link href="/employers">
              <Button variant="primary" size="lg" className={cooper.className}>
                Talk to us about your next hire
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <TestimonialsSection cooperClassName={cooper.className} />

      
      {/* --- Contact Section ---*/}
      <section className="relative z-20 min-h-screen bg-white border-t-4 border-black py-24 md:py-28 px-6 md:px-10 flex flex-col items-center">
        <div className="max-w-7xl w-full">
          <h2 className={`text-5xl mb-16 text-black ${cooper.className}`}>
            Contact Us
          </h2>
        </div>
        <div className="max-w-7xl w-full flex flex-col lg:flex-row items-start gap-16 lg:gap-20">  
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-full w-full max-w-130 group">
              <div className="absolute inset-0 rounded-4xl border-4 border-black translate-x-3 translate-y-3 transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2" />

              <div className="relative w-full aspect-4/3 rounded-4xl border-4 border-black overflow-hidden bg-white">
                {/* Note: Update the src below to your actual image path */}
                <Image 
                  src="/Illustrations/brainstorming.svg" 
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Text & Button */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <h2 className={`text-4xl md:text-5xl text-black mb-8 leading-tight ${cooper.className}`}>
              Bold strategies to unlock elite recruiter discovery for your growing business.
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12 text-black leading-relaxed font-medium">
              <p className="flex-1">
                We are advancing a pipeline of novel talent acquisition strategies by unraveling complex hiring needs. Built on pioneering recruitment science and powered by a world-class team of innovators.
              </p>
              <p className="flex-1">
                Today, our mission targets the best recruiters in the industry, while our ultimate ambition is far bolder: to fundamentally rewrite the standard of hiring.
              </p>
            </div>
            
            {/* Split Button Container */}
            <Link href="/contact">
              <Button variant="primary" size="xl" className={cooper.className}>
                Get In Touch!
              </Button>
            </Link>
          </div>          
        </div>
      </section>
      
    </main>
  );
}