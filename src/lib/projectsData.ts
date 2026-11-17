// área da tela dentro da imagem de mockup (em pixels da imagem), para recortar só a tela
export interface ScreenCrop {
  iw: number;
  ih: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

const IMAC_PNG_SCREEN: ScreenCrop = { iw: 3786, ih: 3158, x: 150, y: 186, w: 3484, h: 1966 };
const IMAC_SVG_SCREEN: ScreenCrop = { iw: 1580, ih: 1102, x: 147, y: 102, w: 1286, h: 724 };

export interface ProjectVideo {
  /** o navegador usa o primeiro formato que suportar: webm (menor) e depois mp4 */
  webm?: string;
  mp4: string;
  /** imagem mostrada enquanto o vídeo carrega */
  poster?: string;
}

export interface StaticProjectData {
  id: number;
  title: string;
  mockup: string;
  images: string[];
  mockupType: "phone" | "desktop";
  featured?: boolean;
  tags: string[];
  github: string;
  demo?: string;
  // destaques: janela de navegador
  /** vídeo em /public (16:10), mostrado na janela; sem ele, aparece a tela do mockup */
  video?: ProjectVideo;
  /** endereço exibido na barra da janela; padrão: demo ou repositório */
  previewUrl?: string;
  screen?: ScreenCrop;
}

export interface Project extends StaticProjectData {
  description: string;
  company: string;
  year: string;
  category: string;
  team: string;
  scope: string;
  badge?: string;
  role?: string;
  highlights?: string[];
}

export const STATIC_PROJECTS_DATA: StaticProjectData[] = [
  {
    id: 0,
    title: "knowball",
    featured: true,
    mockup: "/apple-imac-knowball-website.png",
    images: ["/apple-imac-knowball-website.png"],
    mockupType: "desktop",
    tags: [
      "Java",
      "Angular",
      "Tailwind CSS",
      "TypeScript",
      "Spring Boot",
      "Spring Data JPA",
      "Spring Security",
      "Spring AI",
      "Oracle Database",
      "JWT",
      "Flyway",
      "API Rest",
      "Render",
      "Vercel",
    ],
    github: "https://github.com/knowball-oracle/knowball-api",
    previewUrl: "knowball-web-henna.vercel.app/auth/login",
    screen: IMAC_PNG_SCREEN,
    video: {
      webm: "/videos/knowball/knowball.webm",
      mp4: "/videos/knowball/knowball.mp4",
      poster: "/videos/knowball/poster.jpg",
    },
  },
  {
    id: 1,
    title: "bootlift",
    featured: true,
    mockup: "/apple-imac-bootlift.svg",
    images: ["/apple-imac-bootlift.svg"],
    mockupType: "desktop",
    tags: [
      "TypeScript",
      "Node.js",
      "GitHub Actions",
      "Spring Boot",
      "Jest",
      "Rollup",
      "ESLint",
      "CodeQL",
      "CI/CD",
    ],
    github: "https://github.com/GabrielRossi01/bootlift.git",
    previewUrl: "bootlift-site.vercel.app",
    screen: IMAC_SVG_SCREEN,
    video: {
      webm: "/videos/bootlift/bootlift.webm",
      mp4: "/videos/bootlift/bootlift.mp4",
      poster: "/videos/bootlift/poster.jpg",
    },
  },
  {
    id: 2,
    title: "orion-infra-aws",
    mockup: "/apple-imac-infra-aws.png",
    images: ["/apple-imac-infra-aws.png"],
    mockupType: "desktop",
    tags: [
      "Java",
      "AWS CDK",
      "VPC",
      "ECS Fargate",
      "ECR",
      "Application Load Balancer",
      "RDS MySQL",
      "CloudWatch",
      "Application Auto Scaling",
    ],
    github: "https://github.com/GabrielRossi01/orion-infra-aws.git",
    screen: IMAC_PNG_SCREEN,
  },
  {
    id: 3,
    title: "whobetter",
    mockup: "/apple-imac-whobetter.png",
    images: ["/apple-imac-whobetter.png"],
    mockupType: "desktop",
    tags: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Spring Cloud",
      "Spring Security",
      "JWT",
      "PostgreSQL",
      "Flyway",
      "RabbitMQ",
      "Microsservice",
      "Docker",
      "Grafana K6",
      "Resilience4J",
      "JUnit",
      "Mockito",
    ],
    github: "https://github.com/GabrielRossi01/whobetter.git",
    screen: IMAC_PNG_SCREEN,
  },
  {
    id: 4,
    title: "acessly-api",
    mockup: "/apple-imac-acessly-api.png",
    images: ["/apple-imac-acessly-api.png"],
    mockupType: "desktop",
    tags: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "API Rest",
      "Oracle Database",
      "JWT",
      "HATEOAS",
      "Render",
    ],
    github: "https://github.com/acessly/acessly-api",
  },
  {
    id: 5,
    title: "world-cup-2026-ai-assistant",
    mockup: "/apple-imac-world-cup.png",
    images: ["/apple-imac-world-cup.png"],
    mockupType: "desktop",
    tags: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Spring AI",
      "Vaadin Flow",
      "H2 Database",
      "Groq API",
      "Ollama",
      "Tool Calling",
      "Structured Output",
      "SimpleVectorStore",
      "Rag",
      "Agent",
    ],
    github: "https://github.com/GabrielRossi01/world-cup.git",
  },
  {
    id: 6,
    title: "workout-tracker",
    mockup: "/apple-imac-workout.png",
    images: ["/apple-imac-workout.png"],
    mockupType: "desktop",
    tags: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Spring Security",
      "JWT",
      "Oracle Database",
      "Flyway",
      "Docker",
    ],
    github: "https://github.com/GabrielRossi01/workout-tracker-web.git",
  },
  {
    id: 7,
    title: "custom-restaurant",
    mockup: "/apple-imac-custom-restaurant.png",
    images: ["/apple-imac-custom-restaurant.png"],
    mockupType: "desktop",
    tags: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Spring AI",
      "Spring Cloud",
      "RabbitMQ",
      "Microsservice",
      "H2 Database",
    ],
    github: "https://github.com/GabrielRossi01/custom-restaurant.git",
  },
  {
    id: 8,
    title: "gamefinder",
    mockup: "/apple-imac-gamefinder.png",
    images: ["/apple-imac-gamefinder.png"],
    mockupType: "desktop",
    tags: [
      "Java",
      "Spring Boot",
      "Angular",
      "TypeScript",
      "HTML",
      "Tailwind CSS",
      "RAWG API",
    ],
    github: "https://github.com/GabrielRossi01/angular-gamefinder.git",
  },
  {
    id: 9,
    title: "digitalbank",
    mockup: "/iphone-mockup-digitalbank.png",
    images: ["/iphone-mockup-digitalbank.png"],
    mockupType: "phone",
    tags: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "API Rest",
      "H2 Database",
      "SLF4J",
    ],
    github: "https://github.com/GabrielRossi01/digitalbank",
  },
  {
    id: 10,
    title: "pluvia+",
    mockup: "/apple-imac-pluvia-plus.png",
    images: ["/apple-imac-pluvia-plus.png"],
    mockupType: "desktop",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/GabrielRossi01/website-pluvia",
  },
  {
    id: 11,
    title: "smarttrack",
    mockup: "/iphone-mockup-smarttrack.png",
    images: ["/iphone-mockup-smarttrack.png"],
    mockupType: "phone",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/GabrielRossi01/smarttrack",
  },
];
