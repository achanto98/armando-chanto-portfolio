"use client";

import Container from "./Container";
import { useLanguage } from "@/lib/language-context";
import { uiStrings } from "@/data/ui-strings";

export default function Footer() {
  const { language } = useLanguage();
  const t = uiStrings[language].footer;

  return (
    <footer className="border-t border-ink-700/60 py-10">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Armando Chanto. {t.builtWith}
        </p>
        <div className="flex gap-6">
          <a href="https://github.com/achanto98" className="hover:text-accent" target="_blank" rel="noreferrer">
            {t.githubLabel}
          </a>
          <a href="https://www.linkedin.com/in/armando-chanto-cr2904/" className="hover:text-accent" target="_blank" rel="noreferrer">
            {t.linkedinLabel}
          </a>
          <a href="mailto:armax2904@gmail.com" className="hover:text-accent">
            {t.emailLabel}
          </a>
        </div>
      </Container>
    </footer>
  );
}
