"use client";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/data/projects";
import { useLanguage } from "@/lib/language-context";
import { uiStrings } from "@/data/ui-strings";

export default function ProjectsContent() {
  const { language } = useLanguage();
  const t = uiStrings[language].projects;
  const projects = getProjects(language);

  return (
    <Container className="py-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
