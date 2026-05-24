import { HeroSection } from "@/components/Hero/HeroSection";
import { cooper } from '@/lib/fonts';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TestimonialsSection } from "@/components/Candidates/TestimonialsSection";
import { FitSplitCard } from "@/components/Candidates/FitSplitCard";
import { DoodleFloat } from "@/components/ui/DoodleFloat";

// Assuming you have the same profile placeholder and font setup
const placeHolderProfile = '/profile.png';

export default function Candidates() {

  // Reusable style for the Figma headers (Pink fill, black stroke, drop shadow)
  const headingStyle = `text-5xl mb-16 text-black ${cooper.className}`;

  // const headingStyle3D = `drop-shadow-[3px_4px_0_rgb(249,174,215)]  `;- 3D SHADOW EFFECT

  return (
    <main className="relative w-full bg-white overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      {/* Adjusted padding: pt-28 pb-14 for mobile, resets to py-24 for desktop */}
      <section className="snap-start relative z-20 min-h-[80vh] bg-[#ffa4bb] pt-28 pb-14 px-8 md:py-24 flex flex-col justify-center items-center shadow-[0_16px_40px_0_rgba(0,0,0,0.1)] overflow-hidden">
      
        {/* ADDED 'relative' to this container. Moved doodles INSIDE it. */}
        <div className="relative max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* --- Background Doodles --- */}
          {/* Desktop Top Left */}
          <div className="absolute top-0 -left-14 lg:-left-24 xl:-left-30 hidden md:block z-40 pointer-events-none">
            <DoodleFloat name={"flask-2"} size={96} delay={0.1} />
          </div>
          {/* Mobile Top Left (Smaller, semi-transparent) */}
          <div className="absolute top-6 -right-4 block md:hidden z-40 pointer-events-none opacity-60">
            <DoodleFloat name={"flask-2"} size={64} delay={0.1} />
          </div>

          {/* Desktop Bottom Right */}
          <div className="absolute bottom-0 -right-12 lg:-right-24 xl:-right-30 hidden md:block z-40 pointer-events-none">
            <DoodleFloat name={"books-3"} size={124} delay={1.2} />
          </div>

          {/* Left Text: Changed to w-1/2 to pull the image in closer */}
          <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start gap-6">
            <h1 className={`${cooper.className} text-6xl lg:text-7xl text-black mb-6 leading-tight`}>
              Find your next role <span className="italic text-white block">with Us!</span>
            </h1>
            
            {/* Removed <br/> and used a cleaner max-width */}
            <p className="block md:hidden text-lg text-primary-dark/80 max-w-lg leading-relaxed">
              On the hunt for the perfect agency recruitment job? 
              <br />
              RECSEEKERS specializes in Rec2Rec, connecting exceptional recruiters 
              with top-tier agencies.
            </p>
            <p className="hidden md:block text-lg text-primary-dark/80 max-w-lg leading-relaxed">
              On the hunt for the perfect agency recruitment job? We believe in helping 
              talented recruiters fulfill their potential by getting them into the 
              right industry, company, and role for them.
              <br /><br />
              RECSEEKERS specializes in Rec2Rec, connecting exceptional recruiters 
              with top-tier agencies.
            </p>
          </div>

          {/* Right Image: Occupies the other half */}
          <div className="relative z-10 w-full md:w-1/2 flex justify-end">
            <div className="relative w-full max-w-md">
              <Image
                src="/Illustrations/HelpingPartner2.svg"
                alt="Career support illustration"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
          
        </div>
      </section>

      {/* --- WHAT SETS US APART SECTION --- */}
      {/* <section className="snap-start relative z-20 min-h-screen bg-white py-24 px-8 flex flex-col items-center">
        <div className="max-w-6xl w-full">
          <h2 className={`${cooper.className} text-7xl text-black mb-12 leading-tight`}>
            What sets us apart
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-[#c28f9c] p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            {/* Box 1 */}
            {/* <div className="flex flex-col items-center text-center text-white gap-4">
              <div className="w-20 h-20 mb-2">
                 <Image src="/icon-stairs.svg" alt="Market Leading" width={80} height={80} className="object-contain filter invert"/>
              </div>
              <h3 className={`text-2xl ${cooper.className}`}>Market Leading<br/>Candidates</h3>
            </div> */}

            {/* Box 2 */}
            {/* <div className="flex flex-col items-center text-center text-white gap-4">
              <div className="w-20 h-20 mb-2">
                 <Image src="/icon-selection.svg" alt="Wide Selection" width={80} height={80} className="object-contain filter invert"/>
              </div>
              <h3 className={`text-2xl ${cooper.className}`}>Wide Selection of<br/>Industries</h3>
            </div> */}

            {/* Box 3 */}
            {/* <div className="flex flex-col items-center text-center text-white gap-4">
              <div className="w-20 h-20 mb-2">
                 <Image src="/icon-clock.svg" alt="15 Years Experience" width={80} height={80} className="object-contain filter invert"/>
              </div>
              <h3 className={`text-2xl ${cooper.className}`}>15 years of Recruitment<br/>Experience</h3>
            </div>
          </div>
        </div> */}
      {/* </section>  */}

      {/* --- IS THIS RIGHT FOR YOU SECTION --- */}
      <section className="relative z-20 bg-[#fff8f1] border-t-4 border-black px-8 py-24 overflow-hidden">
        <div className="absolute top-10 right-4 md:left-12 z-40 pointer-events-none opacity-55 sm:opacity-70 md:opacity-100 scale-75 md:scale-100">
          <DoodleFloat name={"lightbulb"} size={84} delay={0.1} />
        </div>
        <div className="absolute bottom-8 right-10 hidden md:block z-40 pointer-events-none">
          <DoodleFloat name={"proctator"} size={140} delay={0.5} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-10">
          <div className="max-w-3xl">
            <h2 className={`${cooper.className} text-5xl md:text-6xl text-black mb-5 leading-tight`}>
              Ready for your next big move?
            </h2>
            <p className="text-lg md:text-xl text-primary-dark/80 leading-relaxed">
              We work with ambitious education recruiters who want the right next move, not just the next job.
            </p>
          </div>

          <FitSplitCard cooperClassName={cooper.className} />

          <div className="mx-auto w-full max-w-3xl rounded-2xl border-2 border-black/20 bg-white/90 px-6 py-7 md:px-10 md:py-9 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
            <p className={`${cooper.className} text-3xl md:text-4xl text-black mb-3`}>
              Our candidate promise
            </p>
            <p className="text-lg md:text-xl text-primary-dark leading-relaxed font-semibold">
              You will never be charged as a candidate. Ever.
            </p>
            <p className="mt-3 text-base md:text-lg text-primary-dark/80 leading-relaxed">
              We are retained by hiring agencies, so your conversations with us stay confidential, advisory,
              and focused on your best next move.
            </p>
          </div>
        </div>
      </section>

      {/* --- PREVIOUS CANDIDATES SECTION --- */}
      <TestimonialsSection cooperClassName={cooper.className} />

      {/* --- CONTACT US SECTION --- */}
      <section className="relative z-20 bg-white py-14 md:py-16 px-8 flex flex-col items-center snap-start ">
        <div className="max-w-6xl w-full flex flex-col items-center text-center">
          <h2 className={`${headingStyle} mb-8`}>
            Ready to find your perfect role?
          </h2>

          <div className="w-full max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-12 text-left">
              <p className="text-lg md:text-xl text-black font-medium leading-relaxed max-w-3xl">
                Reach out to our team today. We&apos;ll confidentially discuss your experience, your ambitions, and match you with agencies that value your expertise.
              </p>

              <div className="shrink-0">
                <Link href="/contact" className="inline-block w-full md:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className={`${cooper.className} w-full md:w-auto whitespace-nowrap`}
                  >
                    Start a confidential chat
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Split Button Container
            <Link href="/contact">
              <Button variant="primary" size="xl" className={cooper.className}>
                Get In Touch!
              </Button>
            </Link> */}
        </div>
      </section>
    </main>
  );
}