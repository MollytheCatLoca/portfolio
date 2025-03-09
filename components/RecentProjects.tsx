"use client";

// PinContainer.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface PinContainerProps {
  children: React.ReactNode;
  title?: string;
  href?: string;
  containerClassName?: string;
  onClick?: () => void;
}

export const PinContainer: React.FC<PinContainerProps> = ({
  children,
  title,
  href,
  containerClassName,
  onClick,
}) => {
  const [isPinned, setIsPinned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rastrear si estamos en un dispositivo móvil
  const isMobile = useRef(false);
  
  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
    
    const checkDevice = () => {
      isMobile.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile.current || !containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calcular posición relativa del cursor
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    // Rotación máxima: 5 grados
    const maxRotation = 3;
    
    // Aplicar transformación
    containerRef.current.style.transform = `
      perspective(1000px)
      rotateY(${x * maxRotation}deg)
      rotateX(${-y * maxRotation}deg)
      translateZ(10px)
    `;
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0px)
      `;
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, "_blank");
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple/10 to-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      
      {children}
    </motion.div>
  );
};

// RecentProjects.tsx
import { FaLocationArrow } from "react-icons/fa6";

interface ProjectItem {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}

interface RecentProjectsProps {
  projects: ProjectItem[];
}

const RecentProjects: React.FC<RecentProjectsProps> = ({ projects }) => {
  // Para rastrear el tamaño de la pantalla
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  // Estado para manejar proyectos con clases especiales
  const [projectsWithClass, setProjectsWithClass] = useState<{[key: number]: string}>({});

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        height: window.innerHeight
      });
      
      // Actualizar clases para centrado en filas incompletas
      const newClasses: {[key: number]: string} = {};
      
      if (width >= 1024) { // Desktop view (3 columnas)
        if (projects.length % 3 === 1) {
          // Si solo queda 1 elemento en la última fila
          newClasses[projects.length - 1] = "lg:col-start-2 lg:col-span-1";
        } else if (projects.length % 3 === 2) {
          // Si quedan 2 elementos en la última fila
          newClasses[projects.length - 2] = "lg:col-start-1 lg:col-span-1";
          newClasses[projects.length - 1] = "lg:col-start-3 lg:col-span-1";
        }
      } else if (width >= 768 && width < 1024) { // Tablet view (2 columnas)
        if (projects.length % 2 === 1) {
          // Si queda 1 elemento en la última fila
          newClasses[projects.length - 1] = "md:col-span-2";
        }
      }
      
      setProjectsWithClass(newClasses);
    };

    handleResize(); // Ejecutar al cargar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projects.length]);

  return (
    <section className="py-16 px-4 md:px-8" id="projects">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Proyectos que <span className="text-purple">Potencian</span>
        </h2>
        
        {/* Versión alternativa con contenedor interno para centrado - activar según necesidad */}
        {projects.length % 3 !== 0 && (
          <div className="hidden lg:block text-center mb-6 text-sm text-purple/80">
            {projects.length} proyectos destacados
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex justify-center w-full h-full ${projectsWithClass[index] || ""}`}
            >
              <PinContainer
                title={item.title}
                href={item.link}
                containerClassName="w-full bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple/20"
              >
                <div className="flex flex-col h-full">
                  {/* Imagen del proyecto */}
                  <div className="relative w-full h-48 md:h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#13162D]/80 to-[#13162D]">
                      <img 
                        src="/bg.png" 
                        alt="background" 
                        className="w-full h-full object-cover opacity-30 mix-blend-overlay" 
                      />
                    </div>
                    <img
                      src={item.img}
                      alt={`${item.title}`}
                      className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                
                  {/* Contenido del proyecto */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 line-clamp-3 flex-grow">
                      {item.des}
                    </p>
                    
                    {/* Pie de tarjeta con iconos y enlace */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                      {/* Iconos de colaboradores */}
                      <div className="flex">
                        {item.iconLists.map((icon, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/20 bg-black overflow-hidden"
                            style={{ marginLeft: index > 0 ? '-10px' : 0, zIndex: item.iconLists.length - index }}
                          >
                            <img
                              src={icon}
                              alt={`Icon ${index}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      
                      {/* Enlace de más información */}
                      <div className="flex items-center text-purple">
                        <span className="mr-2 text-sm md:text-base">+ Info</span>
                        <FaLocationArrow size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;