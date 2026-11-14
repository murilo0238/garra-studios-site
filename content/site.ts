import {
  Bug,
  Gauge,
  Handshake,
  LayoutDashboard,
  MessageCircle,
  MonitorSmartphone,
  PanelsTopLeft,
  SearchCheck,
  Server,
  ShoppingBag,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * Todo o conteúdo textual do site fica aqui, separado dos componentes.
 * Regra: nada de clientes, números, depoimentos ou fatos não confirmados.
 */

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Serviços", href: "/#servicos" },
  { label: "Portfólio", href: "/#portfolio" },
  { label: "Tecnologias", href: "/#tecnologias" },
  { label: "Como Trabalhamos", href: "/#como-trabalhamos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

/* ---------- Tipos de serviço do formulário (slug usado em ?servico=) ---------- */

export const serviceOptions = [
  { slug: "site", label: "Criação de site" },
  { slug: "landing-page", label: "Landing page" },
  { slug: "loja-virtual", label: "Loja virtual" },
  { slug: "sistema-web", label: "Sistema web" },
  { slug: "automacao", label: "Automação ou integração" },
  { slug: "correcao-bugs", label: "Correção de bugs" },
  { slug: "infraestrutura", label: "Infraestrutura e deploy" },
  { slug: "parceria-agencia", label: "Parceria com agência" },
  { slug: "outro", label: "Outro" },
] as const;

export type ServiceSlug = (typeof serviceOptions)[number]["slug"];

export const serviceSlugs: readonly string[] = serviceOptions.map((option) => option.slug);

export function isServiceSlug(value: string | null | undefined): value is ServiceSlug {
  return !!value && serviceSlugs.includes(value);
}

export function serviceLabel(slug: string): string {
  return serviceOptions.find((option) => option.slug === slug)?.label ?? "Outro";
}

/** Link interno que leva ao formulário com o serviço já selecionado. */
export function contactHref(slug?: ServiceSlug): string {
  return slug ? `/?servico=${slug}#contato` : "/#contato";
}

/* ---------- Hero ---------- */

export const hero = {
  eyebrow: "Desenvolvimento web • Sistemas • Automações",
  title: "Criamos sites, sistemas e soluções digitais para tirar suas ideias do papel.",
  subtitle:
    "Da presença online ao desenvolvimento de aplicações, a Garra Studios cria soluções modernas, rápidas e personalizadas para o seu negócio.",
  primaryCta: { label: "Quero criar meu site", href: contactHref("site") },
  secondaryCta: { label: "Preciso de suporte técnico", href: contactHref("correcao-bugs") },
  highlights: ["Orçamento personalizado", "Atendimento direto com o desenvolvedor", "Projetos sob medida"],
};

/* ---------- Serviços ---------- */

export type Service = {
  slug: ServiceSlug;
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const servicesSection = {
  title: "Soluções digitais para cada etapa do seu negócio.",
  subtitle:
    "Do primeiro site à evolução de sistemas existentes, oferecemos desenvolvimento e suporte técnico para diferentes necessidades.",
};

export const services: Service[] = [
  {
    slug: "site",
    title: "Criação de Sites Profissionais",
    description:
      "Desenvolvimento de sites institucionais modernos, responsivos e personalizados para empresas, profissionais e negócios.",
    icon: MonitorSmartphone,
    featured: true,
  },
  {
    slug: "landing-page",
    title: "Landing Pages",
    description:
      "Páginas focadas em apresentar produtos, serviços e campanhas, com estrutura voltada à conversão e captação de contatos.",
    icon: PanelsTopLeft,
    featured: true,
  },
  {
    slug: "loja-virtual",
    title: "Lojas Virtuais",
    description:
      "Criação e personalização de lojas online, catálogos digitais e experiências de compra, conforme a plataforma e o escopo do projeto.",
    icon: ShoppingBag,
  },
  {
    slug: "sistema-web",
    title: "Sistemas Web",
    description:
      "Desenvolvimento de aplicações personalizadas, dashboards, painéis administrativos e ferramentas digitais.",
    icon: LayoutDashboard,
  },
  {
    slug: "automacao",
    title: "Automações e Integrações",
    description: "Integração entre plataformas, APIs e automação de processos para reduzir tarefas manuais.",
    icon: Workflow,
  },
  {
    slug: "correcao-bugs",
    title: "Correção de Bugs e Manutenção",
    description: "Diagnóstico e resolução de erros, manutenção de aplicações e implementação de melhorias.",
    icon: Bug,
  },
  {
    slug: "infraestrutura",
    title: "Infraestrutura e Deploy",
    description:
      "Configuração de VPS, Docker, servidores, domínios, certificados SSL e publicação de aplicações.",
    icon: Server,
  },
  {
    slug: "parceria-agencia",
    title: "Desenvolvimento para Agências",
    description:
      "Parcerias white-label, terceirização de desenvolvimento e apoio técnico para agências de marketing e software.",
    icon: Handshake,
  },
];

/* ---------- Criação de sites ---------- */

export const websitesSection = {
  eyebrow: "Criação de sites",
  title: "Seu negócio merece um site à altura das suas ideias.",
  text: "Tenha uma presença digital profissional com um site desenvolvido para apresentar sua marca, seus serviços e facilitar o contato com seus clientes.",
  cta: { label: "Solicitar meu site", href: contactHref("site") },
  features: [
    {
      title: "Design responsivo",
      description: "Experiência adaptada para celulares, tablets e computadores.",
      icon: MonitorSmartphone,
    },
    {
      title: "Carregamento otimizado",
      description: "Desenvolvimento com atenção à performance e à experiência do usuário.",
      icon: Gauge,
    },
    {
      title: "SEO técnico",
      description: "Estrutura preparada para facilitar a indexação nos mecanismos de busca.",
      icon: SearchCheck,
    },
    {
      title: "Contato facilitado",
      description: "Integração com WhatsApp, formulários e chamadas para ação.",
      icon: MessageCircle,
    },
  ] satisfies { title: string; description: string; icon: LucideIcon }[],
  disclaimer: "Ilustrações conceituais de interfaces. Não representam projetos de clientes.",
};

/* ---------- Portfólio ---------- */

export type PortfolioProject = {
  slug: string;
  name: string;
  segment: string;
  /** "conceito" = marca fictícia criada para demonstração; "cliente" = projeto real e autorizado. */
  kind: "conceito" | "cliente";
  description: string;
  highlights: string[];
  stack: string[];
  url: string;
  images: { desktop: string; mobile: string; alt: string };
};

export const portfolioSection = {
  eyebrow: "Portfólio",
  title: "Projetos que mostram como trabalhamos.",
  subtitle:
    "Sites desenvolvidos do zero, com atenção ao design, às animações e ao desempenho. Projetos conceito são identificados como tal.",
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "atelier",
    name: "ATELIER",
    segment: "Arquitetura & Interiores",
    kind: "conceito",
    description:
      "Landing page para um estúdio de arquitetura de alto padrão: tipografia editorial, fotografia em destaque e animações que acompanham a rolagem.",
    highlights: [
      "Animações de entrada e revelação ao rolar",
      "Layout responsivo com menu em tela cheia no celular",
      "Imagens otimizadas em WebP e fontes hospedadas no próprio site",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://atelier.garrastudios.online",
    images: {
      desktop: "/images/portfolio/atelier-desktop.webp",
      mobile: "/images/portfolio/atelier-mobile.webp",
      alt: "Página inicial do site ATELIER, com a palavra ATELIER em letras grandes sobre a foto de uma residência contemporânea ao entardecer",
    },
  },
];

/* ---------- Suporte técnico ---------- */

export const supportSection = {
  eyebrow: "Suporte técnico",
  title: "Seu site ou sistema está com problemas? Podemos ajudar.",
  text: "Erros, falhas de integração, dificuldades com hospedagem ou funcionalidades que não funcionam como deveriam? Conte com suporte técnico para diagnosticar e resolver o problema.",
  note: "Atendemos demandas pontuais: você descreve o problema, fazemos a análise técnica e apresentamos a proposta antes de qualquer intervenção.",
  cta: { label: "Preciso resolver um problema", href: contactHref("correcao-bugs") },
  issues: [
    "Site fora do ar",
    "Problemas em WordPress",
    "Erros em aplicações",
    "Integrações com falhas",
    "Problemas de domínio e SSL",
    "Configuração de hospedagem",
    "Publicação e deploy",
    "Ajustes e melhorias em sistemas",
  ],
};

/* ---------- Agências ---------- */

export const agenciesSection = {
  eyebrow: "Para agências",
  title: "Sua agência precisa de apoio técnico? Conte com a Garra Studios.",
  text: "Atuamos como parceiros de desenvolvimento para agências que precisam ampliar sua capacidade de entrega, implementar funcionalidades ou resolver demandas técnicas específicas.",
  cta: { label: "Propor uma parceria", href: contactHref("parceria-agencia") },
  items: [
    "Desenvolvimento white-label",
    "Criação de sites e landing pages",
    "Integrações e APIs",
    "Correção de bugs",
    "Desenvolvimento sob demanda",
    "Apoio em projetos pontuais",
  ],
};

/* ---------- Tecnologias ---------- */

export type TechId =
  | "html5"
  | "css3"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "python"
  | "flask"
  | "php"
  | "postgresql"
  | "git"
  | "docker"
  | "linux";

export const technologiesSection = {
  title: "Tecnologias que utilizamos.",
  subtitle: "Ferramentas consolidadas, escolhidas conforme a necessidade de cada projeto.",
  groups: [
    {
      name: "Front-end",
      items: [
        { id: "html5", name: "HTML5" },
        { id: "css3", name: "CSS3" },
        { id: "javascript", name: "JavaScript" },
        { id: "typescript", name: "TypeScript" },
        { id: "react", name: "React" },
        { id: "nextjs", name: "Next.js" },
      ],
    },
    {
      name: "Back-end",
      items: [
        { id: "python", name: "Python" },
        { id: "flask", name: "Flask" },
        { id: "php", name: "PHP" },
      ],
    },
    {
      name: "Banco de dados",
      items: [{ id: "postgresql", name: "PostgreSQL" }],
    },
    {
      name: "Infraestrutura",
      items: [
        { id: "git", name: "Git" },
        { id: "docker", name: "Docker" },
        { id: "linux", name: "Linux" },
      ],
    },
  ] satisfies { name: string; items: { id: TechId; name: string }[] }[],
};

/* ---------- Processo ---------- */

export const processSection = {
  title: "Do primeiro contato à entrega.",
  subtitle: "Um processo simples e transparente, com escopo e investimento definidos antes do início.",
  steps: [
    { number: "01", title: "Entendimento", description: "Conversamos sobre o projeto, problema ou necessidade." },
    {
      number: "02",
      title: "Planejamento e orçamento",
      description: "Definimos escopo, solução proposta, prazo e investimento.",
    },
    {
      number: "03",
      title: "Desenvolvimento",
      description: "Implementamos a solução com atenção à qualidade técnica.",
    },
    {
      number: "04",
      title: "Testes e entrega",
      description: "Validamos as funcionalidades e realizamos a entrega conforme o escopo acordado.",
    },
  ],
};

/* ---------- Sobre ---------- */

export const founder = {
  name: "Murilo",
  role: "Desenvolvedor Full Stack · Fundador",
  photo: "/images/murilo.webp",
  avatar: "/images/murilo-avatar.webp",
  alt: "Foto de Murilo, desenvolvedor Full Stack e fundador da Garra Studios",
};

export const aboutSection = {
  title: "Tecnologia com propósito e execução.",
  paragraphs: [
    "A Garra Studios é uma marca de desenvolvimento de software liderada por Murilo, desenvolvedor Full Stack com atuação em aplicações web, integrações, automações e infraestrutura.",
    "Nosso foco é transformar necessidades reais em soluções digitais funcionais, com comunicação clara e atenção aos detalhes de cada projeto.",
  ],
  principles: [
    { title: "Comunicação direta", description: "Você conversa com quem desenvolve o projeto." },
    { title: "Escopo claro", description: "Solução, prazo e investimento definidos antes de começar." },
    { title: "Qualidade técnica", description: "Código organizado, testado e fácil de manter." },
  ],
  githubCta: "Ver projetos e código no GitHub",
};

/* ---------- FAQ ---------- */

export const faqSection = {
  title: "Perguntas frequentes.",
  items: [
    {
      question: "Quanto custa criar um site?",
      answer:
        "O valor depende da complexidade, das funcionalidades e das necessidades de cada projeto. Por isso, trabalhamos com orçamento personalizado: você conta o que precisa e recebe uma proposta com escopo e investimento definidos.",
    },
    {
      question: "Quanto tempo leva para desenvolver um site?",
      answer:
        "O prazo é definido após a análise do escopo. Ele varia conforme a quantidade de páginas, as funcionalidades e a disponibilidade de conteúdos como textos e imagens.",
    },
    {
      question: "Vocês trabalham com sites já existentes?",
      answer:
        "Sim. A Garra Studios também oferece manutenção, melhorias e correção de problemas em sites e sistemas já publicados.",
    },
    {
      question: "É possível contratar apenas uma correção?",
      answer:
        "Sim. Atendemos demandas pontuais, conforme análise técnica. Primeiro entendemos o problema e, em seguida, apresentamos a proposta.",
    },
    {
      question: "Vocês trabalham com agências?",
      answer:
        "Sim. Há disponibilidade para avaliar parcerias, inclusive white-label, e demandas terceirizadas de desenvolvimento.",
    },
    {
      question: "Como solicito um orçamento?",
      answer:
        "Pelo formulário desta página ou diretamente pelo WhatsApp. Descreva sua necessidade e retornaremos para conversar sobre as possibilidades.",
    },
  ],
};

/* ---------- Contato ---------- */

export const contactSection = {
  title: "Vamos construir sua próxima solução?",
  subtitle: "Conte o que você precisa. Vamos analisar sua demanda e conversar sobre as possibilidades.",
  steps: [
    "Preencha o formulário com os detalhes do projeto.",
    "Ao enviar, o WhatsApp abre com sua mensagem pronta.",
    "Analisamos a demanda e retornamos para conversar.",
  ],
  placeholders: {
    default: "Conte sobre o projeto ou problema: objetivo, funcionalidades desejadas, prazo ideal, links de referência…",
    partnership:
      "Conte sobre a agência e a parceria: tipo de demanda, volume estimado, tecnologias envolvidas e modelo de trabalho (white-label, pontual, recorrente)…",
  },
};

/* ---------- Footer ---------- */

export const footerServiceLinks = services
  .filter((service) =>
    ["site", "landing-page", "sistema-web", "automacao", "correcao-bugs", "parceria-agencia"].includes(service.slug),
  )
  .map((service) => ({ label: service.title, href: contactHref(service.slug) }));
