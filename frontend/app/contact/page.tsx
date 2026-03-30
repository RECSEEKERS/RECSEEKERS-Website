"use client";

import React, { useState } from 'react';
import localFont from 'next/font/local';

// Import the exact same font setup used in Candidates
const cooper = localFont({
  src: '../fonts/cooper-black-cdnfonts/coopbl.ttf', // Adjust path if necessary
  display: 'swap',
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    q1: '', 
    q2: ''  
  });
  const [outcome, setOutcome] = useState<null | 'calendar' | 'email' | 'nothing'>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModalData(prev => ({ ...prev, [name]: value }));
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true); 
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalOutcome: 'calendar' | 'email' | 'nothing' = 'email';

    if (formData.role === 'recruiter') {
      if (modalData.q1 === 'browsing' || modalData.q2 === 'no') {
        finalOutcome = 'nothing'; 
      } else if (modalData.q1 === 'active' && modalData.q2 === 'yes') {
        finalOutcome = 'calendar'; 
      } else {
        finalOutcome = 'email'; 
      }
    } 
    else if (formData.role === 'agency') {
      if (modalData.q1 === 'pipeline' || modalData.q2 === 'no') {
        finalOutcome = 'nothing'; 
      } else if (modalData.q1 === 'immediate' && modalData.q2 === 'yes') {
        finalOutcome = 'calendar'; 
      } else {
        finalOutcome = 'email'; 
      }
    }

    const payload = {
      ...formData,
      ...modalData,
      outcome: finalOutcome
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setOutcome(finalOutcome);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    setIsModalOpen(false);
    setOutcome(null);
    setFormData({ name: '', email: '', role: '', message: '' });
    setModalData({ q1: '', q2: '' });
  };

  return (
    <main className="relative w-full bg-white overflow-x-hidden">
      <section className="snap-start relative z-20 min-h-screen bg-[#ffa4bb] py-24 px-8 flex flex-col justify-center items-center shadow-[0_16px_40px_0_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl w-full mx-auto">
          <h1 className={`${cooper.className} text-6xl lg:text-7xl text-black mb-12 leading-tight text-center`}>
            Reach <span className="italic text-white">Out!</span>
          </h1>

          <div className="flex flex-col md:flex-row gap-12 bg-white p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            
            <div className="w-full md:w-1/2 flex flex-col justify-start space-y-8">
              <div>
                <h2 className={`${cooper.className} text-5xl text-black mb-4`}>Say Hello👋</h2>
                <p className="text-xl text-black/80 font-medium leading-relaxed max-w-md">
                  Most of the people we work with are established billers who care about getting their next move right.<br /><br /> We focus on relationships and long term conversations rather than high volume outreach.<br /><br />If you run an education recruitment agency looking to hire strong consultants, or you’re an experienced recruiter thinking about your next move, feel free to reach out.
                </p>
              </div>
              
              <div className="space-y-6 text-lg font-medium text-black">
                <div className="flex items-center">
                  <span className={`${cooper.className} text-xl w-24`}>Phone:</span>
                  <span>+61 0437769683</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <form onSubmit={handleInitialSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-bold text-black mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-bold text-black mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-lg font-bold text-black mb-2">I am a...</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer
                      ${formData.role === "" ? "text-gray-400" : "text-black"}`}
                  >
                    <option value="" disabled className="text-gray-400">Select your role</option>
                    <option value="recruiter" className="text-black">Recruiter (Looking for a move)</option>
                    <option value="agency" className="text-black">Agency (Looking to hire)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-bold text-black mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-4 border-black bg-white text-black font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all resize-none placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full bg-black text-white ${cooper.className} text-xl py-4 px-6 border-4 border-black hover:bg-[#ffa4bb] hover:text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 mt-4`}
                >
                  Next Step 👉
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPUP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-8 max-w-lg w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200">
            
            {!outcome ? (
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <h3 className={`${cooper.className} text-3xl text-black mb-2`}>Just a few more details...</h3>
                <p className="text-black/80 font-medium mb-6">This helps us point you in the right direction.</p>

                {/* --- RECRUITER QUESTIONS --- */}
                {formData.role === 'recruiter' && (
                  <>
                    <div>
                      <label htmlFor="q1" className="block text-lg font-bold text-black mb-2">What is your current situation?</label>
                      <select title="Q1" name="q1" value={modalData.q1} onChange={handleModalChange} required className={`w-full px-4 py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${modalData.q1 === "" ? "text-gray-400" : "text-black"}`}>
                        <option value="" disabled className="text-gray-400">Select status</option>
                        <option value="active" className="text-black">Actively looking to move</option>
                        <option value="passive" className="text-black">Passively open to offers</option>
                        <option value="browsing" className="text-black">Just browsing</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q2" className="block text-lg font-bold text-black mb-2">Would you like a confidential chat?</label>
                      <select name="q2" value={modalData.q2} onChange={handleModalChange} required className={`w-full px-4 py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${modalData.q2 === "" ? "text-gray-400" : "text-black"}`}>
                        <option value="" disabled className="text-gray-400">Select preference</option>
                        <option value="yes" className="text-black">Yes, let's talk</option>
                        <option value="no" className="text-black">No, just email me</option>
                      </select>
                    </div>
                  </>
                )}

                {/* --- AGENCY QUESTIONS --- */}
                {formData.role === 'agency' && (
                  <>
                    <div>
                      <label htmlFor="q1" className="block text-lg font-bold text-black mb-2">When are you looking to hire?</label>
                      <select title="Q1" name="q1" value={modalData.q1} onChange={handleModalChange} required className={`w-full px-4 py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${modalData.q1 === "" ? "text-gray-400" : "text-black"}`}>
                        <option value="" disabled className="text-gray-400">Select timeline</option>
                        <option value="immediate" className="text-black">Immediately</option>
                        <option value="next_quarter" className="text-black">Within the next quarter</option>
                        <option value="pipeline" className="text-black">Just building a pipeline</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q2" className="block text-lg font-bold text-black mb-2">Would you like to schedule a discovery call?</label>
                      <select title="Q2" name="q2" value={modalData.q2} onChange={handleModalChange} required className={`w-full px-4 py-3 border-4 border-black bg-white font-medium focus:outline-none focus:ring-4 focus:ring-[#ffa4bb]/50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer ${modalData.q2 === "" ? "text-gray-400" : "text-black"}`}>
                        <option value="" disabled className="text-gray-400">Select preference</option>
                        <option value="yes" className="text-black">Yes, let's talk</option>
                        <option value="no" className="text-black">No, just email me</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="w-1/3 bg-white text-black font-bold py-3 px-4 border-4 border-black hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-2/3 bg-black text-white ${cooper.className} text-lg py-3 px-6 border-4 border-black hover:bg-[#ffa4bb] hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            ) : (
              
              /* --- OUTCOME VIEWS --- */
              <div className="text-center py-6 space-y-6">
                
                {outcome === 'calendar' && (
                  <>
                    <h3 className={`${cooper.className} text-4xl text-black`}>Let's Chat! 📅</h3>
                    <p className="text-lg font-medium text-black/80">We'd love to speak with you right away. Pick a time on our calendar below.</p>
                    <a href="https://calendly.com/your-link" target="_blank" rel="noreferrer" className="inline-block w-full bg-[#ffa4bb] text-black font-bold text-xl py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#ffa4bb] transition-all">
                      Book a Time
                    </a>
                  </>
                )}

                {outcome === 'email' && (
                  <>
                    <h3 className={`${cooper.className} text-4xl text-black`}>Got it! 📧</h3>
                    <p className="text-lg font-medium text-black/80">Thanks for reaching out. We've received your info and will send you an email shortly!</p>
                  </>
                )}

                {outcome === 'nothing' && (
                  <>
                    <h3 className={`${cooper.className} text-4xl text-black`}>Thanks! 🙌</h3>
                    <p className="text-lg font-medium text-black/80">We appreciate you dropping by. We'll be in touch soon!</p>
                  </>
                )}

                <button onClick={handleCloseAndReset} className="mt-6 font-bold text-black underline decoration-2 underline-offset-4 hover:text-[#ffa4bb]">
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}