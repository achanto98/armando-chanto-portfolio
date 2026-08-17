export type Project = {
  slug: string;
  title: string;
  tagline: string;
  technologies: string[];
  github: string;
  problem: string;
  architecture: string;
  implementation: string;
  results: string[];
  lessons: string[];
};

export const projects: Project[] = [
  {
    slug: "playwright-automation-framework",
    title: "Playwright Automation Framework",
    tagline: "A scalable end-to-end automation framework built on modern QA practices.",
    technologies: ["Playwright", "TypeScript", "Page Object Model", "Fixtures", "GitHub Actions"],
    github: "https://github.com/your-user/playwright-automation-framework",
    problem:
      "Manual regression testing across web flows was slow to execute and inconsistent between runs. The team needed an automation layer that could run reliably in CI, scale to new features without rewriting existing tests, and give clear, actionable failure reports.",
    architecture:
      "The framework follows a layered Page Object Model: page objects encapsulate locators and actions, fixtures inject authenticated sessions and test data, and a thin API layer seeds state directly instead of clicking through the UI when it isn't the behavior under test. Configuration is split by environment (local, staging, CI) so the same suite runs anywhere with a single env variable.",
    implementation:
      "Tests are organized by feature domain rather than by page, so a single spec reflects a real user journey. Custom Playwright fixtures handle login, test data cleanup, and tracing. A GitHub Actions workflow runs the suite in parallel shards on every pull request, uploads the HTML report and trace files as artifacts, and blocks merges on failure.",
    results: [
      "Reduced full regression run time from a multi-hour manual pass to a parallelized CI run.",
      "Flake rate kept low through explicit waits tied to network/state, not timeouts.",
      "New feature coverage added in hours instead of days thanks to reusable page objects and fixtures.",
    ],
    lessons: [
      "Investing in fixtures early pays off more than adding more tests early.",
      "Trace viewer and HTML reports turn CI failures into a five-minute diagnosis instead of a guessing game.",
      "Sharding by feature domain, not by file count, keeps parallel runs balanced.",
    ],
  },
  {
    slug: "api-testing-framework",
    title: "API Testing Framework",
    tagline: "A structured, reusable Postman/Newman suite with schema validation and environment-driven config.",
    technologies: ["Postman", "Newman", "JSON Schema", "Environment Variables"],
    github: "https://github.com/your-user/api-testing-framework",
    problem:
      "API contracts were only validated manually, which meant breaking changes reached QA late in the cycle. The goal was a suite that could run in CI, validate both status codes and response shape, and be reused across environments without duplicating collections.",
    architecture:
      "Collections are organized by resource/domain, with a shared pre-request script handling authentication (token fetch and refresh) so individual requests stay focused on the behavior being tested. Environment files parameterize base URLs, credentials, and feature flags across dev, staging, and production-like environments.",
    implementation:
      "Each request pairs functional assertions (status, headers, business rules) with a JSON Schema validation step, so contract drift is caught even when a happy-path assertion would still pass. Newman runs the collections headlessly in CI and generates an HTML report; a JSON summary is parsed to fail the pipeline on any schema violation.",
    results: [
      "Contract-breaking changes caught before merge instead of during manual QA passes.",
      "One collection set reused across three environments purely through environment variables.",
      "CI feedback on API changes available in minutes.",
    ],
    lessons: [
      "Schema validation catches a different class of bug than status-code assertions alone.",
      "Centralizing auth in a pre-request script removes an entire category of flaky, credential-related failures.",
      "Keeping collections resource-oriented (not test-case-oriented) made them easier to extend.",
    ],
  },
  {
    slug: "performance-testing-jmeter",
    title: "Performance Testing with JMeter",
    tagline: "Load and stress testing pipeline with data-driven scenarios and automated HTML dashboards.",
    technologies: ["JMeter", "Thread Groups", "CSV Data Set Config", "JSON Extractor"],
    github: "https://github.com/your-user/performance-testing-jmeter",
    problem:
      "The team had no visibility into how key endpoints behaved under realistic concurrent load, which meant performance regressions were only discovered in production. The objective was a repeatable load test that modeled real usage and produced a report stakeholders could actually read.",
    architecture:
      "Thread Groups model distinct user journeys (browse, search, checkout) with ramp-up periods that mirror real traffic growth rather than an instant spike. A CSV Data Set Config feeds unique test users per thread to avoid cache and session artifacts skewing results. Authentication tokens are captured once per session with a JSON Extractor and reused across requests.",
    implementation:
      "Scenarios are parameterized so the same test plan runs at different load levels (baseline, target, stress) by changing thread count and ramp-up. JMeter's HTML dashboard is generated after each run and archived alongside the raw results file, so trends across releases are comparable rather than one-off.",
    results: [
      "Established a performance baseline for core endpoints before a major traffic-driving launch.",
      "Identified a database connection pool bottleneck under 3x expected concurrent load.",
      "HTML dashboards made performance results legible to non-technical stakeholders.",
    ],
    lessons: [
      "Realistic ramp-up matters more than raw peak thread count for finding true bottlenecks.",
      "Unique per-thread test data avoids false negatives caused by caching.",
      "A performance baseline is only useful if it's re-run on every major release, not just once.",
    ],
  },
  {
    slug: "cicd-github-actions",
    title: "CI/CD Pipeline with GitHub Actions",
    tagline: "Automated test execution, reporting, and validation wired directly into the delivery pipeline.",
    technologies: ["GitHub Actions", "YAML Workflows", "Artifacts", "Status Checks"],
    github: "https://github.com/your-user/cicd-github-actions",
    problem:
      "Automated tests existed but were run manually and inconsistently before merges, so they didn't actually prevent regressions from reaching main. The pipeline needed to run tests automatically, surface results clearly, and gate merges on quality.",
    architecture:
      "The workflow triggers on pull requests and pushes to main, running linting, unit tests, and the Playwright/API suites as separate jobs in parallel. Required status checks are configured on the main branch so a failing job blocks the merge button directly in GitHub's UI.",
    implementation:
      "Each job caches dependencies to keep runs fast, uploads test reports and traces as workflow artifacts, and posts a summary comment on the pull request with pass/fail counts. A separate scheduled workflow re-runs the full regression suite nightly against staging to catch environment drift.",
    results: [
      "Regressions are now caught before merge, not after deployment.",
      "PR authors get feedback and downloadable failure artifacts without leaving GitHub.",
      "Nightly runs surface staging-only issues within a day instead of at release time.",
    ],
    lessons: [
      "Required status checks are what actually change team behavior, not just having tests exist.",
      "Uploading traces/reports as artifacts turns a red X into an actionable next step.",
      "Splitting jobs in parallel is a bigger speed win than optimizing any single test.",
    ],
  },
  {
    slug: "quality-engineering-case-study",
    title: "Quality Engineering Case Study: Hotel Booking Platform",
    tagline: "End-to-end test strategy for a hotel booking system, from risk analysis to release checklist.",
    technologies: ["Risk-Based Testing", "Test Strategy", "Release Validation"],
    github: "https://github.com/your-user/qe-case-study-hotel-booking",
    problem:
      "This case study answers a common senior QA interview question: how would you approach quality for a system like a hotel booking platform (search, availability, pricing, booking, payment, cancellation) with no prior context on the codebase, and a release next sprint?",
    architecture:
      "The approach starts with a risk analysis across the booking flow: payment and inventory double-booking are ranked highest risk (financial and trust impact), search/filtering is ranked medium (usability impact), and static content is ranked low. Test strategy and automation investment are allocated proportionally to that risk ranking rather than evenly across features.",
    implementation:
      "Test cases cover the booking flow's edge cases explicitly: concurrent bookings for the last room, price changes mid-session, timezone handling for check-in/check-out, and payment failure/retry paths. Automation targets the highest-risk, highest-repetition paths (search, booking, payment) end-to-end, while lower-risk content pages are covered with lighter smoke checks. A release checklist ties it together: smoke suite green, no open high-severity defects, performance baseline within threshold, and a documented rollback plan.",
    results: [
      "A risk-ranked test plan that a team could execute against in a single sprint.",
      "Automation scope defined by impact, not by what's easiest to automate.",
      "A reusable release checklist template applicable beyond this one system.",
    ],
    lessons: [
      "Risk-based prioritization is what separates a senior test strategy from a feature-by-feature checklist.",
      "Concurrency and payment edge cases are where booking systems actually break in production.",
      "A release checklist is only valuable if it includes a rollback plan, not just a go/no-go gate.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
