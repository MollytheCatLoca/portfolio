"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { presentations, Presentation } from "@/data/download";
import { cn } from "@/utils/cn";

// Variables para ajuste fino
const CARD_BORDER_RADIUS = "12px";
const CARD_BACKGROUND_COLOR = "rgba(17, 25, 40, 0.75)";
const CARD_BORDER_COLOR = "rgba(255, 255, 255, 0.125)";
const CARD_SHADOW = "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)";
const ANIMATION_DURATION = 0.2;

// Estilos compartidos
const styles = {
    card: `
    p-4 flex flex-col rounded-xl cursor-pointer
    backdrop-filter backdrop-blur-md bg-opacity-75
    border border-solid
    transition-all duration-200
    h-[320px]
  `,
    cardContent: `
    flex flex-col h-full
  `,
    image: `
    h-48 w-full rounded-lg object-cover object-center
  `,
    titleContainer: `
    flex-grow flex items-center justify-center
  `,
    title: `
    font-medium text-center text-base
    line-clamp-2 overflow-hidden
  `,
    openCard: `
    w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] 
    flex flex-col overflow-hidden
    bg-opacity-75 backdrop-filter backdrop-blur-md
    rounded-3xl border border-solid
  `,
    openCardContent: `
    flex flex-col p-6
  `,
    openCardTitle: `
    font-medium text-xl text-neutral-200 mb-2
  `,
    openCardDescription: `
    text-neutral-400 text-base mb-4
  `,
    openCardExcerpt: `
    text-neutral-400 text-sm mt-4
    overflow-auto max-h-40
    [mask-image:linear-gradient(to_bottom,white_calc(100%-2rem),transparent)]
  `,
    downloadButton: `
    px-6 py-3 text-sm font-bold rounded-full
    bg-green-500 text-white
    hover:bg-green-600 transition-colors duration-200
    self-end mt-4
  `,
};

export function DownloadablePresentation() {
    const [active, setActive] = useState<Presentation | null>(null);
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }

        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
        <AnimatePresence>
        { active && (
            <motion.div
            initial= {{ opacity: 0 }
}
animate = {{ opacity: 1 }}
exit = {{ opacity: 0 }}
className = "fixed inset-0 bg-black/20 h-full w-full z-10"
    />
        )}
</AnimatePresence>
    <AnimatePresence>
{
    active && (
        <div className="fixed inset-0 grid place-items-center z-[100]" >
            <motion.button
              key={ `button-${active.title}-${id}` }
    layout
    initial = {{ opacity: 0 }
}
animate = {{ opacity: 1 }}
exit = {{ opacity: 0, transition: { duration: 0.05 } }}
className = "flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
onClick = {() => setActive(null)}
            >
    <CloseIcon />
    </motion.button>
    < motion.div
layoutId = {`card-${active.id}-${id}`}
ref = { ref }
className = { cn(styles.openCard) }
style = {{
    backgroundColor: CARD_BACKGROUND_COLOR,
        borderRadius: CARD_BORDER_RADIUS,
            borderColor: CARD_BORDER_COLOR,
                boxShadow: CARD_SHADOW,
              }}
            >
    <motion.div layoutId={ `image-${active.id}-${id}` }>
        <Image
                  priority
width = { 500}
height = { 300}
src = { active.imageSrc }
alt = { active.title }
className = "w-full h-64 object-cover object-center"
    />
    </motion.div>

    < div className = { styles.openCardContent } >
        <motion.h3
                  layoutId={ `title-${active.id}-${id}` }
className = { styles.openCardTitle }
    >
    { active.title }
    </motion.h3>
    < motion.p
layoutId = {`description-${active.id}-${id}`}
className = { styles.openCardDescription }
    >
    { active.description }
    </motion.p>
    < motion.div
initial = {{ opacity: 0 }}
animate = {{ opacity: 1 }}
exit = {{ opacity: 0 }}
className = { styles.openCardExcerpt }
    >
    <p>{ active.excerpt } </p>
    </motion.div>
    < motion.a
layout
href = { active.downloadPath }
download
className = { styles.downloadButton }
    >
    Descargar
    </motion.a>
    </div>
    </motion.div>
    </div>
        )}
</AnimatePresence>
    < ul className = "max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4" >
    {
        presentations.map((presentation) => (
            <motion.div
            layoutId= {`card-${presentation.id}-${id}`}
key = { presentation.id }
onClick = {() => setActive(presentation)}
className = { cn(styles.card) }
style = {{
    backgroundColor: CARD_BACKGROUND_COLOR,
        borderRadius: CARD_BORDER_RADIUS,
            borderColor: CARD_BORDER_COLOR,
                boxShadow: CARD_SHADOW,
            }}
          >
    <div className={ styles.cardContent }>
        <div className="h-48 overflow-hidden rounded-lg" >
            <motion.div layoutId={ `image-${presentation.id}-${id}` }>
                <Image
                    width={ 500 }
height = { 300}
src = { presentation.imageSrc }
alt = { presentation.title }
className = { styles.image }
    />
    </motion.div>
    </div>
    < div className = { styles.titleContainer } >
        <motion.h3
                  layoutId={ `title-${presentation.id}-${id}` }
className = { cn("text-neutral-200", styles.title) }
    >
    { presentation.title }
    </motion.h3>
    </div>
    </div>
    </motion.div>
        ))}
</ul>
    </>
  );
}

const CloseIcon = () => {
    return (
        <motion.svg
      initial= {{ opacity: 0 }
}
animate = {{ opacity: 1 }}
exit = {{ opacity: 0, transition: { duration: 0.05 } }}
xmlns = "http://www.w3.org/2000/svg"
width = "24"
height = "24"
viewBox = "0 0 24 24"
fill = "none"
stroke = "currentColor"
strokeWidth = "2"
strokeLinecap = "round"
strokeLinejoin = "round"
className = "h-4 w-4 text-black"
    >
    <path stroke="none" d = "M0 0h24v24H0z" fill = "none" />
        <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
                </motion.svg>
  );
};

export default DownloadablePresentation;