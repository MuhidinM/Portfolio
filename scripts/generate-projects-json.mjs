import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Legacy shape from constants.tsx (before JSON migration) */
const raw = [
  {
    id: 1,
    title: "Michu Mizan",
    description:
      "An alternative financing platform for interest free banking.",
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

function slug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function categoriesFrom(tag, stack) {
  const c = new Set();
  if (tag.includes("Web")) c.add("web");
  if (tag.includes("API")) c.add("api");
  if (tag.includes("App")) {
    c.add("mobile");
    c.add("web");
  }
  const joined = stack.join(" ");
  if (/laravel|firebase|node\.?js|express|nestjs|django|auth\.?js|oauth/i.test(joined))
    c.add("backend");
  if (/electron|tauri/i.test(joined)) c.add("desktop");
  if (c.size === 0) c.add("web");
  return [...c];
}

const featuredIds = new Set([1, 2, 23]);

const out = raw.map((p) => ({
  id: p.id,
  slug: slug(p.title),
  title: p.title,
  description: p.description,
  image: p.image,
  categories: categoriesFrom(p.tag, p.app),
  stack: p.app,
  gitUrl: p.gitUrl,
  previewUrl: p.previewUrl,
  featured: featuredIds.has(p.id),
  published: true,
  date: `2024-${String(Math.min(12, (p.id % 12) + 1)).padStart(2, "0")}-${String(10 + (p.id % 17)).padStart(2, "0")}`,
}));

const dest = path.join(__dirname, "..", "data", "projects.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 2), "utf8");
console.log("Wrote", dest, out.length, "projects");
