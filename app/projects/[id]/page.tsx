import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectById, getRelatedProjects } from "@/app/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const { projects } = await import("@/app/lib/data");
  return projects.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectById(params.id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Mahmoud Yousef`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectById(params.id);
  if (!project) notFound();
  const related = getRelatedProjects(project, 3);
  return <ProjectDetailClient project={project} related={related} />;
}
