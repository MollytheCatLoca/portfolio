"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/utils/cn";
import { useCardContext } from "@/context/CardContext";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const { isCardActive } = useCardContext();
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number" && !isCardActive) {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const isActiveLink = (link: string) => {
    if (link === '/') {
      return pathname === '/';
    }
    return pathname.toLowerCase().startsWith(link.toLowerCase());
  };

  if (isCardActive) {
    return null;
  }

  return (
    <AnimatePresence mode= "wait" >
    <motion.div
        initial={
    {
      opacity: 1,
        y: -100,
        }
  }
  animate = {{
    y: visible ? 0 : -100,
      opacity: visible ? 1 : 0,
        }
}
transition = {{
  duration: 0.2,
        }}
className = {
  cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
    className
  )
}
style = {{
  backdropFilter: "blur(16px) saturate(180%)",
    backgroundColor: "rgba(17, 25, 40, 0.75)",
      borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
  <div className="logo-container" >
    <img
            src="/BISLogo.svg"
alt = "BIS Integraciones Logo"
className = "h-10 w-10"
  />
  </div>
{
  navItems.map((navItem: any, idx: number) => (
    <Link
            key= {`link=${idx}`}
href = { navItem.link }
className = {
  cn(
              "relative items-center flex space-x-1",
    isActiveLink(navItem.link)
  ? "text-blue-500 dark:text-blue-400"
  : "text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
  <span className="block sm:hidden" > { navItem.icon } </span>
    < span className = "text-sm !cursor-pointer" >
      { navItem.name }
      </span>
      </Link>
        ))}
</motion.div>
  </AnimatePresence>
  );
};