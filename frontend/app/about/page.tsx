import { cooper } from '@/lib/fonts';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ValuesSection } from '@/components/About/ValuesSection';
import { TeamSection } from '@/components/About/TeamSection';
import { ClientsSection } from '@/components/About/ClientsSection';
import { WhereWeWorkSection } from '@/components/About/WhereWeWorkSection';
import { BottomCTA } from '@/components/employers/BottomCTA';
import DoodleFloat from '@/components/ui/DoodleFloat';
import ElfsightLinkedInFeed from '@/components/About/ElfsightLinkedInFeed';

const statCards = [
  {
    title: "Recruitment Industry Experts",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "15+ Years Experience",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "High Energy Start-up",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* --- Hero / Heading Section --- */}
      <section className="relative min-h-[50vh] flex flex-col bg-primary items-center border-black border-b-4 justify-center px-8 pt-24 pb-12 overflow-hidden">
        
        {/* We moved the 'relative' container here. 
            All doodles are now positioned relative to THIS central text block, not the screen. */}
        <div className="relative max-w-6xl w-full z-20">
          
          {/* --- Background Doodles (Pushed strictly to the OUTSIDE of the content) --- */}
          {/* Left Side */}
          <div className="absolute top-0 -left-12 lg:-left-32 xl:-left-40 hidden md:block z-0 pointer-events-none">
            <DoodleFloat name={"gradcap-2"} size={100} delay={0.1} />
          </div>
          {/* This is the book that was overlapping the button */}
          <div className="absolute bottom-15 -left-10 lg:-left-28 xl:-left-36 hidden md:block z-0 pointer-events-none">
            <DoodleFloat name={"open-book"} size={140} delay={1.5} />
          </div>

          {/* Right Side */}
          <div className="absolute top-8 -right-12 lg:-right-32 xl:-right-40 hidden md:block z-0 pointer-events-none">
            <DoodleFloat name={"pencil-2"} size={110} delay={0.1} />
          </div>
          
          <div className="absolute bottom-4 -right-12 lg:-right-28 xl:-right-40 hidden md:block z-0 pointer-events-none">
            <DoodleFloat name={"globe"} size={130} delay={1.5} />
          </div>

          {/* --- Content --- */}
          <div className="relative z-10">
            <h1 className={`${cooper.className} text-7xl md:text-8xl text-black mb-12 leading-tight`}>
              Who are we?
            </h1>

            {/* Two-column layout */}
            <div className="flex flex-col lg:flex-row gap-24 items-start">

              {/* Left: subtext (2/3) */}
              <div className="w-full lg:w-2/3 flex flex-col gap-8">
                <div className="relative pl-7">
                  {/* Animated rounded accent bar */}
                  <div
                    className="accent-bar absolute left-0 top-0 w-[7px] rounded-full bg-white"
                    style={{ height: 0 }}
                  />
                  <p className="text-xl md:text-2xl text-black leading-relaxed">
                    At RecSeekers, we specialise in connecting top-tier recruitment professionals
                    with the best opportunities in the industry. As a rec2rec agency, we pride
                    ourselves on understanding the unique needs of both candidates and clients,
                    ensuring the perfect match every time. Our expert team leverages deep industry
                    insights and a vast network to support the growth and success of recruitment
                    professionals across various sectors. Partner with RecSeekers and take the
                    next step in your recruitment career or find the ideal addition to your team.
                  </p>
                </div>

                {/* Button & Doodle Container */}
                <div className="relative self-start mt-4">
                  <Link href="/contact" className="group inline-block">
                    <Button className={`${cooper.className} text-black! px-10 py-4 bg-[#1e293b] text-lg tracking-wider rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-white! group-hover:shadow-none transition-all`}>
                      Get In Touch!
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: stat cards (1/3) */}
              <div className="w-full lg:w-1/3 flex flex-col gap-6">
                {statCards.map((card, i) => (
                  <div
                    key={card.title}
                    className="flex items-center gap-5 p-6 border-4 rounded-4xl bg-white relative z-10"
                    style={{
                      animation: `slideInRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) both`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl border-4 border-black bg-primary flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black">
                      {card.icon}
                    </div>
                    <p className={`${cooper.className} text-lg leading-snug text-black`}>
                      {card.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ValuesSection />
      <WhereWeWorkSection />
      <TeamSection />
      {/* <ClientsSection /> */}

      {/* --- Jobs Section --- */}
      {/* Added 'relative' to contain the absolute positioned doodles */}
      <section className="relative bg-white border-t-4 border-black px-8 pt-20 pb-64">
        
        {/* --- Background Doodles --- */}
        {/* Left Side */}
        <div className="absolute top-72 left-10 md:left-24 hidden xl:block z-0 pointer-events-none">
          <DoodleFloat name={"proctator"} size={160} delay={0.2} />
        </div>

        {/* Right Side */}
        <div className="absolute top-22 right-10 md:right-24 hidden xl:block z-0 pointer-events-none">
          <DoodleFloat name={"lamp-1"} size={200} delay={0.7} />
        </div>

        {/* Added relative z-10 so the text and future iframes stay above the doodles */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* <p className={`${cooper.className} text-lg text-black/40 uppercase tracking-widest mb-2`}>
            Join the team
          </p> */}
          <h2 className={`${cooper.className} text-center text-6xl md:text-7xl text-black mb-6`}>
            Check us out in LinkedIn
          </h2>
          {/* <p className="text-xl text-black/60 max-w-2xl leading-relaxed">
            We&apos;re always on the lookout for ambitious, people-first talent to grow with us.
            Take a look at what&apos;s open - and if nothing fits yet, get in touch anyway.
          </p> */}


          {/* LinkedIn iframes will go here */}
           
          <div className="flex flex-col items-center gap-10 w-full">

            {/* FREE Method with RSS and Make.com (doesnt work) <GetLinkedInFeed /> */}
          
            {/* PAID/bad free tier with Elfsight */}
            <ElfsightLinkedInFeed />
          
            {/* MANUAL WAY */}
            {/* <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7438882540100354048" height="496" width="504" frameBorder="0" allowFullScreen title="Embedded post"></iframe>
            <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7439125575396392960" height="1113" width="504" frameBorder="0" allowFullScreen title="Embedded post"></iframe>
            <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7437692741268115456" height="727" width="504" frameBorder="0" allowFullScreen title="Embedded post"></iframe> */}
          </div>
        </div>
        
      </section>
  
      <BottomCTA variant="dark" />
    </main>
  );
}