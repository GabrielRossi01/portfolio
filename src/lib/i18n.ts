export type Language = 'pt-BR' | 'en' | 'es';

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
  'pt-BR': {
    nav: {
      home: 'Início',
      skills: 'Habilidades',
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
    },
    hero: {
      badge: 'Disponível para projetos',
      headlineStart: 'Transformo ideias ambiciosas em',
      headlineEnd: 'produtos digitais de alta performance',
      greeting: 'Olá, eu sou o',
      name: 'Gabriel Rossi',
      connector: ', um',
      title: 'Desenvolvedor Back-End',
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
          company: '',
          year: '2025',
          description: 'Desenvolvi o acessly-api, uma solução voltada para reduzir a lacuna de emprego para profissionais com deficiência através da correspondência precisa de vagas.',
          metrics: [
            '90% de mitigação de vulnerabilidades de acesso não autorizado.',
            'Garantia de integridade total do processo de recrutamento e dos dados sensíveis.',
            'Correspondência precisa (match assertivo) de vagas para o público-alvo.'
          ]
        },
        {
          title: 'knowball',
          company: 'ORACLE',
          year: '2025',
          description: 'Projetei e construí o knowball, uma API de controle centralizada destinada a resolver a gestão fragmentada e a manipulação de resultados em campeonatos de base do futebol masculino brasileiro.',
          metrics: [
            '30% de redução no esforço de manutenção do lado do cliente (frontend).',
            'Atingimento do Nível 3 de Maturidade de Richardson (Glory of REST).',
            'Implementação de navegação dinâmica, eliminando a dependência de URLs fixas.'
          ]
        },
        {
          title: 'digitalbank',
          company: '',
          year: '2025',
          description: 'Desenvolvi uma API RESTful voltada ao setor financeiro digital, orquestrando operações bancárias essenciais como depósito, saque e transferência via PIX entre contas.',
          metrics: [
            'Suporte a pagamentos instantâneos através da implementação de transferências via PIX.',
            'Gerenciamento integral de operações de caixa (Depósitos e Saques).',
            'Padronização de arquitetura REST, facilitando a escalabilidade e integração de serviços.'
          ]
        },
        {
          title: 'pluvia+',
          company: '',
          year: '2025',
          description: 'Implementei o pluvia+, uma plataforma web de impacto social focada em fornecer acesso a água potável para comunidades em crise hídrica.',
          metrics: [
            'Coleta automatizada de dados através de integração robusta com APIs em Java.',
            'Mitigação de riscos em cenários de eventos extremos de calor e colapso hídrico.',
            'Arquitetura sustentável, projetada para viabilizar soluções de purificação portátil.'
          ]
        },
        {
          title: 'smarttrack',
          company: 'CCR',
          year: '2025',
          description: 'Engenhei o smarttrack, um website responsivo projetado para otimizar a gestão e a automação de processos operacionais em estações de trens e metrôs no estado de São Paulo.',
          metrics: [
            'Acessibilidade multi-dispositivo, garantida por um design totalmente responsivo.',
            'Otimização operacional através da automação de rotinas das estações.',
            'Gestão centralizada da infraestrutura de transporte público (trens e metrôs).'
          ]
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
      badge: 'Available for projects',
      headlineStart: 'I transform ambitious ideas into',
      headlineEnd: 'high-performing digital products',
      greeting: 'Hello, I\'m',
      name: 'Gabriel Rossi',
      connector: ', a',
      title: 'Back-End Developer',
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
          title: 'acessly-api',
          company: '',
          year: '2025',
          description: 'I developed acessly-api, a solution aimed at reducing the employment gap for professionals with disabilities through accurate job matching.',
          metrics: [
            '90% mitigation of unauthorized access vulnerabilities.',
            'Full integrity guarantee of the recruitment process and sensitive data.',
            'Precise job matching for the target audience.'
          ]
        },
        {
          title: 'knowball',
          company: 'ORACLE',
          year: '2025',
          description: 'I designed and built knowball, a centralized control API intended to solve the fragmented management and manipulation of results in youth championships of Brazilian men\'s soccer.',
          metrics: [
            '30% reduction in client-side (frontend) maintenance effort.',
            'Achievement of Richardson Maturity Level 3 (Glory of REST).',
            'Implementation of dynamic navigation, eliminating dependency on fixed URLs.'
          ]
        },
        {
          title: 'digitalbank',
          company: '',
          year: '2025',
          description: 'I developed a RESTful API aimed at the digital finance sector, orchestrating essential banking operations such as deposits, withdrawals, and PIX transfers between accounts.',
          metrics: [
            'Support for instant payments through PIX transfer implementation.',
            'Comprehensive management of cash operations (Deposits and Withdrawals).',
            'REST architecture standardization, facilitating scalability and service integration.'
          ]
        },
        {
          title: 'pluvia+',
          company: '',
          year: '2025',
          description: 'I implemented pluvia+, a social impact web platform focused on providing access to drinking water for communities facing water crises.',
          metrics: [
            'Automated data collection through robust integration with Java APIs.',
            'Risk mitigation in scenarios of extreme heat events and water collapse.',
            'Sustainable architecture, designed to enable portable purification solutions.'
          ]
        },
        {
          title: 'smarttrack',
          company: 'CCR',
          year: '2025',
          description: 'I engineered smarttrack, a responsive website designed to optimize the management and automation of operational processes in train and subway stations in the state of São Paulo.',
          metrics: [
            'Multi-device accessibility, guaranteed by a fully responsive design.',
            'Operational optimization through automation of station routines.',
            'Centralized management of public transportation infrastructure (trains and subways).'
          ]
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
      badge: 'Disponible para proyectos',
      headlineStart: 'Transformo ideas ambiciosas en',
      headlineEnd: 'productos digitales de alto rendimiento',
      greeting: 'Hola, soy',
      name: 'Gabriel Rossi',
      connector: ', un',
      title: 'Desarrollador Back-End',
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
          title: 'acessly-api',
          company: '',
          year: '2025',
          description: 'Desarrollé acessly-api, una solución destinada a reducir la brecha de empleo para profesionales con discapacidad a través de la correspondencia precisa de vacantes.',
          metrics: [
            '90% de mitigación de vulnerabilidades de acceso no autorizado.',
            'Garantía de integridad total del proceso de reclutamiento y datos sensibles.',
            'Correspondencia precisa de vacantes para el público objetivo.'
          ]
        },
        {
          title: 'knowball',
          company: 'ORACLE',
          year: '2025',
          description: 'Diseñé y construí knowball, una API de control centralizada destinada a resolver la gestión fragmentada y la manipulación de resultados en campeonatos juveniles del fútbol masculino brasileño.',
          metrics: [
            '30% de reducción en el esfuerzo de mantenimiento del lado del cliente (frontend).',
            'Logro del Nivel 3 de Madurez de Richardson (Glory of REST).',
            'Implementación de navegación dinámica, eliminando la dependencia de URLs fijas.'
          ]
        },
        {
          title: 'digitalbank',
          company: '',
          year: '2025',
          description: 'Desarrollé una API RESTful dirigida al sector financiero digital, orquestando operaciones bancarias esenciales como depósitos, retiros y transferencias PIX entre cuentas.',
          metrics: [
            'Soporte para pagos instantáneos a través de la implementación de transferencias PIX.',
            'Gestión integral de operaciones de caja (Depósitos y Retiros).',
            'Estandarización de arquitectura REST, facilitando la escalabilidad e integración de servicios.'
          ]
        },
        {
          title: 'pluvia+',
          company: '',
          year: '2025',
          description: 'Implementé pluvia+, una plataforma web de impacto social enfocada en proporcionar acceso a agua potable para comunidades en crisis hídrica.',
          metrics: [
            'Recopilación automatizada de datos a través de integración robusta con APIs en Java.',
            'Mitigación de riesgos en escenarios de eventos extremos de calor y colapso hídrico.',
            'Arquitectura sostenible, diseñada para viabilizar soluciones de purificación portátil.'
          ]
        },
        {
          title: 'smarttrack',
          company: 'CCR',
          year: '2025',
          description: 'Diseñé smarttrack, un sitio web responsivo diseñado para optimizar la gestión y automatización de procesos operacionales en estaciones de trenes y metro en el estado de São Paulo.',
          metrics: [
            'Accesibilidad multidispositivo, garantizada por un diseño completamente responsivo.',
            'Optimización operacional a través de la automatización de rutinas de estaciones.',
            'Gestión centralizada de infraestructura de transporte público (trenes y metro).'
          ]
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
