import React from 'react';
import { cn } from "@/utils/cn";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
      className= {
            cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
                className
            )
        }
        >
        { children }
        </div>
  );
};

export const BentoGridItem = ({
    className,
    id,
    title,
    description,
    img,
    imgClassName,
    titleClassName,
    spareImg,
    link,
    onClick,
}: {
    className?: string;
    id: number;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    img?: string;
    imgClassName?: string;
    titleClassName?: string;
    spareImg?: string;
    link?: string;
    onClick?: () => void;
}) => {
    return (
        <div
      className= {
        cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
            className
        )
    }
    onClick = { onClick }
        >
        {/* Contenedor de la imagen principal */ }
        < div className = {`${id === 6 && "flex justify-center"} h-full`
}>
    <div className="w-full h-full absolute" >
        { img && (
            <img
              src={ img }
alt = { img }
className = { cn(imgClassName, "object-cover object-center") }
    />
          )}
</div>
{/* Imagen adicional */ }
<div
          className={
    `absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-10"
        }`
}
        >
    { spareImg && (
        <img
              src={ spareImg }
alt = { spareImg }
className = "object-cover object-center w-full h-full"
    />
          )}
</div>
{/* Contenedor del título y la descripción */ }
<div
          className={
    cn(
        titleClassName,
        "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
    )
}
        >
    {/* Descripción */ }
    < div className = "font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#e2e3e8] z-10 shadow-text" >
        { description }
        </div>
{/* Título */ }
<div className={ `font-sans text-lg lg:text-3xl max-w-96 font-bold z-10 text-blue` }>
    { title }
    </div>
    </div>
    </div>
    </div>
  );
};

export default BentoGrid;