import React from "react";
import NavLink from "./nav-link";

interface MenuOverlayProps {
  links: Array<{
    title: string;
    path: string;
  }>;
  onNavigate?: () => void;
}

const MenuOverlay = ({ links, onNavigate }: MenuOverlayProps) => {
  return (
    <>
      {links.map((link) => (
        <li key={link.path}>
          <NavLink href={link.path} title={link.title} onNavigate={onNavigate} />
        </li>
      ))}
    </>
  );
};

export default MenuOverlay;
