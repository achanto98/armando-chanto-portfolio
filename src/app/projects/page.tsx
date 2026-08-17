import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Armando Chanto",
};

export default function ProjectsPage() {
  return (
    <Container className="py-20">
      <SectionHeading
        eyebrow="Case studies"
        title="Projects"
        description="Each project walks through the problem, the architecture, the implementation, the results, and what I'd do differently — not just a list of tools."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
