"use client"

import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

interface ImageItem {
    src: string;
    title: string;
    description: string;
}

interface CarouselV02Props {
    imageItems: ImageItem[];
}

const CarouselV02: React.FC<CarouselV02Props> = ({ imageItems }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (imageItems.length === 0) return
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageItems.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [imageItems])


    return (
        <div className= "w-[90%] mx-auto" >

        <Carousel className = "w-full justify-center" >
            <h1 className="heading-responsive mb-12" >
                Viabilizar los < span className = "text-purple" > Proyectos </span>
                    </h1>

                    <CarouselContent>
    {
        imageItems.map((item, index) => {
            // Log para cada item

            return (
                <CarouselItem key= { index } className = { index === currentIndex ? "block" : "hidden"
        }>
        <div className="relative overflow-hidden rounded-lg" >
        <img
                    src={ item.src }
                    width = { 448}
                    height = { 252}
                    alt = { item.title }
                    className = "object-cover w-full aspect-video"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-4 bg-black/50 text-white" >
        <p className="text-sm font-light justify-left" style = {{ width: '35%', textAlign: 'left' }}>
            { item.description }
            </p>
            < h3 className = "text-4xl font-bold" > { item.title } </h3>
                </div>
                </div>
                </CarouselItem>
    )
  })
}
</CarouselContent>
    < CarouselPrevious />
    <CarouselNext />
    </Carousel>
    </div>
  )
}

export default CarouselV02