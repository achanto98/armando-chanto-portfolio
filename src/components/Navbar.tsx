"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";
import { useLanguage } from "@/lib/language-context";
import { uiStrings } from "@/data/ui-strings";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = uiStrings[language].nav;

  const links = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/projects", label: t.projects },
    { href: "/articles", label: t.articles },
    { href: "/resume", label: t.resume },
    { href: "/contact", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700/60 bg-ink-950/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-white">
          armando<span className="text-accent">.chanto</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden gap-8 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-accent" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Switch language / Cambiar idioma"
            className="flex items-center gap-1 rounded-md border border-ink-600 px-2 py-1 font-mono text-xs font-semibold text-slate-300 transition-colors hover:border-accent hover:text-accent"
          >
            <span className={language === "en" ? "text-accent" : ""}>EN</span>
            <span className="text-ink-600">/</span>
            <span className={language === "es" ? "text-accent" : ""}>ES</span>
          </button>

          <button
            type="button"
            aria-label={t.toggleMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-600 text-slate-300 md:hidden"
          >
            <span className="sr-only">{t.toggleMenu}</span>
            <div className="space-y-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-ink-700/60 bg-ink-950 md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    active ? "bg-ink-800 text-accent" : "text-slate-300 hover:bg-ink-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </Container>
        </nav>
      )}
    </header>
  );
}
