import Link from "next/link";
import { cooper } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import DoodleFloat from "@/components/ui/DoodleFloat";

export default function SubscriptionPage() {
  return (
    <main className="relative w-full overflow-hidden bg-white">
      {/* 1. Increased pt-16 to pt-28 for mobile to add more space at the top */}
      <section className="relative min-h-[48vh] flex flex-col bg-primary items-center border-black border-b-4 justify-center px-6 md:px-10 pt-28 md:pt-20 pb-12">
        
        {/* 2. Changed gap-10 to gap-0 md:gap-10 to reduce vertical space on mobile */}
        <div className="relative max-w-6xl w-full flex flex-col md:flex-row items-center gap-0 md:gap-10">
          <div>
            <h1 
              className={`${cooper.className} text-5xl sm:text-6xl md:text-8xl text-black mb-6 leading-tight`}
            >
              Subscribe to <Image src="/rec-logo.svg" width={500} height={500} alt="RECSEEKERS"/>
            </h1>

            <br></br>
            
            {/* 3. Changed mb-4 to mb-0 md:mb-4 to pull the doodle closer on mobile */}
            <h3 className={`${cooper.className} text-3xl md:text-5xl text-black mb-0 md:mb-4 font-bold`}>
              A New way of Winning Together!
            </h3>
          </div>
          
          {/* Right: image */}
          <div className="md:flex-1 flex justify-end">
            <DoodleFloat
              name="Celebration-1"
              size={500}
              delay={0.5}
              className="w-full max-w-md h-auto mt-4 md:mt-0" 
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 md:px-10 py-16 border-b-4 border-black">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className={`${cooper.className} text-3xl md:text-5xl text-black mb-4 font-bold`}>
            COMING SOON!
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed max-w-3xl">
            We're launching a brand new subscription service in <span className="font-bold">Q3 2026</span> for priority clients.
            {/* <br></br> */}
            If you're interested, why not <a href="/contact" className="text-pink-500 hover:underline">
              reach out
            </a>?
          </p>
        </div>
      </section>
    </main>
  );
}