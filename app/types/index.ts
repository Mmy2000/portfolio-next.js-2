export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  image: string;
  images: string[];          // gallery screenshots
  techStack: string[];
  tags: string[];            // free-form tags for filtering
  category: "fullstack" | "backend" | "frontend";
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
  role: string;
  features: ProjectFeature[];
  metrics?: string[];        // impact / numbers
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface NavLink {
  label: string;
  href: string;
}
