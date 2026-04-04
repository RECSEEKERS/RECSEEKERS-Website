import Link from "next/link";

import { cooper } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";

export default function SearchPage() {
  return (
    <main className="relative w-full overflow-hidden bg-white">
      <section className="relative min-h-[48vh] flex flex-col bg-primary items-center border-black border-b-4 justify-center px-6 md:px-10 pt-24 md:pt-28 pb-12 overflow-hidden">
        <div className="relative max-w-6xl w-full">
          <h1
            className={`${cooper.className} text-5xl sm:text-6xl md:text-8xl text-black mb-6 leading-tight`}
          >
            Search
          </h1>

          <p className="max-w-3xl text-lg md:text-2xl text-black/90 leading-relaxed">
            A single place to find what you need — roles, insights, and the most
            relevant parts of the site.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact">
              <Button variant="primary" size="lg" className={cooper.className}>
                Ask us to find it
              </Button>
            </Link>
            <Link href="/">
              <Button variant="text" size="lg" className={cooper.className}>
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 md:px-10 py-16 border-b-4 border-black">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className={`${cooper.className} text-3xl md:text-5xl text-black mb-4`}>
            Coming next
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed max-w-3xl">
            This page is a placeholder destination for now. If you want, I can
            wire up a real search experience later (site pages, blog posts, or
            Sanity content) — but I’m keeping it simple per your “same as before”
            request.
          </p>
        </div>
      </section>
    </main>
  );
}
