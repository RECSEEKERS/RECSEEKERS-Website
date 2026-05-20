"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cooper } from "@/lib/fonts";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalContentBlock {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

interface LegalPageTemplateProps {
  section: "privacy" | "terms";
  content: {
    privacy: LegalContentBlock;
    terms: LegalContentBlock;
  };
}

export function LegalPageTemplate({ section, content }: LegalPageTemplateProps) {
  const [activeSection, setActiveSection] = useState<"privacy" | "terms">(section);
  const SECTION_SCROLL_GAP = 52;

  const scrollToSection = (sectionId: "privacy" | "terms") => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const navbar = document.querySelector("nav");
    const navbarHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - SECTION_SCROLL_GAP;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveSection(sectionId);
  };

  useEffect(() => {
    setActiveSection(section);

    const hash = window.location.hash.replace("#", "");
    if (hash === "privacy" || hash === "terms") {
      setTimeout(() => scrollToSection(hash), 250);
      return;
    }

    setTimeout(() => scrollToSection(section), 100);
  }, [section]);

  return (
    <main className="-mt-6 min-h-screen border-t-4 border-black bg-[#fff8f1] pb-16 pt-34 md:pt-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className={`mb-4 text-4xl text-primary-dark md:text-5xl ${cooper.className}`}>Legal</h1>
          <p className="text-base text-primary-dark/80 md:text-lg">
            Privacy and terms information for using the RecSeekers website and services.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="flex w-full max-w-3xl border-b-2 border-primary/30">
            <button
              type="button"
              className={`px-4 py-3 text-sm font-semibold transition-colors md:px-6 md:text-base ${
                activeSection === "privacy"
                  ? "border-b-2 border-primary text-primary-dark"
                  : "border-b-2 border-transparent text-primary-dark/55 hover:text-primary-dark"
              }`}
              onClick={() => scrollToSection("privacy")}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className={`px-4 py-3 text-sm font-semibold transition-colors md:px-6 md:text-base ${
                activeSection === "terms"
                  ? "border-b-2 border-primary text-primary-dark"
                  : "border-b-2 border-transparent text-primary-dark/55 hover:text-primary-dark"
              }`}
              onClick={() => scrollToSection("terms")}
            >
              Terms and Conditions
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <section id="privacy" className="rounded-2xl border-2 border-primary/25 bg-white p-6 shadow-lg md:p-8">
            <h2 className={`mb-2 text-3xl text-primary-dark ${cooper.className}`}>{content.privacy.title}</h2>
            <p className="mb-6 text-sm text-primary-dark/60">Last updated: {content.privacy.lastUpdated}</p>
            <p className="mb-6 leading-relaxed text-primary-dark/85">{content.privacy.intro}</p>

            <div className="space-y-6 text-primary-dark/90">
              {content.privacy.sections.map((item) => (
                <article key={item.heading}>
                  <h3 className="mb-2 text-xl font-semibold text-primary-dark">{item.heading}</h3>
                  <div className="space-y-2 leading-relaxed">
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section id="terms" className="rounded-2xl border-2 border-primary/25 bg-white p-6 shadow-lg md:p-8">
            <h2 className={`mb-2 text-3xl text-primary-dark ${cooper.className}`}>{content.terms.title}</h2>
            <p className="mb-6 text-sm text-primary-dark/60">Last updated: {content.terms.lastUpdated}</p>
            <p className="mb-6 leading-relaxed text-primary-dark/85">{content.terms.intro}</p>

            <div className="space-y-6 text-primary-dark/90">
              {content.terms.sections.map((item) => (
                <article key={item.heading}>
                  <h3 className="mb-2 text-xl font-semibold text-primary-dark">{item.heading}</h3>
                  <div className="space-y-2 leading-relaxed">
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>

          <div className="pt-2 text-center">
            <Link href="/" className="inline-flex items-center font-semibold text-primary-dark transition-colors hover:text-primary">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
