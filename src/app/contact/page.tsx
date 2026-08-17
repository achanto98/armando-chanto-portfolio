import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact — Armando Chanto",
};

const channels = [
  {
    label: "Email",
    value: "armax2904@gmail.com",
    href: "mailto:armax2904@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/your-user",
    href: "https://linkedin.com/in/your-user",
  },
  {
    label: "GitHub",
    value: "github.com/your-user",
    href: "https://github.com/your-user",
  },
];

export default function ContactPage() {
  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Get in touch"
        title="Contact"
        description="Open to QA Lead / Software Quality Engineer roles. The fastest way to reach me is email."
      />

      <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
            className="rounded-xl border border-ink-700/60 bg-ink-900/60 p-6 text-center transition-colors hover:border-accent hover:text-accent"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
              {channel.label}
            </p>
            <p className="mt-2 break-words text-sm font-medium text-white">{channel.value}</p>
          </a>
        ))}
      </div>
    </Container>
  );
}
