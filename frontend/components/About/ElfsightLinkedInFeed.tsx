"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export function ElfsightLinkedInFeed() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-[220px] w-full" aria-hidden="true" />;
  }

  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      <div className="elfsight-app-c7a855cb-2263-4d63-a89f-bf213e5f5623" data-elfsight-app-lazy />
    </>
  );
}

export default ElfsightLinkedInFeed;
