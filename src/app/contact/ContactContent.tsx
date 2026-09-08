"use client";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/lib/language-context";
import { uiStrings } from "@/data/ui-strings";

export default function ContactContent() {
  const { language } = useLanguage();
  const t = uiStrings[language].contact;

  const channels = [
    {
      label: t.emailLabel,
      value: "armax2904@gmail.com",
      href: "mailto:armax2904@gmail.com",
    },
    {
      label: t.linkedinLabel,
      value: "linkedin.com/in/armando-chanto-cr2904",
      href: "https://www.linkedin.com/in/armando-chanto-cr2904/",
    },
    {
      label: t.githubLabel,
      value: "github.com/achanto98",
      href: "https://github.com/achanto98",
    },
  ];

  return (
    <Container className="py-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

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
