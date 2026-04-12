import React from "react";

interface ProjectTagProps {
  name: string;
  onClick: (name: string) => void;
  isSelected: boolean;
}

const ProjectTag = ({ name, onClick, isSelected }: ProjectTagProps) => {
  const buttonStyles = isSelected
    ? "text-stone-100 border-stone-400 bg-zinc-900/50"
    : "text-stone-500 border-stone-700 hover:border-stone-500 hover:text-stone-300";

  return (
    <button
      type="button"
      className={`${buttonStyles} rounded-full border px-5 py-2.5 text-base sm:text-lg cursor-pointer transition-colors`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
