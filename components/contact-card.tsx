import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ContactCardProps {
  icon: string;
  title: string;
  first: string;
  second: string;
  customClass: string;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function whatsappUrl(phoneDisplay: string): string {
  return `https://wa.me/${digitsOnly(phoneDisplay)}`;
}

function mailtoUrl(email: string): string {
  return `mailto:${email.trim()}`;
}

export const ContactCard = ({
  icon,
  title,
  first,
  second,
  customClass,
}: ContactCardProps) => {
  const isPhone = icon === "phone";

  const linkClass =
    "text-xs font-light truncate text-stone-500 transition-colors hover:text-stone-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 rounded-sm";

  return (
    <div
      className={`flex items-center space-x-5 text-stone-200 border border-stone-800/90 rounded-lg p-4 bg-zinc-900/40 ${customClass}`}
    >
      <div className="flex-shrink-0 bg-stone-800/80 p-3 rounded-full border border-stone-700/80">
        {isPhone ? (
          <PhoneIcon width={22} className="text-stone-400" />
        ) : (
          <EnvelopeIcon width={22} className="text-stone-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-stone-300">{title}</h3>
        {isPhone ? (
          <>
            <p className="min-w-0">
              <a
                href={whatsappUrl(first)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {first}
              </a>
            </p>
            <p className="min-w-0">
              <a
                href={whatsappUrl(second)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {second}
              </a>
            </p>
          </>
        ) : (
          <>
            <p className="min-w-0">
              <a href={mailtoUrl(first)} className={linkClass}>
                {first}
              </a>
            </p>
            <p className="min-w-0">
              <a href={mailtoUrl(second)} className={linkClass}>
                {second}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
