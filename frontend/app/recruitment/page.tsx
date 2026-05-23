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

			<section className="relative border-t-4 bg-white px-8 py-14 md:py-18 overflow-hidden">
				<div className="max-w-6xl mx-auto w-full">
					<h2 className={`text-4xl md:text-5xl text-neutral-900 ${cooper.className}`}>
						Markets We Cover
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
