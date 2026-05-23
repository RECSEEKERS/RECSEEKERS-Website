"use client";

import { motion } from "framer-motion";
import { DoodleFloat } from "@/components/ui/DoodleFloat";

const LinkedinIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    color="#0077b5"
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className="w-6 h-6"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

type TestimonialItem = {
  quote: string;
  role: string;
  agencyType: string;
  initials: string;
};

const testimonials: TestimonialItem[] = [
  {
    quote:
      "",
    role: "Previous client",
    agencyType: "Where they work now",
    initials: "IN/img",
  },
  {
    quote:
      "",
    role: "Previous client",
    agencyType: "Where they work now",
    initials: "IN/img",
  },
  {
    quote:
      "",
    role: "Previous client",
    agencyType: "Where they work now",
    initials: "IN/img",
  },
];

const desktopHeights = ["md:min-h-[380px]", "md:min-h-[350px]", "md:min-h-[320px]"];

function QuoteBubbleIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-10 w-10" aria-hidden="true">
      <path
        d="M12 14h40a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H30l-12 8 3-8h-9a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z"
        stroke="#e26d9f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 32c0-3 1.8-5 4.7-5v3.1c-1.1 0-1.7.6-1.7 1.9v4h-3v-4Zm10 0c0-3 1.8-5 4.7-5v3.1c-1.1 0-1.7.6-1.7 1.9v4h-3v-4Z"
        fill="#e26d9f"
      />
    </svg>
  );
}

interface TestimonialsSectionProps {
  cooperClassName: string;
}

export function TestimonialsSection({ cooperClassName }: TestimonialsSectionProps) {
  return (
    <section className="relative z-20 bg-[#fff8f1] py-24 pb-8 px-6 md:px-12 border-t-4 border-black overflow-hidden">
      <DoodleFloat
        name="speech-bubble"
        size={84}
        delay={0.2}
        className="absolute top-16 right-2 md:right-10 hidden md:block pointer-events-none"
      />
      <DoodleFloat
        name="apple"
        size={70}
        delay={0.35}
        className="absolute bottom-15 left-2 md:left-12 hidden md:block pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className={`text-5xl md:text-6xl text-center mb-14 md:mb-17 text-left text-primary-dark ${cooperClassName}`}
        >
          Title
        </motion.h2>

        

        <div className="grid grid-cols-1 md:grid-cols-3 mb-10 gap-8 items-start">
          {testimonials.map((item, index) => {
            const reverseIndex = testimonials.length - 1 - index;
            const delay = reverseIndex * 0.2;

            return (
              <motion.article
                key={item.role}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay, ease: "easeOut" }}
                className={`bg-white rounded-3xl border-4 border-black p-10 shadow-[6px_6px_0px_0px_#000] min-h-85 ${desktopHeights[index]} flex flex-col justify-between`}
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.35, delay: delay + 0.1, ease: "easeOut" }}
                    className="mb-6"
                  >
                    <QuoteBubbleIcon />
                  </motion.div>

                  <blockquote className="text-lg text-black/80 leading-relaxed italic max-w-[32ch]">
                    "{item.quote}"
                  </blockquote>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: delay + 0.25, ease: "easeOut" }}
                  className="mt-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#e26d9f] text-white text-base font-bold grid place-items-center">
                      {item.initials}
                    </div>

                    <div>
                      <h3 className={`text-xl text-black leading-tight ${cooperClassName}`}>
                        {item.role}
                      </h3>
                      <p className="text-sm text-[#e26d9f] italic mt-1">{item.agencyType}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
              
            );
          })}
        </div>
    
      </div>

        <span className="hidden md:flex items-center justify-center gap-2 text-black font-bold text-lg [-webkit-text-stroke:0.5px_black]">
            <a href="https://www.linkedin.com/in/sam-lawless/#recommendations" target="_blank" rel="noopener noreferrer">
              See more &rarr;
            </a> 
            <LinkedinIcon /> 
        </span>
    </section>
  );
}
