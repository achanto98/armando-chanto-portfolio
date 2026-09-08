"use client";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/lib/language-context";
import { uiStrings } from "@/data/ui-strings";
import { aboutContent } from "@/data/about-content";

export default function AboutContent() {
  const { language } = useLanguage();
  const t = uiStrings[language].about;
  const content = aboutContent[language];

  return (
    <Container className="py-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />

      <div className="max-w-3xl space-y-6 text-base leading-relaxed text-slate-300">
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {content.focusAreas.map((area) => (
          <div
            key={area.title}
            className="rounded-xl border border-ink-700/60 bg-ink-900/60 p-6"
          >
            <h3 className="text-lg font-semibold text-white">{area.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{area.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
