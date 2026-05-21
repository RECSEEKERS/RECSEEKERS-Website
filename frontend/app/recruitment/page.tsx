import Link from "next/link";
import { cooper } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";

export default function RecruitmentPage() {
	return (
		<main className="w-full">
			<section
				className="relative min-h-[40vh] flex items-center overflow-hidden"
				style={{ background: "#ffa4bb" }}
			>
				<div className="relative z-10 max-w-6xl mx-auto w-full px-8 pt-28 pb-14 md:pt-24 md:pb-14">
					<h1
						className={`text-5xl lg:text-6xl leading-tight text-primary-dark ${cooper.className}`}
					>
						We help education recruitment agencies build high‑performing teams.
					</h1>
					<p className="mt-5 text-lg text-primary-dark/80 max-w-2xl leading-relaxed">
						Specialist Rec2Rec for education recruiters – matching proven billers and leaders with desks, markets and teams where they can grow.
					</p>
					
				</div>
			</section>

			<section className="relative border-t-4 bg-white px-8 py-14 md:py-18 overflow-hidden">
				<div className="max-w-6xl mx-auto w-full">
					<h2 className={`text-4xl md:text-5xl text-neutral-900 ${cooper.className}`}>
						Markets We Cover
					</h2>
				</div>
			</section>

			<section className="relative border-t-4 border-black bg-[#fff8f1] px-8 py-14 md:py-18 overflow-hidden">
				<div className="max-w-6xl mx-auto w-full">
					<h2 className={`text-4xl md:text-5xl text-neutral-900 ${cooper.className}`}>
						Who We Place
					</h2>
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
