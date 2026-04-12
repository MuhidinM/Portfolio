"use client";

interface NavLinkProps {
  href: string;
  title: string;
}

const NavLink = ({ href, title }: NavLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      href={href}
      className="block py-2 pl-3 pr-4 text-stone-500 sm:text-lg rounded md:p-0 hover:text-stone-200 transition-colors"
      onClick={handleClick}
    >
      {title}
    </a>
  );
};

export default NavLink;
