"use client";

import React, { useState } from 'react';
import localFont from 'next/font/local';
import confetti from 'canvas-confetti';

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
    role: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    q1: '', 
    q2: ''  
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModalData(prev => ({ ...prev, [name]: value }));
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // FIX: Ignore clicks if we are already processing a submission
    if (isSubmitting) return;

    // Standardize input for checking
    const role = formData.role.toLowerCase().trim();
    const needsMoreDetails = role === 'recruiter' || role === 'agency';

    if (needsMoreDetails) {
      setIsModalOpen(true);
    } else {
      // Direct submission if no extra questions are needed
      await handleFinalSubmit(e);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault(); 
    
    // FIX: Extra layer of protection against double execution
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    const payload = {
      ...formData,
      ...(isModalOpen ? modalData : {}), 
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send message");

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffa4bb', '#000000', '#ffffff']
      });

      setIsSuccess(true);
      if (!isModalOpen) setIsModalOpen(true); 

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
    setFormData({ name: '', email: '', number: '', role: '' });
    setModalData({ q1: '', q2: '' });
  };

  return (
    <main className="relative w-full bg-white overflow-x-hidden">
      <section className="snap-start relative z-20 min-h-screen bg-[#ffa4bb] pt-24 pb-16 px-4 md:pt-24 md:pb-24 md:px-8 flex flex-col justify-start items-center shadow-[0_16px_40px_0_rgba(0,0,0,0.1)]">
        
        <div className="max-w-6xl w-full mx-auto mt-4 md:mt-8">
          <h1 className={`${cooper.className} text-5xl md:text-6xl lg:text-7xl text-black mb-8 md:mb-12 leading-tight text-center`}>
            Sign up and <span className="italic text-white">Grow!</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white p-6 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            
            <div className="w-full md:w-1/2 flex flex-col justify-start space-y-6 md:space-y-8">
              <div>
                <h2 className={`${cooper.className} text-4xl md:text-5xl text-black mb-4`}>Join Us🌐</h2>
                <p>
                  <span className="block md:hidden text-base md:text-xl text-black/80 font-medium leading-relaxed max-w-md">
                  
                  </span>

                  <span className="hidden md:block text-base md:text-xl text-black/80 font-medium leading-relaxed max-w-md">
                  Get <span className="font-bold text-primary">first access</span> to roles, expert market insight, PDFs, salary surveys and anything we release <span className="font-bold text-primary">before it goes public</span>!<br /><br />Take part in our monthly competitions, giveaways, care packages and more!
                  </span>
                  <br></br>
                  <span className="hidden md:block text-base md:text-xl text-black/80 font-medium leading-relaxed max-w-md" >And of course, lots of information with tips and updates!</span>
                </p>
              </div>

              <div className="pt-2 md:pt-6 mt-auto">
                <p className="text-xs md:text-sm text-black/60 font-medium leading-relaxed max-w-sm">
                  <strong>Privacy Note:</strong> By subscribing, you agree to receive marketing emails from us. We use HubSpot to securely manage our lists. You can unsubscribe at any time. Read our{' '}
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
                    maxLength={100}
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
                    maxLength={100}
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
                      maxLength={100}
                        required
                        className={`w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                        ${!formData.number ? "text-gray-400" : "text-black"}`}
                    />
                </div>
                <div>
                  <label htmlFor="role" className="block text-base md:text-lg font-bold text-black mb-1 md:mb-2">Current Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    maxLength={150}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                {/* FIX: Added disabled state and dynamic text to the main button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-black text-white ${cooper.className} text-lg md:text-xl py-3 md:py-4 px-6 border-4 border-black transition-all duration-200 mt-2 md:mt-4
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ffa4bb] hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe 👉'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPUP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-6 md:p-8 max-w-lg w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200">
            
            {!isSuccess ? (
              <form onSubmit={handleFinalSubmit} className="space-y-4 md:space-y-6">
                <h3 className={`${cooper.className} text-2xl md:text-3xl text-black mb-2`}>Just a few more details...</h3>
                <p className="text-sm md:text-base text-black/80 font-medium mb-4 md:mb-6">This helps us send you the most relevant content.</p>

                {/* --- RECRUITER QUESTIONS --- */}
                {formData.role.toLowerCase().trim() === 'recruiter' && (
                  <>
                    <div>
                      <label htmlFor="q1" className="block text-base md:text-lg font-bold text-black mb-1 md:mb-2">What is your current situation?</label>
                      <select title="Q1" name="q1" value={modalData.q1} onChange={handleModalChange} required className={`w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${modalData.q1 === "" ? "text-gray-400" : "text-black"}`}>
                        <option value="" disabled className="text-gray-400">Select status</option>
                        <option value="active" className="text-black">Actively looking to move</option>
                        <option value="passive" className="text-black">Passively open to offers</option>
                        <option value="browsing" className="text-black">Just browsing</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q2" className="block text-base md:text-lg font-bold text-black mb-1 md:mb-2">Would you like a confidential chat?</label>
                      <select title="Select preference" name="q2" value={modalData.q2} onChange={handleModalChange} required className={`w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${modalData.q2 === "" ? "text-gray-400" : "text-black"}`}>
                        <option value="" disabled className="text-gray-400">Select preference</option>
                        <option value="yes" className="text-black">Yes, let&apos;s talk</option>
                        <option value="no" className="text-black">No, just email me</option>
                      </select>
                    </div>
                  </>
                )}

                {/* --- AGENCY QUESTIONS --- */}
                {formData.role === 'agency' && (
                  <>
                    <div>
                      <label htmlFor="q1" className="block text-base md:text-lg font-bold text-black mb-1 md:mb-2">When are you looking to hire?</label>
                      <select title="Q1" name="q1" value={modalData.q1} onChange={handleModalChange} required className={`w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${modalData.q1 === "" ? "text-gray-400" : "text-black"}`}>
                        <option value="" disabled className="text-gray-400">Select timeline</option>
                        <option value="immediate" className="text-black">Immediately</option>
                        <option value="next_quarter" className="text-black">Within the next quarter</option>
                        <option value="pipeline" className="text-black">Just building a pipeline</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q2" className="block text-base md:text-lg font-bold text-black mb-1 md:mb-2">Would you like to schedule a discovery call?</label>
                      <select title="Q2" name="q2" value={modalData.q2} onChange={handleModalChange} required className={`w-full px-3 md:px-4 py-2 md:py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${modalData.q2 === "" ? "text-gray-400" : "text-black"}`}>
                        <option value="" disabled className="text-gray-400">Select preference</option>
                        <option value="yes" className="text-black">Yes, let&apos;s talk</option>
                        <option value="no" className="text-black">No, just email me</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="w-full md:w-1/3 bg-white text-black font-bold py-2 md:py-3 px-4 border-4 border-black hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full md:w-2/3 bg-black text-white ${cooper.className} text-base md:text-lg py-2 md:py-3 px-6 border-4 border-black hover:bg-[#ffa4bb] hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                  >
                    {isSubmitting ? 'Sending...' : 'Complete Sign Up'}
                  </button>
                </div>
              </form>
            ) : (
              
              /* --- SUCCESS VIEW --- */
              <div className="text-center py-8 md:py-10 space-y-4 md:space-y-6">
                <h3 className={`${cooper.className} text-4xl md:text-5xl text-black`}>Time to lead together</h3>
                <p className="text-lg font-medium text-black/80 mt-4">You&apos;re officially on the list.</p>
                <button onClick={handleCloseAndReset} className="mt-8 font-bold text-black border-2 border-black px-6 py-2 hover:bg-[#ffa4bb] transition-colors">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}