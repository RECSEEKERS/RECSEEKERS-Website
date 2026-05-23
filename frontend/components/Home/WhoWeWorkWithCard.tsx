import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface WhoWeWorkWithCardProps {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  cooperClassName: string;
  illustrationSrc?: string;
  cardBgClassName?: string;
}

export function WhoWeWorkWithCard({
  title,
  description,
  ctaLabel,
  href,
  cooperClassName,
  illustrationSrc = "/file.svg",
  cardBgClassName = "bg-white",
}: WhoWeWorkWithCardProps) {
  return (
    <article className="relative h-full w-full max-w-130 group">
      <div className="absolute inset-0 rounded-3xl border-4 border-primary-dark translate-x-3 translate-y-3 transition-transform duration-200 group-hover:translate-x-2 group-hover:translate-y-2" />

      <div className={`relative h-full min-h-155 border-4 border-primary-dark rounded-3xl overflow-hidden grid grid-rows-2 ${cardBgClassName}`}>
        <div className="relative h-full w-full overflow-hidden border-b-4 border-primary-dark bg-white">
          <Image
            src={illustrationSrc}
            alt="Audience illustration"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="flex h-full flex-col p-5 md:p-6">
          <div className="space-y-3 md:space-y-4">
            <h3 className={`text-2xl md:text-3xl text-primary-dark leading-tight ${cooperClassName}`}>
              {title}
            </h3>

            <p className="text-primary-dark/85 text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>

          <Link href={href} className="inline-block mt-auto">
            <Button
              variant="secondary"
              size="lg"
              className={`${cooperClassName} bg-white! text-black! border-primary-dark! focus:ring-primary-dark!`}
            >
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
