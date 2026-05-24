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
  const mobileBioLimit = 220;
  const mobileTruncatedBio =
    member.bio.length > mobileBioLimit
      ? `${member.bio.slice(0, mobileBioLimit).trimEnd()}...`
      : member.bio;

  const imageCol = (
    <div className="relative flex items-center justify-center py-8 md:py-9 px-4 md:px-6 bg-tertiary min-h-[220px] md:min-h-[260px] h-full">
      <div className="blob-portrait relative z-10">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover scale-110"
          sizes="352px"
        />
      </div>
    </div>
  );

  const bioCol = (
    <div className="flex flex-col justify-center gap-3 bg-white px-5 md:px-8 py-6 md:py-8 h-full">
      <div>
        <h3 className={`${cooper.className} text-xl md:text-2xl text-black leading-tight`}>
          {member.name}
        </h3>
        <p className="mt-1 text-xs md:text-sm text-black/60 uppercase tracking-wide">
          {member.role}
        </p>
      </div>

      <p className="hidden md:block text-base text-black leading-relaxed whitespace-pre-wrap">
        {member.bio}
      </p>

      <p className="md:hidden text-sm text-black/85 leading-relaxed">
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

      <div className="mt-3 w-10 h-1 bg-[#da8da0]" />
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 gap-0 items-stretch h-full ${
        imageSide === 'left' ? 'lg:grid-cols-[5fr_7fr]' : 'lg:grid-cols-[7fr_5fr]'
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
