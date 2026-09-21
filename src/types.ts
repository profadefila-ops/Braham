export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  impact: string;
  heroImage: string;
  externalUrl?: string;   // ← add this line
  galleryImages: string[];
  tags: string[];
  deliverables: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
}

export interface ServiceItem {
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  stats: string;
  statsLabel: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectNumber: string;
}

export interface BlogPost {
  id: string;
  number: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  format: string;
  timeline?: string;
  isPopular: boolean;
  features: string[];
}
