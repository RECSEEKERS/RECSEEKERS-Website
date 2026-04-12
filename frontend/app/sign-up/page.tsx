"use client";

import React, { useState } from 'react';
import localFont from 'next/font/local';
import confetti from 'canvas-confetti';
import Image from "next/image";

// Import the exact same font setup used in Candidates
const cooper = localFont({
  src: '../fonts/cooper-black-cdnfonts/coopbl.ttf', // Adjust path if necessary
  display: 'swap',
});

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // NEW: State to track if the user is already in the HubSpot database
  const [isExistingUser, setIsExistingUser] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    await handleFinalSubmit(e);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault(); 
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setIsExistingUser(false); // Reset before new submission

    const payload = { ...formData };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // NEW: Check if the API indicates the user already exists.
      // This assumes your backend returns a 409 Conflict status for duplicates.
      if (response.status === 409) {
        setIsExistingUser(true);
        setIsModalOpen(true);
        return; // Exit early so we don't trigger confetti
      }

      if (!response.ok) throw new Error("Failed to send message");

      // Only fire confetti for brand new sign-ups
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffa4bb', '#000000', '#ffffff']
      });

      setIsSuccess(true);
      setIsModalOpen(true);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
    setIsExistingUser(false); // Reset existing user state
    setFormData({ name: '', email: '', number: '' });
  };

  return (
    <main className="relative w-full bg-white overflow-x-hidden">
      <section className="snap-start relative z-20 min-h-screen bg-[#ffa4bb] pt-24 pb-16 px-4 md:pt-24 md:pb-24 md:px-8 flex flex-col justify-start items-center shadow-[0_16px_40px_0_rgba(0,0,0,0.1)]">
        
        <div className="max-w-6xl w-full mx-auto mt-4 md:mt-8">
          <h1 className={`${cooper.className} text-5xl md:text-6xl lg:text-7xl text-black mb-8 md:mb-12 leading-tight text-center`}>
            Join Our <span className="italic text-white">Community!</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white p-6 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            
            <div className="w-full md:w-1/2 flex flex-col justify-start space-y-6 md:space-y-8">
              <div>
                <h2 className={`${cooper.className} text-4xl md:text-5xl text-black mb-4`}>Sign up💌</h2>
                <p>
                  <span className="hidden md:block text-base md:text-xl text-black/80 font-medium leading-relaxed max-w-md">
                  Join a private community across <span className="font-bold text-[#ffa4bb]">Education Recruitment</span> and <span className="font-bold text-[#ffa4bb]">EdTech</span>!
                  <br></br>
                  <br></br>
                  With access to off-market opportunities, regular market updates, salary and commission benchmarks, training resources, and partner discounts across tools, tech, and platforms.
                  </span>
                </p>
              </div>

              <div className="pt-2 md:pt-6 mt-auto">
                <p className="text-xs md:text-sm text-black/60 font-medium leading-relaxed max-w-sm">
                  <strong>Privacy Note:</strong> By signing up, you agree to receive marketing emails from us. We use HubSpot to securely manage our lists. You can unsubscribe at any time. Read our{' '}
                  <a href="/privacy" className="underline hover:text-[#ffa4bb] transition-colors">
                    Privacy Policy
                  </a>{' '}for more details.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <form onSubmit={handleInitialSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-base md:text-lg font-bold text-black mb-1 md:mb-2">First Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base md:text-lg font-bold text-black mb-1 md:mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div>
                    <label htmlFor="number" className="block text-base md:text-lg font-bold text-black mb-1 md:mb-2">Phone Number</label>
                    <input
                        title="Your Phone Number"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name="number"
                        value={formData.number || ""} 
                        onChange={handleChange}
                        required
                        className={`w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                        ${!formData.number ? "text-gray-400" : "text-black"}`}
                    />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-black text-white ${cooper.className} text-lg md:text-xl py-3 md:py-4 px-6 border-4 border-black transition-all duration-200 mt-2 md:mt-4
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ffa4bb] hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Join Us!'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPUP MODAL --- */}
      {/* --- POPUP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-lg w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200 flex flex-col items-center">

            {/* --- MODAL CONTENT --- */}
            {/* Removed space-y to give finer control over vertical spacing around the image */}
            <div className="text-center py-6 md:py-8 flex flex-col items-center w-full">
              
              {/* Dynamic Header */}
              <h3 className={`${cooper.className} text-4xl md:text-5xl text-black mb-4 md:mb-6`}>
                Welcome to the Community!
                
                {/* {isExistingUser ? "You're already in ☑️!" : "Welcome to the Community"} */}
              </h3>

              {/* Decorative Image */}
              {/* Reduced width/height and added responsive width classes (w-40 mobile, w-48 desktop) with tighter vertical margins (my-2/my-3) */}
              <Image 
                src="/Illustrations/Signed-up2.svg" 
                alt="Welcome Illustration" 
                width={192} 
                height={192}
                className="w-40 md:w-48 h-auto my-2 md:my-3"
              />                

              {/* Increased text size (text-xl for mobile, text-2xl for desktop) */}
              <p className="text-xl md:text-2xl font-bold text-black/80 mt-2 md:mt-3">
                "Have a nice day!"
              </p>
              
              <button 
                onClick={handleCloseAndReset} 
                className={`${cooper.className} mt-6 md:mt-8 font-bold text-black border-2 border-black px-6 py-2 hover:bg-[#ffa4bb] transition-colors`}
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}