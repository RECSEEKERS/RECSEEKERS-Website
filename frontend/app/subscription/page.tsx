import Link from "next/link";

import { cooper } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";

export default function SubscriptionPage() {
  return (
    <main className="relative w-full overflow-hidden bg-white">
      <section className="relative min-h-[48vh] flex flex-col bg-primary items-center border-black border-b-4 justify-center px-6 md:px-10 pt-24 md:pt-28 pb-12">
        <div className="relative max-w-6xl w-full">
          <h1
            className={`${cooper.className} text-5xl sm:text-6xl md:text-8xl text-black mb-6 leading-tight`}
          >
            Subscription
          </h1>

          <p className="max-w-3xl text-lg md:text-2xl text-black/90 leading-relaxed">
            Updates, insights, and opportunities — delivered in a format that’s
            useful (not spammy).
          </p>

        </div>
      </section>

      <section className="bg-white px-6 md:px-10 py-16 border-b-4 border-black">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className={`${cooper.className} text-3xl md:text-5xl text-black mb-4`}>
            What you’ll get
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed max-w-3xl">
            This page is ready for you to plug in your subscription flow later
            (email sign-up, gated roles, or a simple contact-driven list). For now
            it’s a clear destination page linked from the nav.
          </p>
        </div>
      </section>
    </main>
  );
}
