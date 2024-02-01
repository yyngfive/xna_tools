import "./globals.css";
import { Providers } from "./providers";
import NavBar from '@/components/NavBar';
import Footer from "@/components/Footer";

export const metadata = {
  title: "XNA Tools",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body >
        <Providers>
          <NavBar/>
          <div className="container mx-auto min-h-full relative pb-20">
          {children}
          
          </div>
          <Footer/>
        </Providers>

      </body>
    </html>
  );
}
