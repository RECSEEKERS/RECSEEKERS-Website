"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DoodleFloat } from "@/components/ui/DoodleFloat";
import { cooper } from "@/lib/fonts";

type TestimonialItem = {
  quote: string;
  role: string;
  agencyType: string;
  initials: string;
};

type GoogleReviewItem = {
  rating: string;
  text: string;
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

const googleReviews: GoogleReviewItem[] = [
  {
    rating: "5.0",
    text:
      "Sam is one of the most experienced, down-to-earth and transparent recruiters you'll ever meet. Outstanding service!",
  },
  {
    rating: "5.0",
    text:
      "Sam listened to everything I was looking for in a new role. Couldn’t recommend Sam and the team more!",
  },
  {
    rating: "5.0",
    text:
      "Sam’s great, very knowledgeable & educated in the education recruitment market. Recommend!",
  },
  {
    rating: "5.0",
    text:
      "Easy and smooth communication from the off. Would highly recommend!",
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

function StarRow({ rating }: { rating: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-black">{rating}</span>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[...Array(5)].map((_, index) => (
          <svg key={index} viewBox="0 0 24 24" fill="#FBBC05" className="h-4 w-4">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

function GoogleReviewsCarousel() {
  const repeatedReviews = [...googleReviews, ...googleReviews];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
      className="mt-8 md:mt-10"
    >
      <div className="mb-4 text-center">
        <h3 className={`text-2xl md:text-3xl text-primary-dark ${cooper.className}`}>Google Reviews</h3>
      </div>

      <div className="relative block w-full overflow-hidden group/ticker">
        <div className="flex w-max animate-ticker group-hover/ticker:[animation-play-state:paused] gap-6 py-2">
          {repeatedReviews.map((review, index) => (
            <article
              key={`${review.text}-${index}`}
              className="shrink-0 w-[18rem] sm:w-[20rem] md:w-84 h-64 rounded-3xl border-4 border-black bg-[#fdf7f8] p-6 shadow-[6px_6px_0px_0px_#000] flex flex-col"
            >
              <StarRow rating={review.rating} />

              <div className="mt-4 flex flex-1 flex-col">
                <blockquote className="flex-1 text-black/80 italic leading-relaxed text-base md:text-[1.05rem]">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                <div className="mt-auto flex items-center gap-3 pt-2">
                  <div className="h-10 w-10 rounded-full bg-[#e26d9f] text-white text-sm font-bold grid place-items-center shrink-0">
                    GR
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-black leading-tight">Google Review</p>
                    <p className="text-xs text-[#e26d9f] leading-tight">Anonymous profile</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="https://www.google.co.uk/maps/place/RECSEEKERS/@45.7843307,-8.4357858,8014811m/data=!3m1!1e3!4m16!1m9!3m8!1s0xe807dd0f8e534c7:0xf4bf396f11dd0b67!2sRECSEEKERS!8m2!3d47.73855!4d12.5088275!9m1!1b1!16s%2Fg%2F11w_hhbl2b!3m5!1s0xe807dd0f8e534c7:0xf4bf396f11dd0b67!8m2!3d47.73855!4d12.5088275!16s%2Fg%2F11w_hhbl2b?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-2xl border-4 border-black bg-primary px-6 py-3 text-lg font-medium text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-0.75 hover:translate-y-0.75 hover:shadow-none focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 font-cooper"
        >
          Give us a review!
        </Link>
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
                    &ldquo;{item.quote}&rdquo;
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
                      <h3 className={`text-xl text-black leading-tight ${cooper}`}>
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
        <GoogleReviewsCarousel />
      </div>
    </section>
  );
}
