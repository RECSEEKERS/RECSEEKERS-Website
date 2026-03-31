"use client";

import { motion } from "framer-motion";
import { DoodleFloat } from "@/components/ui/DoodleFloat";

type TestimonialItem = {
  quote: string;
  role: string;
  agencyType: string;
  initials: string;
};

const testimonials: TestimonialItem[] = [
  {
    quote:
      "Sam understood exactly what I was looking for without me needing to spell it out. Only brought roles that were genuine upgrades.",
    role: "Senior Consultant",
    agencyType: "Independent Education Agency",
    initials: "SC",
  },
  {
    quote:
      "Perfect match between what we needed and who they introduced. Already billing strongly.",
    role: "Branch Manager",
    agencyType: "Growing Education Group",
    initials: "BM",
  },
  {
    quote:
      "Knew the education recruitment market inside out. Saved us months of searching.",
    role: "Director",
    agencyType: "Large Multi-Office Agency",
    initials: "DR",
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

// Google Rating
function GoogleRating() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
      className="flex justify-center md:mb-1"
    >


      <div className="">
        {/* Google Logo & "Rating" */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-xl font-medium font-sans"><a href="">Google Rating</a></span> {/* add google reviews profile here */}
        </div>

        {/* Stars & Reviews */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800 text-xl">5.0</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="#FBBC05" className="w-5 h-5">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          {/* NUMBER OF REVIEWS <span className="text-gray-400 text-sm font-medium ml-1">202 reviews</span> */}
        </div>
      </div>
    </motion.div>
  );
}

interface TestimonialsSectionProps {
  cooperClassName: string;
}

export function TestimonialsSection({ cooperClassName }: TestimonialsSectionProps) {
  return (
    <section className="relative z-20 bg-primary py-24 pb-8 px-6 md:px-12 border-t-4 border-black overflow-hidden">
      <DoodleFloat
        name="speech-bubble"
        size={84}
        delay={0.2}
        className="absolute top-7 right-1 md:top-16 md:right-10 pointer-events-none opacity-55 sm:opacity-70 md:opacity-100 scale-75 md:scale-100 origin-top-right"
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
          className={`text-5xl md:text-6xl text-center mb-14 md:mb-17 text-primary-dark ${cooperClassName}`}
        >
          What Recruiters Say About Us
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
        <GoogleRating />
      </div>
    </section>
  );
}
