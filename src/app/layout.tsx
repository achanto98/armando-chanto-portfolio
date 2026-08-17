import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Armando Chanto — QA Lead & Software Quality Engineer",
  description:
    "Portfolio of Armando Chanto, QA Lead specializing in test automation, API testing, and performance testing.",
  metadataBase: new URL("https://armandochanto.dev"),
  openGraph: {
    title: "Armando Chanto — QA Lead & Software Quality Engineer",
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
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-ink-950 font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
