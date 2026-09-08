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
          Get the full breakdown of my experience as a QA Engineer with leadership experience:
          automation frameworks, API and performance testing, and quality leadership.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="/resume-en.pdf"
            download
            className="inline-flex items-center rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.02]"
          >
            Download Resume (English)
          </a>

          <a
            href="/resume-es.pdf"
            download
            className="inline-flex items-center rounded-lg border border-accent px-5 py-3 text-sm font-semibold text-accent transition-transform hover:scale-[1.02]"
          >
            Descargar CV (Español)
          </a>
        </div>
      </div>
    </Container>
  );
}
