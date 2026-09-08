"use client";

import Link from "next/link";
import { getProjectBySlug } from "@/data/projects";
import { useLanguage } from "@/lib/language-context";
import { uiStrings } from "@/data/ui-strings";
import Container from "@/components/Container";

export default function ProjectDetailContent({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const t = uiStrings[language].projectDetail;
  const project = getProjectBySlug(slug, language);

  if (!project) {
    return null;
  }

  const stages = [
    { key: "problem", label: t.problem },
    { key: "architecture", label: t.architecture },
    { key: "implementation", label: t.implementation },
  ] as const;

  return (
    <Container className="py-20">
      <Link href="/projects" className="text-sm font-medium text-accent">
        {t.back}
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">{project.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-400">{project.tagline}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-ink-600 px-3 py-1 font-mono text-xs text-slate-400"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center rounded-lg border border-ink-600 px-4 py-2 text-sm font-semibold text-white hover:border-accent hover:text-accent"
        >
          {t.viewOnGithub}
        </a>
      ) : project.repoNote ? (
        <p className="mt-6 max-w-2xl rounded-lg border border-ink-700/60 bg-ink-900/40 px-4 py-3 text-sm text-slate-400">
          {project.repoNote}
        </p>
      ) : null}

      <div className="mt-14 space-y-12">
        {stages.map((stage) => (
          <section key={stage.key}>
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
              {stage.label}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-300">
              {project[stage.key]}
            </p>
          </section>
        ))}

        <section>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">{t.results}</h2>
          <ul className="mt-3 max-w-3xl list-inside list-disc space-y-2 text-base leading-relaxed text-slate-300">
            {project.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">{t.lessons}</h2>
          <ul className="mt-3 max-w-3xl list-inside list-disc space-y-2 text-base leading-relaxed text-slate-300">
            {project.lessons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {project.codeHighlights && project.codeHighlights.length > 0 && (
          <section>
            <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
              {t.codeHighlights}
            </h2>
            <div className="mt-3 max-w-3xl space-y-8">
              {project.codeHighlights.map((highlight) => (
                <div key={highlight.title}>
                  <h3 className="text-base font-semibold text-white">{highlight.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    {highlight.description}
                  </p>
                  <pre className="mt-3 overflow-x-auto rounded-lg border border-ink-700/60 bg-ink-900/60 p-4 text-xs leading-relaxed text-slate-300">
                    <code>{highlight.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Container>
  );
}
