import type { Metadata } from "next";
import { Poppins, Quicksand, Rubik} from "next/font/google";
import "./globals.css";
import { cooper } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { NavMobile } from "@/components/layout/NavMobile";
import { HeroStageProvider } from "@/context/HeroStageContext";
import Footer from "@/components/Footer/footer";

// Font imports – available as CSS variables for Tailwind

// Body
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Headings (or just use rubik)
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Display
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "RecSeekers",
  description: "Find your next opportunity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cooper.variable} ${poppins.variable} ${quicksand.variable} ${rubik.variable} antialiased`}
      >
        <HeroStageProvider>
          <NavMobile />
          <Nav />
          <div className="pt-16 md:pt-14">{children}</div>
          <Footer />
        </HeroStageProvider>
      </body>
    </html>
  );
}
