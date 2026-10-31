export type Language = "pt-BR" | "en" | "es";

export interface ProjectItem {
  title: string;
  company: string;
  year: string;
  description: string;
  /** Uma linha, usada na lista de "Outros projetos". */
  summary: string;
  category: string;
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
    eyebrow: string;
    ctaContact: string;
    ctaProjects: string;
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
    panelHeading: string;
    panelMessage: string;
  };

  contactInfo: {
    emailLabel: string;
    socialLabel: string;
    locationLabel: string;
    sending: string;
  };

  contactFeedback: {
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    closeButton: string;
    errorMessage: string;
  };

  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    viewDemo: string;
    viewCaseStudy: string;
    viewCode: string;
    otherTitle: string;
    previous: string;
    next: string;
    goTo: string;
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
    mainLabel: string;
    contactLabel: string;
    signature: string;
    backToTop: string;
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
      headlineEnd: "experiências digitais de alta performance",
      greeting: "Olá, eu sou o",
      name: "Gabriel Rossi",
      connector: ", um",
      title: "Desenvolvedor Full Stack com foco em Front-end",
      eyebrow: "Full Stack · Front-end",
      ctaContact: "Entre em Contato",
      ctaProjects: "Ver projetos",
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
      text: "Sou desenvolvedor full stack com foco em front-end, formado em Análise e Desenvolvimento de Sistemas pela FIAP e com certificado Cambridge B2 First (FCE). Construo interfaces em React, Next.js e Angular sobre APIs em Java e Spring Boot. Fora do código, participo de eventos e comunidades tech.",
      highlightedWords: [
        "foco em front-end",
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
      passionate: "A stack que uso no dia a dia",
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
      subtitle: "Interfaces e produtos full stack que construí recentemente.",
      viewProject: "Ver Projeto",
      viewDemo: "Ver Demo",
      viewCaseStudy: "Ver Estudo de Caso",
      viewCode: "Ver código",
      otherTitle: "Outros projetos",
      previous: "Projeto anterior",
      next: "Próximo projeto",
      goTo: "Ir para o projeto",
      items: [
        {
          title: "knowball",
          summary: "Plataforma full stack contra a manipulação de resultados no futebol de base, finalista no FIAP NEXT.",
          company: "Oracle",
          year: "2025 – 2026",
          description:
            "Desenvolvi uma plataforma fullstack para gerenciar campeonatos, partidas e denúncias nas categorias de base do futebol brasileiro e combater a manipulação de resultados, com API REST segura em JWT documentada no Swagger, frontend Angular e assistente virtual com Spring AI.",
          category: "Fullstack / IA",
          team: "",
          scope: "API REST / Segurança / Spring AI",
        },
        {
          title: "orion-infra-aws",
          summary: "Infraestrutura como código na AWS com CDK, ECS Fargate e RDS, reproduzível no Free Tier.",
          company: "",
          year: "2026",
          description:
            "Provisionei uma aplicação containerizada na AWS como infraestrutura como código, tornando o ambiente reproduzível dentro do Free Tier, com AWS CDK, ECS Fargate, RDS MySQL e ALB organizados em stacks independentes.",
          category: "Cloud / DevOps / IaC",
          team: "",
          scope: "AWS CDK / ECS Fargate / RDS",
        },
        {
          title: "whobetter",
          summary: "Microsserviços para grupos de apostas entre amigos, com gateway, OAuth 2.0 e testes de carga.",
          company: "",
          year: "2026",
          description:
            "Construí uma plataforma de microsserviços para grupos de apostas esportivas entre amigos, com acesso centralizado e seguro, usando Spring Boot, Eureka, API Gateway e OAuth 2.0 com JWT, e validei a arquitetura com testes de carga no Grafana k6.",
          category: "Microsserviços / Backend",
          team: "",
          scope: "Gateway / Segurança / Observabilidade",
        },
        {
          title: "acessly-api",
          summary: "API que conecta profissionais com deficiência a vagas compatíveis, com dados protegidos.",
          company: "",
          year: "2025",
          description:
            "Desenvolvi uma API que aproxima profissionais com deficiência de vagas compatíveis, com correspondência precisa entre perfil e vaga e proteção contra acesso não autorizado ao processo de recrutamento e a dados sensíveis.",
          category: "Backend / Impacto social",
          team: "",
          scope: "API / Segurança / Recrutamento",
        },
        {
          title: "world-cup-2026-ai-assistant",
          summary: "Agente conversacional sobre a Copa de 2026 com RAG, Tool Calling e interface em Vaadin.",
          company: "",
          year: "2026",
          description:
            "Criei um agente conversacional full stack sobre a Copa do Mundo 2026 que responde com contexto e gera previsões estruturadas, usando Spring Boot, Vaadin e Spring AI com RAG, Tool Calling e memória por sessão.",
          category: "IA / Fullstack",
          team: "",
          scope: "RAG / Tool Calling / Streaming",
        },
        {
          title: "workout-tracker",
          summary: "Exercícios e favoritos com login JWT: Angular com Signals e Tailwind sobre Spring Boot.",
          company: "",
          year: "2026",
          description:
            "Desenvolvi uma plataforma full stack para explorar exercícios e gerenciar favoritos, com autenticação JWT e integração à API Ninjas, usando Spring Boot no backend e Angular com Signals e Tailwind CSS no frontend.",
          category: "Fullstack / Web",
          team: "",
          scope: "Backend / Frontend / Integração",
        },
        {
          title: "custom-restaurant",
          summary: "Recomendação de restaurantes por IA em microsserviços, com RabbitMQ e Spring Cloud.",
          company: "",
          year: "2026",
          description:
            "Construí uma plataforma de recomendação de restaurantes em microsserviços que gera sugestões narrativas por IA, usando Spring Cloud (Eureka, LoadBalancer e Retry com backoff exponencial), RabbitMQ para mensageria assíncrona e Spring AI com Groq.",
          category: "Microsserviços / IA",
          team: "",
          scope: "Eureka / RabbitMQ / Spring AI",
        },
        {
          title: "gamefinder",
          summary: "Recomenda jogos com dados reais da API RAWG: Angular e Tailwind sobre Spring Boot.",
          company: "",
          year: "2026",
          description:
            "Desenvolvi uma plataforma que recomenda jogos a partir de dados reais de uma API externa e de critérios objetivos de avaliação, com Angular, TypeScript e Tailwind CSS no frontend e Spring Boot no backend.",
          category: "Fullstack / Dados",
          team: "",
          scope: "Frontend / Backend / API externa",
        },
        {
          title: "digitalbank",
          summary: "API REST de banco digital com depósitos, saques e transferências via PIX.",
          company: "",
          year: "2025",
          description:
            "Desenvolvi uma API RESTful para o setor financeiro digital que executa depósitos, saques e transferências via PIX entre contas, com arquitetura REST padronizada para facilitar escalabilidade e integração de serviços.",
          category: "Backend / Fintech",
          team: "",
          scope: "API REST / PIX / Contas",
        },
        {
          title: "pluvia+",
          summary: "Plataforma web de impacto social sobre acesso à água potável em comunidades em crise hídrica.",
          company: "",
          year: "2025",
          description:
            "Implementei uma plataforma web de impacto social que apoia o acesso à água potável em comunidades em crise hídrica, coletando dados por integração com APIs em Java para mitigar riscos de calor extremo e colapso hídrico.",
          category: "Web / Impacto social",
          team: "",
          scope: "Integração de APIs / Java",
        },
        {
          title: "smarttrack",
          summary: "Site responsivo para a gestão de estações de trem e metrô de São Paulo.",
          company: "CCR",
          year: "2024 - 2025",
          description:
            "Desenvolvi um site responsivo que otimiza a gestão e automatiza rotinas operacionais em estações de trens e metrôs de São Paulo, com gestão centralizada da infraestrutura de transporte público.",
          category: "Web / Operações",
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
      panelHeading: "Vamos criar algo juntos.",
      panelMessage:
        "Combinando código, design e estratégia para transformar sua ideia em um produto digital real.",
    },

    contactInfo: {
      emailLabel: "Email",
      socialLabel: "Social",
      locationLabel: "Onde?",
      sending: "Enviando...",
    },

    contactFeedback: {
      successTitle: "Mensagem enviada!",
      successMessage:
        "Obrigado pelo contato. Sua mensagem foi enviada e retornarei assim que possível.",
      errorTitle: "Não foi possível enviar",
      errorMessage: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
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

      mainLabel: "Principal",
      contactLabel: "Contato",
      signature: "Feito com atenção aos detalhes e vontade de criar.",
      backToTop: "Voltar ao topo",
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
      headlineEnd: "high-performing digital experiences",
      greeting: "Hello, I'm",
      name: "Gabriel Rossi",
      connector: ", a",
      title: "Full Stack Developer focused on Front-end",
      eyebrow: "Full Stack · Front-end",
      ctaContact: "Get in Touch",
      ctaProjects: "View projects",
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
      text: "I’m a full stack developer focused on front-end, with a degree in Systems Analysis and Development from FIAP and a Cambridge B2 First (FCE) certification. I build interfaces in React, Next.js and Angular on top of Java and Spring Boot APIs. Outside of code, I take part in tech events and communities.",
      highlightedWords: [
        "focused on front-end",
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
      passionate: "The stack I use every day",
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
      subtitle: "Interfaces and full stack products I’ve built recently.",
      viewProject: "View Project",
      viewDemo: "View Demo",
      viewCaseStudy: "View Case Study",
      viewCode: "View code",
      otherTitle: "Other projects",
      previous: "Previous project",
      next: "Next project",
      goTo: "Go to project",
      items: [
        {
          title: "knowball",
          summary: "Full stack platform against match-fixing in youth football, FIAP NEXT finalist.",
          company: "Oracle",
          year: "2025 – 2026",
          description:
            "I built a full-stack platform to manage championships, matches and reports in Brazilian youth football and fight result manipulation, with a secure JWT REST API documented in Swagger, an Angular frontend and a Spring AI virtual assistant.",
          category: "Fullstack / AI / Backend",
          team: "",
          scope: "REST API / Security / Spring AI",
        },
        {
          title: "orion-infra-aws",
          summary: "Infrastructure as code on AWS with CDK, ECS Fargate and RDS, reproducible on the Free Tier.",
          company: "",
          year: "2026",
          description:
            "I provisioned a containerized application on AWS as infrastructure as code, making the environment reproducible within the Free Tier, using AWS CDK, ECS Fargate, RDS MySQL and an ALB organized into independent stacks.",
          category: "Cloud / DevOps / IaC",
          team: "",
          scope: "AWS CDK / ECS Fargate / RDS",
        },
        {
          title: "whobetter",
          summary: "Microservices for betting groups among friends, with a gateway, OAuth 2.0 and load tests.",
          company: "",
          year: "2026",
          description:
            "I built a microservices platform for sports betting groups among friends, with centralized and secure access, using Spring Boot, Eureka, an API Gateway and OAuth 2.0 with JWT, and validated the architecture with Grafana k6 load tests.",
          category: "Microservices / Backend",
          team: "",
          scope: "Gateway / Security / Observability",
        },
        {
          title: "acessly-api",
          summary: "API that matches professionals with disabilities to compatible jobs, with protected data.",
          company: "",
          year: "2025",
          description:
            "I developed an API that connects professionals with disabilities to compatible job openings, with accurate profile-to-job matching and protection against unauthorized access to the recruitment process and sensitive data.",
          category: "Backend / Social impact",
          team: "",
          scope: "API / Security / Recruitment",
        },
        {
          title: "world-cup-2026-ai-assistant",
          summary: "Conversational agent about the 2026 World Cup with RAG, Tool Calling and a Vaadin UI.",
          company: "",
          year: "2026",
          description:
            "I created a full-stack conversational agent about the 2026 World Cup that answers with context and generates structured predictions, using Spring Boot, Vaadin and Spring AI with RAG, Tool Calling and session memory.",
          category: "AI / Fullstack",
          team: "",
          scope: "RAG / Tool Calling / Streaming",
        },
        {
          title: "workout-tracker",
          summary: "Exercises and favorites with JWT login: Angular with Signals and Tailwind on Spring Boot.",
          company: "",
          year: "2026",
          description:
            "I developed a full-stack platform to explore exercises and manage favorites, with JWT authentication and API Ninjas integration, using Spring Boot on the backend and Angular with Signals and Tailwind CSS on the frontend.",
          category: "Fullstack / Web",
          team: "",
          scope: "Backend / Frontend / Integration",
        },
        {
          title: "custom-restaurant",
          summary: "AI restaurant recommendations on microservices, with RabbitMQ and Spring Cloud.",
          company: "",
          year: "2026",
          description:
            "I built a restaurant recommendation platform on microservices that generates AI narrative suggestions, using Spring Cloud (Eureka, LoadBalancer and Retry with exponential backoff), RabbitMQ for asynchronous messaging and Spring AI with Groq.",
          category: "Microservices / AI",
          team: "",
          scope: "Eureka / RabbitMQ / Spring AI",
        },
        {
          title: "gamefinder",
          summary: "Recommends games from real RAWG API data: Angular and Tailwind on Spring Boot.",
          company: "",
          year: "2026",
          description:
            "I developed a platform that recommends games from real data from an external API and objective evaluation criteria, with Angular, TypeScript and Tailwind CSS on the frontend and Spring Boot on the backend.",
          category: "Fullstack / Data",
          team: "",
          scope: "Frontend / Backend / External API",
        },
        {
          title: "digitalbank",
          summary: "Digital banking REST API with deposits, withdrawals and PIX transfers.",
          company: "",
          year: "2025",
          description:
            "I developed a RESTful API for the digital finance sector that handles deposits, withdrawals and PIX transfers between accounts, with a standardized REST architecture that eases scalability and service integration.",
          category: "Backend / Fintech",
          team: "",
          scope: "REST API / PIX / Accounts",
        },
        {
          title: "pluvia+",
          summary: "Social impact web platform on access to drinking water in communities facing water crises.",
          company: "",
          year: "2025",
          description:
            "I implemented a social impact web platform that supports access to drinking water for communities in water crisis, collecting data through Java API integrations to mitigate extreme heat and water collapse risks.",
          category: "Web / Social impact",
          team: "",
          scope: "API integration / Java",
        },
        {
          title: "smarttrack",
          summary: "Responsive site for managing São Paulo train and subway stations.",
          company: "CCR",
          year: "2024 - 2025",
          description:
            "I developed a responsive website that optimizes management and automates operational routines at train and subway stations in São Paulo, with centralized management of public transport infrastructure.",
          category: "Web / Operations",
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
      panelHeading: "Let’s build something together.",
      panelMessage:
        "Combining code, design and strategy to turn your idea into a real digital product.",
    },

    contactInfo: {
      emailLabel: "Email",
      socialLabel: "Social",
      locationLabel: "Where?",
      sending: "Sending...",
    },

    contactFeedback: {
      successTitle: "Message sent!",
      successMessage:
        "Thanks for reaching out. Your message has been sent, and I’ll get back to you as soon as possible.",
      errorTitle: "Unable to send",
      errorMessage:
        "Something went wrong while sending your message. Please try again.",
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

      mainLabel: "Main",
      contactLabel: "Contact",
      signature: "Made with attention to detail and a drive to create.",
      backToTop: "Back to top",
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
      headlineEnd: "experiencias digitales de alto rendimiento",
      greeting: "Hola, soy",
      name: "Gabriel Rossi",
      connector: ", un",
      title: "Desarrollador Full Stack enfocado en Front-end",
      eyebrow: "Full Stack · Front-end",
      ctaContact: "Contactar",
      ctaProjects: "Ver proyectos",
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
      text: "Soy desarrollador full stack enfocado en front-end, graduado en Análisis y Desarrollo de Sistemas por FIAP y certificado Cambridge B2 First (FCE). Construyo interfaces en React, Next.js y Angular sobre APIs en Java y Spring Boot. Fuera del código, participo en eventos y comunidades tecnológicas.",
      highlightedWords: [
        "enfocado en front-end",
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
      passionate: "El stack que uso a diario",
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
      subtitle: "Interfaces y productos full stack que construí recientemente.",
      viewProject: "Ver Proyecto",
      viewDemo: "Ver Demo",
      viewCaseStudy: "Ver Caso de Estudio",
      viewCode: "Ver código",
      otherTitle: "Otros proyectos",
      previous: "Proyecto anterior",
      next: "Siguiente proyecto",
      goTo: "Ir al proyecto",
      items: [
        {
          title: "knowball",
          summary: "Plataforma full stack contra la manipulación de resultados en el fútbol juvenil, finalista en FIAP NEXT.",
          company: "Oracle",
          year: "2025 – 2026",
          description:
            "Desarrollé una plataforma full stack para gestionar campeonatos, partidos y denuncias en las categorías juveniles del fútbol brasileño y combatir la manipulación de resultados, con API REST segura con JWT documentada en Swagger, frontend Angular y asistente virtual con Spring AI.",
          category: "Fullstack / IA / Backend",
          team: "",
          scope: "API REST / Seguridad / Spring AI",
        },
        {
          title: "orion-infra-aws",
          summary: "Infraestructura como código en AWS con CDK, ECS Fargate y RDS, reproducible en el Free Tier.",
          company: "",
          year: "2026",
          description:
            "Aprovisioné una aplicación contenerizada en AWS como infraestructura como código, haciendo el entorno reproducible dentro del Free Tier, con AWS CDK, ECS Fargate, RDS MySQL y ALB organizados en stacks independientes.",
          category: "Cloud / DevOps / IaC",
          team: "",
          scope: "AWS CDK / ECS Fargate / RDS",
        },
        {
          title: "whobetter",
          summary: "Microservicios para grupos de apuestas entre amigos, con gateway, OAuth 2.0 y pruebas de carga.",
          company: "",
          year: "2026",
          description:
            "Construí una plataforma de microservicios para grupos de apuestas deportivas entre amigos, con acceso centralizado y seguro, usando Spring Boot, Eureka, API Gateway y OAuth 2.0 con JWT, y validé la arquitectura con pruebas de carga en Grafana k6.",
          category: "Microservicios / Backend",
          team: "",
          scope: "Gateway / Seguridad / Observabilidad",
        },
        {
          title: "acessly-api",
          summary: "API que conecta a profesionales con discapacidad con vacantes compatibles, con datos protegidos.",
          company: "",
          year: "2025",
          description:
            "Desarrollé una API que acerca a profesionales con discapacidad a vacantes compatibles, con correspondencia precisa entre perfil y vacante y protección contra el acceso no autorizado al proceso de reclutamiento y a datos sensibles.",
          category: "Backend / Impacto social",
          team: "",
          scope: "API / Seguridad / Reclutamiento",
        },
        {
          title: "world-cup-2026-ai-assistant",
          summary: "Agente conversacional sobre el Mundial 2026 con RAG, Tool Calling e interfaz en Vaadin.",
          company: "",
          year: "2026",
          description:
            "Creé un agente conversacional full stack sobre la Copa del Mundo 2026 que responde con contexto y genera predicciones estructuradas, usando Spring Boot, Vaadin y Spring AI con RAG, Tool Calling y memoria por sesión.",
          category: "IA / Fullstack",
          team: "",
          scope: "RAG / Tool Calling / Streaming",
        },
        {
          title: "workout-tracker",
          summary: "Ejercicios y favoritos con login JWT: Angular con Signals y Tailwind sobre Spring Boot.",
          company: "",
          year: "2026",
          description:
            "Desarrollé una plataforma full stack para explorar ejercicios y gestionar favoritos, con autenticación JWT e integración con API Ninjas, usando Spring Boot en el backend y Angular con Signals y Tailwind CSS en el frontend.",
          category: "Fullstack / Web",
          team: "",
          scope: "Backend / Frontend / Integración",
        },
        {
          title: "custom-restaurant",
          summary: "Recomendaciones de restaurantes con IA en microservicios, con RabbitMQ y Spring Cloud.",
          company: "",
          year: "2026",
          description:
            "Construí una plataforma de recomendación de restaurantes en microservicios que genera sugerencias narrativas con IA, usando Spring Cloud (Eureka, LoadBalancer y Retry con backoff exponencial), RabbitMQ para mensajería asíncrona y Spring AI con Groq.",
          category: "Microservicios / IA",
          team: "",
          scope: "Eureka / RabbitMQ / Spring AI",
        },
        {
          title: "gamefinder",
          summary: "Recomienda juegos con datos reales de la API RAWG: Angular y Tailwind sobre Spring Boot.",
          company: "",
          year: "2026",
          description:
            "Desarrollé una plataforma que recomienda juegos a partir de datos reales de una API externa y de criterios objetivos de evaluación, con Angular, TypeScript y Tailwind CSS en el frontend y Spring Boot en el backend.",
          category: "Fullstack / Datos",
          team: "",
          scope: "Frontend / Backend / API externa",
        },
        {
          title: "digitalbank",
          summary: "API REST de banca digital con depósitos, retiros y transferencias vía PIX.",
          company: "",
          year: "2025",
          description:
            "Desarrollé una API RESTful para el sector financiero digital que ejecuta depósitos, retiros y transferencias PIX entre cuentas, con arquitectura REST estandarizada para facilitar la escalabilidad y la integración de servicios.",
          category: "Backend / Fintech",
          team: "",
          scope: "API REST / PIX / Cuentas",
        },
        {
          title: "pluvia+",
          summary: "Plataforma web de impacto social sobre el acceso al agua potable en comunidades en crisis hídrica.",
          company: "",
          year: "2025",
          description:
            "Implementé una plataforma web de impacto social que apoya el acceso a agua potable en comunidades en crisis hídrica, recopilando datos mediante integración con APIs en Java para mitigar riesgos de calor extremo y colapso hídrico.",
          category: "Web / Impacto social",
          team: "",
          scope: "Integración de APIs / Java",
        },
        {
          title: "smarttrack",
          summary: "Sitio responsivo para la gestión de estaciones de tren y metro de São Paulo.",
          company: "CCR",
          year: "2024 - 2025",
          description:
            "Desarrollé un sitio web responsivo que optimiza la gestión y automatiza rutinas operacionales en estaciones de trenes y metro de São Paulo, con gestión centralizada de la infraestructura de transporte público.",
          category: "Web / Operaciones",
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
      panelHeading: "Creemos algo juntos.",
      panelMessage:
        "Combinando código, diseño y estrategia para convertir tu idea en un producto digital real.",
    },

    contactInfo: {
      emailLabel: "Correo",
      socialLabel: "Social",
      locationLabel: "¿Dónde?",
      sending: "Enviando...",
    },

    contactFeedback: {
      successTitle: "¡Mensaje enviado!",
      successMessage:
        "Gracias por contactarme. Tu mensaje se ha enviado y responderé lo antes posible.",
      errorTitle: "No se pudo enviar",
      errorMessage:
        "Ocurrió un error al enviar tu mensaje. Inténtalo de nuevo.",
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

      mainLabel: "Principal",
      contactLabel: "Contacto",
      signature: "Hecho con atención al detalle y ganas de crear.",
      backToTop: "Volver arriba",
    },
  },
};
