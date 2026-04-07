'use client';

import { useEffect, useRef } from 'react';
import { cooper } from '@/lib/fonts';
import { BlobPortrait } from './BlobPortrait';
import type { TeamMember } from './BlobPortrait';
import DoodleFloat from '@/components/ui/DoodleFloat'; // Imported DoodleFloat

const teamMembers: TeamMember[] = [
  {
    name: 'Sam Lawless',
    role: 'Founder',
    image: '/team/sam.png',
    bio: "From a young age, my love for sales was clear, starting with selling sweets in school and later managing an online clothing business. After spending 2.5 years traveling across Australia it feels as though all roads were leading me to recruitment. Over the past two years, recruitment has become my primary focus and my greatest success. I am extremely passionate about recruitment and building relationships. Starting RECSEEKERS was a no brainer for me, there's a huge gap in the market for outright quality Rec2Rec's and we're here to make a statement.",
  },
  {
    name: 'Jed Corner',
    role: 'Co-Founder',
    image: '/team/jed.png',
    bio: "Having 10+ years experience in the customer facing industry, I've always had an idea of building a successful, ethical business from scratch. RECSEEKERS was born through my own personal experience of seeing the recruiter to client relationship neglected due to the corporate nature of agencies. Building and maintaining this relationship is at the forefront of what RECSEEKERS do, allowing us to provide a personalised service to every client.",
  },
  {
    name: 'Ciaran Turton',
    role: 'Co-Founder',
    image: '/team/ciaran.png',
    bio: "Following university, I took up a recruitment role as a short term fix. However, five years later, it has developed into a passion and a successful career. Having recently left a senior management role at a corporate agency, I am excited to use my skills to make RECSEEKERS a company that both our clients and candidates are proud to be a part of. I believe that the synergy of our core values blended with our competitive nature and our know-how will help us build something special.",
  },
];

export function TeamSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card) => {
      if (!card) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    // Added overflow-hidden to prevent horizontal scrolling when doodles push past the edge
    <section className="relative w-full overflow-hidden bg-[#da8da0] border-t-4 border-black pt-14 md:pt-16 pb-20 md:pb-28 px-5 md:px-8 z-10">
      
      {/* Centered container for both doodles and content. Added w-full so absolute positioning works correctly */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">

        {/* Primary mobile accents */}
        <DoodleFloat
          name={"speech-bubble"}
          size={88}
          delay={0.15}
          className="absolute top-4 right-0 md:hidden z-0 pointer-events-none opacity-55"
        />
        <DoodleFloat
          name={"lightbulb"}
          size={86}
          delay={0.35}
          className="absolute bottom-12 right-0 md:hidden z-0 pointer-events-none opacity-55"
        />

        {/* --- Background Doodles (Pushed strictly to the OUTSIDE) --- */}
        {/* Top Left */}
        <div className="absolute top-10 -left-16 lg:-left-24 xl:-left-36 hidden lg:block z-0 pointer-events-none">
          <DoodleFloat name={"speech-bubble"} size={120} delay={0.2} />
        </div>

        {/* Middle Left */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-20 lg:-left-28 xl:-left-44 hidden lg:block z-0 pointer-events-none">
          <DoodleFloat name={"flask-1"} size={130} delay={0.7} />
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-10 -left-16 lg:-left-24 xl:-left-40 hidden lg:block z-0 pointer-events-none">
          <DoodleFloat name={"open-book"} size={170} delay={1.3} />
        </div>

        {/* Top Right */}
        <div className="absolute top-48 -right-16 lg:-right-24 xl:-right-36 hidden lg:block z-0 pointer-events-none">
          <DoodleFloat name={"books-3"} size={140} delay={0.3} />
        </div>

        {/* Middle/Bottom Right */}
        <div className="absolute top-2/3 -translate-y-1/2 -right-20 lg:-right-28 xl:-right-44 hidden lg:block z-0 pointer-events-none">
          <DoodleFloat name={"lightbulb"} size={140} delay={0.7} />
        </div>
        {/* --------------------------- */}

        {/* Main Content */}
        <div className="relative z-10">
          <div className="mb-14 flex flex-col gap-2 text-center md:text-left">
            <h2 className={`${cooper.className} text-4xl sm:text-5xl md:text-7xl text-black`}>
              Meet the Team
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            {teamMembers.map((member, i) => (
              <div
                key={member.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="team-card border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden bg-black!"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <BlobPortrait
                  member={member}
                  index={i}
                  imageSide={i % 2 === 0 ? 'left' : 'right'}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}