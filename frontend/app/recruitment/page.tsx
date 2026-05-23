"use client";

import { motion } from "framer-motion";
import { cooper } from "@/lib/fonts";
import { DoodleFloat } from "@/components/ui/DoodleFloat";

export default function RecruitmentPage() {
	return (
		<main className="w-full">
			<section
				className="relative min-h-[40vh] flex items-center overflow-hidden"
				style={{ background: "#ffa4bb" }}
			>
				<div className="absolute -top-32 -right-32 w-150 h-150 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
				<div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-primary-dark/10 blur-2xl pointer-events-none" />

				<div className="relative z-10 max-w-6xl mx-auto w-full px-8 pt-28 pb-14 md:pt-24 md:pb-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<div className="absolute bottom-12 -right-12 lg:-right-24 xl:-right-30 hidden md:block z-40 pointer-events-none">
						<DoodleFloat name={"open-book"} size={124} delay={1.2} />
					</div>

					<div className="relative z-10 flex flex-col gap-6">
						<h1
							className={`text-5xl lg:text-6xl leading-tight text-primary-dark ${cooper.className}`}
						>
							Where we can help boost your recruitment
						</h1>
						<p className="text-lg text-primary-dark/80 max-w-md leading-relaxed">
							We support agencies hiring across the core areas of education recruitment, covering established desks, specialist niches and high-growth markets.
						</p>
					</div>

					<div className="relative z-10 flex justify-center mt-8 md:mt-0">
						<div className="relative w-80 h-80 lg:w-96 lg:h-96">
							<div className="absolute inset-0 rounded-3xl border-4 border-primary-dark translate-x-3 translate-y-3" />
							<div className="relative h-full w-full rounded-3xl border-4 border-primary-dark overflow-hidden bg-white/30">
								<img
									src="/Illustrations/hiring-1.svg"
									alt="Education recruitment hiring illustration"
									className="h-full w-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative border-t-4 border-black bg-white px-8 py-14 md:py-18 overflow-hidden">
				<div className="max-w-6xl mx-auto w-full">
					<h2 className={`text-4xl md:text-5xl text-neutral-900 ${cooper.className}`}>
						Desks We Cover
					</h2>
					<p className="mt-5 text-lg text-neutral-700 max-w-3xl leading-relaxed">
						Education recruitment is not one market. We work across the desks and specialisms that shape the sector, helping agencies hire recruiters who already understand the pace, candidate base and commercial demands of their niche.
					</p>

					<div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 items-stretch">
						<motion.article
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
							className="rounded-3xl border-4 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
						>
							<h3 className={`${cooper.className} text-3xl text-black mb-3`}>
								Primary
							</h3>
							<p className="text-base md:text-lg text-black/85 leading-relaxed">
								Recruiters working across long-term, permanent and supply desks.
							</p>
							</motion.article>

						<motion.article
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
							className="rounded-3xl border-4 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
						>
							<h3 className={`${cooper.className} text-3xl text-black mb-3`}>
								Secondary
							</h3>
							<p className="text-base md:text-lg text-black/85 leading-relaxed">
								Consultants covering subject-led and mainstream secondary markets.
							</p>
							</motion.article>

						<motion.article
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
							className="rounded-3xl border-4 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
						>
							<h3 className={`${cooper.className} text-3xl text-black mb-3`}>
								SEND
							</h3>
							<p className="text-base md:text-lg text-black/85 leading-relaxed">
								Recruiters specialising in specialist education and inclusion-focused hiring.
							</p>
							</motion.article>

						<motion.article
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
							className="rounded-3xl border-4 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
						>
							<h3 className={`${cooper.className} text-3xl text-black mb-3`}>
								Early Years
							</h3>
							<p className="text-base md:text-lg text-black/85 leading-relaxed">
								Desk specialists working with nurseries and early years settings.
							</p>
							</motion.article>

						<motion.article
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
							className="rounded-3xl border-4 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
						>
							<h3 className={`${cooper.className} text-3xl text-black mb-3`}>
								Tuition / Alternative Provision
							</h3>
							<p className="text-base md:text-lg text-black/85 leading-relaxed">
								Recruiters operating in high-demand, fast-moving support markets.
							</p>
							</motion.article>

						<motion.article
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
							className="rounded-3xl border-4 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
						>
							<h3 className={`${cooper.className} text-3xl text-black mb-3`}>
								EdTech
							</h3>
							<p className="text-base md:text-lg text-black/85 leading-relaxed">
								Talent aligned to education-focused technology and service providers.
							</p>
							</motion.article>
					</div>
				</div>
			</section>

			<section className="relative border-t-4 border-black bg-white px-8 py-14 md:py-18 overflow-hidden">
				<div className="max-w-6xl mx-auto w-full">
					<h2 className={`text-4xl md:text-5xl text-neutral-900 ${cooper.className}`}>
						EdTech
					</h2>
				</div>
			</section>

			<section className="relative border-t-4 border-black bg-[#fff8f1] px-8 py-14 md:py-18 overflow-hidden">
				<div className="max-w-6xl mx-auto w-full">
					<h2 className={`text-4xl md:text-5xl text-neutral-900 ${cooper.className}`}>
						CTA section
					</h2>
				</div>
			</section>
		</main>
	);
}
