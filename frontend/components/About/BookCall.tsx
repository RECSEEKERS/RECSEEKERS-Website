"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cooper } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

type CTAVariant = "tertiary" | "dark" | "pink";

interface BottomCTAProps {
  variant?: CTAVariant;
}

const variantConfig: Record<CTAVariant, {
  sectionBg: string;
  bannerBg: string;
  eyebrow: string;
  heading: string;
  buttonVariant: "secondary" | "primary" | "text";
}> = {
  tertiary: {
    sectionBg: "bg-white",
    bannerBg: "bg-tertiary",
    eyebrow: "text-white/60",
    heading: "text-white",
    buttonVariant: "secondary",
  },
  dark: {
    sectionBg: "bg-white",
    bannerBg: "bg-primary-dark",
    eyebrow: "text-white/50",
    heading: "text-white",
    buttonVariant: "primary",
  },
  pink: {
    sectionBg: "bg-white",
    bannerBg: "bg-primary",
    eyebrow: "text-black/50",
    heading: "text-black",
    buttonVariant: "primary",
  },
};

export function BookCall({ variant = "tertiary" }: BottomCTAProps) {
  const ref = useRef(null);
  const router = useRouter();
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const cfg = variantConfig[variant];

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 'pass' | 'fail'>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    role: '',
    company: '',
    market: '',
    experience: '',
    billings: '',
    motivation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Send data to your backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      // Qualification Logic
      let isQualified = false;

      // Must be a recruiter to pass
      if (formData.role === "recruiter") {
        if (formData.market === "Education" || formData.market === "Tech") {
          // Education and Tech get easier entry (1+ years experience)
          isQualified = ["1-3", "3-5", "5+"].includes(formData.experience);
        } else if (formData.market === "Other") {
          // 'Other' markets require a higher bar (3+ years experience)
          isQualified = ["3-5", "5+"].includes(formData.experience);
        }
      }

      if (isQualified) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ffa4bb', '#000000', '#ffffff']
        });
        setStep('pass');
      } else {
        setStep('fail');
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setStep(1);
      setFormData({ 
        name: '', email: '', number: '', role: '', 
        company: '', market: '', experience: '', billings: '', motivation: '' 
      });
    }, 300); // Wait for modal exit animation
  };

  return (
    <>
      <section className={`${cfg.sectionBg} px-8 pb-12 relative z-10`}>
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 48 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className={`${cfg.bannerBg} rounded-3xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-black/10 shadow-lg`}
          >
            {/* Left: Text */}
            <div className="flex flex-col gap-2">
              <h3 className={`text-1xl lg:text-2xl leading-tight ${cfg.heading} ${cooper.className}`}>
                Are you an established education recruiter looking to take your career up a level? 
              </h3>
            </div>
            {/* Right: Button */}
            <div className="shrink-0 flex justify-center">
              <Button variant={cfg.buttonVariant} size="lg" onClick={() => setIsModalOpen(true)}>
                Book a call with Sam
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MULTI-STEP POPUP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-lg w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200 my-8">
            
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4 md:space-y-5">
                <div className="mb-6">
                  <h3 className={`${cooper.className} text-2xl md:text-3xl text-black mb-2`}>Book Your Call</h3>
                  <p className="text-sm md:text-base text-black/80 font-medium">Let's get some basic details first. (1/2)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-black mb-1">Full Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                  </div>
                  <div>
                    <label htmlFor="number" className="block text-sm font-bold text-black mb-1">Phone Number</label>
                    <input type="tel" id="number" name="number" value={formData.number} onChange={handleChange} required className="w-full px-3 py-2 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-black mb-1">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-bold text-black mb-1">Current Role</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange} required className={`w-full px-3 py-2 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${formData.role === "" ? "text-gray-400" : "text-black"}`}>
                      <option value="" disabled className="text-gray-400">Select role</option>
                      <option value="recruiter" className="text-black">Recruiter</option>
                      <option value="agency_owner" className="text-black">Agency Owner</option>
                      <option value="other" className="text-black">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-bold text-black mb-1">Company <span className="text-black/50 font-normal">(Optional)</span></label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-3 py-2 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                  </div>
                </div>

                <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 mt-4">
                  <button type="button" onClick={handleCloseAndReset} className="w-full md:w-1/3 bg-white text-black font-bold py-2 md:py-3 px-4 border-4 border-black hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Cancel
                  </button>
                  <button type="submit" className={`w-full md:w-2/3 bg-black text-white ${cooper.className} text-base md:text-lg py-2 md:py-3 px-6 border-4 border-black hover:bg-[#ffa4bb] hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all`}>
                    Next Step
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Qualification Questions */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4 md:space-y-5">
                <div className="mb-6">
                  <h3 className={`${cooper.className} text-2xl md:text-3xl text-black mb-2`}>A bit more context</h3>
                  <p className="text-sm md:text-base text-black/80 font-medium">Almost there. Tell us about your experience. (2/2)</p>
                </div>

                <div>
                  <label htmlFor="market" className="block text-sm font-bold text-black mb-1">What market do you recruit in?</label>
                  <select id="market" name="market" value={formData.market} onChange={handleChange} required className={`w-full px-3 py-2 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${formData.market === "" ? "text-gray-400" : "text-black"}`}>
                    <option value="" disabled className="text-gray-400">Select market</option>
                    <option value="Education" className="text-black">Education</option>
                    <option value="Tech" className="text-black">Tech</option>
                    <option value="Other" className="text-black">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-bold text-black mb-1">Years of Experience</label>
                  <select id="experience" name="experience" value={formData.experience} onChange={handleChange} required className={`w-full px-3 py-2 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${formData.experience === "" ? "text-gray-400" : "text-black"}`}>
                    <option value="" disabled className="text-gray-400">Select years</option>
                    <option value="<1" className="text-black">Less than 1 year</option>
                    <option value="1-3" className="text-black">1 - 3 years</option>
                    <option value="3-5" className="text-black">3 - 5 years</option>
                    <option value="5+" className="text-black">5+ years</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="billings" className="block text-sm font-bold text-black mb-1">Recent billings or performance?</label>
                  <input type="text" id="billings" name="billings" placeholder="e.g. $250k in the last 12 months" value={formData.billings} onChange={handleChange} required className="w-full px-3 py-2 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                </div>

                <div>
                  <label htmlFor="motivation" className="block text-sm font-bold text-black mb-1">What would make you consider a move?</label>
                  <textarea id="motivation" name="motivation" rows={3} value={formData.motivation} onChange={handleChange} required className="w-full px-3 py-2 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] resize-none" />
                </div>

                <div className="flex flex-col-reverse md:flex-row gap-3 pt-4 mt-4">
                  <button type="button" onClick={() => setStep(1)} className="w-full md:w-1/3 bg-white text-black font-bold py-2 md:py-3 px-4 border-4 border-black hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Back
                  </button>
                  <button type="submit" disabled={isSubmitting} className={`w-full md:w-2/3 bg-black text-white ${cooper.className} text-base md:text-lg py-2 md:py-3 px-6 border-4 border-black hover:bg-[#ffa4bb] hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all`}>
                    {isSubmitting ? 'Checking...' : 'See Availability'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3A: SUCCESS (Meets Requirements) */}
            {step === 'pass' && (
              <div className="text-center py-6 md:py-8 space-y-4 md:space-y-6">
                <h3 className={`${cooper.className} text-4xl md:text-5xl text-black`}>You're In!</h3>
                <p className="text-lg font-medium text-black/80 mt-4 mb-6">Looks like a great fit. Pick a time to chat with Sam below.</p>
                
                {/* CALENDLY LINK HERE */}
                <a 
                  href="https://calendly.com/YOUR_CALENDLY_LINK" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block w-full bg-[#ffa4bb] text-black ${cooper.className} text-lg py-3 px-6 border-4 border-black hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all`}
                >
                  Open Calendly
                </a>

                <button onClick={handleCloseAndReset} className="mt-4 font-bold text-black/60 hover:text-black transition-colors underline">
                  Close window
                </button>
              </div>
            )}

            {/* STEP 3B: FAIL (Does not meet requirements) */}
            {step === 'fail' && (
              <div className="text-center py-6 md:py-8 space-y-4 md:space-y-6">
                <h3 className={`${cooper.className} text-3xl md:text-4xl text-black`}>Sam is currently busy!</h3>
                <p className="text-base font-medium text-black/80 mt-4 mb-6">
                  Due to high volume, Sam is only taking calls with established recruiters right now. However, you can still join our network to stay in the loop!
                </p>
                
                <button 
                  onClick={() => router.push('/sign-up')}
                  className={`w-full bg-black text-white ${cooper.className} text-lg py-3 px-6 border-4 border-black hover:bg-[#ffa4bb] hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all`}
                >
                  Join the Network
                </button>

                <button onClick={handleCloseAndReset} className="mt-4 font-bold text-black/60 hover:text-black transition-colors underline">
                  Close window
                </button>
              </div>
            )}
            
          </div>
        </div>
      )}
    </>
  );
}