"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap-client";

interface TabButtonProps {
  active: boolean;
  selectTab: () => void;
  children: React.ReactNode;
}

const TabButton = ({ active, selectTab, children }: TabButtonProps) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!lineRef.current) return;
    registerGsap();
    gsap.to(lineRef.current, {
      width: active ? "calc(100% - 0.75rem)" : 0,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [active]);

  const buttonClasses = active ? "text-stone-100" : "text-stone-500";

  return (
    <button type="button" onClick={selectTab} className="text-left">
      <p
        className={`mr-3 font-semibold hover:text-stone-200 transition-colors ${buttonClasses}`}
      >
        {children}
      </p>
      <div
        ref={lineRef}
        className="h-0.5 bg-stone-500 mt-2 mr-3 w-0 rounded-full"
      />
    </button>
  );
};

export default TabButton;
