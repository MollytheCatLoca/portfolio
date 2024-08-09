"use client"
import React, { useState } from 'react';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid3';
import HiddenExpandableCard from './blocks/HiddenExpandableCard';
import { CardsAllin1 } from '@/data';

interface GridItem {
    id: number;
    title: string;
    description: string;
    className: string;
    imgClassName: string;
    titleClassName: string;
    img?: string;
    spareImg?: string;
    link?: string;
}

interface GridProps {
    gridItems: GridItem[];
}

const Grid: React.FC<GridProps> = ({ gridItems }) => {
    const [activeCardId, setActiveCardId] = useState<number | null>(null);

    const handleCardActivation = (link: string) => {
        const id = parseInt(link);
        if (!isNaN(id) && id > 0 && id <= CardsAllin1.length) {
            console.log('Card activation triggered for id:', id);
            setActiveCardId(id);
        }
    };

    return (
        <section id= "about" >
        <BentoGrid>
        {
            gridItems.map(({ id, title, description, className, img, imgClassName, titleClassName, spareImg, link }) => (
                <BentoGridItem
            id= { id }
            key = { id }
            title = { title }
            description = { description }
            className = { className }
            img = { img }
            imgClassName = { imgClassName }
            titleClassName = { titleClassName }
            spareImg = { spareImg }
            link = { link }
            onClick = {() => handleCardActivation(link || '')}
          />
        ))}
</BentoGrid>
    < HiddenExpandableCard
activeCardId = { activeCardId }
onClose = {() => setActiveCardId(null)}
      />
    </section>
  );
}

export default Grid;