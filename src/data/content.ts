import { Project, ServiceItem, Review, BlogPost } from '../types';
import { siApple, siNike, siDior, siSony } from 'simple-icons';

export const SERVICES_STACK = [
  {
    id: 'web-design-dev',
    number: '01',
    title: 'Web Design',
    headline: 'Distinctive, responsive websites combining creative design with thoughtful development.',
    image: 'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/bui.webp',
    tags: ['Web Design', 'Responsive Layouts', 'Front-End Development', 'Performance'],
  },
  {
    id: 'ui-ux-design',
    number: '02',
    title: 'UI/UX Design',
    headline: 'Thoughtful interfaces and digital journeys designed around clarity, usability and visual character.',
    image: 'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/fit.webp',
    tags: ['Interface Design', 'User Flows', 'Wireframing', 'Design Systems'],
  },
  {
    id: 'ecommerce',
    number: '03',
    title: 'E-commerce',
    headline: 'Premium digital storefronts that make products easier to discover, explore and buy.',
    image: 'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/ag.webp',
    tags: ['Storefront Design', 'Product Discovery', 'Checkout Flow', 'Merchandising'],
  },
  {
    id: 'creative-direction',
    number: '04',
    title: 'Creative Direction',
    headline: 'Visual concepts and digital art direction that give brands and projects a recognizable creative identity.',
    image: 'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/ai.webp',
    tags: ['Visual Identity', 'Art Direction', 'Typography', 'Brand Systems'],
  },
];

export const PRICING_PLANS = [
  {
    id: 'website-projects',
    name: 'Website Projects',
    subtitle: 'FOR BRANDS READY TO BUILD OR RETHINK THEIR DIGITAL PRESENCE.',
    format: 'PROJECT-BASED',
    timeline: '2–4 WEEKS',
    isPopular: false,
    features: [
      'CUSTOM CREATIVE DIRECTION & LAYOUTS',
      'RESPONSIVE FRONT-END DEVELOPMENT',
      'INTERACTIVE PROTOTYPING & TESTING',
      'TYPOGRAPHY & DESIGN TOKENS',
      'PERFORMANCE & SEO AUDIT',
      'LAUNCH PREPARATION & HANDOFF',
    ],
  },
  {
    id: 'ecommerce-experiences',
    name: 'E-Commerce Experiences',
    subtitle: 'FOR PRODUCT-LED BRANDS THAT NEED A STRONGER WAY TO SHOWCASE AND SELL ONLINE.',
    format: 'PROJECT-BASED',
    timeline: '4–6 WEEKS',
    isPopular: true,
    features: [
      'CUSTOM STOREFRONT ARCHITECTURE',
      'PRODUCT DISCOVERY & FILTERING DESIGN',
      'STREAMLINED CHECKOUT USER JOURNEY',
      'HIGH-PERFORMANCE MOBILE OPTIMIZATION',
      'DESIGN TOKENS & COMPONENT STYLING',
      'E-COMMERCE CMS INTEGRATION',
    ],
  },
  {
    id: 'creative-partnership',
    name: 'Creative Partnership',
    subtitle: 'FOR BRANDS REQUIRING ONGOING DESIGN, DEVELOPMENT AND CREATIVE SUPPORT.',
    format: 'ONGOING SUPPORT',
    timeline: '100% CAPACITY',
    isPopular: false,
    features: [
      'DIRECT CREATIVE DIRECTION ACCESS',
      'CONTINUOUS UI/UX ENHANCEMENTS',
      'CAMPAIGN PAGES & NEW FEATURE ROLLOUTS',
      'MOTION & MICRO-INTERACTION UPDATES',
      'ONGOING DIGITAL BRAND EVOLUTION',
      'PRIORITY SPRINT PLANNING',
    ],
  },
];

