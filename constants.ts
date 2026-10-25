export const aboutParagraphs = [
  `I'm a Senior Software Engineer at Cooperative Bank of Oromia's DxValley, where I've worked since 2022. I build and run production systems end to end: React and Next.js frontends, backend APIs and database design, and the CI/CD and Kubernetes infrastructure they deploy on.`,
  `I led the frontend for Michu Mizan and co-built Souqpass, two national-first lending platforms in Ethiopia that have disbursed ETB 210M+ to 4,500+ borrowers. On contract with VK Tech, I built a multi-tenant fleet platform and a centralised AI media service, and scaled a suite of consumer AI tools to 150K+ users.`,
];

export const aboutFacts = [
  { label: "Based in", value: "Addis Ababa (UTC+3)" },
  { label: "Works", value: "Remote" },
  { label: "Experience", value: "4 years in production" },
];

export interface ExperienceItem {
  company: string;
  context: string;
  roles: { title: string; period: string }[];
  work: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Cooperative Bank of Oromia — DxValley",
    context: "Addis Ababa · Digital innovation arm of the bank",
    roles: [
      { title: "Senior Software Engineer, Payments Platform Innovation", period: "10/2026 – Now" },
      { title: "Software Engineer", period: "09/2022 – 10/2026" },
    ],
    work: ["CoopScale HR platform", "Michu Mizan", "Souqpass", "Zakat & Awqaf platform"],
  },
  {
    company: "VK Tech",
    context: "Remote · Beijing · AI product studio",
    roles: [{ title: "Frontend Engineer (Contract)", period: "03/2025 – Now" }],
    work: ["Fleet OS", "AIGC API", "Charge Hub"],
  },
  {
    company: "Keradion",
    context: "Addis Ababa",
    roles: [{ title: "Frontend Engineer (Contract)", period: "01/2025 – 03/2025" }],
    work: ["Omicron", "Eyoha"],
  },
];

export const stackGroups = [
  {
    name: "Frontend",
    items: ["TypeScript", "React", "Next.js", "TanStack Query", "Zustand", "Redux Toolkit", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "NestJS", "REST", "GraphQL", "Auth & RBAC", "Background jobs"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase"],
  },
  {
    name: "Testing & observability",
    items: ["Playwright", "Prometheus", "Grafana", "Sentry"],
  },
  {
    name: "Infrastructure",
    items: ["Kubernetes", "Docker", "GitHub Actions", "Linux VMs", "AWS", "Cloudflare", "Vercel"],
  },
];

export const education = [
  {
    title: "B.Sc. Computer Science and Engineering",
    detail: "Adama Science and Technology University · 2022",
  },
  {
    title: "DevOps, Cloud, and Agile Foundations",
    detail: "IBM · Coursera",
    href: "https://www.coursera.org/account/accomplishments/specialization/4GZZDYM5YEAW",
  },
];

export const contactMe = `Have a role, a project, or a question? Send a message below or reach me directly. I read everything and reply by email.`;

export const heroMobile = `Senior software engineer with four years building production systems end to end: React and Next.js frontends, backend APIs, and the CI/CD and Kubernetes infrastructure they run on.`;


export interface AchievementItem {
  metric: string;
  value: string;
  prefix: string;
  postfix: string;
}

export const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];


export const achievementsList: AchievementItem[] = [
  {
    metric: "Years in production",
    value: "4",
    prefix: "",
    postfix: "",
  },
  {
    metric: "Disbursed via lending platforms",
    value: "210",
    prefix: "ETB ",
    postfix: "M+",
  },
  {
    metric: "Borrowers served",
    value: "4500",
    prefix: "",
    postfix: "+",
  },
  {
    metric: "AI tool users",
    value: "150",
    prefix: "",
    postfix: "K+",
  },
];
