export type Project = {
  slug: string;
  title: string;
  tagline: string;
  technologies: string[];
  github?: string;
  repoNote?: string;
  problem: string;
  architecture: string;
  implementation: string;
  results: string[];
  lessons: string[];
  codeHighlights?: { title: string; description: string; code: string }[];
};

export const projects: Project[] = [
  {
    slug: "playwright-automation-framework",
    title: "Multi-Tenant E2E Automation Framework for a Banking Travel Platform",
    tagline:
      "A single parameterized Playwright suite that validates the same travel booking app across three bank-branded clients — with backend and error oracles the UI alone can't provide.",
    technologies: [
      "Playwright",
      "JavaScript",
      "Custom Fixtures",
      "Custom Reporter API",
      "GitHub Actions",
    ],
    repoNote:
      "Built as part of a production QA engagement for a banking client. The codebase is private and proprietary, so it can't be linked here — the summary and snippets below describe the real architecture and patterns, written up from memory without any client-identifying code or data.",
    problem:
      "The application under test was a travel booking product (flights, hotels, cars, account) white-labeled for three different bank clients, each with its own domain, auth flow, and environment matrix (QA, staging, demo, pre-prod, production). The naive approach — one test folder per bank — would have tripled the maintenance cost of every UI change, since all three brands share the same underlying app and only auth and URL resolution actually differ.",
    architecture:
      "The suite runs as one codebase parameterized at runtime by PLATFORM (which bank) and TEST_ENV (which environment), resolved centrally in a single URL/config module so specs never branch on tenant themselves. Authentication runs once per suite via a Playwright project dependency: a setup project logs in, waits for the auth token to actually land in storage (not just for the URL to change), and persists cookies + localStorage to a storage-state file that every other project inherits — turning 50+ tests worth of login into a single, fast, diagnosable step instead of 50 chances to flake. Tests are tagged by suite, module, and aspect (e.g. smoke + flights, regression + payments) so CI can select exactly the right slice: full smoke on every PR, a payments-excluding grep before touching staging, module-only reruns when a single area changes.",
    implementation:
      "Two disciplines carry the framework. First, waits are event-based end to end: a small wrapper makes raw sleeps a no-op in CI and legal only for a human watching headed mode, and the default pattern for any action that hits the backend is a click and the matching network response awaited together (Promise.all), so the test never has to guess whether a checkout step actually failed on the server. Second, helpers are strictly separated from assertions — helper functions perform actions and UI logic and return plain data, while the spec file owns every expect() and therefore every business-readable failure message; the same search helper backs both a 'results found' test and a 'zero results' edge case instead of only the happy path. On top of that sits a layer of oracles beyond the UI: a network-guard fixture classifies every XHR/fetch against a map of critical endpoints and hard-fails the test if a watched endpoint returns an error or is never called — even if every visible assertion passed — and attaches a root-cause diagnostic to the HTML report; a mutation-observer-based error-guard catches transient error dialogs that a point-in-time assertion would simply miss; and an env-guard fails closed, blocking destructive or payment flows from ever running outside the designated safe environment by default.",
    results: [
      "Cut auth-related flakiness to near zero by moving 50+ tests from per-test login to a single, verified, shared session.",
      "Caught backend regressions that were fully invisible in the UI — the network-guard hard-gate turned silent 5xx/4xx responses into failing tests with an attached root-cause diagnostic instead of a false-green report.",
      "Made the suite selectively runnable (smoke vs. regression, per-module, payments-excluded) via a tag taxonomy, so CI feedback stayed fast without sacrificing coverage.",
      "Eliminated brand-specific spec duplication entirely — one suite serves three bank clients across five environments through parameterization alone.",
    ],
    lessons: [
      "A test can pass visually while the backend fails silently — asserting only on the DOM isn't enough for anything that touches money or bookings; you need a backend oracle running alongside the UI oracle.",
      "Parameterizing a suite across tenants is the right call when the apps are truly the same product, but it demands real discipline: without splitting helpers as they grow, the shared modules that absorb all the tenant branching become unmaintainable monoliths.",
      "A sleep wrapper that's a hard no-op in CI is a small change that closes an entire failure class: it makes it structurally impossible for a 'temporary' timeout-based wait to survive into the pipeline.",
      "Fail-closed defaults (no environment configured means nothing destructive runs) beat fail-open every time money or production data is in scope.",
    ],
    codeHighlights: [
      {
        title: "Sleeps that disappear in CI",
        description:
          "Raw waitForTimeout was banned outright. The only sanctioned sleep is a wrapper that's a no-op in CI, so it can never become a hidden primary wait — only a convenience for watching a run headed.",
        code: `export async function headedWait(page, ms) {
  if (!process.env.CI) await page.waitForTimeout(ms);
}

// Usage: event first, sleep cosmetic
await waitForNetworkIdle(page);   // primary wait — works in CI and headed
await headedWait(page, 2000);     // human-observation only — no-op in CI`,
      },
      {
        title: "Click and network response, atomically",
        description:
          "The default pattern for anything that hits the backend: the click and the response it triggers are awaited together, so the test can't finish before the server has actually responded — and fails with the real status code when it doesn't.",
        code: `const [response] = await Promise.all([
  page.waitForResponse((r) => r.url().includes("/checkout/validate")),
  continueButton.click(),
]);
if (!response.ok()) {
  throw new Error(\`Validation failed: \${response.status()}\`);
}`,
      },
      {
        title: "Helpers return data, specs assert",
        description:
          "Assertions never live inside a helper. That keeps failures pointing at the business criteria in the spec, and lets the same helper serve both a positive and a negative test case.",
        code: `// helper: acts, returns data — no expect()
export async function searchAndCollect(page, destination) {
  await searchBox.fill(destination);
  await searchButton.click();
  await resultsList.first().waitFor({ state: "visible" });
  return { count: await resultsList.count() };
}

// spec: owns the assertion, and the meaning of "pass"
const { count } = await searchAndCollect(page, "Cusco");
expect(count).toBeGreaterThan(0);`,
      },
    ],
  },
  {
    slug: "api-testing-framework",
    title: "API Testing Framework",
    tagline: "A structured, reusable Postman/Newman suite with schema validation and environment-driven config.",
    technologies: ["Postman", "Newman", "JSON Schema", "Environment Variables"],
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
