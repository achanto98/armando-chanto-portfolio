import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Technical Articles — Armando Chanto",
};

export default function ArticlesPage() {
  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Writing"
        title="Technical Articles"
        description="Notes on automation architecture, API and performance testing, and the quality engineering mindset. One article per month."
      />

      <div className="divide-y divide-ink-700/60 border-t border-ink-700/60">
        {articles.map((article) => (
          <article key={article.slug} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white">{article.title}</h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">
                {article.summary}
              </p>
            </div>
            <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500">
              {article.month}
            </span>
          </article>
        ))}
      </div>
    </Container>
  );
}
