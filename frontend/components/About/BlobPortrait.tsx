"use client";

import { useState } from 'react';
import { cooper } from '@/lib/fonts';
import Image from 'next/image';

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface BlobPortraitProps {
  member: TeamMember;
  index?: number;
  imageSide?: 'left' | 'right';
}

export function BlobPortrait({ member, index = 0, imageSide = 'left' }: BlobPortraitProps) {
  const [expanded, setExpanded] = useState(false);
  const num = String(index + 1).padStart(2, '0');
  const mobileBioLimit = 220;
  const mobileTruncatedBio =
    member.bio.length > mobileBioLimit
      ? `${member.bio.slice(0, mobileBioLimit).trimEnd()}...`
      : member.bio;

  const imageCol = (
    <div className="relative flex flex-col items-center justify-center gap-5 py-8 md:py-12 px-5 md:px-8 bg-primary-dark min-h-[280px] md:min-h-[340px] h-full">
      {/* Large decorative number
      <span
        className={`${cooper.className} absolute top-4 left-6 text-7xl leading-none text-white/10 select-none`}
      >
        {num}
      </span> */}
      <div className="blob-portrait relative z-10">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover scale-110"
          sizes="352px"
        />
      </div>
      {/* Name + role badge */}
      <div className="z-10 text-center">
        <h3 className={`${cooper.className} text-2xl md:text-3xl text-white leading-tight`}>
          {member.name}
        </h3>
        <span
          className={`${cooper.className} inline-block mt-2 px-4 py-1 bg-[#da8da0] border-2 border-white text-black text-sm`}
        >
          {member.role}
        </span>
      </div>
    </div>
  );

  const bioCol = (
    <div className="flex flex-col justify-center gap-4 bg-white px-6 md:px-10 py-8 md:py-12 h-full">
      {/* Decorative quote mark */}
      <span className={`${cooper.className} text-6xl md:text-7xl leading-none text-[#da8da0] select-none -mb-4`}>&ldquo;</span>

      <p className="hidden md:block text-lg text-black leading-relaxed whitespace-pre-wrap">
        {member.bio}
      </p>

      <p className="md:hidden text-base text-black/85 leading-relaxed">
        {expanded ? member.bio : mobileTruncatedBio}
      </p>

      {member.bio.length > mobileBioLimit && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={`${cooper.className} md:hidden self-start border-2 border-black bg-[#da8da0] px-4 py-1.5 text-sm text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {/* Bottom accent */}
      <div className="mt-4 w-16 h-1.5 bg-[#da8da0]" />
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 gap-0 items-stretch h-full ${
        imageSide === 'left' ? 'lg:grid-cols-[2fr_3fr]' : 'lg:grid-cols-[3fr_2fr]'
      }`}
    >
      {imageSide === 'left' ? (
        <>
          {imageCol}
          {bioCol}
        </>
      ) : (
        <>
          {/* order-1 forces the bio to the left on desktop, dropping it into the 3fr track */}
          <div className="order-2 lg:order-1">{bioCol}</div>
          {/* order-2 forces the image to the right on desktop, dropping it into the 2fr track */}
          <div className="order-1 lg:order-2">{imageCol}</div>
        </>
      )}
    </div>
  );
}
