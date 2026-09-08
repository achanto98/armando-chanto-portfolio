import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getProjectBySlug } from "@/data/projects";
import ProjectDetailContent from "./ProjectDetailContent";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");
  return { title: project ? `${project.title} — Armando Chanto` : "Project — Armando Chanto" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent slug={slug} />;
}
