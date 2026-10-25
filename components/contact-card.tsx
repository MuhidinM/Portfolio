import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ContactCardProps {
  icon: string;
  title: string;
  first: string;
  second?: string;
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
    "block break-all rounded-sm text-sm text-zinc-300 transition-colors hover:text-cobalt-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-400";

  return (
    <div
      className={`glass flex items-center gap-4 !rounded-2xl p-4 ${customClass}`}
    >
      <div className="glass-key h-11 w-11 shrink-0" aria-hidden>
        {isPhone ? (
          <PhoneIcon width={22} className="text-cobalt-300" />
        ) : (
          <EnvelopeIcon width={22} className="text-cobalt-300" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="eyebrow mb-1 !text-[0.6875rem] !tracking-[0.14em]">{title}</p>
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
            {second && (
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
            )}
          </>
        ) : (
          <>
            <p className="min-w-0">
              <a href={mailtoUrl(first)} className={linkClass}>
                {first}
              </a>
            </p>
            {second && (
              <p className="min-w-0">
                <a href={mailtoUrl(second)} className={linkClass}>
                  {second}
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
