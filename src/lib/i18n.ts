export type Language = 'pt-BR' | 'en' | 'es';

export interface ProjectItem {
  title: string;
  company: string;
  year: string;
  description: string;
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
    greeting: string;
    name: string;
    title: string;
    subtitle: string;
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
  'pt-BR': {
    nav: {
      home: 'Início',
      skills: 'Habilidades',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
    },
    hero: {
      greeting: 'Olá, eu sou',
      name: 'Gabriel Rossi',
      title: 'Desenvolvedor Back-End',
      subtitle: 'Construindo sistemas escaláveis e robustos com Java, Spring Boot e tecnologias Cloud',
      ctaContact: 'Entre em Contato',
      ctaCV: 'Baixar CV',
    },
    theme: {
      light: 'Modo Claro',
      dark: 'Modo Escuro',
    },
    techArsenal: {
      title: 'Arsenal Tecnológico',
      subtitle: 'Tecnologias que domino no desenvolvimento',
      frontend: 'Front-end',
      backend: 'Back-end & Database',
      tools: 'Ferramentas',
    },
    about: {
      title: 'Sobre Mim',
      subtitle: 'Desenvolvedor apaixonado por criar soluções escaláveis',
      description: 'Sou um desenvolvedor back-end com mais de 5 anos de experiência construindo APIs robustas, microserviços e arquiteturas distribuídas. Especializado em Node.js, Python e Go, com forte experiência em cloud computing (AWS) e containerização (Docker/Kubernetes). Apaixonado por código limpo, testes automatizados e melhores práticas de desenvolvimento.',
      collaboration: 'Colaboração',
      collaborationTitle: 'Foco no cliente, promovendo comunicação transparente',
      timezone: 'Do Brasil para o mundo',
      timezoneTitle: 'Localizado no Brasil, disponível para colaboração global',
      passionate: 'Fascinado por tecnologias de ponta',
      github: 'Contribuindo com projetos no GitHub',
      githubDesc: 'Código aberto e colaboração',
      linkedin: 'Compartilhando insights no LinkedIn',
      linkedinDesc: 'Networking profissional',
      workTogether: 'Vamos trabalhar juntos no seu próximo projeto',
      cleanCode: "Código Limpo e Design Moderno",
      sendEmail: "Me envie um email",
      techEnthusiast: "Apaixonado por desenvolvimento e tecnologia.",
    },
    projects: {
      title: 'Projetos em destaque',
      subtitle: 'Alguns dos meus trabalhos recentes',
      viewProject: 'Ver Projeto',
      viewDemo: 'Ver Demo',
      viewCaseStudy: 'Ver Estudo de Caso',
      items: [
        {
          title: 'acessly-api',
          company: 'AIRBNB',
          year: '2025',
          description: 'Arquitetura de microsserviços de alta performance processando mais de 100 mil transações diárias com cache Redis e PostgreSQL.',
        },
        {
          title: 'knowball',
          company: 'ORACLE',
          year: '2025',
          description: 'Mostra como você pode iniciar seu próprio negócio lucrativo em apenas algumas semanas, como a empresa aumentou seu MRR em 25%.',
        },
        {
          title: 'digitalbank',
          company: 'STRIPE',
          year: '2025',
          description: 'Microsserviço de autenticação baseado em OAuth 2.0 e JWT com limitação de taxa e autenticação multifator.',
        },
        {
          title: 'pluvia+',
          company: 'AWS',
          year: '2025',
          description: 'Sistema CDN distribuído com cache de borda, otimização de imagens e escalonamento automático em infraestrutura AWS.',
        },
        {
          title: 'smarttrack',
          company: 'CCR',
          year: '2025',
          description: 'Sistema de e-commerce com processamento de pagamentos em tempo real, notificações push e rastreamento de pedidos com WebSockets.',
        },
      ]
    },
    footer: {
      title: 'Entre em contato',
      subtitle: 'Tem uma ideia? Vamos conversar!',
      namePlaceholder: 'Seu nome',
      emailPlaceholder: 'seu@email.com',
      messagePlaceholder: 'Sua mensagem...',
      sendButton: 'Enviar Mensagem',
      rights: 'Todos os direitos reservados.',
      quickLinks: 'Links Rápidos',
      socialLinks: 'Redes Sociais',
    },
  },
  'en': {
    nav: {
      home: 'Home',
      skills: 'Skills',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hello, I am',
      name: 'Gabriel Rossi',
      title: 'Back-End Developer',
      subtitle: 'Building scalable and robust systems with Node.js, Python and cloud technologies',
      ctaContact: 'Get in Touch',
      ctaCV: 'Download CV',
    },
    theme: {
      light: 'Light Mode',
      dark: 'Dark Mode',
    },
    techArsenal: {
      title: 'Tech Arsenal',
      subtitle: 'Technologies I master in development',
      frontend: 'Front-end',
      backend: 'Back-end & Database',
      tools: 'Tools',
    },
    about: {
      title: 'About Me',
      subtitle: 'Developer passionate about creating scalable solutions',
      description: 'I am a back-end developer with over 5 years of experience building robust APIs, microservices and distributed architectures. Specialized in Node.js, Python and Go, with strong experience in cloud computing (AWS) and containerization (Docker/Kubernetes). Passionate about clean code, automated testing and development best practices.',
      collaboration: 'Collaboration',
      collaborationTitle: 'Focus on the customer, promoting transparent communication.',
      timezone: 'From Brazil to the world',
      timezoneTitle: 'Located in Brazil, available for global collaboration',
      passionate: 'Fascinated by cutting-edge technologies',
      github: 'Contributing to projects on GitHub',
      githubDesc: 'Open source and collaboration',
      linkedin: 'Sharing insights on LinkedIn',
      linkedinDesc: 'Professional networking',
      workTogether: "Let's work together on your next project",
      sendEmail: "Send me an email",
      cleanCode: "Clean Code and Modern Design",
      techEnthusiast: "Passionate about development and technology.",
    },
    projects: {
      title: 'Featured projects',
      subtitle: 'Some of my recent work',
      viewProject: 'View Project',
      viewDemo: 'View Demo',
      viewCaseStudy: 'View Case Study',
      items: [
        {
          title: 'Curating AR experiences while travelling',
          company: 'AIRBNB',
          year: '2023',
          description: 'High-performance microservices architecture handling 100k+ daily transactions with Redis caching and PostgreSQL.',
        },
        {
          title: 'Building profitable dropshipping dashboard',
          company: 'SHOPIFY',
          year: '2023',
          description: 'Aims to show you how you can start your own profitable business in just a few weeks, how company increased their MRR by 25%.',
        },
        {
          title: 'Authentication Service',
          company: 'STRIPE',
          year: '2024',
          description: 'OAuth 2.0 and JWT-based authentication microservice with rate limiting and multi-factor authentication.',
        },
        {
          title: 'Content Delivery Network',
          company: 'AWS',
          year: '2024',
          description: 'Distributed CDN system with edge caching, image optimization, and automatic scaling on AWS infrastructure.',
        },
        {
          title: 'Real-Time E-commerce Platform',
          company: 'AMAZON',
          year: '2024',
          description: 'E-commerce system with real-time payment processing, push notifications and order tracking with WebSockets.',
        },
      ]
    },
    footer: {
      title: "Get in touch",
      subtitle: 'Got an idea? Let\'s talk!',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Your message...',
      sendButton: 'Send Message',
      rights: 'All rights reserved.',
      quickLinks: 'Quick Links',
      socialLinks: 'Social Links',
    },
  },
  'es': {
    nav: {
      home: 'Inicio',
      skills: 'Habilidades',
      about: 'Acerca',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, soy',
      name: 'Gabriel Rossi',
      title: 'Desarrollador Back-End',
      subtitle: 'Construyendo sistemas escalables y robustos con Node.js, Python y tecnologías cloud',
      ctaContact: 'Contactar',
      ctaCV: 'Descargar CV',
    },
    theme: {
      light: 'Modo Claro',
      dark: 'Modo Oscuro',
    },
    techArsenal: {
      title: 'Arsenal Tecnológico',
      subtitle: 'Tecnologías que domino en el desarrollo',
      frontend: 'Front-end',
      backend: 'Back-end y Base de Datos',
      tools: 'Herramientas',
    },
    about: {
      title: 'Sobre Mí',
      subtitle: 'Desarrollador apasionado por crear soluciones escalables',
      description: 'Soy un desarrollador back-end con más de 5 años de experiencia construyendo APIs robustas, microservicios y arquitecturas distribuidas. Especializado en Node.js, Python y Go, con fuerte experiencia en cloud computing (AWS) y containerización (Docker/Kubernetes). Apasionado por código limpio, pruebas automatizadas y mejores prácticas de desarrollo.',
      collaboration: 'Colaboración',
      collaborationTitle: 'Centrarse en el cliente, promoviendo una comunicación transparente.',
      timezone: 'De Brasil para el mundo',
      timezoneTitle: 'Situado en Brasil, disponible para colaboración global',
      passionate: 'Fascinado por las tecnologías de vanguardia',
      github: 'Contribuyendo a proyectos en GitHub',
      githubDesc: 'Código abierto y colaboración',
      linkedin: 'Compartiendo ideas en LinkedIn',
      linkedinDesc: 'Networking profesional',
      workTogether: 'Trabajemos juntos en tu próximo proyecto',
      sendEmail: "Envíame un correo electrónico",
      cleanCode: "Código Limpio y Diseño Moderno",
      techEnthusiast: "Apasionado por el desarrollo y la tecnología.",
    },
    projects: {
      title: 'Proyectos destacados',
      subtitle: 'Algunos de mis trabajos recientes',
      viewProject: 'Ver Proyecto',
      viewDemo: 'Ver Demo',
      viewCaseStudy: 'Ver Caso de Estudio',
      items: [
        {
          title: 'Curando experiencias AR mientras viajas',
          company: 'AIRBNB',
          year: '2023',
          description: 'Arquitectura de microservicios de alto rendimiento manejando más de 100k transacciones diarias con caché Redis y PostgreSQL.',
        },
        {
          title: 'Construyendo dashboard rentable de dropshipping',
          company: 'SHOPIFY',
          year: '2023',
          description: 'Muestra cómo puedes iniciar tu propio negocio rentable en solo unas semanas, cómo la empresa aumentó su MRR en 25%.',
        },
        {
          title: 'Servicio de Autenticación',
          company: 'STRIPE',
          year: '2024',
          description: 'Microservicio de autenticación basado en OAuth 2.0 y JWT con limitación de tasa y autenticación multifactor.',
        },
        {
          title: 'Red de Distribución de Contenido',
          company: 'AWS',
          year: '2024',
          description: 'Sistema CDN distribuido con caché de borde, optimización de imágenes y escalado automático en infraestructura AWS.',
        },
        {
          title: 'Plataforma de E-commerce en Tiempo Real',
          company: 'AMAZON',
          year: '2024',
          description: 'Sistema de e-commerce con procesamiento de pagos en tiempo real, notificaciones push y seguimiento de pedidos con WebSockets.',
        },
      ]
    },
    footer: {
      title: 'Ponte en contacto',
      subtitle: '¿Tienes una idea? ¡Hablemos!',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      messagePlaceholder: 'Tu mensaje...',
      sendButton: 'Enviar Mensaje',
      rights: 'Todos los derechos reservados.',
      quickLinks: 'Enlaces Rápidos',
      socialLinks: 'Redes Sociales',
    },
  },
};
