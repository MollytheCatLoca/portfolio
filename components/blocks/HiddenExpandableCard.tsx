import React, { useEffect, useRef, useId } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { CardsAllin1 } from '@/data';
import { useCardContext } from '@/context/CardContext'; // Importar el contexto

interface HiddenExpandableCardProps {
    activeCardId: number | null;
    onClose: () => void;
}

const HiddenExpandableCard: React.FC<HiddenExpandableCardProps> = ({ activeCardId, onClose }) => {
    const { setIsCardActive } = useCardContext(); // Usar el contexto para actualizar el estado
    const activeCard = activeCardId ? CardsAllin1.find(card => card.id === activeCardId) : null;
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsCardActive(false); // Actualizar el estado al cerrar
                onClose();
            }
        };

        if (activeCard) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [activeCard, onClose]);

    useOutsideClick(ref, () => {
        setIsCardActive(false); // Actualizar el estado al cerrar
        onClose();
    });

    if (!activeCard) return null;

    return (
        <AnimatePresence>
        { activeCard && (
            <>
            <motion.div
                        initial= {{ opacity: 0 }
}
animate = {{ opacity: 1 }}
exit = {{ opacity: 0 }}
className = "fixed inset-0 bg-black/20 h-full w-full z-10"
    />
    <div className="fixed inset-0 grid place-items-center z-[100]" >
        <motion.div
                            layoutId={ `card-${activeCard.id}-${id}` }
ref = { ref }
className = "w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
    >
    <motion.div layoutId={ `image-${activeCard.id}-${id}` }>
        <Image
                                    priority
width = { 500}
height = { 300}
src = { activeCard.src }
alt = { activeCard.title }
className = "w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
    />
    </motion.div>

    < div >
    <div className="flex justify-between items-start p-4" >
        <div>
        <motion.h3
                                            layoutId={ `title-${activeCard.id}-${id}` }
className = "font-medium text-neutral-700 dark:text-neutral-200 text-base"
    >
    { activeCard.title }
    </motion.h3>
    < motion.p
layoutId = {`description-${activeCard.id}-${id}`}
className = "text-neutral-600 dark:text-neutral-400 text-base"
    >
    { activeCard.description }
    </motion.p>
    </div>

    < motion.button
layout
initial = {{ opacity: 0 }}
animate = {{ opacity: 1 }}
exit = {{ opacity: 0 }}
onClick = {() => {
    setIsCardActive(false); // Actualizar el estado al cerrar
    onClose();
}}
className = "px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white hover:bg-green-600 transition-colors"
    >
    Cerrar
    </motion.button>
    </div>
    < div className = "pt-4 relative px-4" >
        <motion.div
                                        layout
initial = {{ opacity: 0 }}
animate = {{ opacity: 1 }}
exit = {{ opacity: 0 }}
className = "text-neutral-600 text-xs md:text-sm lg:text-base h-60 pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
    >
{
    activeCard.content.split('\n\n').map((paragraph, index) => (
        <p key= { index } className = "mb-4" >
        { paragraph }
        </p>
    ))
}
    </motion.div>
    </div>
    </div>
    </motion.div>
    </div>
    </>
            )}
</AnimatePresence>
    );
};

export default HiddenExpandableCard;