export const RETAINER_PLANS = [
  {
    id: 'design-sprint-retainer',
    name: 'Design Advisory',
    subtitle: 'CONTINUOUS SENIOR DESIGN DIRECTION & UI/UX OVERSIGHT FOR PRODUCT TEAMS.',
    format: 'MONTHLY RETAINER',
    timeline: 'DEDICATED SPRINTS',
    isPopular: false,
    features: [
      'DIRECT DESIGN DIRECTOR CONSULTATION',
      'BI-WEEKLY DESIGN SYSTEM REVIEWS',
      'INTERACTION & USER JOURNEY REFINEMENTS',
      'HIGH-FIDELITY FIGMA ASSET LIBRARY',
      'ASYNC SLACK & VIDEO CRITIQUES',
      'GUARANTEED 48-HR TURNAROUND',
    ],
  },
  {
    id: 'full-stack-retainer',
    name: 'Studio Embedded',
    subtitle: 'FULL-SERVICE DESIGN AND FRONT-END EXECUTION EMBEDDED IN YOUR ROADMAP.',
    format: 'QUARTERLY RETAINER',
    timeline: 'PRIORITY QUEUE',
    isPopular: true,
    features: [
      'DEDICATED SENIOR DESIGNER & DEV PAIR',
      'CONTINUOUS NEW FEATURE ROLLOUTS',
      'A/B TEST & CONVERSION RATE SPRINTS',
      'CORE WEB VITALS & SPEED AUDITING',
      'DESIGN SYSTEM MAINTENANCE & TOKENS',
      'DIRECT SLACK & STANDUP INTEGRATION',
    ],
  },
  {
    id: 'growth-retainer',
    name: 'Digital Evolution',
    subtitle: 'HIGH-VELOCITY CREATIVE DIRECTION, CAMPAIGNS & DIGITAL COMMERCE OPTIMIZATION.',
    format: 'ANNUAL PARTNERSHIP',
    timeline: 'UNLIMITED CAPACITY',
    isPopular: false,
    features: [
      'FULL CREATIVE DIRECTION LEADERSHIP',
      'OMNICHANNEL BRAND & PRODUCT CAMPAIGNS',
      'CUSTOM 3D, MOTION & INTERACTIVE ASSETS',
      'CONTINUOUS E-COMMERCE CONVERSION WORK',
      'EXECUTIVE QUARTERLY STRATEGY REVIEWS',
      'VIP DEDICATED SPRINT SLOTS',
    ],
  },
];

export const CLIENT_LOGOS = [
  {
    id: 'brand-01',
    code: '[01]',
    name: 'Daytime Healthcare',
    tagline: 'DIGITAL ARCHITECTURE',
    logoUrl:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/day.png',
  },
  {
    id: 'brand-02',
    code: '[02]',
    name: 'Quality Care',
    tagline: 'Genesis Outsourcing',
    logoUrl:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/gen.png',
  },
  {
    id: 'brand-03',
    code: '[03]',
    name: 'New Logo',
    tagline: 'THYRVE ACADEMY',
    logoUrl:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/mill.png',
  },
  {
    id: 'brand-04',
    code: '[04]',
    name: 'Premium',
    tagline: 'PREMIUM GROUP',
    logoUrl:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/LLO/premium-removebg-preview.png',
  },
];

export const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
];

export const ROTATING_TITLES = [
  'FOR AMBITIOUS BRANDS',
  'DESIGN-LED & PURPOSEFUL',
  'BUILT TO LEAVE A MARK',
];

export const HERO_SERVICES: ServiceItem[] = [
  {
    number: '01/',
    title: 'Web Design & Dev',
    shortDesc: 'Distinctive, responsive websites combining creative design with thoughtful development.',
    fullDesc: 'We create bespoke websites engineered with custom typography, clean front-end code, and responsive layout hierarchy.',
    deliverables: ['Custom Web Design', 'Responsive Front-End', 'Design Systems', 'Performance'],
    stats: 'Bespoke',
    statsLabel: 'Design & Code',
  },
  {
    number: '02/',
    title: 'UI/UX Design',
    shortDesc: 'Thoughtful interfaces and digital journeys designed around clarity, usability and visual character.',
    fullDesc: 'We design clear digital interfaces and intuitive user flows that balance visual personality with effortless functionality.',
    deliverables: ['Interface Design', 'User Flows', 'Wireframing', 'Interactive Prototyping'],
    stats: 'Intentional',
    statsLabel: 'User Experience',
  },
  {
    number: '03/',
    title: 'E-commerce',
    shortDesc: 'Premium digital storefronts that make products easier to discover, explore and buy.',
    fullDesc: 'We engineer conversion-conscious storefronts with refined merchandising, fast checkout flows, and elevated brand aesthetics.',
    deliverables: ['Storefront Design', 'Product Discovery', 'Checkout Experience', 'Mobile Optimization'],
    stats: 'Tailored',
    statsLabel: 'Digital Commerce',
  },
  {
    number: '04/',
    title: 'Creative Direction',
    shortDesc: 'Visual concepts and digital art direction that give brands a recognizable creative identity.',
    fullDesc: 'We establish distinctive visual identities, art direction, and digital design systems that make brands recognizable.',
    deliverables: ['Visual Concepts', 'Digital Art Direction', 'Typography Systems', 'Motion Principles'],
    stats: 'Distinct',
    statsLabel: 'Creative Identity',
  },
];

