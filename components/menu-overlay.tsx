import React from "react";
import NavLink from "./nav-link";

interface MenuOverlayProps {
  links: Array<{
    title: string;
    path: string;
  }>;
}

const MenuOverlay = ({ links }: MenuOverlayProps) => {
  return (
    <>
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </>
  );
};

export default MenuOverlay;
