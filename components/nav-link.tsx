"use client";

import { prefersReducedMotion } from "@/lib/reduced-motion";

interface NavLinkProps {
  href: string;
  title: string;
  onNavigate?: () => void;
}

const NavLink = ({ href, title, onNavigate }: NavLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = document.getElementById(href.replace("#", ""));
    if (!element) return;
    e.preventDefault();
    element.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    history.replaceState(null, "", href);
    onNavigate?.();
  };

  return (
    <a
      href={href}
      className="block rounded-xl px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cobalt-400"
      onClick={handleClick}
    >
      {title}
    </a>
  );
};

export default NavLink;
