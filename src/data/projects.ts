import type { Language } from "@/lib/language-context";

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

const projectsEn: Project[] = [
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

const projectsEs: Project[] = [
  {
    slug: "playwright-automation-framework",
    title: "Framework de Automatización E2E Multi-Tenant para una Plataforma Bancaria de Viajes",
    tagline:
      "Una sola suite de Playwright parametrizada que valida la misma app de reservas de viajes en tres bancos distintos — con oráculos de backend y de errores que la UI sola no puede dar.",
    technologies: [
      "Playwright",
      "JavaScript",
      "Custom Fixtures",
      "Custom Reporter API",
      "GitHub Actions",
    ],
    repoNote:
      "Construido como parte de un proyecto de QA en producción para un cliente bancario. El código es privado y propiedad del cliente, así que no puede enlazarse aquí — el resumen y los fragmentos de abajo describen la arquitectura y los patrones reales, escritos de memoria sin ningún código o dato que identifique al cliente.",
    problem:
      "La aplicación bajo prueba era un producto de reservas de viajes (vuelos, hoteles, autos, cuenta) de marca blanca para tres bancos distintos, cada uno con su propio dominio, flujo de autenticación y matriz de entornos (QA, staging, demo, pre-prod, producción). El enfoque ingenuo — una carpeta de pruebas por banco — habría triplicado el costo de mantenimiento de cada cambio de UI, ya que las tres marcas comparten la misma aplicación base y solo la autenticación y la resolución de URL realmente difieren.",
    architecture:
      "La suite corre como un solo código parametrizado en tiempo de ejecución por PLATFORM (qué banco) y TEST_ENV (qué entorno), resuelto de forma centralizada en un único módulo de URL/configuración para que los specs nunca bifurquen por tenant. La autenticación corre una sola vez por suite mediante una dependencia de proyecto de Playwright: un proyecto de setup inicia sesión, espera a que el token de auth realmente llegue al storage (no solo a que cambie la URL), y persiste cookies + localStorage en un archivo de storage-state que heredan todos los demás proyectos — convirtiendo 50+ tests de login en un solo paso rápido y diagnosticable, en vez de 50 oportunidades de fallar. Los tests se etiquetan por suite, módulo y aspecto (por ejemplo smoke + vuelos, regression + pagos) para que CI pueda seleccionar exactamente el segmento correcto: smoke completo en cada PR, un grep excluyendo pagos antes de tocar staging, reruns por módulo cuando cambia una sola área.",
    implementation:
      "Dos disciplinas sostienen el framework. Primero, las esperas son basadas en eventos de principio a fin: un pequeño wrapper convierte los sleeps crudos en un no-op en CI y los deja legítimos solo para un humano viendo el modo headed, y el patrón por defecto para cualquier acción que golpea el backend es un clic y la respuesta de red correspondiente esperados juntos (Promise.all), para que el test nunca tenga que adivinar si un paso de checkout realmente falló en el servidor. Segundo, los helpers están estrictamente separados de las aserciones — las funciones helper ejecutan acciones y lógica de UI y devuelven datos planos, mientras que el archivo de spec es dueño de cada expect() y por lo tanto de cada mensaje de fallo legible para el negocio; el mismo helper de búsqueda sirve tanto a un test de 'resultados encontrados' como a un caso límite de 'cero resultados', en vez de solo el happy path. Encima de eso hay una capa de oráculos más allá de la UI: un fixture de network-guard clasifica cada XHR/fetch contra un mapa de endpoints críticos y hace fallar el test de forma dura si un endpoint vigilado devuelve un error o nunca es llamado — incluso si todas las aserciones visibles pasaron — y adjunta un diagnóstico de causa raíz al reporte HTML; un error-guard basado en mutation-observer detecta diálogos de error transitorios que una aserción puntual simplemente pasaría por alto; y un env-guard falla cerrado, bloqueando por defecto que flujos destructivos o de pago corran fuera del entorno designado como seguro.",
    results: [
      "Redujo la inestabilidad relacionada a auth casi a cero al mover 50+ tests de login por-test a una sola sesión compartida y verificada.",
      "Detectó regresiones de backend totalmente invisibles en la UI — el hard-gate del network-guard convirtió respuestas 5xx/4xx silenciosas en tests fallidos con un diagnóstico de causa raíz adjunto, en vez de un reporte falsamente verde.",
      "Hizo la suite ejecutable selectivamente (smoke vs. regression, por módulo, excluyendo pagos) mediante una taxonomía de tags, manteniendo la retroalimentación de CI rápida sin sacrificar cobertura.",
      "Eliminó por completo la duplicación de specs por marca — una sola suite sirve a tres bancos en cinco entornos solo mediante parametrización.",
    ],
    lessons: [
      "Un test puede pasar visualmente mientras el backend falla en silencio — asertar solo sobre el DOM no basta para nada que toque dinero o reservas; se necesita un oráculo de backend corriendo junto al oráculo de UI.",
      "Parametrizar una suite entre tenants es la decisión correcta cuando las apps son realmente el mismo producto, pero exige disciplina real: sin dividir los helpers a medida que crecen, los módulos compartidos que absorben toda la bifurcación por tenant se vuelven monolitos inmantenibles.",
      "Un wrapper de sleep que es un no-op estricto en CI es un cambio pequeño que cierra toda una clase de fallos: hace estructuralmente imposible que una espera 'temporal' basada en timeout sobreviva hasta el pipeline.",
      "Los valores por defecto que fallan cerrado (sin entorno configurado, nada destructivo corre) le ganan a fallar abierto siempre que hay dinero o datos de producción en juego.",
    ],
    codeHighlights: [
      {
        title: "Sleeps que desaparecen en CI",
        description:
          "El waitForTimeout crudo estaba prohibido por completo. El único sleep permitido es un wrapper que es un no-op en CI, así que nunca puede convertirse en una espera primaria oculta — solo en una conveniencia para ver una corrida en modo headed.",
        code: `export async function headedWait(page, ms) {
  if (!process.env.CI) await page.waitForTimeout(ms);
}

// Uso: evento primero, sleep cosmético
await waitForNetworkIdle(page);   // espera primaria — funciona en CI y headed
await headedWait(page, 2000);     // solo observación humana — no-op en CI`,
      },
      {
        title: "Clic y respuesta de red, de forma atómica",
        description:
          "El patrón por defecto para cualquier acción que golpea el backend: el clic y la respuesta que dispara se esperan juntos, para que el test no pueda terminar antes de que el servidor realmente haya respondido — y falle con el código de estado real cuando no lo hace.",
        code: `const [response] = await Promise.all([
  page.waitForResponse((r) => r.url().includes("/checkout/validate")),
  continueButton.click(),
]);
if (!response.ok()) {
  throw new Error(\`Validation failed: \${response.status()}\`);
}`,
      },
      {
        title: "Los helpers devuelven datos, los specs asertan",
        description:
          "Las aserciones nunca viven dentro de un helper. Eso mantiene los fallos apuntando al criterio de negocio en el spec, y permite que el mismo helper sirva tanto a un caso positivo como a uno negativo.",
        code: `// helper: actúa, devuelve datos — sin expect()
export async function searchAndCollect(page, destination) {
  await searchBox.fill(destination);
  await searchButton.click();
  await resultsList.first().waitFor({ state: "visible" });
  return { count: await resultsList.count() };
}

// spec: dueño de la aserción, y del significado de "pasar"
const { count } = await searchAndCollect(page, "Cusco");
expect(count).toBeGreaterThan(0);`,
      },
    ],
  },
  {
    slug: "api-testing-framework",
    title: "Framework de Pruebas de API",
    tagline: "Una suite Postman/Newman estructurada y reutilizable, con validación de schema y configuración por entorno.",
    technologies: ["Postman", "Newman", "JSON Schema", "Environment Variables"],
    problem:
      "Los contratos de API solo se validaban manualmente, lo que significaba que los cambios que rompían compatibilidad llegaban tarde a QA en el ciclo. El objetivo era una suite que pudiera correr en CI, validar tanto códigos de estado como la forma de la respuesta, y reutilizarse entre entornos sin duplicar colecciones.",
    architecture:
      "Las colecciones se organizan por recurso/dominio, con un script de pre-request compartido que maneja la autenticación (obtención y refresco de tokens) para que cada request individual se enfoque en el comportamiento bajo prueba. Los archivos de entorno parametrizan URLs base, credenciales y feature flags entre dev, staging y entornos similares a producción.",
    implementation:
      "Cada request combina aserciones funcionales (status, headers, reglas de negocio) con un paso de validación de JSON Schema, así se detecta el drift de contrato incluso cuando una aserción de happy-path seguiría pasando. Newman corre las colecciones sin interfaz en CI y genera un reporte HTML; se parsea un resumen JSON para fallar el pipeline ante cualquier violación de schema.",
    results: [
      "Cambios que rompían contratos detectados antes del merge en vez de durante pasadas manuales de QA.",
      "Un solo set de colecciones reutilizado en tres entornos usando solo variables de entorno.",
      "Retroalimentación de CI sobre cambios de API disponible en minutos.",
    ],
    lessons: [
      "La validación de schema detecta una clase de bug distinta a las aserciones de código de estado por sí solas.",
      "Centralizar la autenticación en un script de pre-request elimina toda una categoría de fallos intermitentes relacionados a credenciales.",
      "Mantener las colecciones orientadas a recursos (no a casos de prueba) las hizo más fáciles de extender.",
    ],
  },
  {
    slug: "performance-testing-jmeter",
    title: "Pruebas de Rendimiento con JMeter",
    tagline: "Pipeline de pruebas de carga y estrés con escenarios basados en datos y dashboards HTML automatizados.",
    technologies: ["JMeter", "Thread Groups", "CSV Data Set Config", "JSON Extractor"],
    problem:
      "El equipo no tenía visibilidad de cómo se comportaban los endpoints clave bajo carga concurrente realista, lo que significaba que las regresiones de rendimiento solo se descubrían en producción. El objetivo era una prueba de carga repetible que modelara el uso real y produjera un reporte que los stakeholders realmente pudieran leer.",
    architecture:
      "Los Thread Groups modelan journeys de usuario distintos (navegar, buscar, checkout) con períodos de ramp-up que imitan el crecimiento real de tráfico en vez de un pico instantáneo. Un CSV Data Set Config alimenta usuarios de prueba únicos por thread para evitar que artefactos de caché y sesión distorsionen los resultados. Los tokens de autenticación se capturan una vez por sesión con un JSON Extractor y se reutilizan en los requests.",
    implementation:
      "Los escenarios están parametrizados para que el mismo plan de pruebas corra a distintos niveles de carga (baseline, objetivo, estrés) cambiando la cantidad de threads y el ramp-up. El dashboard HTML de JMeter se genera después de cada corrida y se archiva junto al archivo de resultados crudo, así las tendencias entre releases son comparables en vez de un dato aislado.",
    results: [
      "Se estableció una línea base de rendimiento para los endpoints principales antes de un lanzamiento con mucho tráfico esperado.",
      "Se identificó un cuello de botella en el pool de conexiones de base de datos bajo 3 veces la carga concurrente esperada.",
      "Los dashboards HTML hicieron los resultados de rendimiento legibles para stakeholders no técnicos.",
    ],
    lessons: [
      "Un ramp-up realista importa más que la cantidad pico de threads para encontrar cuellos de botella reales.",
      "Datos de prueba únicos por thread evitan falsos negativos causados por el caché.",
      "Una línea base de rendimiento solo es útil si se vuelve a correr en cada release importante, no solo una vez.",
    ],
  },
  {
    slug: "cicd-github-actions",
    title: "Pipeline CI/CD con GitHub Actions",
    tagline: "Ejecución automática de pruebas, reportería y validación conectadas directamente al pipeline de entrega.",
    technologies: ["GitHub Actions", "YAML Workflows", "Artifacts", "Status Checks"],
    problem:
      "Existían pruebas automatizadas, pero se corrían manualmente y de forma inconsistente antes de los merges, así que en realidad no prevenían que las regresiones llegaran a main. El pipeline necesitaba correr las pruebas automáticamente, mostrar resultados con claridad, y bloquear merges según la calidad.",
    architecture:
      "El workflow se dispara en pull requests y pushes a main, corriendo linting, pruebas unitarias, y las suites de Playwright/API como jobs separados en paralelo. Se configuraron status checks obligatorios en la rama main para que un job fallido bloquee el botón de merge directamente en la interfaz de GitHub.",
    implementation:
      "Cada job cachea dependencias para mantener las corridas rápidas, sube reportes de pruebas y traces como artifacts del workflow, y publica un comentario resumen en el pull request con conteos de pass/fail. Un workflow programado aparte vuelve a correr la suite completa de regression cada noche contra staging para detectar drift de entorno.",
    results: [
      "Las regresiones ahora se detectan antes del merge, no después del deploy.",
      "Los autores de PRs reciben retroalimentación y artifacts descargables de fallos sin salir de GitHub.",
      "Las corridas nocturnas exponen problemas exclusivos de staging en un día en vez de al momento del release.",
    ],
    lessons: [
      "Los status checks obligatorios son lo que realmente cambia el comportamiento del equipo, no solo que existan pruebas.",
      "Subir traces/reportes como artifacts convierte una X roja en un siguiente paso accionable.",
      "Dividir jobs en paralelo es una ganancia de velocidad mayor que optimizar cualquier test individual.",
    ],
  },
  {
    slug: "quality-engineering-case-study",
    title: "Caso de Estudio de Quality Engineering: Plataforma de Reserva de Hoteles",
    tagline: "Estrategia de pruebas de principio a fin para un sistema de reserva de hoteles, desde el análisis de riesgo hasta el checklist de release.",
    technologies: ["Risk-Based Testing", "Test Strategy", "Release Validation"],
    problem:
      "Este caso de estudio responde una pregunta común en entrevistas de QA senior: ¿cómo abordarías la calidad de un sistema como una plataforma de reserva de hoteles (búsqueda, disponibilidad, precios, reserva, pago, cancelación) sin contexto previo del código, y con un release la próxima sprint?",
    architecture:
      "El enfoque parte de un análisis de riesgo a lo largo del flujo de reserva: los pagos y el doble-booking de inventario se clasifican como el riesgo más alto (impacto financiero y de confianza), la búsqueda/filtrado como riesgo medio (impacto de usabilidad), y el contenido estático como bajo. La estrategia de pruebas y la inversión en automatización se asignan proporcionalmente a esa clasificación de riesgo en vez de de forma pareja entre features.",
    implementation:
      "Los casos de prueba cubren explícitamente los casos límite del flujo de reserva: reservas concurrentes para la última habitación, cambios de precio a mitad de sesión, manejo de zonas horarias para check-in/check-out, y caminos de fallo/reintento de pago. La automatización apunta a los caminos de mayor riesgo y mayor repetición (búsqueda, reserva, pago) de principio a fin, mientras que las páginas de contenido de menor riesgo se cubren con smoke checks más ligeros. Un checklist de release lo amarra todo: suite de smoke en verde, sin defectos abiertos de alta severidad, línea base de rendimiento dentro del umbral, y un plan de rollback documentado.",
    results: [
      "Un plan de pruebas priorizado por riesgo que un equipo podría ejecutar en una sola sprint.",
      "Alcance de automatización definido por impacto, no por lo más fácil de automatizar.",
      "Una plantilla de checklist de release reutilizable más allá de este sistema en particular.",
    ],
    lessons: [
      "La priorización basada en riesgo es lo que separa una estrategia de pruebas senior de un checklist feature por feature.",
      "La concurrencia y los casos límite de pago son donde los sistemas de reserva realmente se rompen en producción.",
      "Un checklist de release solo es valioso si incluye un plan de rollback, no solo un gate de go/no-go.",
    ],
  },
];

export function getProjects(language: Language): Project[] {
  return language === "es" ? projectsEs : projectsEn;
}

export function getProjectBySlug(slug: string, language: Language): Project | undefined {
  return getProjects(language).find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projectsEn.map((p) => p.slug);
}
