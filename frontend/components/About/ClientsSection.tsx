import { cooper } from '@/lib/fonts';
import Image from 'next/image';

// Duplicate the array so the ticker loops seamlessly
const logos = Array.from({ length: 8 }, (_, i) => ({ id: i, src: '/file.svg' }));

export function ClientsSection() {
  return (
    <section className="relative z-10 bg-[#ffa4bb] border-t-4 border-black pt-16 pb-52 px-8 min-h-[66vh] flex flex-col justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto w-full mb-14">
        <p className={`${cooper.className} text-lg text-black/40 uppercase tracking-widest mb-2`}>
          Trusted by the industry
        </p>
        <h2 className={`${cooper.className} text-6xl md:text-7xl text-black mb-6`}>
          Companies we've placed in
        </h2>
        <p className="text-lg text-black/70 max-w-xl leading-relaxed">
          From ambitious start-ups to established recruitment powerhouses — we&apos;ve connected
          top talent with companies that know how to grow.
        </p>
      </div>

      {/* Bottom fade into the next section (white) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-[#ffa4bb] to-white z-20" />

      {/* Scrolling ticker — overflows intentionally */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#ffa4bb] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#ffa4bb] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-ticker gap-10">
          {/* Two copies for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-36 h-20 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-4"
            >
              <Image
                src={logo.src}
                alt={`Client logo ${logo.id + 1}`}
                width={80}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
