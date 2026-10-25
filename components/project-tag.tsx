import React from "react";

interface ProjectTagProps {
  name: string;
  onClick: () => void;
  isSelected: boolean;
}

const ProjectTag = ({ name, onClick, isSelected }: ProjectTagProps) => {

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      className={`glass-key px-4 py-2 text-sm ${isSelected ? "glass-key-primary" : "!text-zinc-400 hover:!text-zinc-50"}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
