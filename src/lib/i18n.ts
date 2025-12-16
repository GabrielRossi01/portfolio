export type Language = 'pt-BR' | 'en' | 'es';

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
    workTogetherSub: string;
    yearsExp: string;
    projectsCompleted: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    viewDemo: string;
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
      subtitle: 'Construindo sistemas escaláveis e robustos com Node.js, Python e tecnologias cloud',
      ctaContact: 'Entre em Contato',
      ctaCV: 'Baixar CV',
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
      collaborationTitle: 'Priorizo a colaboração com clientes, promovendo comunicação aberta',
      timezone: 'Comunicação de Fuso Horário',
      timezoneTitle: 'Localizado no Brasil, disponível para colaboração global',
      passionate: 'Apaixonado por tecnologias de ponta',
      github: 'Contribuindo com projetos no GitHub',
      githubDesc: 'Código aberto e colaboração',
      linkedin: 'Compartilhando insights no LinkedIn',
      linkedinDesc: 'Networking profissional',
      workTogether: 'Vamos trabalhar juntos no seu próximo projeto',
      workTogetherSub: '',
      yearsExp: 'Anos de Experiência',
      projectsCompleted: 'Projetos Concluídos',
    },
    projects: {
      title: 'Projetos em Destaque',
      subtitle: 'Alguns dos meus trabalhos recentes',
      viewProject: 'Ver Projeto',
      viewDemo: 'Ver Demo',
    },
    footer: {
      title: 'Vamos Trabalhar Juntos',
      subtitle: 'Tenho uma ideia? Vamos conversar!',
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
      collaborationTitle: 'I prioritize client collaboration, fostering open communication',
      timezone: 'Time Zone Communications',
      timezoneTitle: 'Located in Brazil, available for global collaboration',
      passionate: 'Passionate about cutting-edge technologies',
      github: 'Contributing to projects on GitHub',
      githubDesc: 'Open source and collaboration',
      linkedin: 'Sharing insights on LinkedIn',
      linkedinDesc: 'Professional networking',
      workTogether: "Let's work together on your next project",
      workTogetherSub: '',
      yearsExp: 'Years Experience',
      projectsCompleted: 'Projects Completed',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Some of my recent work',
      viewProject: 'View Project',
      viewDemo: 'View Demo',
    },
    footer: {
      title: "Let's Work Together",
      subtitle: 'Got an idea? Let\'s talk!',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Your message...',
      sendButton: 'Send Message',
      rights: 'All rights reserved.',      quickLinks: 'Quick Links',
      socialLinks: 'Social Links',    },
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
      collaborationTitle: 'Priorizo la colaboración con clientes, fomentando la comunicación abierta',
      timezone: 'Comunicaciones de Zona Horaria',
      timezoneTitle: 'Situado en Brasil, disponible para colaboración global',
      passionate: 'Apasionado por tecnologías de vanguardia',
      github: 'Contribuyendo a proyectos en GitHub',
      githubDesc: 'Código abierto y colaboración',
      linkedin: 'Compartiendo ideas en LinkedIn',
      linkedinDesc: 'Networking profesional',
      workTogether: 'Trabajemos juntos en tu próximo proyecto',
      workTogetherSub: '',
      yearsExp: 'Años de Experiencia',
      projectsCompleted: 'Proyectos Completados',
    },
    projects: {
      title: 'Proyectos Destacados',
      subtitle: 'Algunos de mis trabajos recientes',
      viewProject: 'Ver Proyecto',
      viewDemo: 'Ver Demo',
    },
    footer: {
      title: 'Trabajemos Juntos',
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