"use client";

import Link from "next/link";
import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/data/projects";
import { useLanguage } from "@/lib/language-context";
import { uiStrings } from "@/data/ui-strings";

export default function HomePage() {
  const { language } = useLanguage();
  const t = uiStrings[language].home;
  const featured = getProjects(language).slice(0, 3);

  const highlights = [
    { label: t.highlights.years, value: "3+" },
    { label: t.highlights.frameworks, value: "4" },
    { label: t.highlights.focus, value: t.highlights.focusValue },
  ];

  return (
    <>
      <section className="border-b border-ink-700/60 py-24 sm:py-32">
        <Container>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            {t.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-6xl">
            Armando Chanto
          </h1>
          <p className="mt-3 max-w-2xl text-xl text-slate-300 sm:text-2xl">{t.tagline}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            {t.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/resume"
              className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.02]"
            >
              {t.resumeCta}
            </Link>
            <Link
              href="/projects"
              className="rounded-lg border border-ink-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              {t.projectsCta}
            </Link>
            <a
              href="https://github.com/achanto98"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-ink-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              {t.githubCta}
            </a>
            <a
              href="https://www.linkedin.com/in/armando-chanto-cr2904/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-ink-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              {t.linkedinCta}
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-ink-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              {t.contactCta}
            </Link>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-ink-700/60 pt-10 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-slate-500">{item.label}</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-mono text-sm uppercase tracking-widest text-accent">
                {t.selectedWork}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{t.featuredProjects}</h2>
            </div>
            <Link href="/projects" className="hidden text-sm font-medium text-accent sm:block">
              {t.viewAllProjects}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <Link href="/projects" className="mt-8 inline-block text-sm font-medium text-accent sm:hidden">
            {t.viewAllProjects}
          </Link>
        </Container>
      </section>
    </>
  );
}
