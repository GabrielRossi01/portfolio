export type Language = "pt-BR" | "en" | "es";

export interface ProjectItem {
  title: string;
  company: string;
  year: string;
  description: string;
  metrics: string[];
}

export interface Translations {
  nav: {
    home: string;
    skills: string;
    about: string;
    projects: string;
    contact: string;
  };
  hero: {
    badge: string;
    headlineStart: string;
    headlineEnd: string;
    greeting: string;
    name: string;
    connector: string;
    title: string;
    ctaContact: string;
    ctaCV: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  techArsenal: {
    title: string;
    subtitle: string;
    frontend: string;
    backend: string;
    tools: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    collaboration: string;
    collaborationTitle: string;
    timezone: string;
    timezoneTitle: string;
    passionate: string;
    github: string;
    githubDesc: string;
    linkedin: string;
    linkedinDesc: string;
    workTogether: string;
    cleanCode: string;
    techEnthusiast: string;
    sendEmail: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    viewDemo: string;
    viewCaseStudy: string;
    items: ProjectItem[];
  };
  footer: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendButton: string;
    rights: string;
    quickLinks: string;
    socialLinks: string;
  };
}

export const translations: Record<Language, Translations> = {
  "pt-BR": {
    nav: {
      home: "Início",
      skills: "Habilidades",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      badge: "Disponível para projetos",
      headlineStart: "Transformo ideias ambiciosas em",
      headlineEnd: "produtos digitais de alta performance",
      greeting: "Olá, eu sou o",
      name: "Gabriel Rossi",
      connector: ", um",
      title: "Desenvolvedor Back-End",
      ctaContact: "Entre em Contato",
      ctaCV: "Baixar CV",
    },
    theme: {
      light: "Modo Claro",
      dark: "Modo Escuro",
    },
    techArsenal: {
      title: "Arsenal Tecnológico",
      subtitle: "Tecnologias que domino no desenvolvimento",
      frontend: "Front-end",
      backend: "Back-end & Database",
      tools: "Ferramentas",
    },
    about: {
      title: "Sobre Mim",
      subtitle: "Desenvolvedor apaixonado por criar soluções escaláveis",
      description:
        "Sou um desenvolvedor back-end com mais de 5 anos de experiência construindo APIs robustas, microserviços e arquiteturas distribuídas. Especializado em Node.js, Python e Go, com forte experiência em cloud computing (AWS) e containerização (Docker/Kubernetes). Apaixonado por código limpo, testes automatizados e melhores práticas de desenvolvimento.",
      collaboration: "Colaboração",
      collaborationTitle:
        "Foco no cliente, promovendo comunicação transparente",
      timezone: "Do Brasil para o mundo",
      timezoneTitle: "Localizado no Brasil, disponível para colaboração global",
      passionate: "Fascinado por tecnologias de ponta",
      github: "Contribuindo com projetos no GitHub",
      githubDesc: "Código aberto e colaboração",
      linkedin: "Compartilhando insights no LinkedIn",
      linkedinDesc: "Networking profissional",
      workTogether: "Vamos trabalhar juntos no seu próximo projeto",
      cleanCode: "Código Limpo e Design Moderno",
      sendEmail: "Me envie um email",
      techEnthusiast: "Apaixonado por desenvolvimento e tecnologia.",
    },
    projects: {
      title: "Projetos em destaque",
      subtitle: "Alguns dos meus trabalhos recentes",
      viewProject: "Ver Projeto",
      viewDemo: "Ver Demo",
      viewCaseStudy: "Ver Estudo de Caso",
      items: [
        {
          title: "knowball",
          company: "Oracle",
          year: "2025 – 2026 ",
          description:
            "API RESTful de gestão de campeonatos, partidas e denúncias das categorias de base do futebol brasileiro masculino. " +
            "Spring Boot com autenticação JWT assinado por chaves RSA assimétricas, controle de acesso por perfis, " +
            "HATEOAS e Flyway. Frontend Angular com guards, interceptors e formulários reativos.",
          metrics: [
            "43 endpoints REST documentados com Swagger/OpenAPI, versionados e migrados com Flyway",
            "Autenticação stateless com JWT assinado por chaves RSA assimétricas e controle de acesso ROLE_ADMIN / ROLE_USER",
            "Nível 3 do Richardson Maturity Model atingido com implementação de HATEOAS em todos os recursos",
            "Frontend Angular com guards de rota, interceptors HTTP e formulários reativos integrados à API",
          ],
        },
        {
          title: "acessly-api",
          company: "",
          year: "2025",
          description:
            "Desenvolvi o acessly-api, uma solução voltada para reduzir a lacuna de emprego para profissionais com deficiência através da correspondência precisa de vagas.",
          metrics: [
            "90% de mitigação de vulnerabilidades de acesso não autorizado.",
            "Garantia de integridade total do processo de recrutamento e dos dados sensíveis.",
            "Correspondência precisa (match assertivo) de vagas para o público-alvo.",
          ],
        },
        {
          title: "workout-tracker",
          company: "",
          year: "2026",
          description:
            "Aplicação full-stack de rastreamento de treinos. " +
            "Backend Spring Boot atua como gateway para a API Ninjas com JWT, Flyway e Docker Compose. " +
            "Frontend Angular v17+ com Signals, interceptor JWT funcional e guard de rota.",
          metrics: [
            "Gateway para API Ninjas com HttpExchange / RestClient, entregando exercícios por grupo muscular em tempo real",
            "Sistema de favoritos cruzando dados externos com persistência local no Oracle Database — lista privada por usuário",
            "Autenticação stateless JWT com BCrypt e interceptor funcional Angular injetando Bearer Token automaticamente",
            "Orquestração com Docker Compose via Spring Boot Compose Support e migrations automáticas com Flyway",
          ],
        },
        {
          title: "custom-restaurant",
          company: "",
          year: "2026",
          description:
            "Plataforma de recomendação de restaurantes em arquitetura de microsserviços com Spring Boot, Spring Cloud e Spring AI. " +
            "Integra Eureka para descoberta de serviços, LoadBalancer, Retry com Exponential Backoff, " +
            "RabbitMQ para mensageria assíncrona e geração narrativa de sugestões via Groq.",
          metrics: [
            "Arquitetura com 4 serviços independentes: Eureka Server, RestaurantService, UserService e RecommendationService",
            "Recomendações personalizadas com Spring AI + Groq, usando o modelo llama-3.3-70b-versatile para sugestões narrativas contextualizadas",
            "Comunicação resiliente com Spring Retry, Exponential Backoff e Spring Cloud LoadBalancer entre os microsserviços",
            "Mensageria assíncrona com RabbitMQ publicando RecommendationEvent sem bloquear a resposta principal ao cliente",
          ],
        },
        {
          title: "digitalbank",
          company: "",
          year: "2025",
          description:
            "Desenvolvi uma API RESTful voltada ao setor financeiro digital, orquestrando operações bancárias essenciais como depósito, saque e transferência via PIX entre contas.",
          metrics: [
            "Suporte a pagamentos instantâneos através da implementação de transferências via PIX.",
            "Gerenciamento integral de operações de caixa (Depósitos e Saques).",
            "Padronização de arquitetura REST, facilitando a escalabilidade e integração de serviços.",
          ],
        },
        {
          title: "pluvia+",
          company: "",
          year: "2025",
          description:
            "Implementei o pluvia+, uma plataforma web de impacto social focada em fornecer acesso a água potável para comunidades em crise hídrica.",
          metrics: [
            "Coleta automatizada de dados através de integração robusta com APIs em Java.",
            "Mitigação de riscos em cenários de eventos extremos de calor e colapso hídrico.",
            "Arquitetura sustentável, projetada para viabilizar soluções de purificação portátil.",
          ],
        },
        {
          title: "smarttrack",
          company: "CCR",
          year: "2024 - 2025",
          description:
            "Engenhei o smarttrack, um website responsivo projetado para otimizar a gestão e a automação de processos operacionais em estações de trens e metrôs no estado de São Paulo.",
          metrics: [
            "Acessibilidade multi-dispositivo, garantida por um design totalmente responsivo.",
            "Otimização operacional através da automação de rotinas das estações.",
            "Gestão centralizada da infraestrutura de transporte público (trens e metrôs).",
          ],
        },
      ],
    },
    footer: {
      title: "Entre em contato",
      subtitle: "Tem uma ideia? Vamos conversar!",
      namePlaceholder: "Seu nome",
      emailPlaceholder: "seu@email.com",
      messagePlaceholder: "Sua mensagem...",
      sendButton: "Enviar Mensagem",
      rights: "Todos os direitos reservados.",
      quickLinks: "Links Rápidos",
      socialLinks: "Redes Sociais",
    },
  },
  en: {
    nav: {
      home: "Home",
      skills: "Skills",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      badge: "Available for projects",
      headlineStart: "I transform ambitious ideas into",
      headlineEnd: "high-performing digital products",
      greeting: "Hello, I'm",
      name: "Gabriel Rossi",
      connector: ", a",
      title: "Back-End Developer",
      ctaContact: "Get in Touch",
      ctaCV: "Download CV",
    },
    theme: {
      light: "Light Mode",
      dark: "Dark Mode",
    },
    techArsenal: {
      title: "Tech Arsenal",
      subtitle: "Technologies I master in development",
      frontend: "Front-end",
      backend: "Back-end & Database",
      tools: "Tools",
    },
    about: {
      title: "About Me",
      subtitle: "Developer passionate about creating scalable solutions",
      description:
        "I am a back-end developer with over 5 years of experience building robust APIs, microservices and distributed architectures. Specialized in Node.js, Python and Go, with strong experience in cloud computing (AWS) and containerization (Docker/Kubernetes). Passionate about clean code, automated testing and development best practices.",
      collaboration: "Collaboration",
      collaborationTitle:
        "Focus on the customer, promoting transparent communication.",
      timezone: "From Brazil to the world",
      timezoneTitle: "Located in Brazil, available for global collaboration",
      passionate: "Fascinated by cutting-edge technologies",
      github: "Contributing to projects on GitHub",
      githubDesc: "Open source and collaboration",
      linkedin: "Sharing insights on LinkedIn",
      linkedinDesc: "Professional networking",
      workTogether: "Let's work together on your next project",
      sendEmail: "Send me an email",
      cleanCode: "Clean Code and Modern Design",
      techEnthusiast: "Passionate about development and technology.",
    },
    projects: {
      title: "Featured projects",
      subtitle: "Some of my recent work",
      viewProject: "View Project",
      viewDemo: "View Demo",
      viewCaseStudy: "View Case Study",
      items: [
        {
          title: "knowball",
          company: "Oracle",
          year: "2025 – 2026",
          description:
            "RESTful API for managing championships, matches, and reports for youth categories in Brazilian men's soccer. " +
            "Spring Boot with JWT authentication signed by asymmetric RSA keys, access control by profiles, " +
            "HATEOAS and Flyway. Angular frontend with guards, interceptors, and reactive forms.",
          metrics: [
            "43 REST endpoints documented with Swagger/OpenAPI and versioned via Flyway migrations",
            "Stateless authentication with JWT signed by asymmetric RSA keys and ROLE_ADMIN / ROLE_USER access control",
            "Richardson Maturity Model Level 3 reached with HATEOAS implementation across all resources",
            "Angular frontend with route guards, HTTP interceptors, and reactive forms fully integrated with the API",
          ],
        },
        {
          title: "acessly-api",
          company: "",
          year: "2025",
          description:
            "I developed acessly-api, a solution aimed at reducing the employment gap for professionals with disabilities through accurate job matching.",
          metrics: [
            "90% mitigation of unauthorized access vulnerabilities.",
            "Full integrity guarantee of the recruitment process and sensitive data.",
            "Precise job matching for the target audience.",
          ],
        },
        {
          title: "workout-tracker",
          company: "",
          year: "2026",
          description:
            "Full-stack workout tracking app. " +
            "Spring Boot backend acts as a gateway to the Ninjas API with JWT, Flyway, and Docker Compose. " +
            "Angular v17+ frontend using Signals, functional JWT interceptor, and route guard.",
          metrics: [
            "Gateway to API Ninjas using HttpExchange / RestClient, delivering real-time exercises by muscle group",
            "Favorites system combining external data with local Oracle Database persistence — private list per user",
            "Stateless JWT authentication with BCrypt and functional Angular interceptor automatically injecting the Bearer Token",
            "Docker Compose orchestration via Spring Boot Compose Support and automated Flyway migrations",
          ],
        },
        {
          title: "custom-restaurant",
          company: "",
          year: "2026",
          description:
            "Restaurant recommendation platform built with a microservices architecture using Spring Boot, Spring Cloud, and Spring AI. " +
            "Integrates Eureka for service discovery, LoadBalancer, Retry with Exponential Backoff, " +
            "RabbitMQ for async messaging, and narrative suggestion generation via Groq.",
          metrics: [
            "Architecture composed of 4 independent services: Eureka Server, RestaurantService, UserService, and RecommendationService",
            "Personalized recommendations with Spring AI + Groq using the llama-3.3-70b-versatile model for contextual narrative suggestions",
            "Resilient communication with Spring Retry, Exponential Backoff, and Spring Cloud LoadBalancer across microservices",
            "Asynchronous messaging with RabbitMQ publishing RecommendationEvent without blocking the main client response",
          ],
        },
        {
          title: "digitalbank",
          company: "",
          year: "2025",
          description:
            "I developed a RESTful API aimed at the digital finance sector, orchestrating essential banking operations such as deposits, withdrawals, and PIX transfers between accounts.",
          metrics: [
            "Support for instant payments through PIX transfer implementation.",
            "Comprehensive management of cash operations (Deposits and Withdrawals).",
            "REST architecture standardization, facilitating scalability and service integration.",
          ],
        },
        {
          title: "pluvia+",
          company: "",
          year: "2025",
          description:
            "I implemented pluvia+, a social impact web platform focused on providing access to drinking water for communities facing water crises.",
          metrics: [
            "Automated data collection through robust integration with Java APIs.",
            "Risk mitigation in scenarios of extreme heat events and water collapse.",
            "Sustainable architecture, designed to enable portable purification solutions.",
          ],
        },
        {
          title: "smarttrack",
          company: "CCR",
          year: "2024 - 2025",
          description:
            "I engineered smarttrack, a responsive website designed to optimize the management and automation of operational processes in train and subway stations in the state of São Paulo.",
          metrics: [
            "Multi-device accessibility, guaranteed by a fully responsive design.",
            "Operational optimization through automation of station routines.",
            "Centralized management of public transportation infrastructure (trains and subways).",
          ],
        },
      ],
    },
    footer: {
      title: "Get in touch",
      subtitle: "Got an idea? Let's talk!",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Your message...",
      sendButton: "Send Message",
      rights: "All rights reserved.",
      quickLinks: "Quick Links",
      socialLinks: "Social Links",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      skills: "Habilidades",
      about: "Acerca",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      badge: "Disponible para proyectos",
      headlineStart: "Transformo ideas ambiciosas en",
      headlineEnd: "productos digitales de alto rendimiento",
      greeting: "Hola, soy",
      name: "Gabriel Rossi",
      connector: ", un",
      title: "Desarrollador Back-End",
      ctaContact: "Contactar",
      ctaCV: "Descargar CV",
    },
    theme: {
      light: "Modo Claro",
      dark: "Modo Oscuro",
    },
    techArsenal: {
      title: "Arsenal Tecnológico",
      subtitle: "Tecnologías que domino en el desarrollo",
      frontend: "Front-end",
      backend: "Back-end y Base de Datos",
      tools: "Herramientas",
    },
    about: {
      title: "Sobre Mí",
      subtitle: "Desarrollador apasionado por crear soluciones escalables",
      description:
        "Soy un desarrollador back-end con más de 5 años de experiencia construyendo APIs robustas, microservicios y arquitecturas distribuidas. Especializado en Node.js, Python y Go, con fuerte experiencia en cloud computing (AWS) y containerización (Docker/Kubernetes). Apasionado por código limpio, pruebas automatizadas y mejores prácticas de desarrollo.",
      collaboration: "Colaboración",
      collaborationTitle:
        "Centrarse en el cliente, promoviendo una comunicación transparente.",
      timezone: "De Brasil para el mundo",
      timezoneTitle: "Situado en Brasil, disponible para colaboración global",
      passionate: "Fascinado por las tecnologías de vanguardia",
      github: "Contribuyendo a proyectos en GitHub",
      githubDesc: "Código abierto y colaboración",
      linkedin: "Compartiendo ideas en LinkedIn",
      linkedinDesc: "Networking profesional",
      workTogether: "Trabajemos juntos en tu próximo proyecto",
      sendEmail: "Envíame un correo electrónico",
      cleanCode: "Código Limpio y Diseño Moderno",
      techEnthusiast: "Apasionado por el desarrollo y la tecnología.",
    },
    projects: {
      title: "Proyectos destacados",
      subtitle: "Algunos de mis trabajos recientes",
      viewProject: "Ver Proyecto",
      viewDemo: "Ver Demo",
      viewCaseStudy: "Ver Caso de Estudio",
      items: [
        {
          title: "knowball",
          company: "Oracle",
          year: "2025 – 2026",
          description:
            "API RESTful para la gestión de campeonatos, partidos e informes de categorías juveniles en el fútbol masculino brasileño." +
            "Spring Boot con autenticación JWT firmada por claves RSA asimétricas, control de acceso por perfiles." +
            "HATEOAS y Flyway. Frontend Angular con protecciones, interceptores y formularios reactivos.",
          metrics: [
            "43 endpoints REST documentados con Swagger/OpenAPI, versionados y gestionados con migraciones Flyway",
            "Autenticación stateless con JWT firmado con claves RSA asimétricas y control de acceso ROLE_ADMIN / ROLE_USER",
            "Nivel 3 del Richardson Maturity Model alcanzado con implementación de HATEOAS en todos los recursos",
            "Frontend en Angular con guards de ruta, interceptores HTTP y formularios reactivos totalmente integrados con la API",
          ],
        },
        {
          title: "acessly-api",
          company: "",
          year: "2025",
          description:
            "Desarrollé acessly-api, una solución destinada a reducir la brecha de empleo para profesionales con discapacidad a través de la correspondencia precisa de vacantes.",
          metrics: [
            "90% de mitigación de vulnerabilidades de acceso no autorizado.",
            "Garantía de integridad total del proceso de reclutamiento y datos sensibles.",
            "Correspondencia precisa de vacantes para el público objetivo.",
          ],
        },
        {
          title: "workout-tracker",
          company: "",
          year: "2026",
          description:
            "Aplicación full-stack de seguimiento de entrenamientos. " +
            "Backend Spring Boot actúa como gateway hacia API Ninjas con JWT, Flyway y Docker Compose. " +
            "Frontend Angular v17+ con Signals, interceptor JWT funcional y guard de ruta.",
          metrics: [
            "Gateway hacia API Ninjas con HttpExchange / RestClient, entregando ejercicios por grupo muscular en tiempo real",
            "Sistema de favoritos que combina datos externos con persistencia local en Oracle Database — lista privada por usuario",
            "Autenticación stateless con JWT y BCrypt, junto con un interceptor funcional de Angular que inyecta automáticamente el Bearer Token",
            "Orquestación con Docker Compose mediante Spring Boot Compose Support y migraciones automáticas con Flyway",
          ],
        },
        {
          title: "custom-restaurant",
          company: "",
          year: "2026",
          description:
            "Plataforma de recomendación de restaurantes en arquitectura de microservicios con Spring Boot, Spring Cloud y Spring AI. " +
            "Integra Eureka para descubrimiento de servicios, LoadBalancer, Retry con Exponential Backoff, " +
            "RabbitMQ para mensajería asíncrona y generación narrativa de sugerencias vía Groq.",
          metrics: [
            "Arquitectura compuesta por 4 servicios independientes: Eureka Server, RestaurantService, UserService y RecommendationService",
            "Recomendaciones personalizadas con Spring AI + Groq usando el modelo llama-3.3-70b-versatile para sugerencias narrativas contextualizadas",
            "Comunicación resiliente con Spring Retry, Exponential Backoff y Spring Cloud LoadBalancer entre microservicios",
            "Mensajería asíncrona con RabbitMQ publicando RecommendationEvent sin bloquear la respuesta principal al cliente",
          ],
        },
        {
          title: "digitalbank",
          company: "",
          year: "2025",
          description:
            "Desarrollé una API RESTful dirigida al sector financiero digital, orquestando operaciones bancarias esenciales como depósitos, retiros y transferencias PIX entre cuentas.",
          metrics: [
            "Soporte para pagos instantáneos a través de la implementación de transferencias PIX.",
            "Gestión integral de operaciones de caja (Depósitos y Retiros).",
            "Estandarización de arquitectura REST, facilitando la escalabilidad e integración de servicios.",
          ],
        },
        {
          title: "pluvia+",
          company: "",
          year: "2025",
          description:
            "Implementé pluvia+, una plataforma web de impacto social enfocada en proporcionar acceso a agua potable para comunidades en crisis hídrica.",
          metrics: [
            "Recopilación automatizada de datos a través de integración robusta con APIs en Java.",
            "Mitigación de riesgos en escenarios de eventos extremos de calor y colapso hídrico.",
            "Arquitectura sostenible, diseñada para viabilizar soluciones de purificación portátil.",
          ],
        },
        {
          title: "smarttrack",
          company: "CCR",
          year: "2024 - 2025",
          description:
            "Diseñé smarttrack, un sitio web responsivo diseñado para optimizar la gestión y automatización de procesos operacionales en estaciones de trenes y metro en el estado de São Paulo.",
          metrics: [
            "Accesibilidad multidispositivo, garantizada por un diseño completamente responsivo.",
            "Optimización operacional a través de la automatización de rutinas de estaciones.",
            "Gestión centralizada de infraestructura de transporte público (trenes y metro).",
          ],
        },
      ],
    },
    footer: {
      title: "Ponte en contacto",
      subtitle: "¿Tienes una idea? ¡Hablemos!",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      messagePlaceholder: "Tu mensaje...",
      sendButton: "Enviar Mensaje",
      rights: "Todos los derechos reservados.",
      quickLinks: "Enlaces Rápidos",
      socialLinks: "Redes Sociales",
    },
  },
};
