import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Armando Chanto",
};

export default function ContactPage() {
  return <ContactContent />;
}
