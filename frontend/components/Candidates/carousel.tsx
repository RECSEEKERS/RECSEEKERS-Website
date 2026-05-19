import { cooper } from "@/lib/fonts";

const sectors = [
    { name: "education", desc: "Deep domain understanding of education recruitment desks and hiring cycles." },
    { name: "sales", desc: "Commercially sharp recruiters with proven billings and relationship depth." },
    { name: "leadership", desc: "Team leaders and managers who can scale desks and mentor consultants." },
    { name: "growth", desc: "Candidates who can open markets, launch teams, and accelerate agency growth." },
    { name: "culture", desc: "Strong cultural fit with long-term mindset, not short-term placement behavior." },
];

export default function CandidatesCarousel() {
    return (
        <section className="snap-start relative z-20 min-h-[60vh] bg-pink-300 py-24 flex flex-col items-center justify-center border-y-4 border-black shadow-[0_-8px_0_0_rgba(0,0,0,1)]">
            <div className="w-full">
                <h2 className="text-center mb-16 px-8 text-5xl text-black font-cooper">
                    What do we look for?
                </h2>

                <div className="relative block w-full group/ticker py-8 bg-white border-y-4 border-black">
                    <div className="flex w-max animate-ticker group-hover/ticker:[animation-play-state:paused] gap-8 px-4">
                        {[...sectors, ...sectors, ...sectors].map((sector, idx) => (
                            <div
                                key={`${sector.name}-${idx}`}
                                className="relative group/card flex-shrink-0 w-64 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#f3f3f3] cursor-help transition-transform hover:-translate-y-2"
                            >
                                <h3 className={`text-2xl text-center text-black ${cooper.className}`}>
                                    {sector.name}
                                </h3>

                                <div className="absolute left-1/2 -bottom-4 translate-y-full -translate-x-1/2 w-72 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:pointer-events-auto transition-all duration-300 z-50">
                                    <p className="text-black font-medium text-center text-sm">
                                        {sector.desc}
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
