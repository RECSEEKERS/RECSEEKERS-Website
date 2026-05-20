import localFont from "next/font/local";

export const cooper = localFont({
  src: [
    {
      path: "../app/fonts/cooper-black-cdnfonts/coopbl.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/cooper-black-cdnfonts/coopbl.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cooper",
  display: "swap",
  fallback: ["Inter", "sans-serif"],
  preload: true,
});
