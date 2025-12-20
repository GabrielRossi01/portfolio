export type Language = 'pt-BR' | 'en' | 'es';


export interface ProjectItem {
  title: string;
  company: string;
  year: string;
  description: string;
  mockup: string;
  mockupType: 'phone' | 'desktop';
  tags: string[];
  metrics: string[];
  github: string;
  demo: string;
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
          title: 'acessly API',
          company: 'AIRBNB',
          year: '2025',
          description: 'Arquitetura de microsserviços de alta performance processando mais de 100 mil transações diárias com cache Redis e PostgreSQL.',
          mockup: '/phone-mockup.png',
          mockupType: 'phone',
          tags: ['Java', 'Spring Boot', 'API Rest', 'Swagger', 'Render', 'Spring Security', 'Spring Data JPA', 'Bean Validation', 'JDBC', 'JWT'],
          metrics: [
            'Onboarding aumentado para 12%',
            'Cadastros de novos usuários aumentaram 32%',
            'Engajamento aumentou 20%'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'knowball',
          company: 'ORACLE',
          year: '2025',
          description: 'Mostra como você pode iniciar seu próprio negócio lucrativo em apenas algumas semanas, como a empresa aumentou seu MRR em 25%.',
          mockup: '/desktop-mockup.png',
          mockupType: 'desktop',
          tags: ['Java', 'Spring Boot', 'API Rest', 'Swagger', 'Maven', 'Lombok', 'Spring Data JPA', 'JDBC', 'Bean Validation', 'Spring Security', 'Insomnia'],
          metrics: [
            'Receita aumentou 25%',
            'Taxa de conversão subiu 18%',
            'Retenção de usuários melhorou 30%'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'digitalbank',
          company: 'STRIPE',
          year: '2025',
          description: 'Microsserviço de autenticação baseado em OAuth 2.0 e JWT com limitação de taxa e autenticação multifator.',
          mockup: '/phone-mockup.png',
          mockupType: 'phone',
          tags: ['Java', 'Spring Boot', 'API Rest', 'Spring Data JPA', 'JDBC', 'Lombok', 'Bean Validation', 'SLF4J'],
          metrics: [
            'Incidentes de segurança reduzidos em 95%',
            'Velocidade de login melhorou 40%',
            'Tickets de suporte reduzidos em 60%'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'pluvia+',
          company: 'AWS',
          year: '2025',
          description: 'Sistema CDN distribuído com cache de borda, otimização de imagens e escalonamento automático em infraestrutura AWS.',
          mockup: '/desktop-mockup.png',
          mockupType: 'desktop',
          tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
          metrics: [
            'Latência reduzida em 70%',
            'Custos de banda reduzidos em 45%',
            'Alcance global em mais de 150 países'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'smarttrack',
          company: 'CCR',
          year: '2025',
          description: 'Sistema de e-commerce com processamento de pagamentos em tempo real, notificações push e rastreamento de pedidos com WebSockets.',
          mockup: '/phone-mockup.png',
          mockupType: 'phone',
            tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
          metrics: [
            'Tempo de checkout reduzido em 40%',
            'Satisfação do cliente aumentou 85%',
            'Vendas cresceram 50%'
          ],
          github: '#',
          demo: '#',
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
          mockup: '/phone-mockup.png',
          mockupType: 'phone',
          tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
          metrics: [
            'Onboarding increased to 12%',
            'New users signups increased by 32%',
            'Engagement increased by 20%'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'Building profitable dropshipping dashboard',
          company: 'SHOPIFY',
          year: '2023',
          description: 'Aims to show you how you can start your own profitable business in just a few weeks, how company increased their MRR by 25%.',
          mockup: '/desktop-mockup.png',
          mockupType: 'desktop',
          tags: ['Go', 'Kafka', 'TimescaleDB', 'Kubernetes'],
          metrics: [
            'Revenue increased by 25%',
            'Conversion rate up 18%',
            'User retention improved 30%'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'Authentication Service',
          company: 'STRIPE',
          year: '2024',
          description: 'OAuth 2.0 and JWT-based authentication microservice with rate limiting and multi-factor authentication.',
          mockup: '/phone-mockup.png',
          mockupType: 'phone',
          tags: ['Python', 'FastAPI', 'MongoDB', 'Redis'],
          metrics: [
            'Security incidents down 95%',
            'Login speed improved 40%',
            'Support tickets reduced 60%'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'Content Delivery Network',
          company: 'AWS',
          year: '2024',
          description: 'Distributed CDN system with edge caching, image optimization, and automatic scaling on AWS infrastructure.',
          mockup: '/desktop-mockup.png',
          mockupType: 'desktop',
          tags: ['AWS', 'CloudFront', 'Lambda', 'S3'],
          metrics: [
            'Latency reduced by 70%',
            'Bandwidth costs down 45%',
            'Global reach 150+ countries'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'Real-Time E-commerce Platform',
          company: 'AMAZON',
          year: '2024',
          description: 'E-commerce system with real-time payment processing, push notifications and order tracking with WebSockets.',
          mockup: '/phone-mockup.png',
          mockupType: 'phone',
          tags: ['Node.js', 'GraphQL', 'MongoDB', 'Stripe'],
          metrics: [
            'Checkout time reduced by 40%',
            'Customer satisfaction increased 85%',
            'Sales grew 50%'
          ],
          github: '#',
          demo: '#',
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
          mockup: '/phone-mockup.png',
          mockupType: 'phone',
          tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker'],
          metrics: [
            'Onboarding aumentó al 12%',
            'Registros de nuevos usuarios aumentaron 32%',
            'Engagement aumentó 20%'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'Construyendo dashboard rentable de dropshipping',
          company: 'SHOPIFY',
          year: '2023',
          description: 'Muestra cómo puedes iniciar tu propio negocio rentable en solo unas semanas, cómo la empresa aumentó su MRR en 25%.',
          mockup: '/desktop-mockup.png',
          mockupType: 'desktop',
          tags: ['Go', 'Kafka', 'TimescaleDB', 'Kubernetes'],
          metrics: [
            'Ingresos aumentaron 25%',
            'Tasa de conversión subió 18%',
            'Retención de usuarios mejoró 30%'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'Servicio de Autenticación',
          company: 'STRIPE',
          year: '2024',
          description: 'Microservicio de autenticación basado en OAuth 2.0 y JWT con limitación de tasa y autenticación multifactor.',
          mockup: '/phone-mockup.png',
          mockupType: 'phone',
          tags: ['Python', 'FastAPI', 'MongoDB', 'Redis'],
          metrics: [
            'Incidentes de seguridad reducidos en 95%',
            'Velocidad de inicio de sesión mejoró 40%',
            'Tickets de soporte reducidos en 60%'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'Red de Distribución de Contenido',
          company: 'AWS',
          year: '2024',
          description: 'Sistema CDN distribuido con caché de borde, optimización de imágenes y escalado automático en infraestructura AWS.',
          mockup: '/desktop-mockup.png',
          mockupType: 'desktop',
          tags: ['AWS', 'CloudFront', 'Lambda', 'S3'],
          metrics: [
            'Latencia reducida en 70%',
            'Costos de ancho de banda reducidos en 45%',
            'Alcance global en más de 150 países'
          ],
          github: '#',
          demo: '#',
        },
        {
          title: 'Plataforma de E-commerce en Tiempo Real',
          company: 'AMAZON',
          year: '2024',
          description: 'Sistema de e-commerce con procesamiento de pagos en tiempo real, notificaciones push y seguimiento de pedidos con WebSockets.',
          mockup: '/phone-mockup.png',
          mockupType: 'phone',
          tags: ['Node.js', 'GraphQL', 'MongoDB', 'Stripe'],
          metrics: [
            'Tiempo de checkout reducido en 40%',
            'Satisfacción del cliente aumentó 85%',
            'Ventas crecieron 50%'
          ],
          github: '#',
          demo: '#',
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
