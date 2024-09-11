'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, px } from "framer-motion";
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/hooks/useNavigation';
import { cn } from "@/utils/cn";

// Importa el archivo CSS
import '@/styles/DashHeaderId.css';

type GlobalHeaderProps = {
    parqueName: string;
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
}

export default function GlobalHeader({ parqueName }: GlobalHeaderProps) {
    const [darkMode, setDarkMode] = useState(true);
    const [visible, setVisible] = useState(true);
    const { navigate, lastNavigation } = useNavigation();
    const { scrollYProgress } = useScroll();
    const pathname = usePathname();

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            let direction = current - scrollYProgress.getPrevious()!;
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

    const navItems = [
        { name: "Home", link: "/" },
        { name: "Energy", link: "/energy" },
        { name: "Simulate", link: "/energy/simulate" },
        { name: "PPTs", link: "/downloads" },
    ];

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleNavigation = (path: string) => {
        console.log(`[GlobalHeader] Navigating to: ${path}`);
        navigate(path, 'header');
    };

    const isActiveLink = (link: string) => {
        if (link === '/') {
            return pathname === '/';
        }
        return pathname.toLowerCase().startsWith(link.toLowerCase());
    };

    return (
        <AnimatePresence mode= "wait" >
        <motion.header
                initial={ { opacity: 1, y: -100 } }
    animate = {{
        y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
                }
}
transition = {{ duration: 0.2 }}
className = {
    cn(
                    "header-custom flex z-[5000] top-0 inset-x-0 w-full px-10 py-5 border border-black/10 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-between bg-black text-white"
    )
}
style = {{
    backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
            borderRadius: "0px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
                }}
            >
    <div className="header-left-content" >
        <div className="logo-container" >
            <img src="/BISLogo.svg" alt = "Logo" className = "header-logo" />
                </div>
                < h1 className = "header-title" > { parqueName } </h1>
                    </div>

                    < nav className = "header-nav" >
                        <ul>
                        {
                            navItems.map((navItem, idx) => (
                                <li
                                key= {`link-${idx}`}
onClick = {() => handleNavigation(navItem.link)}
className = {
    cn(
                                    "cursor-pointer",
        isActiveLink(navItem.link)
    ? "text-blue-500 dark:text-blue-400"
    : "text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300 hover:text-neutral-500"
                                )}
                            >
    { navItem.name }
    </li>
                        ))}
</ul>
    </nav>


    </motion.header>
    </AnimatePresence>
    );
}