import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ContactCardProps {
  icon: string;
  title: string;
  first: string;
  second: string;
  customClass: string;
}

export const ContactCard = ({
  icon,
  title,
  first,
  second,
  customClass,
}: ContactCardProps) => {
  return (
    <div
      className={`flex items-center space-x-5 text-stone-200 border border-stone-800/90 rounded-lg p-4 bg-zinc-900/40 ${customClass}`}
    >
      <div className="flex-shrink-0 bg-stone-800/80 p-3 rounded-full border border-stone-700/80">
        {icon === "phone" ? (
          <PhoneIcon width={22} className="text-stone-400" />
        ) : (
          <EnvelopeIcon width={22} className="text-stone-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-stone-300">{title}</h3>
        <p className="text-xs font-light truncate text-stone-500">{first}</p>
        <p className="text-xs font-light truncate text-stone-500">{second}</p>
      </div>
    </div>
  );
};
