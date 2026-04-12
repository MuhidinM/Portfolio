import Link from "next/link";
import { getLivePreviewCount, getPublishedCount } from "@/lib/projects";

interface TabData {
  title: string;
  id: string;
  content: React.ReactNode;
}

export const aboutMe = `I am a passionate full-stack web developer with a year of professional experience and four years of personal projects. While I specialize in JavaScript technologies I am open and eager to work with a diverse range of technologies. My expertise extends to web and API development, and I am currently contributing as a Software Developer at Cooperate Bank of Oromia. Committed to creating interactive and responsive web applications, I am always enthusiastic about expanding my knowledge and skill set. As a quick learner and a team player, I look forward to collaborating with others to deliver amazing applications.`;

export const contactMe = `I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!`;

export const heroMobile = `Adaptable web developer with over a year of professional experience, complemented by dedicated practice during personal time. Specializing in React.js and Next.js. I'm also well-versed in agile project management and DevOps.`;

// export const heroMd = `Adaptable web developer with over a year of professional experience, complemented by dedicated practice during university and personal time. Proficient in front-end development with a solid foundation in DevOps. Skilled in developing plans, managing projects, and user documentation.`;

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
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "REST & GraphQL",
  "Git & CI/CD",
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
        <li>Bachelor of Science in Computer Science and Engineering</li>
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
    metric: "Projects shipped",
    value: String(getPublishedCount()),
    prefix: "",
    postfix: "+",
  },
  {
    metric: "Years building",
    value: "5",
    prefix: "",
    postfix: "",
  },
  {
    metric: "Core technologies",
    value: "12",
    prefix: "",
    postfix: "+",
  },
  {
    metric: "Live Products",
    value: String(getLivePreviewCount()),
    prefix: "",
    postfix: "+",
  },
];
