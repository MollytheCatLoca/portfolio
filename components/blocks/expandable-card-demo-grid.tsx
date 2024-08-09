"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
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
    { active && typeof active === "object" && (
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
  active && typeof active === "object" ? (
    <div className= "fixed inset-0  grid place-items-center z-[100]" >
    <motion.button
              key={ `button-${active.title}-${id}` }
  layout
  initial = {{
    opacity: 0,
              }
}
animate = {{
  opacity: 1,
              }}
exit = {{
  opacity: 0,
    transition: {
    duration: 0.05,
                },
}}
className = "flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
onClick = {() => setActive(null)}
            >
  <CloseIcon />
  </motion.button>
  < motion.div
layoutId = {`card-${active.title}-${id}`}
ref = { ref }
className = "w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
  >
  <motion.div layoutId={ `image-${active.title}-${id}` }>
    <Image
                  priority
width = { 200}
height = { 200}
src = { active.src }
alt = { active.title }
className = "w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
  />
  </motion.div>

  < div >
  <div className="flex justify-between items-start p-4" >
    <div className="" >
      <motion.h3
                      layoutId={ `title-${active.title}-${id}` }
className = "font-medium text-neutral-700 dark:text-neutral-200 text-base"
  >
  { active.title }
  </motion.h3>
  < motion.p
layoutId = {`description-${active.description}-${id}`}
className = "text-neutral-600 dark:text-neutral-400 text-base"
  >
  { active.description }
  </motion.p>
  </div>

  < motion.a
layout
initial = {{ opacity: 0 }}
animate = {{ opacity: 1 }}
exit = {{ opacity: 0 }}
href = { active.ctaLink }
target = "_blank"
className = "px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
  >
  { active.ctaText }
  </motion.a>
  </div>
  < div className = "pt-4 relative px-4" >
    <motion.div
                    layout
initial = {{ opacity: 0 }}
animate = {{ opacity: 1 }}
exit = {{ opacity: 0 }}
className = "text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
  >
{
  typeof active.content === "function"
    ? active.content()
    : active.content
}
  </motion.div>
  </div>
  </div>
  </motion.div>
  </div>
        ) : null}
</AnimatePresence>
  < ul className = "max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4" >
  {
    cards.map((card, index) => (
      <motion.div
            layoutId= {`card-${card.title}-${id}`}
key = { card.title }
onClick = {() => setActive(card)}
className = "p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
  >
  <div className="flex gap-4 flex-col  w-full" >
    <motion.div layoutId={ `image-${card.title}-${id}` }>
      <Image
                  width={ 100 }
height = { 100}
src = { card.src }
alt = { card.title }
className = "h-60 w-full  rounded-lg object-cover object-top"
  />
  </motion.div>
  < div className = "flex justify-center items-center flex-col" >
    <motion.h3
                  layoutId={ `title-${card.title}-${id}` }
className = "font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
  >
  { card.title }
  </motion.h3>
  < motion.p
layoutId = {`description-${card.description}-${id}`}
className = "text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
  >
  { card.description }
  </motion.p>
  </div>
  </div>
  </motion.div>
        ))}
</ul>
  </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial= {{
    opacity: 0,
      }
}
animate = {{
  opacity: 1,
      }}
exit = {{
  opacity: 0,
    transition: {
    duration: 0.05,
        },
}}
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

const cards = [
  {
    description: "Energía Simplificada",
    title: "Provincias y Municipios",
    src: "/EN_SolarCam.jpg",
    ctaText: "Home",
    ctaLink: "/energy",
    content: () => {
      return (
        <p>
        La solución All -in -One simplifica todo el proceso energético al ofrecer una plataforma integral que cubre desde la instalación hasta el mantenimiento.Con esta solución, hemos observado una reducción del 30 % en costos operativos, permitiendo a los municipios y provincias reinvertir esos ahorros en otras áreas críticas.< br /> <br />
      Además, la plataforma proporciona un monitoreo constante y herramientas de optimización que garantizan un rendimiento energético óptimo a lo largo del tiempo, asegurando que las instalaciones funcionen con la máxima eficiencia y seguridad.< br /> <br />
  Esta solución no solo reduce costos, sino que también mejora la sostenibilidad y la resiliencia de las infraestructuras energéticas locales.Al integrar todos los aspectos del ciclo de vida de los sistemas energéticos, desde la planificación hasta la operación, la solución All -in -One ofrece una experiencia sin complicaciones para los gestores de proyectos y facilita la transición hacia un futuro más verde y eficiente.< br /> <br />

        </p>
      );
    },
  },
{
  description: "Proyectos de Energía Renovable",
    title: "Financiamiento",
      src: "/EN_FINMundo.jpg",
        ctaText: "Home",
          ctaLink: "/energy",
            content: () => {
              return (
                <p>
                Nuestro programa de financiamiento a través de leasing ofrece tasas competitivas y cuotas accesibles, haciendo posible que los proyectos de energía renovable se financien por sí mismos.Los altos costos de energía ahora se pueden cubrir con los ahorros generados, asegurando un retorno de inversión en menos de cinco años.< br /> <br />
              Además, ofrecemos la suscripción de Obligaciones Negociables(ONs) y Bonos Verdes, que proporcionan una alternativa eficaz para financiar proyectos sostenibles a largo plazo.Estos instrumentos financieros no solo permiten acceder a capital en condiciones ventajosas, sino que también atraen a inversores comprometidos con la sostenibilidad y la transición energética.< br /> <br />
  La suscripción de ONs ofrece la posibilidad de obtener financiamiento flexible y estructurado, adaptado a las necesidades específicas de cada proyecto.Por otro lado, los Bonos Verdes representan una oportunidad para alinear el financiamiento con los objetivos de desarrollo sostenible, permitiendo a los inversores participar activamente en la lucha contra el cambio climático mientras obtienen rendimientos atractivos.< br /> <br />
  Con estas herramientas, nuestro programa de financiamiento no solo facilita la implementación de soluciones energéticas innovadoras, sino que también impulsa el crecimiento económico y social, asegurando un futuro más verde y sostenible para todos.
</p>
      );
            },
  },

{
  description: "Eficiencia Energética",
    title: "Ahorro y Sostenibilidad",
      src: "/EN_EDIP1.jpg",
        ctaText: "Home",
          ctaLink: "/energy",
            content: () => {
              return (
                <p>
                La tecnología avanzada de nuestros sistemas All -in -One no solo reduce los costos energéticos, sino que también mejora la eficiencia operativa.En nuestras instalaciones más recientes, hemos visto un ahorro energético del 40 %, lo que demuestra el impacto positivo de integrar soluciones tecnológicas de última generación.< br /> <br />
  Esta mejora en la eficiencia energética no solo se traduce en menores costos operativos, sino que también reduce significativamente la huella de carbono de las instalaciones, contribuyendo a un entorno más sostenible.Al combinar tecnologías de monitoreo en tiempo real y algoritmos de optimización, nuestros sistemas aseguran que cada componente opere en su punto óptimo, maximizando el rendimiento y minimizando los desperdicios energéticos.< br /> <br />
  Con estas innovaciones, nuestros clientes no solo cumplen con los estándares regulatorios más exigentes, sino que también lideran la adopción de prácticas sostenibles en sus respectivas industrias.El enfoque integral de nuestras soluciones All -in -One permite a las organizaciones adaptarse rápidamente a los cambios en el mercado energético, garantizando un futuro más eficiente y sostenible.< br /> <br />
  Al implementar nuestras soluciones, las empresas pueden demostrar su compromiso con la sostenibilidad y la eficiencia, convirtiéndose en líderes en sus sectores y generando un impacto positivo a largo plazo tanto para el negocio como para el medio ambiente.
</p>

      );
            },
  },
{
  description: "Optimización Energética",
    title: "Soluciones para Edificios Públicos",
      src: "/EN_ALL1.jpg",
        ctaText: "Home",
          ctaLink: "/energy",
            content: () => {
              return (
                <p>
                Las soluciones All -in -One son ideales para edificios públicos que buscan optimizar su consumo energético.Gracias a nuestra tecnología avanzada, estos edificios pueden operar de manera más eficiente, reduciendo costos y mejorando su impacto ambiental, lo que resulta en un entorno más sostenible y económico.< br /> <br />
  La implementación de nuestros sistemas en edificios públicos no solo permite una reducción significativa en el consumo de energía, sino que también contribuye a mejorar la calidad del servicio ofrecido a la comunidad.Al reducir la dependencia de fuentes de energía tradicionales y aumentar la eficiencia operativa, los edificios públicos pueden reasignar recursos financieros a otras áreas esenciales, beneficiando directamente a la ciudadanía.< br /> <br />
              Además, la integración de tecnologías inteligentes permite un monitoreo constante del uso energético, lo que facilita la identificación de áreas de mejora y la implementación de ajustes en tiempo real.Esto no solo maximiza la eficiencia, sino que también prolonga la vida útil de los sistemas instalados, asegurando un retorno de la inversión aún mayor.< br /> <br />
  Con estas soluciones, los edificios públicos se convierten en referentes de sostenibilidad, demostrando el compromiso de las administraciones con la protección del medio ambiente y la gestión responsable de los recursos.Este enfoque no solo mejora la reputación institucional, sino que también promueve una cultura de eficiencia y sostenibilidad en toda la comunidad.
</p>
      );
            },
  },
];
