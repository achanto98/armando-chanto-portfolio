import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects — Armando Chanto",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
