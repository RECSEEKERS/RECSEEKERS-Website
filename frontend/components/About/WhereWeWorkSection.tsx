"use client";

import { useState } from 'react';
import { cooper } from '@/lib/fonts';
import DoodleFloat from '@/components/ui/DoodleFloat'; 

const countries = [
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'Our home base — connecting the best recruitment talent across London, Manchester, and beyond.',
    viewBox: '0 0 160 200',
    // Path scaled by 1.3x
    path: 'M 70.2 7.8 L 75.4 15.6 L 72.8 23.4 L 78 28.6 L 88.4 26 L 96.2 33.8 L 85.8 49.4 L 88.4 57.2 L 98.8 67.6 L 104 83.2 L 111.8 88.4 L 117 101.4 L 130 111.8 L 137.8 122.2 L 137.8 132.6 L 127.4 137.8 L 124.8 148.2 L 114.4 150.8 L 101.4 148.2 L 85.8 153.4 L 72.8 150.8 L 59.8 158.6 L 44.2 169 L 28.6 179.4 L 20.8 171.6 L 31.2 156 L 39 150.8 L 52 148.2 L 59.8 140.4 L 52 132.6 L 41.6 130 L 33.8 119.6 L 36.4 109.2 L 44.2 106.6 L 49.4 96.2 L 59.8 93.6 L 62.4 83.2 L 57.2 75.4 L 70.2 70.2 L 54.6 62.4 L 49.4 54.6 L 59.8 49.4 L 65 41.6 L 59.8 31.2 L 67.6 23.4 L 62.4 13 Z M 31.2 59.8 L 41.6 57.2 L 49.4 67.6 L 44.2 80.6 L 33.8 88.4 L 23.4 83.2 L 26 70.2 Z',
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    description: 'Supporting the thriving Australian recruitment market across Sydney, Melbourne and beyond.',
    viewBox: '0 0 205 178',
    // Original path
    path: 'M 132 10 L 138 24 L 144 38 L 152 56 L 158 74 L 166 92 L 174 112 L 174 126 L 162 142 L 152 142 L 144 136 L 132 130 L 118 124 L 102 122 L 88 126 L 74 132 L 60 142 L 46 140 L 34 132 L 26 118 L 20 102 L 18 84 L 24 66 L 34 50 L 46 36 L 56 30 L 66 36 L 74 24 L 84 20 L 94 22 L 102 18 L 108 28 L 110 46 L 116 52 L 126 42 Z M 152 154 L 164 152 L 168 162 L 158 172 L 148 164 Z',
  },
];

export function WhereWeWorkSection() {
  const [activeCountry, setActiveCountry] = useState(0);

  return (
    <section className="relative w-full overflow-hidden bg-white border-t-4 border-black py-14 md:py-24 px-5 md:px-8">
      
      {/* We center the doodles on THIS container, adding w-full to ensure it sizes correctly */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">

        {/* Primary mobile accent */}
        <DoodleFloat
          name={"globe"}
          size={60}
          delay={0.2}
          className="absolute -top-5 -right-1 md:hidden z-40 pointer-events-none opacity-55"
        />

        {/* --- Background Doodles (Pushed strictly to the OUTSIDE) --- */}
        {/* Top Left */}
        <div className="absolute top-10 -left-16 lg:-left-32 xl:-left-44 hidden md:block z-0 pointer-events-none">
          <DoodleFloat name={"globe"} size={120} delay={0.2} />
        </div>

        {/* Middle Right */}
        <div className="absolute top-1/3 -right-16 lg:-right-36 xl:-right-48 hidden md:block z-0 pointer-events-none">
          <DoodleFloat name={"paper-plane"} size={130} delay={0.7} />
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-10 -left-20 lg:-left-40 xl:-left-56 hidden md:block z-0 pointer-events-none">
          <DoodleFloat name={"open-book"} size={170} delay={1.2} />
        </div>
        {/* --------------------------- */}

        {/* Main Content */}
        <div className="relative z-10">
          <div className="mb-8 md:mb-16 text-left">
            <h2 className={`${cooper.className} text-4xl sm:text-5xl md:text-7xl text-black`}>
              Where We Work
            </h2>
          </div>

          {/* Mobile switcher */}
          <div className="md:hidden">
            <div className="mb-5 grid grid-cols-2 gap-2">
              {countries.map((country, index) => {
                const isActive = activeCountry === index;

                return (
                  <button
                    key={country.name}
                    type="button"
                    onClick={() => setActiveCountry(index)}
                    className={`flex items-center justify-center gap-2 border-4 px-3 py-2.5 text-base transition-all duration-150 ${
                      isActive
                        ? 'bg-[#da8da0] border-[#da8da0] text-black translate-x-0.5 translate-y-0.5 shadow-none'
                        : 'bg-white border-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <span>{country.flag}</span>
                    <span className={cooper.className}>{country.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col items-center p-5 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
              <div className="flex items-center justify-center w-full h-40 mb-5 relative">
                <svg
                  viewBox={countries[activeCountry].viewBox}
                  className="w-full h-full relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d={countries[activeCountry].path}
                    className="fill-primary"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="w-full border-t-4 border-black mb-4" />

              <div className="text-center">
                <h3 className={`${cooper.className} text-2xl text-black mb-2.5`}>
                  {countries[activeCountry].flag} {countries[activeCountry].name}
                </h3>
                <p className="text-base text-black/75 leading-relaxed">
                  {countries[activeCountry].description}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop cards */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-10">
            {countries.map((country) => (
              <div
                key={country.name}
                className="group flex flex-col items-center p-8 md:p-12 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-none transition-all duration-150 bg-white cursor-default"
              >
                <div className="flex items-center justify-center w-full h-56 mb-8 relative">
                  <svg
                    viewBox={country.viewBox}
                    className="w-full h-full relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <path
                      d={country.path}
                      className="fill-primary" 
                      stroke="black"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Divider */}
                <div className="w-full border-t-4 border-black mb-8" />

                {/* Text */}
                <div className="text-center px-4">
                  <h3 className={`${cooper.className} text-3xl text-black mb-4`}>
                    {country.flag} {country.name}
                  </h3>
                  <p className="text-lg text-black/70 leading-relaxed">
                    {country.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}