import type { Language } from "@/lib/language-context";

export type AboutContent = {
  paragraphs: string[];
  focusAreas: { title: string; description: string }[];
};

export const aboutContent: Record<Language, AboutContent> = {
  en: {
    paragraphs: [
      "I'm Armando Chanto, a QA Engineer with 3+ years of experience in software quality engineering, including leadership experience. My work spans manual and automated testing, but the throughline is the same: understanding where a system is most likely to break, and building the fastest reliable way to catch it.",
      "With leadership experience, I've owned test strategy end-to-end — from risk analysis and test planning, to building automation frameworks for UI, API, and performance testing, to defining the release checklists a team actually follows under deadline pressure. I care as much about how a framework is organized and why it scales as I do about which tool sits on top of it.",
      "I approach quality as a continuous practice: instrumenting pipelines so failures surface early, documenting the reasoning behind test strategy so it survives team turnover, and treating every regression as a signal to improve coverage, not just a bug to close.",
    ],
    focusAreas: [
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
          "Leadership experience owning QA strategy end-to-end: risk analysis, release checklists, and mentoring a team on where to invest testing effort.",
      },
    ],
  },
  es: {
    paragraphs: [
      "Soy Armando Chanto, QA Engineer con más de 3 años de experiencia en ingeniería de calidad de software, incluyendo experiencia de liderazgo. Mi trabajo abarca pruebas manuales y automatizadas, pero el hilo conductor es el mismo: entender dónde es más probable que un sistema falle, y construir la forma más rápida y confiable de detectarlo.",
      "Con experiencia de liderazgo, he sido responsable de la estrategia de pruebas de principio a fin — desde el análisis de riesgo y la planificación de pruebas, hasta la construcción de frameworks de automatización para UI, API y rendimiento, hasta la definición de checklists de release que un equipo realmente sigue bajo presión de entrega. Me importa tanto cómo está organizado un framework y por qué escala, como qué herramienta usa por encima.",
      "Abordo la calidad como una práctica continua: instrumentando pipelines para que los fallos salgan a la luz temprano, documentando el razonamiento detrás de la estrategia de pruebas para que sobreviva la rotación del equipo, y tratando cada regresión como una señal para mejorar la cobertura, no solo como un bug que cerrar.",
    ],
    focusAreas: [
      {
        title: "Automatización de Pruebas",
        description:
          "Diseño de frameworks de automatización (Playwright, TypeScript) que escalan con el producto en vez de convertirse en una carga de mantenimiento.",
      },
      {
        title: "Pruebas de API",
        description:
          "Validación de contratos, no solo códigos de estado — validación de schemas, suites dirigidas por entorno, y reportería integrada a CI.",
      },
      {
        title: "Pruebas de Rendimiento",
        description:
          "Modelado de carga realista con JMeter para encontrar cuellos de botella antes que los usuarios, y comunicación de resultados en términos que los stakeholders puedan accionar.",
      },
      {
        title: "Liderazgo de Calidad",
        description:
          "Experiencia de liderazgo liderando la estrategia de QA de principio a fin: análisis de riesgo, checklists de release, y mentoría a un equipo sobre dónde invertir el esfuerzo de pruebas.",
      },
    ],
  },
};
