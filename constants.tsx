import Link from "next/link";

interface TabData {
  title: string;
  id: string;
  content: React.ReactNode;
}

export const aboutMe = `I am a passionate full-stack web developer with a year of professional experience and four years of personal projects. While I specialize in JavaScript technologies I am open and eager to work with a diverse range of technologies. My expertise extends to web and API development, and I am currently contributing as a Software Developer at Cooperate Bank of Oromia. Committed to creating interactive and responsive web applications, I am always enthusiastic about expanding my knowledge and skill set. As a quick learner and a team player, I look forward to collaborating with others to deliver amazing applications.`;

export const contactMe = `I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!`;

export const heroMobile = `Adaptable web developer with over a year of professional experience, complemented by dedicated practice during personal time. Specializing in React.js and Next.js. I'm also well-versed in agile project management and DevOps.`;

// export const heroMd = `Adaptable web developer with over a year of professional experience, complemented by dedicated practice during university and personal time. Proficient in front-end development with a solid foundation in DevOps. Skilled in developing plans, managing projects, and user documentation.`;

export const achievementsList = [
  {
    metric: "Projects",
    value: "10",
    postfix: "+",
  },
  {
    metric: "Years",
    value: "4",
  },
];

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

export const TAB_DATA: TabData[] = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>React</li>
        <li>Next.js</li>
        <li>Node.js</li>
      </ul>
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

export const projectsData = [
  {
    id: 1,
    title: "Fetawa",
    description:
      "A collaborative online platform I contributed to, where users can pose questions and connect with knowledgeable teachers for insightful answers.",
    image: "/images/projects/fetawa.png",
    tag: ["All", "Web", "API"],
    gitUrl: "/",
    previewUrl: "https://fatwa.vercel.app/",
    app: ["Next.js", "Firebase", "Tailwind", "Framer Motion"],
  },
  {
    id: 2,
    title: "Souq",
    description:
      "Coop product facilitating users with payment processing, buy-now-pay-later options, and revenue-based financing.",
    image: "/images/projects/souqpass.png",
    tag: ["All", "Web", "API"],
    gitUrl: "/",
    previewUrl: "https://souqpass.coopbankoromiasc.com/",
    app: ["React", "Redux", "Tailwind"],
  },
  {
    id: 3,
    title: "Deboo",
    description:
      "An online platform empowering users to initiate crowdfunding campaigns.",
    image: "/images/projects/debo.png",
    tag: ["All", "Web", "API"],
    gitUrl: "/",
    previewUrl: "https://debo.coopbankoromiasc.com//",
    app: ["React", "Redux", "MaterialUI"],
  },
  {
    id: 4,
    title: "Advanced Authentication Project",
    description:
      "A comprehensive authentication project that incorporates sign-in and sign-out functionalities utilizing both OAuth and credentials. The project includes email verification, password reset, two-factor authentication, and an admin role",
    image: "/images/projects/auth.png",
    tag: ["All", "Web", "API"],
    gitUrl: "https://github.com/MuhidinM/completeAuth",
    previewUrl: "https://complete-auth-weld.vercel.app/",
    app: ["Next.js", "Auth.js", "Tailwind", "TypeScript"],
  },
  {
    id: 5,
    title: "Car Showcase",
    description: "A showcase project featuring a collection of car APIs",
    image: "/images/projects/car.png",
    tag: ["All", "Web", "API"],
    gitUrl: "https://github.com/MuhidinM/carShowcase",
    previewUrl: "https://muhidinm.github.io/carShowcase/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  // {
  //   id: 6,
  //   title: "Portfolio Website",
  //   description: "Portfolio Website ",
  //   image: "/images/projects/portfolio.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "https://github.com/MuhidinM/Portfolio",
  //   previewUrl: "https://muhidinm.vercel.app/",
  //   app: ["Next.js", "Tailwind", "TypeScript", "Framer Motion"],
  // },
];
