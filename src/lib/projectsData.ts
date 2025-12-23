export interface StaticProjectData {
  id: number;
  title: string; 
  description: string;
  mockup: string;
  mockupType: 'phone' | 'desktop';
  company: string;
  year: string;
  tags: string[];
  metrics: string[];
  github: string;
  demo: string;
}

export const STATIC_PROJECTS_DATA: StaticProjectData[] = [
  {
    id: 0,
    title: 'acessly-api',
    description: 'Arquitetura de microsserviços de alta performance processando mais de 100 mil transações diárias com cache Redis e PostgreSQL.',
    mockup: '/apple-imac-acessly-api.png',
    mockupType: 'desktop',
    company: '',
    year: '2025',
    tags: ['Java', 'Spring Boot', 'API Rest', 'Swagger', 'Render', 'Spring Security', 'Spring Data JPA', 'Bean Validation', 'JDBC', 'JWT'],
    metrics: ['Onboarding aumentado para 12%', 'Cadastros de novos usuários aumentaram 32%', 'Engajamento aumentou 20%'],
    github: 'https://github.com/acessly/acessly-api.git',
    demo: 'https://github.com/acessly/acessly-api.git',
  },
  {
    id: 1,
    title: 'knowball',
    description: 'Mostra como você pode iniciar seu próprio negócio lucrativo em apenas algumas semanas, como a empresa aumentou seu MRR em 25%.',
    mockup: '/apple-imac-knowball-api.png',
    mockupType: 'desktop',
    company: 'ORACLE',
    year: '2025',
    tags: ['Java', 'Spring Boot', 'API Rest', 'Swagger', 'Maven', 'Lombok', 'Spring Data JPA', 'JDBC', 'Bean Validation', 'Spring Security', 'Insomnia'],
    metrics: ['Receita aumentou 25%', 'Taxa de conversão subiu 18%', 'Retenção de usuários melhorou 30%'],
    github: 'https://github.com/knowball-oracle/knowball-api.git',
    demo: 'https://github.com/knowball-oracle/knowball-api.git',
  },
  {
    id: 2,
    title: 'digitalbank',
    description: 'Microsserviço de autenticação baseado em OAuth 2.0 e JWT com limitação de taxa e autenticação multifator.',
    mockup: '/iphone-mockup-digitalbank.png',
    mockupType: 'phone',
    company: '',
    year: '2025',
    tags: ['Java', 'Spring Boot', 'API Rest', 'Spring Data JPA', 'JDBC', 'Lombok', 'Bean Validation', 'SLF4J'],
    metrics: ['Incidentes de segurança reduzidos em 95%', 'Velocidade de login melhorou 40%', 'Tickets de suporte reduzidos em 60%'],
    github: 'https://github.com/GabrielRossi01/digitalbank.git',
    demo: 'https://github.com/GabrielRossi01/digitalbank.git',
  },
  {
    id: 3,
    title: 'pluvia+',
    description: 'Sistema CDN distribuído com cache de borda, otimização de imagens e escalonamento automático em infraestrutura AWS.',
    mockup: '/apple-imac-pluvia-plus.png',
    mockupType: 'desktop',
    company: '',
    year: '2025',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
    metrics: ['Latência reduzida em 70%', 'Custos de banda reduzidos em 45%', 'Alcance global em mais de 150 países'],
    github: 'https://github.com/GabrielRossi01/website-pluvia.git',
    demo: 'https://website-pluvia.vercel.app/',
  },
  {
    id: 4,
    title: 'smarttrack',
    description: 'Sistema de e-commerce com processamento de pagamentos em tempo real, notificações push e rastreamento de pedidos com WebSockets.',
    mockup: '/iphone-mockup-smarttrack.png',
    mockupType: 'phone',
    company: 'CCR',
    year: '2025',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
    metrics: ['Tempo de checkout reduzido em 40%', 'Satisfação do cliente aumentou 85%', 'Vendas cresceram 50%'],
    github: 'https://github.com/GabrielRossi01/smarttrack.git',
    demo: 'https://smarttrack-site.vercel.app/',
  },
];
