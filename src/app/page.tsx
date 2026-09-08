import Link from "next/link";
import Container from "@/components/Container";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const highlights = [
  { label: "Years in Software QA", value: "3+" },
  { label: "Automation frameworks shipped", value: "4" },
  { label: "Testing focus", value: "E2E · API · Performance" },
];

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <section className="border-b border-ink-700/60 py-24 sm:py-32">
        <Container>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            Automation • API Testing • Performance Testing
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-6xl">
            Armando Chanto
          </h1>
          <p className="mt-3 max-w-2xl text-xl text-slate-300 sm:text-2xl">
            QA Lead &amp; Software Engineer
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            I build test strategies and automation frameworks that catch problems before
            they reach production — and I document the engineering decisions behind them,
            not just the tools.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/resume"
              className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.02]"
            >
              Resume
            </Link>
            <Link
              href="/projects"
              className="rounded-lg border border-ink-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              Projects
            </Link>
            <a
              href="https://github.com/achanto98"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-ink-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/armando-chanto-cr2904/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-ink-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-ink-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
            >
              Contact
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
              <p className="font-mono text-sm uppercase tracking-widest text-accent">Selected work</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Featured projects</h2>
            </div>
            <Link href="/projects" className="hidden text-sm font-medium text-accent sm:block">
              View all projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <Link href="/projects" className="mt-8 inline-block text-sm font-medium text-accent sm:hidden">
            View all projects →
          </Link>
        </Container>
      </section>
    </>
  );
}
