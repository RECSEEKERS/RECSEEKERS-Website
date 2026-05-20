"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DoodleFloat } from "@/components/ui/DoodleFloat";

type HowItWorksTimelineProps = {
  cooperClassName: string;
};

const iconClass = "h-8 w-8 text-black";

const StepChatIcon = () => (
  <Image 
      src="/Illustrations/gettoknowIcon.svg" 
      alt="Getting to know you Icon" 
      width={28} 
      height={28} 
      className={iconClass} 
    />
);

const StepGraphIcon = () => (
  <Image 
      src="/Illustrations/detailsIcon.svg" 
      alt="Understanding details Icon" 
      width={28} 
      height={28} 
      className={iconClass} 
    />
);

const StepHandshakeIcon = () => (
  <Image 
      src="/Illustrations/dealIcon.svg" 
      alt="Deal Icon" 
      width={28} 
      height={28} 
      className={iconClass} 
    />
);

const StepCheckIcon = () => (
  <Image 
      src="/Illustrations/successIcon.svg" 
      alt="Success Icon" 
      width={28} 
      height={28} 
      className={iconClass} 
    />
);

const steps = [
  {
    number: "1",
    title: "We get to know you",
    body: "We build long-term relationships with top education recruiters and agencies.",
    icon: StepChatIcon,
  },
  {
    number: "2",
    title: "We understand the detail",
    body: "Performance, motivations, career goals, and ideal environment.",
    icon: StepGraphIcon,
  },
  {
    number: "3",
    title: "We introduce only genuine upgrades",
    body: "Selective, confidential introductions where there is a real step up for both sides.",
    icon: StepHandshakeIcon,
  },
  {
    number: "4",
    title: "Success-based model",
    body: "No placement, no fee. For key hires, we work on a retained basis.",
    icon: StepCheckIcon,
  },
] as const;

export function HowItWorksTimeline({ cooperClassName }: HowItWorksTimelineProps) {
  return (
    <section className="relative z-20 bg-[#fff8f1] py-20 md:py-32 px-6 md:px-12 flex flex-col items-center border-t-4 border-black overflow-hidden">
      <DoodleFloat
        name="books-3"
        size={110}
        delay={0.2}
        className="absolute top-12 left-2 lg:left-10 hidden md:block pointer-events-none"
      />
      <DoodleFloat
        name="pen"
        size={96}
        delay={0.4}
        className="absolute top-40 right-2 lg:right-12 hidden md:block pointer-events-none"
      />
      <DoodleFloat
        name="molecules-2"
        size={118}
        delay={0.55}
        className="absolute bottom-10 left-2 lg:left-12 hidden md:block pointer-events-none"
      />

      <div className="max-w-7xl w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-16"
        >
          <h2 className={`text-5xl lg:text-6xl leading-tight text-black ${cooperClassName}`}>
            How It Works
          </h2>
          <p className="mt-4 text-base md:text-lg text-black/80 max-w-3xl mx-auto leading-relaxed">
            A relationship-led, non-volume model designed to create genuine upgrades for both sides.
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-56 md:top-36 bottom-8 w-1 bg-black z-0 origin-top"
        />

        <div className="relative z-10 flex flex-col items-center gap-12 md:gap-16">
          {steps.map((step, index) => {
            const isRight = index % 2 === 1;
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 48, x: isRight ? 36 : -36 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative w-full max-w-lg md:w-[90%] self-center ${isRight ? "md:self-end md:mr-[2%]" : "md:self-start md:ml-[2%]"}`}
              >
                <div className="relative rounded-3xl border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.35, delay: index * 0.15 + 0.2 }}
                    className="absolute -top-7 left-6 h-15 w-15 rounded-full bg-[#FF69B4] border-[3px] border-white flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-2xl">{step.number}</span>
                  </motion.div>

                  <div className="h-6 w-6 mb-3 mt-2">
                    <Icon />
                  </div>
                  <h3 className={`text-2xl text-black mb-3 leading-tight ${cooperClassName}`}>
                    {step.title}
                  </h3>
                  <p
                    className="text-base text-black/80 leading-relaxed"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksTimeline;
