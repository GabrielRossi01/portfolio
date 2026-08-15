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

  aboutIntro: {
    eyebrow: string;
    text: string;
    highlightedWords: string[];
  };

  about: {
    title: string;
    subtitle: string;
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

  contactPanel: {
    eyebrow: string;
    heading: string;
    message: string;
    location: string;
    availability: string;
  };

  contactFeedback: {
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    closeButton: string;
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
    aboutIntro: {
      eyebrow: "Sobre mim",
      text: "Sou desenvolvedor de software formado em Análise e Desenvolvimento de Sistemas pela FIAP e tenho certificado Cambridge B1 First (FCE). Fora do código, participo de eventos e comunidades tech.",
      highlightedWords: [
        "Análise e Desenvolvimento de Sistemas",
        "FIAP",
        "Cambridge B1 First (FCE)",
        "eventos e comunidades tech",
      ],
    },
    about: {
      title: "Sobre Mim",
      subtitle: "Desenvolvedor apaixonado por criar soluções escaláveis",
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
          year: "2025 – Presente ",
          description:
            "Plataforma fullstack para gestão de campeonatos, partidas e denúncias nas categorias de base do futebol brasileiro masculino, com API REST segura, autenticação JWT, frontend Angular integrado e assistente virtual com Spring AI.",
          metrics: [
            "92% da arquitetura exposta via Swagger/OpenAPI, com módulos de autenticação, denúncias e analytics",
            "87% do fluxo protegido por JWT RSA, RBAC e HATEOAS nível 3",
            "74% da operação apoiada por automações, notificações e suporte via ChatClient com Spring AI",
          ],
        },
        {
          title: "orion-infra-aws",
          company: "",
          year: "2026",
          description:
            "Infraestrutura como código em AWS CDK para provisionar uma aplicação containerizada com ECS Fargate, RDS MySQL e balanceamento via ALB, com foco em organização por stacks e uso consciente do Free Tier.",
          metrics: [
            "95% da infraestrutura modularizada em stacks independentes para VPC, cluster, banco e serviço",
            "88% do ambiente automatizado com deploy via CDK, ECR, CloudFormation e Auto Scaling",
            "76% da operação observável com logs e métricas centralizados no CloudWatch",
          ],
        },
        {
          title: "whobetter",
          company: "",
          year: "2026 - Presente",
          description:
            "Plataforma de microsserviços para grupos de apostas esportivas entre amigos, com arquitetura distribuída em Spring Boot, service discovery via Eureka, API Gateway centralizado e segurança stateless com OAuth 2.0 Resource Server e JWT.",
          metrics: [
            "92% dos endpoints protegidos por OAuth 2.0 Resource Server com autorização granular via scopes e validação de ownership",
            "85% dos microsserviços documentados via OpenAPI/Swagger, com Gateway centralizando o acesso à documentação",
            "78% da arquitetura validada com testes de carga (Grafana k6) e observabilidade ponta a ponta entre serviços",
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
          title: "world-cup-2026-ai-assistant",
          company: "",
          year: "2026",
          description:
            "Agente conversacional full stack sobre a Copa do Mundo 2026, com Spring Boot, Vaadin e Spring AI, combinando RAG, Tool Calling, memória por sessão e previsões estruturadas.",
          metrics: [
            "91% da experiência assistida por Spring AI com ChatClient, memória e respostas em streaming",
            "84% das consultas enriquecidas por RAG com embeddings locais e busca semântica",
            "76% das interações automatizadas por ferramentas, contexto do torneio e structured output",
          ],
        },
        {
          title: "workout-tracker",
          company: "",
          year: "2026",
          description:
            "Plataforma full stack para exploração de exercícios e gestão de favoritos, com backend Spring Boot, autenticação JWT, integração com API externa e frontend Angular moderno.",
          metrics: [
            "89% da experiência autenticada e protegida por JWT, guards e interceptor funcional",
            "83% do fluxo de dados integrado à API Ninjas com persistência local e Oracle",
            "76% da interface construída com Signals, control flow moderno e Tailwind CSS",
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
            "90% da solução distribuída entre serviços independentes com Eureka, LoadBalancer e comunicação resiliente",
            "82% das recomendações enriquecidas por Spring AI com respostas contextuais e narrativas",
            "74% do fluxo desacoplado com retry exponencial, RabbitMQ e processamento assíncrono",
          ],
        },
        {
          title: "gamefinder",
          company: "",
          year: "2026",
          description:
            "Plataforma de recomendação de jogos baseada em dados reais, com front-end Angular e back-end Spring Boot.",
          metrics: [
            "88% das decisões apoiadas por critérios objetivos de avaliação",
            "81% dos dados consumidos e processados via API externa",
            "74% da UI construída com Angular, TypeScript e Tailwind CSS",
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

    contactPanel: {
      eyebrow: "Vamos conversar",
      heading: "Conte-me sobre sua ideia.",
      message:
        "Estou disponível para ouvir seu projeto, entender seus objetivos e pensar em uma solução que faça sentido para você.",
      location: "São Paulo, Brasil",
      availability: "Disponível para novos projetos",
    },

    contactFeedback: {
      successTitle: "Mensagem enviada!",
      successMessage:
        "Obrigado pelo contato. Recebi sua mensagem e retornarei assim que possível.",
      errorTitle: "Não foi possível enviar",
      closeButton: "Fechar",
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
    aboutIntro: {
      eyebrow: "About me",
      text: "I’m a software developer with a degree in Systems Analysis and Development from FIAP and a Cambridge B1 First (FCE) certification. Outside of code, I take part in tech events and communities.",
      highlightedWords: [
        "Systems Analysis and Development",
        "FIAP",
        "Cambridge B1 First (FCE)",
        "tech events and communities",
      ],
    },
    about: {
      title: "About Me",
      subtitle: "Developer passionate about creating scalable solutions",
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
          year: "2025 – Present",
          description:
            "Full-stack platform for managing championships, matches, and reports in Brazilian men's youth football, with secure REST API, JWT authentication, integrated Angular frontend, and a virtual assistant powered by Spring AI.",
          metrics: [
            "92% of the architecture exposed through Swagger/OpenAPI, with authentication, reports, and analytics modules",
            "87% of the flow protected by JWT RSA, RBAC, and HATEOAS level 3",
            "74% of the operation supported by automations, notifications, and ChatClient support with Spring AI",
          ],
        },
        {
          title: "orion-infra-aws",
          company: "",
          year: "2026",
          description:
            "Infrastructure as code with AWS CDK to provision a containerized application using ECS Fargate, RDS MySQL, and ALB load balancing, with a focus on stack organization and mindful Free Tier usage.",
          metrics: [
            "95% of the infrastructure modularized into independent stacks for VPC, cluster, database, and service",
            "88% of the environment automated with CDK, ECR, CloudFormation, and Auto Scaling deployments",
            "76% of the operation observable through logs and metrics centralized in CloudWatch",
          ],
        },
        {
          title: "whobetter",
          company: "",
          year: "2026 – Present",
          description:
            "Microservices platform for sports betting groups among friends, built with a distributed Spring Boot architecture, Eureka service discovery, a centralized API Gateway, and stateless security using OAuth 2.0 Resource Server and JWT.",
          metrics: [
            "92% of the endpoints protected by OAuth 2.0 Resource Server with granular scope-based authorization and ownership validation",
            "85% of the microservices documented with OpenAPI/Swagger, with the Gateway centralizing access to the documentation",
            "78% of the architecture validated through load testing with Grafana k6 and end-to-end observability across services",
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
          title: "world-cup-2026-ai-assistant",
          company: "",
          year: "2026",
          description:
            "Full-stack conversational agent for the 2026 World Cup, built with Spring Boot, Vaadin, and Spring AI, combining RAG, Tool Calling, session memory, and structured predictions.",
          metrics: [
            "91% of the experience powered by Spring AI with ChatClient, memory, and streaming responses",
            "84% of queries enriched by RAG with local embeddings and semantic search",
            "76% of interactions automated through tools, tournament context, and structured output",
          ],
        },
        {
          title: "workout-tracker",
          company: "",
          year: "2026",
          description:
            "Full-stack platform for exercise discovery and favorite management, with a Spring Boot backend, JWT authentication, external API integration, and a modern Angular frontend.",
          metrics: [
            "89% of the experience authenticated and protected by JWT, guards, and a functional interceptor",
            "83% of the data flow integrated with the API Ninjas and persisted locally in Oracle",
            "76% of the interface built with Signals, modern control flow, and Tailwind CSS",
          ],
        },
        {
          title: "custom-restaurant",
          company: "",
          year: "2026",
          description:
            "Restaurant recommendation platform built on a microservices architecture with Spring Boot, Spring Cloud, and Spring AI. It integrates Eureka service discovery, LoadBalancer, exponential backoff retry, RabbitMQ for asynchronous messaging, and narrative suggestions generated via Groq.",
          metrics: [
            "90% of the solution distributed across independent services with Eureka, LoadBalancer, and resilient communication",
            "82% of the recommendations enhanced by Spring AI with contextual and narrative responses",
            "74% of the flow decoupled with exponential retry, RabbitMQ, and asynchronous processing",
          ],
        },
        {
          title: "gamefinder",
          company: "",
          year: "2026",
          description:
            "Game recommendation platform based on real data, with a front-end in Angular and a back-end in Spring Boot.",
          metrics: [
            "88% of decisions supported by objective evaluation criteria",
            "81% of data consumed and processed through an external API",
            "74% of the UI built with Angular, TypeScript, and Tailwind CSS",
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

    contactPanel: {
      eyebrow: "Let’s talk",
      heading: "Tell me about your idea.",
      message:
        "I’m available to hear about your project, understand your goals, and help shape a solution that makes sense for you.",
      location: "São Paulo, Brazil",
      availability: "Available for new projects",
    },

    contactFeedback: {
      successTitle: "Message sent!",
      successMessage:
        "Thanks for reaching out. I received your message and will get back to you soon.",
      errorTitle: "Unable to send",
      closeButton: "Close",
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
    aboutIntro: {
      eyebrow: "Sobre mí",
      text: "Soy desarrollador de software graduado en Análisis y Desarrollo de Sistemas por FIAP y certificado Cambridge B1 First (FCE). Fuera del código, participo en eventos y comunidades tecnológicas.",
      highlightedWords: [
        "Análisis y Desarrollo de Sistemas",
        "FIAP",
        "Cambridge B1 First (FCE)",
        "eventos y comunidades tecnológicas",
      ],
    },
    about: {
      title: "Sobre Mí",
      subtitle: "Desarrollador apasionado por crear soluciones escalables",
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
          year: "2025 – Presente",
          description:
            "Plataforma full-stack para la gestión de campeonatos, partidos y denuncias en las categorías juveniles del fútbol masculino brasileño, con API REST segura, autenticación JWT, frontend Angular integrado y un asistente virtual impulsado por Spring AI.",
          metrics: [
            "92% de la arquitectura expuesta mediante Swagger/OpenAPI, con módulos de autenticación, denuncias y analítica",
            "87% del flujo protegido por JWT RSA, RBAC y HATEOAS nivel 3",
            "74% de la operación apoyada por automatizaciones, notificaciones y soporte mediante ChatClient con Spring AI",
          ],
        },
        {
          title: "orion-infra-aws",
          company: "",
          year: "2026",
          description:
            "Infraestructura como código con AWS CDK para aprovisionar una aplicación contenerizada usando ECS Fargate, RDS MySQL y balanceo con ALB, con foco en la organización por stacks y el uso consciente del Free Tier.",
          metrics: [
            "95% de la infraestructura modularizada en stacks independientes para VPC, clúster, base de datos y servicio",
            "88% del entorno automatizado con despliegues mediante CDK, ECR, CloudFormation y Auto Scaling",
            "76% de la operación observable mediante logs y métricas centralizadas en CloudWatch",
          ],
        },
        {
          title: "whobetter",
          company: "",
          year: "2026 – Presente",
          description:
            "Plataforma de microservicios para grupos de apuestas deportivas entre amigos, con una arquitectura distribuida en Spring Boot, descubrimiento de servicios mediante Eureka, API Gateway centralizada y seguridad sin estado con OAuth 2.0 Resource Server y JWT.",
          metrics: [
            "92% de los endpoints protegidos por OAuth 2.0 Resource Server, con autorización granular mediante scopes y validación de ownership",
            "85% de los microservicios documentados con OpenAPI/Swagger, con el Gateway centralizando el acceso a la documentación",
            "78% de la arquitectura validada mediante pruebas de carga con Grafana k6 y observabilidad de extremo a extremo entre servicios",
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
          title: "world-cup-2026-ai-assistant",
          company: "",
          year: "2026",
          description:
            "Agente conversacional full-stack sobre la Copa del Mundo 2026, construido con Spring Boot, Vaadin y Spring AI, combinando RAG, Tool Calling, memoria por sesión y predicciones estructuradas.",
          metrics: [
            "91% de la experiencia impulsada por Spring AI con ChatClient, memoria y respuestas en streaming",
            "84% de las consultas enriquecidas por RAG con embeddings locales y búsqueda semántica",
            "76% de las interacciones automatizadas mediante herramientas, contexto del torneo y structured output",
          ],
        },
        {
          title: "workout-tracker",
          company: "",
          year: "2026",
          description:
            "Plataforma full-stack para descubrir ejercicios y gestionar favoritos, con backend en Spring Boot, autenticación JWT, integración con API externa y un frontend moderno en Angular.",
          metrics: [
            "89% de la experiencia autenticada y protegida por JWT, guards e interceptor funcional",
            "83% del flujo de datos integrado con API Ninjas y persistido localmente en Oracle",
            "76% de la interfaz construida con Signals, control flow moderno y Tailwind CSS",
          ],
        },
        {
          title: "custom-restaurant",
          company: "",
          year: "2026",
          description:
            "Plataforma de recomendación de restaurantes con arquitectura de microservicios, Spring Boot, Spring Cloud y Spring AI. Integra Eureka para descubrimiento de servicios, LoadBalancer, Retry con exponential backoff, RabbitMQ para mensajería asíncrona y sugerencias narrativas generadas con Groq.",
          metrics: [
            "90% de la solución distribuida entre servicios independientes con Eureka, LoadBalancer y comunicación resiliente",
            "82% de las recomendaciones enriquecidas por Spring AI con respuestas contextuales y narrativas",
            "74% del flujo desacoplado con reintentos exponenciales, RabbitMQ y procesamiento asíncrono",
          ],
        },
        {
          title: "gamefinder",
          company: "",
          year: "2026",
          description:
            "Plataforma de recomendación de juegos basada en datos reales, con frontend en Angular y backend en Spring Boot.",
          metrics: [
            "88% de las decisiones respaldadas por criterios objetivos de evaluación",
            "81% de los datos consumidos y procesados mediante una API externa",
            "74% de la UI construida con Angular, TypeScript y Tailwind CSS",
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

    contactPanel: {
      eyebrow: "Hablemos",
      heading: "Cuéntame sobre tu idea.",
      message:
        "Estoy disponible para conocer tu proyecto, entender tus objetivos y pensar en una solución que tenga sentido para ti.",
      location: "São Paulo, Brasil",
      availability: "Disponible para nuevos proyectos",
    },

    contactFeedback: {
      successTitle: "¡Mensaje enviado!",
      successMessage:
        "Gracias por contactarme. Recibí tu mensaje y responderé lo antes posible.",
      errorTitle: "No se pudo enviar",
      closeButton: "Cerrar",
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
