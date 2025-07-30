import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ABC Rental - Schedule Your Apartment Tour",
  description: "Book your apartment tour with ABC Rental. Easy scheduling with real-time availability.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-sky-100 to-gray-200 min-h-screen`}
      >
        <header className=" px-4 py-6">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <img src="/Logo.svg" alt="ABC Rental Logo" className="h-6 w-auto" />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
