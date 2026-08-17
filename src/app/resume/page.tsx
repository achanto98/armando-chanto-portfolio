import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Resume — Armando Chanto",
};

export default function ResumePage() {
  return (
    <Container className="py-20">
      <SectionHeading eyebrow="Resume" title="Download my resume" />

      <div className="max-w-2xl rounded-xl border border-ink-700/60 bg-ink-900/60 p-8">
        <p className="text-base leading-relaxed text-slate-300">
          Get the full breakdown of my experience as a QA Lead: automation frameworks, API and
          performance testing, and quality leadership. Drop your PDF at{" "}
          <code className="rounded bg-ink-800 px-1.5 py-0.5 font-mono text-sm text-accent">
            /public/resume.pdf
          </code>{" "}
          and the button below will serve it.
        </p>

        <a
          href="/resume.pdf"
          download
          className="mt-6 inline-flex items-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.02]"
        >
          Download PDF Resume
        </a>
      </div>
    </Container>
  );
}
