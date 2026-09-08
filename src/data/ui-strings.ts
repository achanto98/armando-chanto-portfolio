import type { Language } from "@/lib/language-context";

export type UiStrings = {
  nav: {
    home: string;
    about: string;
    projects: string;
    articles: string;
    resume: string;
    contact: string;
    toggleMenu: string;
  };
  home: {
    eyebrow: string;
    tagline: string;
    description: string;
    resumeCta: string;
    projectsCta: string;
    githubCta: string;
    linkedinCta: string;
    contactCta: string;
    highlights: {
      years: string;
      frameworks: string;
      focus: string;
      focusValue: string;
    };
    selectedWork: string;
    featuredProjects: string;
    viewAllProjects: string;
  };
  about: {
    eyebrow: string;
    title: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    viewCaseStudy: string;
  };
  projectDetail: {
    back: string;
    problem: string;
    architecture: string;
    implementation: string;
    results: string;
    lessons: string;
    codeHighlights: string;
    viewOnGithub: string;
  };
  articles: {
    eyebrow: string;
    title: string;
    description: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
  };
  resume: {
    eyebrow: string;
    title: string;
    description: string;
  };
  footer: {
    builtWith: string;
    githubLabel: string;
    linkedinLabel: string;
    emailLabel: string;
  };
};

export const uiStrings: Record<Language, UiStrings> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      articles: "Articles",
      resume: "Resume",
      contact: "Contact",
      toggleMenu: "Toggle navigation menu",
    },
    home: {
      eyebrow: "Automation • API Testing • Performance Testing",
      tagline: "QA Lead & Software Engineer",
      description:
        "I build test strategies and automation frameworks that catch problems before they reach production — and I document the engineering decisions behind them, not just the tools.",
      resumeCta: "Resume",
      projectsCta: "Projects",
      githubCta: "GitHub",
      linkedinCta: "LinkedIn",
      contactCta: "Contact",
      highlights: {
        years: "Years in Software QA",
        frameworks: "Automation frameworks shipped",
        focus: "Testing focus",
        focusValue: "E2E · API · Performance",
      },
      selectedWork: "Selected work",
      featuredProjects: "Featured projects",
      viewAllProjects: "View all projects →",
    },
    about: {
      eyebrow: "About",
      title: "Quality is a design decision, not a final check.",
    },
    projects: {
      eyebrow: "Case studies",
      title: "Projects",
      description:
        "Each project walks through the problem, the architecture, the implementation, the results, and what I'd do differently — not just a list of tools.",
      viewCaseStudy: "View case study →",
    },
    projectDetail: {
      back: "← Back to projects",
      problem: "Problem",
      architecture: "Architecture",
      implementation: "Implementation",
      results: "Results",
      lessons: "Lessons Learned",
      codeHighlights: "Code Highlights",
      viewOnGithub: "View on GitHub →",
    },
    articles: {
      eyebrow: "Writing",
      title: "Technical Articles",
      description:
        "Notes on automation architecture, API and performance testing, and the quality engineering mindset. One article per month.",
    },
    contact: {
      eyebrow: "Get in touch",
      title: "Contact",
      description: "Open to QA Engineer / Software Engineer roles. The fastest way to reach me is email.",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
    },
    resume: {
      eyebrow: "Resume",
      title: "Download my resume",
      description:
        "Get the full breakdown of my experience as a QA Engineer with leadership experience: automation frameworks, API and performance testing, and quality leadership.",
    },
    footer: {
      builtWith: "Built with Next.js & Tailwind CSS.",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      emailLabel: "Email",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Acerca de",
      projects: "Proyectos",
      articles: "Artículos",
      resume: "Currículum",
      contact: "Contacto",
      toggleMenu: "Alternar menú de navegación",
    },
    home: {
      eyebrow: "Automatización • Pruebas de API • Pruebas de Rendimiento",
      tagline: "Líder de QA e Ingeniero de Software",
      description:
        "Construyo estrategias de prueba y frameworks de automatización que detectan problemas antes de que lleguen a producción — y documento las decisiones de ingeniería detrás de ellos, no solo las herramientas.",
      resumeCta: "Currículum",
      projectsCta: "Proyectos",
      githubCta: "GitHub",
      linkedinCta: "LinkedIn",
      contactCta: "Contacto",
      highlights: {
        years: "Años en QA de Software",
        frameworks: "Frameworks de automatización entregados",
        focus: "Enfoque de pruebas",
        focusValue: "E2E · API · Rendimiento",
      },
      selectedWork: "Trabajo seleccionado",
      featuredProjects: "Proyectos destacados",
      viewAllProjects: "Ver todos los proyectos →",
    },
    about: {
      eyebrow: "Acerca de",
      title: "La calidad es una decisión de diseño, no una revisión final.",
    },
    projects: {
      eyebrow: "Casos de estudio",
      title: "Proyectos",
      description:
        "Cada proyecto recorre el problema, la arquitectura, la implementación, los resultados y qué haría diferente — no solo una lista de herramientas.",
      viewCaseStudy: "Ver caso de estudio →",
    },
    projectDetail: {
      back: "← Volver a proyectos",
      problem: "Problema",
      architecture: "Arquitectura",
      implementation: "Implementación",
      results: "Resultados",
      lessons: "Lecciones Aprendidas",
      codeHighlights: "Fragmentos de Código Destacados",
      viewOnGithub: "Ver en GitHub →",
    },
    articles: {
      eyebrow: "Escritos",
      title: "Artículos Técnicos",
      description:
        "Notas sobre arquitectura de automatización, pruebas de API y rendimiento, y la mentalidad de ingeniería de calidad. Un artículo por mes.",
    },
    contact: {
      eyebrow: "Ponte en contacto",
      title: "Contacto",
      description: "Abierto a roles de QA Engineer / Software Engineer. La forma más rápida de contactarme es por correo.",
      emailLabel: "Correo",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
    },
    resume: {
      eyebrow: "Currículum",
      title: "Descarga mi currículum",
      description:
        "Obtén el detalle completo de mi experiencia como QA Engineer con experiencia de liderazgo: frameworks de automatización, pruebas de API y rendimiento, y liderazgo de calidad.",
    },
    footer: {
      builtWith: "Construido con Next.js y Tailwind CSS.",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      emailLabel: "Correo",
    },
  },
};
