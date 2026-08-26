import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import { projects, getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? `${project.title} — Armando Chanto` : "Project — Armando Chanto" };
}

const stages = [
  { key: "problem", label: "Problem" },
  { key: "architecture", label: "Architecture" },
  { key: "implementation", label: "Implementation" },
] as const;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-20">
      <Link href="/projects" className="text-sm font-medium text-accent">
        ← Back to projects
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

      <a
        href={project.github}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center rounded-lg border border-ink-600 px-4 py-2 text-sm font-semibold text-white hover:border-accent hover:text-accent"
      >
        View on GitHub →
      </a>

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
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">Results</h2>
          <ul className="mt-3 max-w-3xl list-inside list-disc space-y-2 text-base leading-relaxed text-slate-300">
            {project.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-sm uppercase tracking-widest text-accent">
            Lessons Learned
          </h2>
          <ul className="mt-3 max-w-3xl list-inside list-disc space-y-2 text-base leading-relaxed text-slate-300">
            {project.lessons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
