export type Language = "pt-BR" | "en" | "es";

export interface ProjectItem {
  title: string;
  company: string;
  year: string;
  description: string;
  category: string;
  status: string;
  team: string;
  scope: string;
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

  aboutAchievement: {
    eyebrow: string;
    title: string;
    description: string;
    details: string;
    highlightedWords: string[];
    photoAlts: string[];
    previous: string;
    next: string;
    goToPhoto: string;
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
    panelHeading: string;
    panelMessage: string;
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
      text: "Sou desenvolvedor de software formado em Análise e Desenvolvimento de Sistemas pela FIAP e tenho certificado Cambridge B2 First (FCE). Fora do código, participo de eventos e comunidades tech.",
      highlightedWords: [
        "Análise e Desenvolvimento de Sistemas",
        "FIAP",
        "Cambridge B2 First (FCE)",
        "eventos e comunidades tech",
      ],
    },

    aboutAchievement: {
      eyebrow: "Conquista",
      title: "Finalistas no FIAP NEXT 2026",
      description:
        "Projeto premiado entre os três melhores do FIAP NEXT 2026, o festival de inovação da instituição, desenvolvido em equipe para solucionar um desafio oficial da Oracle.",
      details:
        "Eu e minha equipe desenvolvemos o Knowball como solução para um case da Oracle, combatendo a manipulação de resultados nas categorias de base do futebol brasileiro masculino.",
      highlightedWords: [
        "três melhores",
        "FIAP NEXT 2026",
        "Oracle",
        "Knowball",
        "manipulação de resultados",
      ],
      photoAlts: [
        "Equipe do Knowball recebendo a premiação do FIAP NEXT 2026",
        "Equipe do Knowball no palco do FIAP NEXT 2026 com o cheque de premiação",
        "Pódio do FIAP NEXT 2026 com as equipes finalistas",
      ],
      previous: "Foto anterior",
      next: "Próxima foto",
      goToPhoto: "Ver foto",
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
          year: "2025 – Presente",
          description:
            "Desenvolvi uma plataforma fullstack para gerenciar campeonatos, partidas e denúncias nas categorias de base do futebol brasileiro e combater a manipulação de resultados, com API REST segura em JWT documentada no Swagger, frontend Angular e assistente virtual com Spring AI.",
          category: "Fullstack / IA / Backend",
          status: "Em andamento",
          team: "",
          scope: "API REST / Segurança / Spring AI",
        },
        {
          title: "orion-infra-aws",
          company: "",
          year: "2026",
          description:
            "Provisionei uma aplicação containerizada na AWS como infraestrutura como código, tornando o ambiente reproduzível dentro do Free Tier, com AWS CDK, ECS Fargate, RDS MySQL e ALB organizados em stacks independentes.",
          category: "Cloud / DevOps / IaC",
          status: "Concluído",
          team: "",
          scope: "AWS CDK / ECS Fargate / RDS",
        },
        {
          title: "whobetter",
          company: "",
          year: "2026 – Presente",
          description:
            "Construí uma plataforma de microsserviços para grupos de apostas esportivas entre amigos, com acesso centralizado e seguro, usando Spring Boot, Eureka, API Gateway e OAuth 2.0 com JWT, e validei a arquitetura com testes de carga no Grafana k6.",
          category: "Microsserviços / Backend",
          status: "Em andamento",
          team: "",
          scope: "Gateway / Segurança / Observabilidade",
        },
        {
          title: "acessly-api",
          company: "",
          year: "2025",
          description:
            "Desenvolvi uma API que aproxima profissionais com deficiência de vagas compatíveis, com correspondência precisa entre perfil e vaga e proteção contra acesso não autorizado ao processo de recrutamento e a dados sensíveis.",
          category: "Backend / Impacto social",
          status: "Concluído",
          team: "",
          scope: "API / Segurança / Recrutamento",
        },
        {
          title: "world-cup-2026-ai-assistant",
          company: "",
          year: "2026",
          description:
            "Criei um agente conversacional full stack sobre a Copa do Mundo 2026 que responde com contexto e gera previsões estruturadas, usando Spring Boot, Vaadin e Spring AI com RAG, Tool Calling e memória por sessão.",
          category: "IA / Fullstack",
          status: "Concluído",
          team: "",
          scope: "RAG / Tool Calling / Streaming",
        },
        {
          title: "workout-tracker",
          company: "",
          year: "2026",
          description:
            "Desenvolvi uma plataforma full stack para explorar exercícios e gerenciar favoritos, com autenticação JWT e integração à API Ninjas, usando Spring Boot no backend e Angular com Signals e Tailwind CSS no frontend.",
          category: "Fullstack / Web",
          status: "Concluído",
          team: "",
          scope: "Backend / Frontend / Integração",
        },
        {
          title: "custom-restaurant",
          company: "",
          year: "2026",
          description:
            "Construí uma plataforma de recomendação de restaurantes em microsserviços que gera sugestões narrativas por IA, usando Spring Cloud (Eureka, LoadBalancer e Retry com backoff exponencial), RabbitMQ para mensageria assíncrona e Spring AI com Groq.",
          category: "Microsserviços / IA",
          status: "Concluído",
          team: "",
          scope: "Eureka / RabbitMQ / Spring AI",
        },
        {
          title: "gamefinder",
          company: "",
          year: "2026",
          description:
            "Desenvolvi uma plataforma que recomenda jogos a partir de dados reais de uma API externa e de critérios objetivos de avaliação, com Angular, TypeScript e Tailwind CSS no frontend e Spring Boot no backend.",
          category: "Fullstack / Dados",
          status: "Concluído",
          team: "",
          scope: "Frontend / Backend / API externa",
        },
        {
          title: "digitalbank",
          company: "",
          year: "2025",
          description:
            "Desenvolvi uma API RESTful para o setor financeiro digital que executa depósitos, saques e transferências via PIX entre contas, com arquitetura REST padronizada para facilitar escalabilidade e integração de serviços.",
          category: "Backend / Fintech",
          status: "Concluído",
          team: "",
          scope: "API REST / PIX / Contas",
        },
        {
          title: "pluvia+",
          company: "",
          year: "2025",
          description:
            "Implementei uma plataforma web de impacto social que apoia o acesso à água potável em comunidades em crise hídrica, coletando dados por integração com APIs em Java para mitigar riscos de calor extremo e colapso hídrico.",
          category: "Web / Impacto social",
          status: "Concluído",
          team: "",
          scope: "Integração de APIs / Java",
        },
        {
          title: "smarttrack",
          company: "CCR",
          year: "2024 - 2025",
          description:
            "Desenvolvi um site responsivo que otimiza a gestão e automatiza rotinas operacionais em estações de trens e metrôs de São Paulo, com gestão centralizada da infraestrutura de transporte público.",
          category: "Web / Operações",
          status: "Concluído",
          team: "",
          scope: "Frontend responsivo / Automação",
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
      panelHeading: "Vamos criar algo juntos.",
      panelMessage:
        "Combinando código, design e estratégia para transformar sua ideia em um produto digital real.",
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
      text: "I’m a software developer with a degree in Systems Analysis and Development from FIAP and a Cambridge B2 First (FCE) certification. Outside of code, I take part in tech events and communities.",
      highlightedWords: [
        "Systems Analysis and Development",
        "FIAP",
        "Cambridge B2 First (FCE)",
        "tech events and communities",
      ],
    },
    aboutAchievement: {
      eyebrow: "Achievement",
      title: "FIAP NEXT 2026 finalists",
      description:
        "Award-winning project ranked among the top three at FIAP NEXT 2026, the institution's innovation festival, built as a team to solve an official Oracle challenge.",
      details:
        "My team and I built Knowball as a solution to an Oracle case, fighting match-fixing in the youth categories of Brazilian men's football.",
      highlightedWords: [
        "top three",
        "FIAP NEXT 2026",
        "Oracle",
        "Knowball",
        "match-fixing",
      ],
      photoAlts: [
        "Knowball team receiving the FIAP NEXT 2026 award",
        "Knowball team on stage at FIAP NEXT 2026 with the prize check",
        "FIAP NEXT 2026 podium with the finalist teams",
      ],
      previous: "Previous photo",
      next: "Next photo",
      goToPhoto: "View photo",
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
            "I built a full-stack platform to manage championships, matches and reports in Brazilian youth football and fight result manipulation, with a secure JWT REST API documented in Swagger, an Angular frontend and a Spring AI virtual assistant.",
          category: "Fullstack / AI / Backend",
          status: "In progress",
          team: "",
          scope: "REST API / Security / Spring AI",
        },
        {
          title: "orion-infra-aws",
          company: "",
          year: "2026",
          description:
            "I provisioned a containerized application on AWS as infrastructure as code, making the environment reproducible within the Free Tier, using AWS CDK, ECS Fargate, RDS MySQL and an ALB organized into independent stacks.",
          category: "Cloud / DevOps / IaC",
          status: "Completed",
          team: "",
          scope: "AWS CDK / ECS Fargate / RDS",
        },
        {
          title: "whobetter",
          company: "",
          year: "2026 – Present",
          description:
            "I built a microservices platform for sports betting groups among friends, with centralized and secure access, using Spring Boot, Eureka, an API Gateway and OAuth 2.0 with JWT, and validated the architecture with Grafana k6 load tests.",
          category: "Microservices / Backend",
          status: "In progress",
          team: "",
          scope: "Gateway / Security / Observability",
        },
        {
          title: "acessly-api",
          company: "",
          year: "2025",
          description:
            "I developed an API that connects professionals with disabilities to compatible job openings, with accurate profile-to-job matching and protection against unauthorized access to the recruitment process and sensitive data.",
          category: "Backend / Social impact",
          status: "Completed",
          team: "",
          scope: "API / Security / Recruitment",
        },
        {
          title: "world-cup-2026-ai-assistant",
          company: "",
          year: "2026",
          description:
            "I created a full-stack conversational agent about the 2026 World Cup that answers with context and generates structured predictions, using Spring Boot, Vaadin and Spring AI with RAG, Tool Calling and session memory.",
          category: "AI / Fullstack",
          status: "Completed",
          team: "",
          scope: "RAG / Tool Calling / Streaming",
        },
        {
          title: "workout-tracker",
          company: "",
          year: "2026",
          description:
            "I developed a full-stack platform to explore exercises and manage favorites, with JWT authentication and API Ninjas integration, using Spring Boot on the backend and Angular with Signals and Tailwind CSS on the frontend.",
          category: "Fullstack / Web",
          status: "Completed",
          team: "",
          scope: "Backend / Frontend / Integration",
        },
        {
          title: "custom-restaurant",
          company: "",
          year: "2026",
          description:
            "I built a restaurant recommendation platform on microservices that generates AI narrative suggestions, using Spring Cloud (Eureka, LoadBalancer and Retry with exponential backoff), RabbitMQ for asynchronous messaging and Spring AI with Groq.",
          category: "Microservices / AI",
          status: "Completed",
          team: "",
          scope: "Eureka / RabbitMQ / Spring AI",
        },
        {
          title: "gamefinder",
          company: "",
          year: "2026",
          description:
            "I developed a platform that recommends games from real data from an external API and objective evaluation criteria, with Angular, TypeScript and Tailwind CSS on the frontend and Spring Boot on the backend.",
          category: "Fullstack / Data",
          status: "Completed",
          team: "",
          scope: "Frontend / Backend / External API",
        },
        {
          title: "digitalbank",
          company: "",
          year: "2025",
          description:
            "I developed a RESTful API for the digital finance sector that handles deposits, withdrawals and PIX transfers between accounts, with a standardized REST architecture that eases scalability and service integration.",
          category: "Backend / Fintech",
          status: "Completed",
          team: "",
          scope: "REST API / PIX / Accounts",
        },
        {
          title: "pluvia+",
          company: "",
          year: "2025",
          description:
            "I implemented a social impact web platform that supports access to drinking water for communities in water crisis, collecting data through Java API integrations to mitigate extreme heat and water collapse risks.",
          category: "Web / Social impact",
          status: "Completed",
          team: "",
          scope: "API integration / Java",
        },
        {
          title: "smarttrack",
          company: "CCR",
          year: "2024 - 2025",
          description:
            "I developed a responsive website that optimizes management and automates operational routines at train and subway stations in São Paulo, with centralized management of public transport infrastructure.",
          category: "Web / Operations",
          status: "Completed",
          team: "",
          scope: "Responsive frontend / Automation",
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
      panelHeading: "Let’s build something together.",
      panelMessage:
        "Combining code, design and strategy to turn your idea into a real digital product.",
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
      text: "Soy desarrollador de software graduado en Análisis y Desarrollo de Sistemas por FIAP y certificado Cambridge B2 First (FCE). Fuera del código, participo en eventos y comunidades tecnológicas.",
      highlightedWords: [
        "Análisis y Desarrollo de Sistemas",
        "FIAP",
        "Cambridge B2 First (FCE)",
        "eventos y comunidades tecnológicas",
      ],
    },
    aboutAchievement: {
      eyebrow: "Logro",
      title: "Finalistas en FIAP NEXT 2026",
      description:
        "Proyecto premiado entre los tres mejores de FIAP NEXT 2026, el festival de innovación de la institución, desarrollado en equipo para resolver un desafío oficial de Oracle.",
      details:
        "Mi equipo y yo desarrollamos Knowball como solución a un caso de Oracle, combatiendo la manipulación de resultados en las categorías inferiores del fútbol masculino brasileño.",
      highlightedWords: [
        "tres mejores",
        "FIAP NEXT 2026",
        "Oracle",
        "Knowball",
        "manipulación de resultados",
      ],
      photoAlts: [
        "Equipo de Knowball recibiendo el premio de FIAP NEXT 2026",
        "Equipo de Knowball en el escenario de FIAP NEXT 2026 con el cheque del premio",
        "Podio de FIAP NEXT 2026 con los equipos finalistas",
      ],
      previous: "Foto anterior",
      next: "Siguiente foto",
      goToPhoto: "Ver foto",
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
            "Desarrollé una plataforma full stack para gestionar campeonatos, partidos y denuncias en las categorías juveniles del fútbol brasileño y combatir la manipulación de resultados, con API REST segura con JWT documentada en Swagger, frontend Angular y asistente virtual con Spring AI.",
          category: "Fullstack / IA / Backend",
          status: "En curso",
          team: "",
          scope: "API REST / Seguridad / Spring AI",
        },
        {
          title: "orion-infra-aws",
          company: "",
          year: "2026",
          description:
            "Aprovisioné una aplicación contenerizada en AWS como infraestructura como código, haciendo el entorno reproducible dentro del Free Tier, con AWS CDK, ECS Fargate, RDS MySQL y ALB organizados en stacks independientes.",
          category: "Cloud / DevOps / IaC",
          status: "Completado",
          team: "",
          scope: "AWS CDK / ECS Fargate / RDS",
        },
        {
          title: "whobetter",
          company: "",
          year: "2026 – Presente",
          description:
            "Construí una plataforma de microservicios para grupos de apuestas deportivas entre amigos, con acceso centralizado y seguro, usando Spring Boot, Eureka, API Gateway y OAuth 2.0 con JWT, y validé la arquitectura con pruebas de carga en Grafana k6.",
          category: "Microservicios / Backend",
          status: "En curso",
          team: "",
          scope: "Gateway / Seguridad / Observabilidad",
        },
        {
          title: "acessly-api",
          company: "",
          year: "2025",
          description:
            "Desarrollé una API que acerca a profesionales con discapacidad a vacantes compatibles, con correspondencia precisa entre perfil y vacante y protección contra el acceso no autorizado al proceso de reclutamiento y a datos sensibles.",
          category: "Backend / Impacto social",
          status: "Completado",
          team: "",
          scope: "API / Seguridad / Reclutamiento",
        },
        {
          title: "world-cup-2026-ai-assistant",
          company: "",
          year: "2026",
          description:
            "Creé un agente conversacional full stack sobre la Copa del Mundo 2026 que responde con contexto y genera predicciones estructuradas, usando Spring Boot, Vaadin y Spring AI con RAG, Tool Calling y memoria por sesión.",
          category: "IA / Fullstack",
          status: "Completado",
          team: "",
          scope: "RAG / Tool Calling / Streaming",
        },
        {
          title: "workout-tracker",
          company: "",
          year: "2026",
          description:
            "Desarrollé una plataforma full stack para explorar ejercicios y gestionar favoritos, con autenticación JWT e integración con API Ninjas, usando Spring Boot en el backend y Angular con Signals y Tailwind CSS en el frontend.",
          category: "Fullstack / Web",
          status: "Completado",
          team: "",
          scope: "Backend / Frontend / Integración",
        },
        {
          title: "custom-restaurant",
          company: "",
          year: "2026",
          description:
            "Construí una plataforma de recomendación de restaurantes en microservicios que genera sugerencias narrativas con IA, usando Spring Cloud (Eureka, LoadBalancer y Retry con backoff exponencial), RabbitMQ para mensajería asíncrona y Spring AI con Groq.",
          category: "Microservicios / IA",
          status: "Completado",
          team: "",
          scope: "Eureka / RabbitMQ / Spring AI",
        },
        {
          title: "gamefinder",
          company: "",
          year: "2026",
          description:
            "Desarrollé una plataforma que recomienda juegos a partir de datos reales de una API externa y de criterios objetivos de evaluación, con Angular, TypeScript y Tailwind CSS en el frontend y Spring Boot en el backend.",
          category: "Fullstack / Datos",
          status: "Completado",
          team: "",
          scope: "Frontend / Backend / API externa",
        },
        {
          title: "digitalbank",
          company: "",
          year: "2025",
          description:
            "Desarrollé una API RESTful para el sector financiero digital que ejecuta depósitos, retiros y transferencias PIX entre cuentas, con arquitectura REST estandarizada para facilitar la escalabilidad y la integración de servicios.",
          category: "Backend / Fintech",
          status: "Completado",
          team: "",
          scope: "API REST / PIX / Cuentas",
        },
        {
          title: "pluvia+",
          company: "",
          year: "2025",
          description:
            "Implementé una plataforma web de impacto social que apoya el acceso a agua potable en comunidades en crisis hídrica, recopilando datos mediante integración con APIs en Java para mitigar riesgos de calor extremo y colapso hídrico.",
          category: "Web / Impacto social",
          status: "Completado",
          team: "",
          scope: "Integración de APIs / Java",
        },
        {
          title: "smarttrack",
          company: "CCR",
          year: "2024 - 2025",
          description:
            "Desarrollé un sitio web responsivo que optimiza la gestión y automatiza rutinas operacionales en estaciones de trenes y metro de São Paulo, con gestión centralizada de la infraestructura de transporte público.",
          category: "Web / Operaciones",
          status: "Completado",
          team: "",
          scope: "Frontend responsivo / Automatización",
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
      panelHeading: "Creemos algo juntos.",
      panelMessage:
        "Combinando código, diseño y estrategia para convertir tu idea en un producto digital real.",
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
