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
    { label: 'Instagram', href: 'https://www.instagram.com/recseekers' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/recseekers-r2r/' },
    // { label: 'Email', href: 'mailto:hello@recseekers.com' },
    // { label: 'Phone', href: 'tel:+1234567890' },
] as const;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-20 w-full border-t-4 border-black bg-primary px-6 py-10 md:px-10 md:py-18 text-white">
            
            {/* --- DESKTOP VIEW (Hidden on Mobile) --- */}
            <div className="mx-auto hidden w-full max-w-7xl md:grid grid-cols-[1.2fr_1.8fr_1fr] gap-10">
                <section className="flex flex-col items-start">
                    <img src="/rec-logo.svg" alt="RECSEEKERS" className="h-10 w-auto" />
                    <p className={`mt-3 text-xl ${cooper.className} leading-tight opacity-95`}>
                        {/* Have a nice day */}
                    </p>
                </section>

                <section className="grid grid-cols-2 gap-8">
                    {sitemapGroups.map((group) => (
                        <div key={group.title}>
                            <h3 className={`text-xl ${cooper.className} mb-3`}>{group.title}</h3>
                            <ul className="space-y-2">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="inline-block text-base font-medium opacity-90 transition-all duration-200 hover:translate-x-1 hover:opacity-100">
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
                    <ul className="space-y-2 mb-8">
                        {socialLinks.map((social) => (
                            <li key={social.label}>
                                <a href={social.href} className="inline-block text-base font-medium opacity-90 transition-all duration-200 hover:translate-x-1 hover:opacity-100">
                                    {social.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* --- MOBILE VIEW (Hidden on Desktop) --- */}
            <div className="mx-auto flex w-full flex-col gap-10 md:hidden">
                <section className="flex flex-col items-start">
                    <img src="/rec-logo.svg" alt="RECSEEKERS" className="h-10 w-auto" />
                    <p className={`mt-3 text-xl ${cooper.className} leading-tight opacity-95`}>
                        {/* Have a nice day */}
                    </p>
                </section>

                <div className="grid grid-cols-2 gap-2">
                    {/* Left Column: Site Map */}
                    <section>
                        <h3 className={`text-xl ${cooper.className} mb-3`}>{sitemapGroups[0].title}</h3>
                        <ul className="space-y-2">
                            {sitemapGroups[0].links.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="inline-block text-base font-medium opacity-90 transition-all duration-200 hover:translate-x-1 hover:opacity-100">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Right Column: Legal + Socials */}
                    <section className="flex flex-col gap-8">
                        <div>
                            <h3 className={`text-xl ${cooper.className} mb-3`}>{sitemapGroups[1].title}</h3>
                            <ul className="space-y-2">
                                {sitemapGroups[1].links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="inline-block text-base font-medium opacity-90 transition-all duration-200 hover:translate-x-1 hover:opacity-100">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className={`text-xl ${cooper.className} mb-3`}>Socials</h3>
                            <ul className="space-y-2 mb-6">
                                {socialLinks.map((social) => (
                                    <li key={social.label}>
                                        <a href={social.href} className="inline-block text-base font-medium opacity-90 transition-all duration-200 hover:translate-x-1 hover:opacity-100">
                                            {social.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact" className="font-cooper inline-block rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-primary-dark">
                                Contact us
                            </Link>
                        </div>
                    </section>
                </div>
            </div>

            {/* --- Copyright / Credits (Shared) --- */}
            <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-3 border-t border-white/25 pt-5 text-sm text-white/85 md:flex-row md:items-center md:justify-between">
                <p>RECSEEKERS © {currentYear}</p>
                <a href="https://storyset.com/" target="_blank" rel="noopener noreferrer" className={`transition-all duration-200 hover:opacity-100 opacity-90 ${cooper.className}`}>
                    Illustrations by Storyset
                </a>
            </div>
        </footer>
    );
}