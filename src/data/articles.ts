export type Article = {
  slug: string;
  title: string;
  summary: string;
  status: "published" | "planned";
  month: string;
};

export const articles: Article[] = [
  {
    slug: "building-scalable-playwright-frameworks",
    title: "Building Scalable Playwright Frameworks",
    summary:
      "How to structure page objects, fixtures, and CI sharding so an automation suite keeps up as the product grows.",
    status: "planned",
    month: "Coming soon",
  },
  {
    slug: "api-testing-best-practices",
    title: "API Testing Best Practices",
    summary:
      "Contract validation with JSON Schema, environment-driven collections, and where Postman assertions fall short.",
    status: "planned",
    month: "Coming soon",
  },
  {
    slug: "performance-testing-with-jmeter",
    title: "Performance Testing with JMeter",
    summary:
      "Designing realistic Thread Groups, avoiding caching artifacts with data-driven test data, and reading dashboards correctly.",
    status: "planned",
    month: "Coming soon",
  },
  {
    slug: "smoke-vs-regression-testing",
    title: "Smoke vs. Regression Testing",
    summary: "When each one earns its place in a pipeline, and why running both on every commit is usually wrong.",
    status: "planned",
    month: "Coming soon",
  },
  {
    slug: "risk-based-testing",
    title: "Risk-Based Testing",
    summary: "A practical framework for allocating limited test time toward the highest-impact failure modes.",
    status: "planned",
    month: "Coming soon",
  },
  {
    slug: "release-validation-checklist",
    title: "Release Validation Checklist",
    summary: "What actually belongs on a go/no-go checklist, including the rollback plan most teams skip.",
    status: "planned",
    month: "Coming soon",
  },
  {
    slug: "quality-engineering-mindset",
    title: "The Quality Engineering Mindset",
    summary: "Why quality engineering is a design discipline, not a gatekeeping function at the end of a sprint.",
    status: "planned",
    month: "Coming soon",
  },
];
