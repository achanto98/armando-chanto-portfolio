import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Armando Chanto — QA Engineer & Software Engineer",
  description:
    "Portfolio of Armando Chanto, QA Engineer with leadership experience specializing in test automation, API testing, and performance testing.",
  metadataBase: new URL("https://armandochanto.dev"),
  openGraph: {
    title: "Armando Chanto — QA Engineer & Software Engineer",
    description:
      "Automation, API testing, and performance testing — with the engineering thinking behind each project.",
    url: "https://armandochanto.dev",
    siteName: "Armando Chanto",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-ink-950 font-sans antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
