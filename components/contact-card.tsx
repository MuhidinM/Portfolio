import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ContactCardProps {
  icon: string;
  title: string;
  first: string;
  second: string;
}

export const ContactCard = ({
  icon,
  title,
  first,
  second,
}: ContactCardProps) => {
  return (
    <div className="flex items-center justify-start space-x-6 lg:space-x-12 text-white border border-gray-700 rounded-lg p-4 bg-gray-200 bg-opacity-10">
      <div className="bg-sky-200 p-4 rounded-full">
        {icon === "phone" ? (
          <PhoneIcon width={"24"} className="text-sky-500" />
        ) : (
          <EnvelopeIcon width={"24"} className="text-sky-500" />
        )}
      </div>
      <div className="flex flex-col items-start justify-center">
        <h3>{title}</h3>
        <p className="font-light break-words">{first}</p>
        <p className="font-light">{second}</p>
      </div>
    </div>
  );
};