export const MARQUEE_ITEMS = [
  'WEB DESIGN',
  'DEVELOPMENT',
  'UI/UX',
  'E-COMMERCE',
  'CREATIVE DIRECTION',
  'BRANDING',
  'DIGITAL EXPERIENCES',
];

export const PROJECTS: Project[] = [
  {
    id: 'project-01',
    number: '(01)',
    title: 'Premium Group',
    client: 'Premium Group',
    category: 'Web Design & Development',
    year: '2026',
    description:
      'An editorial web platform engineered with disciplined typography, custom interactive layouts, and responsive motion.',
    impact: 'Distinctive digital presence with bespoke design architecture.',
    heroImage:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/674.webp',
    externalUrl: 'https://premiumgroupng.com/',
    galleryImages: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80',
    ],
    tags: ['Web Design', 'Front-End Development', 'Typography System', 'Responsive Layout'],
    deliverables: ['Visual Direction', 'Custom Web Design', 'Responsive Build', 'Design Tokens'],
    metrics: [
      { label: 'Conversion Velocity', value: '+140%' },
      { label: 'Lighthouse Performance', value: '99/100' },
      { label: 'Page Load Speed', value: '0.4s' },
    ],
  },
  {
    id: 'project-02',
    number: '(02)',
    title: 'Medsurgelective',
    client: 'Medsurgelective',
    category: 'E-commerce',
    year: '2026',
    description:
      'A refined digital storefront designed to make exploration intuitive, product discovery effortless, and elevate brand character.',
    impact: 'Frictionless product discovery with premium brand aesthetics.',
    heroImage:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/65.webp',
    externalUrl: 'https://www.medsurgelective.co.uk/',
    galleryImages: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&auto=format&fit=crop&q=80',
    ],
    tags: ['Storefront Design', 'Product Discovery', 'Checkout Flow', 'Mobile Commerce'],
    deliverables: ['Storefront Architecture', 'UI/UX Design', 'Merchandising Flow', 'Mobile Optimization'],
    metrics: [
      { label: 'Catalog Engagement', value: '+185%' },
      { label: 'Checkout Conversion', value: '+42%' },
      { label: 'Average Session', value: '4.2m' },
    ],
  },
  {
    id: 'project-03',
    number: '(03)',
    title: 'Daytime Homecare',
    client: 'Daytime Homecare',
    category: 'UI/UX Design',
    year: '2025',
    description:
      'A thoughtful digital interface structured around clarity, effortless navigation, and visual restraint.',
    impact: 'Systematic component hierarchy and intuitive user journeys.',
    heroImage:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/90.webp',
    externalUrl: 'https://daytimehomecare.com/',
    galleryImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&auto=format&fit=crop&q=80',
    ],
    tags: ['Interface Design', 'User Flows', 'Wireframing', 'Design Systems'],
    deliverables: ['Interface Design', 'User Journey Mapping', 'Design Tokens', 'Interactive Prototyping'],
    metrics: [
      { label: 'Daily Interactions', value: '180K+' },
      { label: 'Task Completion', value: '96%' },
      { label: 'Latency Reduction', value: '-65%' },
    ],
  },
  {
    id: 'project-04',
    number: '(04)',
    title: 'Thryveacademy.co',
    client: 'Thryveacademy.co',
    category: 'Creative Direction & Motion',
    year: '2025',
    description:
      'A digital brand flagship combining visual art direction, typography systems, and purposeful micro-interactions.',
    impact: 'Memorable interactive experience built to communicate brand character.',
    heroImage:
      'https://kyauinvtjdjkfqzwlzfa.supabase.co/storage/v1/object/public/New/66.webp',
    externalUrl: 'https://thryveacademy.co/',
    galleryImages: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&auto=format&fit=crop&q=80',
    ],
    tags: ['Creative Direction', 'Motion Strategy', 'Brand System', 'Interaction'],
    deliverables: ['Visual Concept', 'Art Direction', 'Motion Strategy', 'Front-End Polish'],
    metrics: [
      { label: 'Brand Recognition', value: '+210%' },
      { label: 'Design Tokens', value: '140+' },
      { label: 'Global Markets', value: '28' },
    ],
  },
];

export const REVIEWS: Review[] = [];

export const BLOG_POSTS: BlogPost[] = [];
