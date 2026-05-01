import type { Project, SkillCategory, Experience, NavLink } from "@/app/types";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Social Network Platform",
    description: "A full-stack social network with real-time feed, friend system, reactions, notifications, and dark mode — built with Django & React.",
    longDescription: "A complete social networking experience built from scratch. The backend runs on Django REST Framework with PostgreSQL for relational data and React Query on the frontend for fast, cached data fetching. The friend system supports bidirectional requests, mutual friend suggestions, and privacy controls.",
    challenge: "Building a scalable real-time notification system and a performant news feed that shows only relevant content from friends without hammering the database on every page load.",
    solution: "Implemented Django Signals to trigger WebSocket notifications via Django Channels, and used React Query with optimistic updates and smart cache invalidation to keep the feed fast and consistent without over-fetching.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    ],
    techStack: ["Django", "DRF", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "Shadcn/UI", "Framer Motion", "React Query"],
    tags: ["Social", "Real-time", "Auth", "REST API", "Full Stack", "TypeScript"],
    category: "fullstack",
    liveUrl: "https://social-network-react-black.vercel.app/",
    githubUrl: "https://github.com/Mmy2000/social-network-react",
    featured: true,
    year: "2024",
    role: "Full Stack Developer",
    features: [
      { title: "Authentication & Authorization", description: "Secure login, registration, and session management with JWT and protected routes." },
      { title: "Friend System", description: "Send, accept, or decline friend requests. Mutual friends and user suggestions supported." },
      { title: "Real-Time Feed", description: "Scrollable news feed displaying posts from friends using React Query for caching." },
      { title: "Post Interactions", description: "Create text/image posts, like, comment, and view reactions with Framer Motion animations." },
      { title: "Notification System", description: "Real-time notifications for friend requests, likes, and comments." },
      { title: "Dark Mode", description: "Persistent dark/light mode toggle with system preference detection." },
    ],
    metrics: ["Real-time WebSocket notifications", "Optimistic UI updates", "JWT-secured endpoints", "Mobile-first responsive design"],
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Comprehensive Django e-commerce platform with secure auth, dynamic product listing, PayPal & Stripe payments, and a full admin panel.",
    longDescription: "A production-ready e-commerce system built entirely on Django. The platform handles the full shopping lifecycle — browsing, cart management, multi-gateway checkout, order tracking, and admin-level inventory control. Security and performance were top priorities throughout.",
    challenge: "Integrating three different payment gateways (PayPal, Stripe, Cash on Delivery) with a unified order state machine, while keeping the checkout flow seamless for users regardless of payment method.",
    solution: "Built a payment abstraction layer in Django that normalizes responses from all three gateways into a single order pipeline. Webhook handlers update order states asynchronously, and the frontend shows live status without polling.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80",
    ],
    techStack: ["Django", "PostgreSQL", "Stripe", "PayPal", "Bootstrap", "JavaScript", "Celery", "Redis"],
    tags: ["E-Commerce", "Payments", "Auth", "Admin", "Django", "Full Stack"],
    category: "fullstack",
    liveUrl: "https://mmy2.pythonanywhere.com/",
    githubUrl: "https://github.com/Mmy2000/aviato-shopper",
    featured: true,
    year: "2023",
    role: "Full Stack Developer",
    features: [
      { title: "Multi-Gateway Payments", description: "PayPal, Stripe, and Cash on Delivery with a unified order state machine." },
      { title: "Dynamic Product Catalog", description: "Filtering, search, and sorting with category-based navigation." },
      { title: "Cart & Checkout", description: "Persistent cart, discount codes, and a streamlined multi-step checkout." },
      { title: "Order Tracking", description: "Real-time order status updates via webhooks and background tasks." },
      { title: "Admin Panel", description: "Full CRUD for products, orders, users, and payment details." },
      { title: "Responsive Design", description: "Optimized for desktop, tablet, and mobile with Bootstrap." },
    ],
    metrics: ["3 payment gateways integrated", "Full inventory management", "Async order processing with Celery"],
  },
  {
    id: "3",
    title: "E-Commerce Frontend",
    description: "Modern React e-commerce frontend powered by a Django REST API — Framer Motion animations, cart management, and full payment flows.",
    longDescription: "The React-powered storefront for the Django e-commerce backend. Built with a component-first mindset — every UI element is reusable, typed with TypeScript, and animated with Framer Motion. The app communicates entirely through the DRF API, making it a clean separation of concerns.",
    challenge: "Creating a smooth, app-like shopping experience on the web — with animated page transitions, an instant-feeling cart, and payment forms that don't feel clunky on mobile.",
    solution: "Used Framer Motion's layout animations for the cart drawer and page transitions. Cart state lives in Zustand with local persistence, so items survive page refreshes. Payment forms use Stripe Elements for secure, embedded card input.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
      "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1200&q=80",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "MUI", "Stripe Elements", "Django REST"],
    tags: ["React", "TypeScript", "Framer Motion", "E-Commerce", "Frontend", "Payments"],
    category: "frontend",
    liveUrl: "https://aviato-react.vercel.app/",
    githubUrl: "https://github.com/Mmy2000/aviato-react",
    featured: true,
    year: "2024",
    role: "Frontend Developer",
    features: [
      { title: "Dynamic Product Display", description: "API-driven catalog with filtering, sorting, and search." },
      { title: "Framer Motion Animations", description: "Page transitions, cart drawer, and micro-interactions." },
      { title: "Cart Management", description: "Persistent cart with Zustand — survives page refreshes." },
      { title: "Payment Integration", description: "Stripe Elements for secure in-form card input." },
      { title: "Auth Flows", description: "Login, registration, and token-based session management." },
      { title: "Reusable Components", description: "Modular, typed component library for scalability." },
    ],
    metrics: ["TypeScript throughout", "Persistent cart state", "Stripe Elements integration", "60fps animations"],
  },
  {
    id: "4",
    title: "Travel Booking Platform",
    description: "Booking.com-style platform for hotels, flights, and car rentals — backend lead with Django, Celery, and Amadeus API.",
    longDescription: "A large-scale internal travel booking system modeled after Booking.com. I served as backend lead, responsible for the full API layer, data modeling, background task infrastructure, and third-party integrations. The system handles thousands of concurrent booking queries with Redis caching keeping response times fast.",
    challenge: "Designing data models flexible enough to handle hotels, flights, and car rentals — each with unique availability windows, pricing rules, and cancellation policies — without creating an unmaintainable spaghetti schema.",
    solution: "Used a polymorphic booking model with a shared base and type-specific extensions. Availability and pricing are computed at query time via optimized SQL with select_related/prefetch_related, and cached in Redis with short TTLs to balance freshness and speed.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
    ],
    techStack: ["Django", "DRF", "PostgreSQL", "Celery", "Redis", "JWT", "Amadeus API", "Docker"],
    tags: ["Backend", "REST API", "Celery", "Redis", "Django", "Third-party API"],
    category: "backend",
    liveUrl: "https://wltfrontend.hinetsoft.net/",
    githubUrl: "https://github.com/Mmy2000/",
    featured: true,
    year: "2024",
    role: "Backend Lead Developer",
    features: [
      { title: "Multi-Service Booking", description: "Unified API for hotel, flight, and car rental bookings." },
      { title: "JWT Authentication", description: "Role-based access for customers and service providers." },
      { title: "Background Tasks", description: "Celery + Redis for email confirmations and payment processing." },
      { title: "Amadeus Integration", description: "Real-time flight and car data from the Amadeus travel API." },
      { title: "Query Optimization", description: "Redis caching and smart ORM queries for high throughput." },
      { title: "Test Coverage", description: "Unit and integration tests for all critical booking flows." },
    ],
    metrics: ["Amadeus API integrated", "Celery async tasks", "Redis-backed caching", "JWT role-based access"],
  },
  {
    id: "5",
    title: "ERPNext Mobile API",
    description: "RESTful APIs bridging ERPNext to a custom mobile app — integrating Sales, Inventory, HR, and Projects modules.",
    longDescription: "Developed the API layer connecting an ERPNext instance to a custom-built mobile application for company staff. The goal was to expose the right subset of ERP data — in a mobile-friendly shape — without compromising the core ERPNext configuration or security model.",
    challenge: "ERPNext's built-in APIs are verbose and designed for web clients. Mobile apps need lean, fast responses with predictable shapes — and the data often had to be aggregated across multiple ERPNext doctypes in a single request.",
    solution: "Built a custom API layer in Python that wraps ERPNext's Frappe framework methods, aggregates multi-doctype data server-side, and serializes it into clean JSON responses. Added response caching for read-heavy endpoints.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    ],
    techStack: ["ERPNext", "Frappe", "Python", "REST API", "MySQL", "JWT"],
    tags: ["ERP", "Backend", "REST API", "Python", "Mobile API", "Enterprise"],
    category: "backend",
    githubUrl: "https://github.com/Mmy2000",
    featured: false,
    year: "2025",
    role: "Backend Developer",
    features: [
      { title: "Module Integration", description: "Sales, Inventory, HR, and Projects modules exposed via mobile-friendly APIs." },
      { title: "Mobile Auth", description: "Secure authentication using ERPNext's user management system." },
      { title: "Data Aggregation", description: "Server-side joins across ERPNext doctypes into single clean responses." },
      { title: "Response Caching", description: "Cached read-heavy endpoints for fast mobile data access." },
      { title: "API Documentation", description: "Full endpoint docs written for frontend/mobile teams." },
      { title: "Query Optimization", description: "Tuned serialization and query plans for mobile-speed responses." },
    ],
    metrics: ["4 ERP modules integrated", "Custom API layer over Frappe", "Full endpoint documentation"],
  },
  {
    id: "6",
    title: "Neurological Disease Diagnostic AI",
    description: "AI-powered diagnostic system for neurological diseases using deep learning — graduation project graded Excellent.",
    longDescription: "My final year project at Zagazig University. Built a diagnostic assistance system that uses deep learning models to analyze patient data and flag indicators of neurological diseases. The project combined medical domain knowledge with practical machine learning engineering.",
    challenge: "Working with imbalanced medical datasets where false negatives (missed diagnoses) carry far more cost than false positives, while also keeping the model interpretable enough for medical context.",
    solution: "Applied SMOTE for class balancing, used ensemble methods to reduce false negatives, and generated SHAP explanations alongside predictions so users could understand why the model flagged a result.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    ],
    techStack: ["Python", "TensorFlow", "Keras", "scikit-learn", "pandas", "NumPy", "SHAP", "Matplotlib"],
    tags: ["AI", "Deep Learning", "Python", "Healthcare", "Machine Learning", "Research"],
    category: "backend",
    githubUrl: "https://github.com/Mmy2000",
    featured: false,
    year: "2023",
    role: "ML Engineer",
    features: [
      { title: "Deep Learning Models", description: "Multi-layer neural networks trained on neurological patient data." },
      { title: "Class Balancing", description: "SMOTE applied to handle imbalanced medical datasets fairly." },
      { title: "Ensemble Methods", description: "Combined models to minimize false negatives in diagnostic output." },
      { title: "SHAP Explanations", description: "Model interpretability layer so users understand flagged results." },
      { title: "Data Pipeline", description: "Full preprocessing pipeline with pandas and NumPy." },
      { title: "Visualization", description: "Matplotlib dashboards for model performance and prediction outputs." },
    ],
    metrics: ["Graded: Excellent", "SHAP explainability", "Ensemble model approach", "Imbalanced dataset handling"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Backend",
    skills: [
      { name: "Django / DRF", level: 95 },
      { name: "Python", level: 93 },
      { name: "Node.js", level: 80 },
      { name: "PostgreSQL", level: 88 },
      { name: "REST Framework", level: 95 },
      { name: "Celery & Redis", level: 82 },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "HTML & CSS", level: 95 },
    ],
  },
  {
    label: "Tools & Libraries",
    skills: [
      { name: "Git & GitHub", level: 92 },
      { name: "Shadcn/UI", level: 88 },
      { name: "Material UI", level: 85 },
      { name: "Bootstrap", level: 88 },
      { name: "Framer Motion", level: 80 },
      { name: "Machine Learning", level: 72 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    company: "National Telecommunication Institute (NTI)",
    role: "Python Instructor",
    period: "Jul 2025 — Present",
    location: "Cairo, Egypt",
    description: "Delivering comprehensive Python training to students in the NTI Intake System — covering core concepts, OOP, file handling, and data science libraries.",
    highlights: [
      "Designed a structured curriculum covering Python, OOP, file handling, and libraries (pandas, NumPy, matplotlib)",
      "Led hands-on coding sessions and practical exercises to strengthen problem-solving skills",
      "Evaluated students through projects, quizzes, and code reviews with constructive feedback",
      "Continuously updated course materials to reflect the latest industry practices",
    ],
    technologies: ["Python", "pandas", "NumPy", "matplotlib", "OOP"],
  },
  {
    id: "2",
    company: "Hinet Soft",
    role: "Backend Developer — Django & ERPNext",
    period: "Nov 2024 — Present",
    location: "Mansoura, Egypt",
    description: "Developing and maintaining scalable web applications and APIs using Django, Django REST Framework, and ERPNext.",
    highlights: [
      "Developed and maintained scalable APIs with Django REST Framework and ERPNext",
      "Designed efficient database models, optimized queries, and implemented business logic",
      "Integrated third-party services for authentication, payments, and real-time features",
      "Ensured performance through caching, background tasks (Celery), and query optimization",
      "Wrote tests for code quality and implemented security best practices",
    ],
    technologies: ["Django", "DRF", "ERPNext", "PostgreSQL", "Celery", "Redis", "Python"],
  },
  {
    id: "3",
    company: "Z Digital Marketing",
    role: "Full Stack Developer — Django & React",
    period: "Jan 2024 — Oct 2024",
    location: "Dubai, UAE (Remote)",
    description: "Developed and maintained full-stack web applications for a UAE-based digital marketing agency — working remotely across Django backend and React frontend.",
    highlights: [
      "Built and maintained web applications using Django backend and React frontend",
      "Improved application performance, security, and developed new product features",
      "Demonstrated strong technical skills, teamwork, and effective remote communication",
      "Worked across Business Bay (Dubai) and Al Hail (Fujairah) project teams remotely",
    ],
    technologies: ["Django", "React", "JavaScript", "TypeScript", "REST API", "PostgreSQL"],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getRelatedProjects(project: Project, count = 3): Project[] {
  return projects
    .filter(p => p.id !== project.id)
    .sort((a, b) => {
      // Score by shared tags + same category
      const sharedTags = (p: Project) =>
        p.tags.filter(t => project.tags.includes(t)).length +
        (p.category === project.category ? 2 : 0);
      return sharedTags(b) - sharedTags(a);
    })
    .slice(0, count);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  projects.forEach(p => p.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
