export interface StaticProjectData {
  id: number;
  title: string;
  mockup: string;
  mockupType: 'phone' | 'desktop';
  tags: string[];
  github: string;
  demo: string;
}

export const STATIC_PROJECTS_DATA: StaticProjectData[] = [
  {
    id: 0,
    title: 'acessly-api',
    mockup: '/apple-imac-acessly-api.png',
    mockupType: 'desktop',
    tags: ['Java', 'Spring Boot', 'API Rest', 'Swagger', 'Render', 'Spring Security', 'Spring Data JPA', 'Bean Validation', 'JDBC', 'JWT'],
    github: 'https://github.com/acessly/acessly-api.git',
    demo: 'https://github.com/acessly/acessly-api.git',
  },
  {
    id: 1,
    title: 'knowball',
    mockup: '/apple-imac-knowball-api.png',
    mockupType: 'desktop',
    tags: ['Java', 'Spring Boot', 'API Rest', 'Swagger', 'Maven', 'Lombok', 'Spring Data JPA', 'JDBC', 'Bean Validation', 'Spring Security', 'Insomnia'],
    github: 'https://github.com/knowball-oracle/knowball-api.git',
    demo: 'https://github.com/knowball-oracle/knowball-api.git',
  },
  {
    id: 2,
    title: 'digitalbank',
    mockup: '/iphone-mockup-digitalbank.png',
    mockupType: 'phone',
    tags: ['Java', 'Spring Boot', 'API Rest', 'Spring Data JPA', 'JDBC', 'Lombok', 'Bean Validation', 'SLF4J'],
    github: 'https://github.com/GabrielRossi01/digitalbank.git',
    demo: 'https://github.com/GabrielRossi01/digitalbank.git',
  },
  {
    id: 3,
    title: 'pluvia+',
    mockup: '/apple-imac-pluvia-plus.png',
    mockupType: 'desktop',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/GabrielRossi01/website-pluvia.git',
    demo: 'https://website-pluvia.vercel.app/',
  },
  {
    id: 4,
    title: 'smarttrack',
    mockup: '/iphone-mockup-smarttrack.png',
    mockupType: 'phone',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
    github: 'https://github.com/GabrielRossi01/smarttrack.git',
    demo: 'https://smarttrack-site.vercel.app/',
  },
];
