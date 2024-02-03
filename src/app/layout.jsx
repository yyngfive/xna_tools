import "./globals.css";
import { Providers } from "./providers";
import NavBar from '@/components/NavBar';
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "XNA Tools",
  description: "An integrated platform for nucleic acid-related tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body >
        <Providers>
          <NavBar />
          <div className="container mx-auto min-h-full relative pb-20">
            {children}

          </div>
          <Footer />
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
