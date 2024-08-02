import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid2';

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
        />
        ))
    }
    </BentoGrid>
    </section>
  );
}

export default Grid;