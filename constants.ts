export const aboutParagraphs = [
  `I'm a frontend engineer with 4 years building production React, Next.js and TypeScript apps for fintech and AI products, doing full-stack work (Node.js, NestJS, PostgreSQL, CI/CD) when needed. I work full-time at Cooperative Bank of Oromia's DxValley, now as a Senior Software Engineer, and part-time on contract for VK Tech.`,
  `At the bank I delivered the frontends of three financing platforms, leading Michu Mizan, owning Furtuu and co-building Souqpass: US$6.4M+ financed for 10,000+ customers. At VK Tech I built 12 consumer AI tools (8 live, 200K+ monthly users), from upload pipelines to generation queue UX and result galleries, plus the shared generative AI service behind them. For the newer tools I owned Next.js SSR/ISR, web performance and technical SEO.`,
  `I also built most of the web and Electron apps for Revy AI, a real-estate assistant with a video avatar and AI phone calls, and I wrote Qen, an open-source calendar library with 1.9K+ npm downloads a month.`,
];

export const aboutFacts = [
  { label: "Based in", value: "Addis Ababa (UTC+3)" },
  { label: "Works", value: "Remote or relocation" },
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
    context: "Addis Ababa · Full-time · Digital innovation arm of the bank",
    roles: [
      { title: "Senior Software Engineer, Payments Platform Innovation", period: "10/2026 – Now" },
      { title: "Software Engineer", period: "09/2022 – 10/2026" },
    ],
    work: ["Michu Mizan", "Furtuu", "Souqpass", "Zakat & Awqaf platform", "CoopScale HR platform"],
  },
  {
    company: "VK Tech",
    context: "Remote · Beijing · Contract, part-time",
    roles: [{ title: "Frontend Engineer", period: "03/2025 – Now" }],
    work: ["12 AI SaaS tools", "AIGC API", "Charge Hub", "Fleet OS"],
  },
  {
    company: "Freelance and contract work",
    context: "Remote and Addis Ababa · Part-time",
    roles: [
      { title: "Frontend Engineer · Revy AI (Upwork client)", period: "2025" },
      { title: "Frontend Engineer · Keradion (contract)", period: "01/2025 – 03/2025" },
    ],
    work: ["Revy AI", "Omicron", "Eyoha"],
  },
];

export const stackGroups = [
  {
    name: "Front-end",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "React", "Next.js (App Router, SSR/ISR)", "Tailwind CSS", "shadcn/ui", "Redux Toolkit", "Zustand", "TanStack Query", "Electron", "Responsive design"],
  },
  {
    name: "AI integration",
    items: ["LLM APIs (OpenAI, Google AI)", "Multi-model apps", "Vercel AI SDK", "Mem0", "HeyGen streaming avatars", "Vapi voice agents", "Vision and image generation", "Async job queues", "Streaming UIs"],
  },
  {
    name: "Backend and data",
    items: ["Node.js", "NestJS", "REST APIs", "PostgreSQL", "Supabase", "Stripe"],
  },
  {
    name: "Quality and delivery",
    items: ["Jest", "Playwright", "Lighthouse", "Core Web Vitals", "Accessibility", "Technical SEO", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Vercel", "Sentry", "Claude Code", "Cursor"],
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

export const heroMobile = `Frontend engineer with 4 years building production React, Next.js and TypeScript apps for AI products and fintech. Based in Addis Ababa (UTC+3), open to remote or relocation.`;


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
    metric: "Financed via bank platforms",
    value: "6.4",
    prefix: "US$ ",
    postfix: "M+",
  },
  {
    metric: "Customers financed",
    value: "10000",
    prefix: "",
    postfix: "+",
  },
  {
    metric: "Monthly AI tool users",
    value: "200",
    prefix: "",
    postfix: "K+",
  },
];
