import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Armando Chanto",
};

export default function AboutPage() {
  return <AboutContent />;
}
