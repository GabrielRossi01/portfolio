export interface StaticProjectData {
  id: number;
  title: string;
  mockup: string;
  images: string[];
  mockupType: "phone" | "desktop";
  tags: string[];
  github: string;
}

export const STATIC_PROJECTS_DATA: StaticProjectData[] = [
  {
    id: 0,
    title: "knowball",
    mockup: "/apple-imac-knowball.png",
    images: ["/apple-imac-knowball.png"],
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
      "Vercel"
    ],
    github: "https://github.com/knowball-oracle/knowball-api",
  },
  {
    id: 1,
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
      "Application Auto Scaling"
    ],
    github: "https://github.com/GabrielRossi01/orion-infra-aws.git",
  },
  {
    id: 2,
    title: "acessly-api",
    mockup: "/apple-imac-acessly-api.png",
    images: [
      "/apple-imac-acessly-api.png",

    ],
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
      "Render"
    ],
    github: "https://github.com/acessly/acessly-api",
  },
  {
    id: 3,
    title: "world-cup-2026-assistant",
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
      "Agent"
    
    ],
    github: "https://github.com/GabrielRossi01/world-cup.git",
  },
  {
    id: 4,
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
      "Docker"
    ],
    github: "https://github.com/GabrielRossi01/workout-tracker-web.git",
  },
  {
    id: 5,
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
      "Mockito"
    ],
    github: "https://github.com/GabrielRossi01/whobetter.git",
  },
  {
    id: 6,
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
      "H2 Database"
    ],
    github: "https://github.com/GabrielRossi01/custom-restaurant.git",
  },
  {
    id: 7,
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
      "RAWG API"
    ],
    github: "https://github.com/GabrielRossi01/angular-gamefinder.git",
  },
  {
    id: 8,
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
    id: 9,
    title: "pluvia+",
    mockup: "/apple-imac-pluvia-plus.png",
    images: ["/apple-imac-pluvia-plus.png"],
    mockupType: "desktop",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/GabrielRossi01/website-pluvia",
  },
  {
    id: 10,
    title: "smarttrack",
    mockup: "/iphone-mockup-smarttrack.png",
    images: ["/iphone-mockup-smarttrack.png"],
    mockupType: "phone",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/GabrielRossi01/smarttrack",
  },
];
