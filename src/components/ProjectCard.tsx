import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-xl border border-ink-700/60 bg-ink-900/60 p-6 transition-colors hover:border-accent/60 hover:bg-ink-800/60"
    >
      <h3 className="text-lg font-semibold text-white group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{project.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-ink-600 px-2.5 py-1 font-mono text-xs text-slate-400"
          >
            {tech}
          </span>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center text-sm font-medium text-accent">
        View case study →
      </span>
    </Link>
  );
}
