import { HeroSection } from "@/components/Hero/HeroSection";
import { cooper } from '@/lib/fonts';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TestimonialsSection } from "@/components/Candidates/TestimonialsSection";
import { BottomCTA } from "@/components/Candidates/BottomCTA";
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
          <div className="absolute top-0 -left-14 lg:-left-24 xl:-left-30 hidden md:block z-0 pointer-events-none">
            <DoodleFloat name={"flask-2"} size={96} delay={0.1} />
          </div>
          {/* Mobile Top Left (Smaller, semi-transparent) */}
          <div className="absolute top-6 -right-4 block md:hidden z-0 pointer-events-none opacity-60">
            <DoodleFloat name={"flask-2"} size={64} delay={0.1} />
          </div>

          {/* Desktop Bottom Right */}
          <div className="absolute bottom-0 -right-12 lg:-right-24 xl:-right-30 hidden md:block z-0 pointer-events-none">
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
              RecSeekers specializes in Rec2Rec, connecting exceptional recruiters 
              with top-tier agencies.
            </p>
            <p className="hidden md:block text-lg text-primary-dark/80 max-w-lg leading-relaxed">
              On the hunt for the perfect agency recruitment job? We believe in helping 
              talented recruiters fulfill their potential by getting them into the 
              right industry, company, and role for them.
              <br /><br />
              RecSeekers specializes in Rec2Rec, connecting exceptional recruiters 
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

      {/* --- PREVIOUS CANDIDATES SECTION --- */}
      <TestimonialsSection cooperClassName={cooper.className} />

      {/* --- CONTACT US SECTION --- */}
      <section className="relative z-20 min-h-[60vh] bg-white pt-10 pb-24 px-8 flex flex-col items-center snap-start border-t-4 border-black shadow-[0_-16px_40px_0_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl w-full flex flex-col items-center text-center">
          <h2 className={`${headingStyle} mb-8`}>
            Ready to find your perfect role?
          </h2>
          <p className="hidden md:block text-xl text-black font-medium mb-12 max-w-2xl leading-relaxed">
            Reach out to our team today. We'll confidentially discuss your experience, your ambitions, and match you with agencies that value your expertise.
          </p>
          <p className="block md:hidden text-xl text-black font-medium mb-12 max-w-2xl leading-relaxed">
            We'll confidentially discuss your experience, your ambitions, and match you with agencies that value your expertise.
          </p>

          <BottomCTA />
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