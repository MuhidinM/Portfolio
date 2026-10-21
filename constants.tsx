import Link from "next/link";

interface TabData {
  title: string;
  id: string;
  content: React.ReactNode;
}

export const aboutMe = `I'm a Senior Software Engineer at Cooperative Bank of Oromia's DxValley, where I've worked since 2022. Over four years I've built and run production systems end to end: React and Next.js frontends, backend APIs and database design, and the CI/CD and Kubernetes infrastructure they deploy on. I led the frontend for Michu Mizan and co-built Souqpass, two national-first lending platforms in Ethiopia that have disbursed ETB 210M+ to 4,500+ borrowers. On contract with VK Tech, I built a multi-tenant fleet platform and a centralised AI media service, and scaled a suite of consumer AI tools to 150K+ users.`;

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

const SKILL_PILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "GitHub Actions CI/CD",
  "Playwright",
  "Prometheus & Grafana",
  "Sentry",
  "Tailwind CSS",
];

export const TAB_DATA: TabData[] = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="flex flex-wrap gap-2">
        {SKILL_PILLS.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-stone-700/90 bg-stone-900/50 px-3 py-1.5 text-sm text-stone-300"
          >
            {skill}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>B.Sc. Computer Science and Engineering, 2022</li>
        <li>Adama Science and Technology University</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>
          <Link
            target="_blank"
            href={
              "https://www.coursera.org/account/accomplishments/specialization/4GZZDYM5YEAW"
            }
          >
            DevOps, Cloud, and Agile Foundations Specialization from IBM
          </Link>
        </li>
      </ul>
    ),
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
