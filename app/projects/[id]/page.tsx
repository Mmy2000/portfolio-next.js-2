import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectById, getRelatedProjects } from "@/app/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const { projects } = await import("@/app/lib/data");
  return projects.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Mahmoud Yousef`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();
  const related = getRelatedProjects(project, 3);
  return <ProjectDetailClient project={project} related={related} />;
}
