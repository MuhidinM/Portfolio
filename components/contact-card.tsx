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
      className={`flex items-center space-x-6 lg:space-x-12 text-white border border-gray-700 rounded-lg p-4 bg-gray-200 bg-opacity-10 ${customClass}`}
    >
      <div className="flex-shrink-0 bg-sky-200 p-4 rounded-full">
        {icon === "phone" ? (
          <PhoneIcon width={"24"} className="text-sky-500" />
        ) : (
          <EnvelopeIcon width={"24"} className="text-sky-500" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-sm font-light truncate">{first}</p>
        <p className="text-sm font-light truncate">{second}</p>
      </div>
    </div>
  );
};
