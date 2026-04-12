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

export const projectsData = [
  {
    id: 1,
    title: "Michu Mizan",
    description: "An alternative financing platform for interest free banking.",
    image: "/images/projects/michumizan.png",
    tag: ["All", "Web", "API"],
    gitUrl: "/",
    previewUrl: "https://michumizan.com/",
    app: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
  },
  {
    id: 2,
    title: "Dxvalley",
    description:
      "Developed a web platform for DxValley to showcase its mission of fostering innovation and entrepreneurship in Ethiopia, connect with partners, and manage hackathons, competitions, and training programs.",
    image: "/images/projects/dxvalley.png",
    tag: ["All", "Web", "API"],
    gitUrl: "/",
    previewUrl: "https://dxvalley.com/",
    app: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
  },
  {
    id: 3,
    title: "Souq",
    description:
      "Coop product facilitating users with payment processing, buy-now-pay-later options, and revenue-based financing.",
    image: "/images/projects/souqpass.png",
    tag: ["All", "Web", "API"],
    gitUrl: "/",
    previewUrl: "https://souqpass.coopbankoromiasc.com/",
    app: ["React", "Redux", "Tailwind", "JavaScript"],
  },
  {
    id: 4,
    title: "Cartoon Any",
    description: "Transform photos into cartoon-style illustrations",
    image: "/images/projects/cartoonany.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://cartoonany.com/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 5,
    title: "Watermark Gone",
    description: "Advanced watermark removal and image restoration tool",
    image: "/images/projects/watermarkgone.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://watermarkgone.com/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 6,
    title: "Where Is The Place",
    description: "Location discovery and identification application",
    image: "/images/projects/whereistheplace.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://whereistheplace.net/en",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 7,
    title: "They See Your Photo",
    description: "Privacy-focused photo sharing and analysis platform",
    image: "/images/projects/theyseeyourphoto.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://theyseeyourphotos.net/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 8,
    title: "Tattoo Editor",
    description: "Digital tool for designing and editing tattoo artwork",
    image: "/images/projects/tattooeditor.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://tattooeditor.com/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 9,
    title: "GeoSpy 2",
    description: "Enhanced version of the location intelligence platform",
    image: "/images/projects/geospy2.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://geospy.tech/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 10,
    title: "BYD",
    description: "A modern web application for automotive solutions",
    image: "/images/projects/byd.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://electriccar-byd.com/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 11,
    title: "AI Image Checker",
    description:
      "An AI-powered tool to detect and analyze images for authenticity",
    image: "/images/projects/aiimagechecker.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://aiimagechecker.net/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 12,
    title: "Image Merger",
    description: "Tool for combining and merging multiple images seamlessly",
    image: "/images/projects/imagemerger.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://mergeimage.com/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 13,
    title: "Is AI Image",
    description: "AI detection tool to identify artificially generated images",
    image: "/images/projects/isaiimage.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://www.isaiimage.com/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 14,
    title: "Is Fake Labubu",
    description: "Authentication tool for Labubu collectible verification",
    image: "/images/projects/isfakelabubu.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://isfakelabubu.com/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 15,
    title: "Reva",
    description: "Modern business solution platform",
    image: "/images/projects/reva.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 16,
    title: "Mini Labubu",
    description: "Miniature version showcase of Labubu collectibles",
    image: "/images/projects/minilabubu.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://minilabubu.net",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 17,
    title: "Nail Art",
    description: "Digital platform for nail art designs and tutorials",
    image: "/images/projects/nailart.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://nailartai.net/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 18,
    title: "Watermark AI",
    description: "AI-powered watermark generation and application tool",
    image: "/images/projects/watermarkai.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://watermarkremoval.net/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 19,
    title: "Labubu or Lafufu",
    description: "Interactive game to distinguish between Labubu characters",
    image: "/images/projects/labubuorlafufu.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://lafufuorlabubu.com/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },

  {
    id: 20,
    title: "Coop Present",
    description: "A presentation platform for cooperative banking solutions",
    image: "/images/projects/coopresent.png",
    tag: ["All", "App"],
    gitUrl: "/",
    previewUrl: "/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 21,
    title: "GeoSpy",
    description: "Location-based intelligence and mapping application",
    image: "/images/projects/geospy.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://geospy.net/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 22,
    title: "Omicron",
    description:
      "A landing site for Omicron, Ethiopia's only supplier of Chint products.",
    image: "/images/projects/omicron.png",
    tag: ["All", "Web", "API"],
    gitUrl: "/",
    previewUrl: "https://omicronfront.vercel.app/",
    app: ["Next.js", "Tailwind", "Framer Motion", "Laravel", "TypeScript"],
  },
  {
    id: 23,
    title: "Advanced Authentication Project",
    description:
      "A comprehensive authentication project that incorporates sign-in and sign-out functionalities utilizing both OAuth and credentials. The project includes email verification, password reset, two-factor authentication, and an admin role",
    image: "/images/projects/auth.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/MuhidinM/completeAuth",
    previewUrl: "https://complete-auth-weld.vercel.app/",
    app: ["Next.js", "Auth.js", "Tailwind", "TypeScript"],
  },
  {
    id: 24,
    title: "Eyoha",
    description: "An innovative social platform for community engagement",
    image: "/images/projects/eyoha.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://eyoha-front.vercel.app/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: 25,
    title: "Fetawa",
    description:
      "A collaborative online platform I contributed to, where users can pose questions and connect with knowledgeable teachers for insightful answers.",
    image: "/images/projects/fetawa.png",
    tag: ["All", "Web", "API"],
    gitUrl: "/",
    previewUrl: "https://fatwa.vercel.app/",
    app: ["Next.js", "Firebase", "Tailwind", "Framer Motion", "TypeScript"],
  },
  {
    id: 26,
    title: "Car Showcase",
    description: "A showcase project featuring a collection of car APIs",
    image: "/images/projects/car.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/MuhidinM/carShowcase",
    previewUrl: "https://muhidinm.github.io/carShowcase/",
    app: ["Next.js", "Tailwind", "TypeScript"],
  },
];

const livePreviewCount = projectsData.filter(
  (p) => p.previewUrl && p.previewUrl !== "/"
).length;

export const achievementsList: AchievementItem[] = [
  {
    metric: "Projects shipped",
    value: String(projectsData.length),
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
    value: String(livePreviewCount),
    prefix: "",
    postfix: "+",
  },
];
