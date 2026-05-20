import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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

export const metadata: Metadata = {
  title: "RECSEEKERS",
  description: "Find your next opportunity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cooper.variable} ${poppins.variable} antialiased`}>
        <HeroStageProvider>
          <NavMobile />
          <Nav />
          <div>{children}</div>
          <Footer />
        </HeroStageProvider>
      </body>
    </html>
  );
}
