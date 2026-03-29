import { cooper } from '@/lib/fonts';

import Link from 'next/link';

const sitemapGroups = [
    {
        title: 'Site Map',
        links: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Candidates', href: '/candidates' },
            { label: 'Employers', href: '/employers' },
            { label: 'Jobs', href: '/jobs' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Terms', href: '/terms' },
            { label: 'Privacy', href: '/privacy' },
        ],
    },
] as const;

const socialLinks = [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Email', href: 'mailto:hello@recseekers.com' },
    { label: 'Phone', href: 'tel:+1234567890' },
] as const;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-20 w-full border-t-4 border-black bg-primary-dark px-6 py-14 text-white md:px-10 md:py-18">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 md:grid-cols-[1.2fr_1.8fr_1fr] md:gap-10">
                <section className="flex flex-col items-start">
                    <img src="/logo-white.svg" alt="RecSeekers" className="h-10 w-auto" />
                    <p className={`mt-3 text-xl ${cooper.className} leading-tight opacity-95`}>
                        Have a nice day
                    </p>
                </section>

                <section className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {sitemapGroups.map((group) => (
                        <div key={group.title}>
                            <h3 className={`text-xl ${cooper.className} mb-3`}>{group.title}</h3>
                            <ul className="space-y-2">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="inline-block text-base font-medium opacity-90 transition-all duration-200 hover:translate-x-1 hover:opacity-100"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <section>
                    <h3 className={`text-xl ${cooper.className} mb-3`}>Socials</h3>
                    <ul className="space-y-2">
                        {socialLinks.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    className="inline-block text-base font-medium opacity-90 transition-all duration-200 hover:translate-x-1 hover:opacity-100"
                                >
                                    {social.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-3 border-t border-white/25 pt-5 text-sm text-white/85 md:flex-row md:items-center md:justify-between">
                <p>RecSeekers © {currentYear}</p>
                <a
                    href="https://storyset.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all duration-200 hover:opacity-100 opacity-90 ${cooper.className}`}
                >
                    Illustrations by Storyset
                </a>
            </div>
        </footer>
    );
}