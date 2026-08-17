import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About — Armando Chanto",
};

const focusAreas = [
  {
    title: "Test Automation",
    description:
      "Designing automation frameworks (Playwright, TypeScript) that scale with the product instead of becoming a maintenance burden.",
  },
  {
    title: "API Testing",
    description:
      "Validating contracts, not just status codes — schema checks, environment-driven suites, and CI-integrated reporting.",
  },
  {
    title: "Performance Testing",
    description:
      "Modeling realistic load with JMeter to find bottlenecks before users do, and communicating results in terms stakeholders act on.",
  },
  {
    title: "Quality Leadership",
    description:
      "Leading QA strategy end-to-end: risk analysis, release checklists, and mentoring a team on where to invest testing effort.",
  },
];

export default function AboutPage() {
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="About" title="Quality is a design decision, not a final check." />

      <div className="max-w-3xl space-y-6 text-base leading-relaxed text-slate-300">
        <p>
          I&apos;m Armando Chanto, a QA Lead with 3+ years of experience in software quality
          engineering. My work spans manual and automated testing, but the throughline is the
          same: understanding where a system is most likely to break, and building the fastest
          reliable way to catch it.
        </p>
        <p>
          As a QA Lead, I&apos;ve owned test strategy end-to-end — from risk analysis and test
          planning, to building automation frameworks for UI, API, and performance testing, to
          defining the release checklists a team actually follows under deadline pressure. I care
          as much about how a framework is organized and why it scales as I do about which tool
          sits on top of it.
        </p>
        <p>
          I approach quality as a continuous practice: instrumenting pipelines so failures surface
          early, documenting the reasoning behind test strategy so it survives team turnover, and
          treating every regression as a signal to improve coverage, not just a bug to close.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {focusAreas.map((area) => (
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
