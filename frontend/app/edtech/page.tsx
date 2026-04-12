import Link from "next/link";

import { cooper } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function EdTechPage() {
  return (
    <main className="relative w-full overflow-hidden bg-white">
      <section className="relative min-h-[48vh] flex flex-col bg-primary items-center border-black border-b-4 justify-center px-6 md:px-10 pt-24 md:pt-28 pb-12">
        <div className="relative max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
            <div>
                <h1
                    className={`${cooper.className} text-5xl sm:text-6xl md:text-8xl text-black mb-6 leading-tight`}
                >
                    EdTech
                </h1>
            
                <p className="max-w-3xl text-lg md:text-2xl text-black/90 leading-relaxed">
                    A dedicated space for Education-Technology conversations, from market
                    updates to hiring trends and the people shaping what's next.
                </p>
            </div>
            
            {/* Right: image */}
            <div className="md:flex-1 flex justify-end">
                <Image
                src="/Illustrations/Innovation-amico.svg"
                alt="Techie Illustration"
                width={600}
                height={600}
                className="w-full max-w-md h-auto"
                />
            </div>
         

          {/* <div className="mt-8">
            <Link href="/contact">
              <Button variant="primary" size="lg" className={cooper.className}>
                Talk to us about EdTech
              </Button>
            </Link>
          </div> */}
        </div>
      </section>

      <section className="bg-white px-6 md:px-10 py-16 border-b-4 border-black">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className={`${cooper.className} text-3xl md:text-5xl text-black mb-4`}>
            COMING SOON!
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed max-w-3xl">
            We're currently developing this space to bring innovation into the <span className="font-bold">EdTech</span> market. If you're interested, why not <a href="/contact" className="text-pink-500 hover:underline">
              reach out
            </a>?
          </p>
        </div>
    </section>
    </main>
  );
}
