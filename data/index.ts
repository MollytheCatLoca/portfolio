
// Nav items comunes para todas las páginas
export const navItems = [
  { name: "Home", link: "/" },
  { name: "Energy", link: "/energy" },
  { name: "IT", link: "/it" },
  { name: "Vial", link: "/vial" },

];

//Abb_logo_PNG6
//
//

// Empresas asociadas, comunes a todas las secciones
export const companies_Energy: {
  id: number;
  name: string;
  img: string;
  nameImg: string;
}[] = [
    { id: 1, name: "Huawei", img: "", nameImg: "/huawei_logo_PNG1.png" },
    { id: 2, name: "ABB", img: "", nameImg: "/Honeywell-Logo-1.svg" },
    { id: 3, name: "renewableenergy", img: "", nameImg: "/Guan.png" },
    { id: 4, name: "Honeywell", img: "", nameImg: "/Abb_logo_PNG6.png" },
    { id: 5, name: "Siri", img: "", nameImg: "/Solarcity-01.png" },
  ];

export const companies_IT: {
  id: number;
  name: string;
  img: string;
  nameImg: string;
}[] = [
    { id: 1, name: "Huawei", img: "", nameImg: "/huawei_logo_PNG1.png" },
    { id: 2, name: "greenpower", img: "", nameImg: "/Atos-01.png" },
    { id: 3, name: "renewableenergy", img: "", nameImg: "/host.svg" },
    { id: 4, name: "Honeywell", img: "", nameImg: "/dock.svg" },
    { id: 5, name: "Siri", img: "", nameImg: "/microsoft.png" },
  ];

export const companies_Vial: {
  id: number;
  name: string;
  img: string;
  nameImg: string;
}[] = [
    { id: 1, name: "Huawei", img: "", nameImg: "/huawei_logo_PNG1.png" },
    { id: 2, name: "ABB", img: "", nameImg: "/ILAT-01.png" },
    { id: 3, name: "Trina", img: "", nameImg: "/Vinci-01.png" },
    { id: 4, name: "Honeywell", img: "", nameImg: "/Honeywell-Logo-1.svg" },
    { id: 5, name: "Siri", img: "", nameImg: "/Shimizu-01.png" },
  ];

// Redes sociales comunes a todas las secciones
export const socialMedia: {
  id: number;
  img: string;
}[] = [
    { id: 1, img: "/link.svg" },
    { id: 2, img: "/twit.svg" },
    { id: 3, img: "/git.svg" },
  ];

// Datos de la página de Energy
export const gridItems_Energy: {
  id: number;
  title: string;
  description: string;
  className: string;
  imgClassName: string;
  titleClassName: string;
  img?: string;
  spareImg?: string;
  link?: string;
}[] = [
    {
      id: 1,
      title: "Liderazgo en Soluciones Energéticas Sostenibles",
      description: "Empoderamos municipios, empresas y comunidades con soluciones renovables innovadoras.",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh] bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end bg-opacity-70",
      img: "/EN_SolarSunset.jpg",
      spareImg: "",
      link: "/energy/soluciones"
    },
    {
      id: 2,
      title: "Consultoría Integral en Energías Renovables",
      description: "Desde estudios de viabilidad hasta la optimización de sistemas energéticos.",
      className: "relative lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "absolute top-0 left-0 z-10 p-4 text-white",
      link: "/energy/consulting"
    },
    {
      id: 3,
      title: "Soporte Financiero para Proyectos Energéticos",
      description: "Gestionamos líneas financieras nacionales e internacionales para viabilizar tus proyectos.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
      link: "/energy/financing"
    },
    {
      id: 4,
      title: "Parques Solares All-in-One",
      description: "Soluciones llave en mano que simplifican la instalación y operación de sistemas de energía solar.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "h-full w-full object-cover object-center",
      titleClassName: "justify-start bg-opacity-20",
      img: "/BatsPanel.jpg",
      spareImg: "",
      link: "/energy/all-in-one"
    },
    {
      id: 5,
      title: "Transformando Comunidades con Energía Limpia",
      description: "Proyectos que convierten a las localidades en ejemplos de sostenibilidad y eficiencia.",
      className: "relative md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 h-full w-full object-cover object-center",
      titleClassName: "justify-end bg-black bg-opacity-20 text-white",
      img: "/SolarTech6.jpg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Únete a Nuestra Misión Sostenible",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];

export const projects_Energy: {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}[] = [
    {
      id: 1,
      title: "Soluciones All-in-One",
      des: "Parques solares con toda la electrónica necesaria en un container preconfigurado, listos para su uso.",
      img: "/BatsPanel.jpg",
      iconLists: ["/solar-panel.png", "/solar-energy.png", "/energy.png"],
      link: "/energy/all-in-one/",
    },
    {
      id: 2,
      title: "Consultoría Financiera",
      des: "Catalizando Proyectos hacia un Futuro Energético Sustentable y Rentable.",
      img: "/edificiosSolar.jpg",
      iconLists: ["/public-administration.png", "/solar-panel.png", "/planet-earth.png"],
      link: "/energy/financing",
    },
    {
      id: 3,
      title: "Energía Verde para Edificios Públicos",
      des: "Instalación de paneles solares en colegios y hospitales para reducir costos y mejorar la sostenibilidad.",
      img: "/SolarTech5.jpg",
      iconLists: ["/solar-panel.png", "/planet-earth.png", "/energy.png"],
      link: "/energy/all-in-one/",
    },
    {
      id: 4,
      title: "Consultoría Energética Integral",
      des: "Asesoría completa desde estudios de viabilidad hasta la implementación y optimización de sistemas.",
      img: "/consultoriaener.jpg",
      iconLists: ["/strategic-consulting.png", "/energy.png", "/planet-earth.png"],
      link: "/energy/consulting/",
    },
  ];

export const testimonials_Energy: {
  quote: string;
  name: string;
  title: string;
}[] = [
    {
      quote: "En BIS Integraciones, hemos implementado parques solares All-in-One que transforman comunidades con su eficiencia. Por ejemplo, nuestro parque solar de 900 kW genera 1384 MWh anuales, proporcionando ahorros significativos y un retorno de inversión del 16% con repago en 5 años.",
      name: "Innovación en Acción",
      title: "Parque Solar All-in-One",
    },
    {
      quote: "Ofrecemos soluciones tecnológicas personalizadas y eficiente gestión de proyectos. Nuestra integración de IT, AI y energías renovables ha revolucionado infraestructuras, optimizando procesos e incrementando la eficiencia operativa de nuestros clientes.",
      name: "Soluciones Integradas",
      title: "Consultoría Integral",
    },
    {
      quote: "Nuestros parques solares, como el de 900 kW, generan hasta 1384 MWh anualmente, logrando ahorros y eficiencia sin precedentes. Asesoramos a empresas en el uso de tecnología avanzada para maximizar el rendimiento económico y operativo.",
      name: "Liderando el Futuro",
      title: "Innovación en Energías Renovables",
    },
    {
      quote: "En BIS Integraciones, desarrollamos software a medida y soluciones AI para automatizar flujos de trabajo y apoyar decisiones estratégicas basadas en datos. Nuestra finalidad es garantizar que nuestros clientes estén siempre a la vanguardia de la sostenibilidad e innovación.",
      name: "Eficiencia y Sostenibilidad",
      title: "Integración e Innovación",
    },
    {
      quote: "A través de nuestro acuerdo con BID Invest, facilitamos la financiación internacional para la implementación de parques solares de alta eficiencia. Estos parques reducen costos energéticos mientras incrementan la sostenibilidad de nuestros clientes.",
      name: "Financiación Global",
      title: "Consultoría Financiera",
    },
    {
      quote: "Nuestra consultoría financiera ha simplificado el acceso a financiamiento del BICE, permitiendo la inversión en parques solares que generan hasta 351,157 kWh mensuales. En BIS Integraciones, nuestras soluciones innovadoras posicionan a nuestros clientes como líderes en eficiencia energética.",
      name: "Resultados Tangibles",
      title: "Consultoría y Financiación",
    },
  ];

export const workExperience_Energy: {
  id: number;
  title: string;
  desc: string;
  className: string;
  thumbnail: string;
}[] = [
    {
      id: 1,
      title: "Ingeniería en Energías Renovables",
      desc: "Contamos con un equipo de ingenieros especializados en el diseño y desarrollo de proyectos de energías renovables. Nuestra experiencia incluye la implementación de tecnologías avanzadas para maximizar la eficiencia y sostenibilidad de los sistemas energéticos.",
      className: "md:col-span-2",
      thumbnail: "/ingenieria1.webp",
    },
    {
      id: 2,
      title: "Consultoría Financiera y Project Finance",
      desc: "Ofrecemos asesoramiento integral en la estructuración y gestión de financiamiento para proyectos de energía renovable. Nuestra experiencia abarca desde la obtención de financiamiento con bancos nacionales e internacionales hasta la gestión de fondos de organismos multilaterales.",
      className: "md:col-span-2",
      thumbnail: "/finance.webp",
    },
    {
      id: 3,
      title: "Gestión de Proyectos y Procurement",
      desc: "Proveemos soluciones completas de gestión de proyectos, desde la planificación y adquisición de recursos hasta la implementación y monitoreo. Nuestro equipo asegura la calidad y eficiencia en cada etapa del proyecto.",
      className: "md:col-span-2",
      thumbnail: "/procurement.webp",
    },
    {
      id: 4,
      title: "Implementación de Parques Solares All-in-One",
      desc: "Diseñamos e implementamos parques solares con soluciones 'All-in-One' que incluyen toda la electrónica necesaria en un container preconfigurado. Esta solución facilita una instalación rápida y un mantenimiento simplificado.",
      className: "md:col-span-2",
      thumbnail: "/allinone.webp",
    },
    {
      id: 5,
      title: "Consultoría Energética Integral",
      desc: "Brindamos asesoría completa en estudios de viabilidad, optimización de sistemas energéticos y sostenibilidad. Nuestro enfoque estratégico asegura que los proyectos no solo sean eficientes sino también rentables a largo plazo.",
      className: "md:col-span-2",
      thumbnail: "/consuener.webp",
    },
    {
      id: 6,
      title: "Innovación y Tecnología",
      desc: "Nos mantenemos a la vanguardia de la tecnología, integrando soluciones innovadoras en todos nuestros proyectos. Utilizamos las últimas herramientas y tecnologías para asegurar que nuestros clientes obtengan los mejores resultados posibles.",
      className: "md:col-span-2",
      thumbnail: "/innovacion.webp",
    },
  ];

// Datos de la página de IT
export const gridItems_IT: {
  id: number;
  title: string;
  description: string;
  className: string;
  imgClassName: string;
  titleClassName: string;
  img?: string;
  spareImg?: string;
}[] = [
    {
      id: 1,
      title: "Liderazgo en Soluciones Tecnológicas",
      description: "Implementamos soluciones tecnológicas avanzadas para mejorar la eficiencia operativa.",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh] bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end bg-opacity-70",
      img: "/IT_Solution1.jpg",
      spareImg: "",
    },
    {
      id: 2,
      title: "Consultoría IT",
      description: "Desde la planificación hasta la implementación de sistemas informáticos complejos.",
      className: "relative lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "absolute top-0 left-0 z-10 p-4 text-white",
    },
    {
      id: 3,
      title: "Soporte Financiero para Proyectos Tecnológicos",
      description: "Gestionamos líneas financieras para proyectos tecnológicos.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Desarrollo de Software",
      description: "Soluciones de software a medida para tus necesidades específicas.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "h-full w-full object-cover object-center",
      titleClassName: "justify-start",
      img: "/IT_Solution2.jpg",
      spareImg: "",
    },
    {
      id: 5,
      title: "Transformando Negocios con Tecnología",
      description: "Proyectos que convierten a las empresas en líderes de la industria.",
      className: "relative md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 h-full w-full object-cover object-center",
      titleClassName: "justify-end bg-black bg-opacity-50 text-white",
      img: "/IT_Solution3.jpg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Únete a Nuestra Misión Tecnológica",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];

export const projects_IT: {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}[] = [
    {
      id: 1,
      title: "Desarrollo de Software a Medida",
      des: "Creamos soluciones para tus necesidades específicas.",
      img: "/ITP_SoftFac.jpg",
      iconLists: ["/dock.svg"],
      link: "https://blog.bisintegraciones.com/soluciones-integrales-en-it/",
    },
    {
      id: 2,
      title: "Infraestructura IT",
      des: "Implementamos y gestionamos infraestructuras IT robustas y escalables.",
      img: "/ITP_Fiber.jpg",
      iconLists: ["/next.svg"],
      link: "https://blog.bisintegraciones.com/soluciones-integrales-en-it/",
    },
    {
      id: 3,
      title: "Consultoría IT",
      des: "Asesoramos en la optimización y modernización de tus sistemas IT.",
      img: "/ITP_Program.jpg",
      iconLists: ["/git.svg"],
      link: "https://blog.bisintegraciones.com/soluciones-integrales-en-it/",
    },
    {
      id: 4,
      title: "Seguridad Cibernética",
      des: "Protegemos tu infraestructura digital contra amenazas cibernéticas.",
      img: "/ITP_CiberSeg.jpg",
      iconLists: ["/host.svg"],
      link: "https://blog.bisintegraciones.com/soluciones-integrales-en-it/",
    },
  ];

export const testimonials_IT: {
  quote: string;
  name: string;
  title: string;
}[] = [
    {
      quote: "En BIS Integraciones, hemos implementado sistemas de IT que optimizan la gestión de datos y mejoran la eficiencia operativa. Por ejemplo, nuestro sistema de gestión de datos ha reducido los costos operativos en un 20%.",
      name: "Innovación en Acción",
      title: "Sistemas de Gestión de Datos",
    },
    {
      quote: "Ofrecemos soluciones tecnológicas personalizadas y eficiente gestión de proyectos IT. Nuestra integración de AI y big data ha revolucionado infraestructuras, optimizando procesos e incrementando la eficiencia operativa de nuestros clientes.",
      name: "Soluciones Integradas",
      title: "Consultoría IT",
    },
    {
      quote: "Nuestros sistemas de IT generan mejoras significativas en la eficiencia operativa, logrando ahorros y optimización sin precedentes. Asesoramos a empresas en el uso de tecnología avanzada para maximizar el rendimiento económico y operativo.",
      name: "Liderando el Futuro",
      title: "Innovación en IT",
    },
    {
      quote: "En BIS Integraciones, desarrollamos software a medida y soluciones AI para automatizar flujos de trabajo y apoyar decisiones estratégicas basadas en datos. Nuestra finalidad es garantizar que nuestros clientes estén siempre a la vanguardia de la sostenibilidad e innovación.",
      name: "Eficiencia y Sostenibilidad",
      title: "Integración e Innovación",
    },
    {
      quote: "A través de nuestro acuerdo con BID Invest, facilitamos la financiación internacional para la implementación de sistemas IT de alta eficiencia. Estos sistemas reducen costos operativos mientras incrementan la sostenibilidad de nuestros clientes.",
      name: "Financiación Global",
      title: "Consultoría Financiera",
    },
    {
      quote: "Nuestra consultoría financiera ha simplificado el acceso a financiamiento del BICE, permitiendo la inversión en sistemas IT que generan mejoras significativas en la eficiencia operativa. En BIS Integraciones, nuestras soluciones innovadoras posicionan a nuestros clientes como líderes en eficiencia tecnológica.",
      name: "Resultados Tangibles",
      title: "Consultoría y Financiación",
    },
  ];

export const workExperience_IT: {
  id: number;
  title: string;
  desc: string;
  className: string;
  thumbnail: string;
}[] = [
    {
      id: 1,
      title: "Ingeniería en Sistemas IT",
      desc: "Contamos con un equipo de ingenieros especializados en el diseño y desarrollo de proyectos IT. Nuestra experiencia incluye la implementación de tecnologías avanzadas para maximizar la eficiencia y sostenibilidad de los sistemas tecnológicos.",
      className: "md:col-span-2",
      thumbnail: "/ITP_Ingenieria.webp",
    },
    {
      id: 2,
      title: "Consultoría Financiera y Project Finance IT",
      desc: "Ofrecemos asesoramiento integral en la estructuración y gestión de financiamiento para proyectos IT. Nuestra experiencia abarca desde la obtención de financiamiento con bancos nacionales e internacionales hasta la gestión de fondos de organismos multilaterales.",
      className: "md:col-span-2",
      thumbnail: "/ITP_Consultoria.webp",
    },
    {
      id: 3,
      title: "Gestión de Proyectos y Procurement IT",
      desc: "Proveemos soluciones completas de gestión de proyectos IT, desde la planificación y adquisición de recursos hasta la implementación y monitoreo. Nuestro equipo asegura la calidad y eficiencia en cada etapa del proyecto.",
      className: "md:col-span-2",
      thumbnail: "/ITP_Gestion.webp",
    },
    {
      id: 4,
      title: "Implementación de Sistemas IT",
      desc: "Diseñamos e implementamos sistemas IT que incluyen toda la infraestructura necesaria. Esta solución facilita una instalación rápida y un mantenimiento simplificado.",
      className: "md:col-span-2",
      thumbnail: "/ITP_Implementacion.webp",
    },
    {
      id: 5,
      title: "Consultoría IT Integral",
      desc: "Brindamos asesoría completa en estudios de viabilidad, optimización de sistemas IT y sostenibilidad. Nuestro enfoque estratégico asegura que los proyectos no solo sean eficientes sino también rentables a largo plazo.",
      className: "md:col-span-2",
      thumbnail: "/ITP_Integral.webp",
    },
    {
      id: 6,
      title: "Innovación y Tecnología IT",
      desc: "Nos mantenemos a la vanguardia de la tecnología, integrando soluciones innovadoras en todos nuestros proyectos. Utilizamos las últimas herramientas y tecnologías para asegurar que nuestros clientes obtengan los mejores resultados posibles.",
      className: "md:col-span-2",
      thumbnail: "/ITP_Inovacion.webp",
    },
  ];

// Datos de la página de Vial
export const gridItems_Vial: {
  id: number;
  title: string;
  description: string;
  className: string;
  imgClassName: string;
  titleClassName: string;
  img?: string;
  spareImg?: string;
}[] = [
    {
      id: 1,
      title: "Liderazgo en Soluciones Viales",
      description: "Proveemos soluciones tecnológicas avanzadas para la gestión vial.",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh] bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end bg-opacity-70",
      img: "/Vial_Solution5.jpg",
      spareImg: "",
    },
    {
      id: 2,
      title: "Consultoría Vial",
      description: "Asesoramos en la implementación de tecnologías viales eficientes.",
      className: "relative lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "absolute top-0 left-0 z-10 p-4 text-white",
    },
    {
      id: 3,
      title: "Soporte Financiero para Proyectos Viales",
      description: "Gestionamos financiamiento para proyectos viales innovadores.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    {
      id: 4,
      title: "Implementación de Sistemas Viales",
      description: "Soluciones llave en mano para la gestión vial eficiente.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "h-full w-full object-cover object-center",
      titleClassName: "justify-start",
      img: "/Vial_Solution2.jpg",
      spareImg: "",
    },
    {
      id: 5,
      title: "Transformando Comunidades con Tecnología Vial",
      description: "Proyectos que mejoran la seguridad y eficiencia vial.",
      className: "relative md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 h-full w-full object-cover object-center",
      titleClassName: "justify-end bg-black bg-opacity-50 text-white",
      img: "/Vial_Solution3.jpg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Únete a Nuestra Misión Vial",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "",
      spareImg: "",
    },
  ];

export const projects_Vial: {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}[] = [
    {
      id: 1,
      title: "Seguridad Ciudadana",
      des: "Sistemas de botones de pánico",
      img: "/VIAL_PanicB.webp",
      iconLists: ["/cloud-data.png"],
      link: "https://blog.bisintegraciones.com/soluciones-viales-inteligentes-para-una-movilidad-segura-y-eficiente/",
    },
    {
      id: 2,
      title: "Totems",
      des: "Seguridad para tu ciudad",
      img: "/VIAL_TOTEM1.webp",
      iconLists: ["/totem.png"],
      link: "https://blog.bisintegraciones.com/descubre-el-nuevo-totem-de-seguridad-para-tu-ciudad/",
    },
    {
      id: 3,
      title: "Parking Inteligente",
      des: "Gestión de Estacionamiento",
      img: "/VIAL_Transit.jpg",
      iconLists: ["/traffic.png"],
      link: "https://blog.bisintegraciones.com/parkease-la-solucion-inteligente-e-integral-para-la-gestion-de-estacionamiento/",
    },
    {
      id: 4,
      title: "Tecnologia en Vigilancia",
      des: "Camaras & Contac Centers",
      img: "/VIAL_911.jpg",
      iconLists: ["/diaphragm.png"],
      link: "https://blog.bisintegraciones.com/soluciones-integrales-en-it-2/",
    },
  ];

export const testimonials_Vial: {
  quote: string;
  name: string;
  title: string;
}[] = [
    {
      quote: "En BIS Integraciones, hemos implementado soluciones viales tecnológicas que mejoran la seguridad y eficiencia del tránsito. Por ejemplo, nuestros sistemas de control de tráfico han reducido los accidentes en un 30%.",
      name: "Innovación en Acción",
      title: "Sistemas de Control de Tráfico",
    },
    {
      quote: "Ofrecemos soluciones tecnológicas personalizadas y eficiente gestión de proyectos viales. Nuestra integración de tecnología y gestión de tráfico ha revolucionado infraestructuras, optimizando procesos e incrementando la eficiencia operativa de nuestros clientes.",
      name: "Soluciones Integradas",
      title: "Consultoría Vial",
    },
    {
      quote: "Nuestros sistemas viales generan mejoras significativas en la seguridad y eficiencia del tránsito, logrando ahorros y optimización sin precedentes. Asesoramos a municipios en el uso de tecnología avanzada para maximizar la seguridad vial.",
      name: "Liderando el Futuro",
      title: "Innovación en Vialidad",
    },
    {
      quote: "En BIS Integraciones, desarrollamos soluciones tecnológicas a medida para optimizar la gestión vial y mejorar la seguridad. Nuestra finalidad es garantizar que nuestros clientes estén siempre a la vanguardia de la innovación vial.",
      name: "Eficiencia y Sostenibilidad",
      title: "Integración e Innovación",
    },
    {
      quote: "A través de nuestro acuerdo con BID Invest, facilitamos la financiación internacional para la implementación de sistemas viales de alta eficiencia. Estos sistemas reducen costos operativos mientras incrementan la seguridad vial.",
      name: "Financiación Global",
      title: "Consultoría Financiera",
    },
    {
      quote: "Nuestra consultoría financiera ha simplificado el acceso a financiamiento del BICE, permitiendo la inversión en sistemas viales que generan mejoras significativas en la seguridad y eficiencia. En BIS Integraciones, nuestras soluciones innovadoras posicionan a nuestros clientes como líderes en eficiencia vial.",
      name: "Resultados Tangibles",
      title: "Consultoría y Financiación",
    },
  ];

export const workExperience_Vial: {
  id: number;
  title: string;
  desc: string;
  className: string;
  thumbnail: string;
}[] = [
    {
      id: 1,
      title: "Ingeniería en Infraestructura Vial",
      desc: "Contamos con un equipo de ingenieros especializados en el diseño y desarrollo de proyectos de infraestructura vial. Nuestra experiencia incluye la implementación de tecnologías avanzadas para maximizar la eficiencia y seguridad de los sistemas viales.",
      className: "md:col-span-2",
      thumbnail: "/VIALP_Ingenieria.webp",
    },
    {
      id: 2,
      title: "Consultoría Financiera y Project Finance Vial",
      desc: "Ofrecemos asesoramiento integral en la estructuración y gestión de financiamiento para proyectos viales. Nuestra experiencia abarca desde la obtención de financiamiento con bancos nacionales e internacionales hasta la gestión de fondos de organismos multilaterales.",
      className: "md:col-span-2",
      thumbnail: "/VIALP_Asesoramiento.webp",
    },
    {
      id: 3,
      title: "Gestión de Proyectos y Procurement Vial",
      desc: "Proveemos soluciones completas de gestión de proyectos viales, desde la planificación y adquisición de recursos hasta la implementación y monitoreo. Nuestro equipo asegura la calidad y eficiencia en cada etapa del proyecto.",
      className: "md:col-span-2",
      thumbnail: "/VIALP_Gestion.webp",
    },
    {
      id: 4,
      title: "Implementación de Soluciones Viales",
      desc: "Diseñamos e implementamos soluciones viales que incluyen toda la infraestructura necesaria. Esta solución facilita una instalación rápida y un mantenimiento simplificado.",
      className: "md:col-span-2",
      thumbnail: "/VIALP_Instalacion.webp",
    },
    {
      id: 5,
      title: "Consultoría Vial Integral",
      desc: "Brindamos asesoría completa en estudios de viabilidad, optimización de sistemas viales y sostenibilidad. Nuestro enfoque estratégico asegura que los proyectos no solo sean eficientes sino también seguros a largo plazo.",
      className: "md:col-span-2",
      thumbnail: "/VIALP_Consulting.webp",
    },
    {
      id: 6,
      title: "Innovación y Tecnología Vial",
      desc: "Nos mantenemos a la vanguardia de la tecnología, integrando soluciones innovadoras en todos nuestros proyectos viales. Utilizamos las últimas herramientas y tecnologías para asegurar que nuestros clientes obtengan los mejores resultados posibles.",
      className: "md:col-span-2",
      thumbnail: "/VIALP_Inovacion.webp",
    },
  ];

/// DATOS HOME

import React from 'react';

export const gridItems_home: {
  id: number;
  title: string;
  description: string;
  className: string;
  imgClassName: string;
  titleClassName: string;
  img?: string;
  spareImg?: string;
}[] = [
    {
      id: 1,
      title: "Liderazgo en Soluciones Energéticas Sostenibles",
      description: "Empoderamos municipios, empresas y comunidades con soluciones renovables innovadoras.",
      className: "my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4",
      imgClassName: "w-full h-full object-cover",
      titleClassName: "justify-end bg-opacity-70 p-4 text-white",
      img: "/SolarTech1.jpg",
      spareImg: "",
    },
    {
      id: 2,
      title: "Liderazgo en Soluciones Tecnológicas",
      description: "Implementamos soluciones tecnológicas avanzadas para mejorar la eficiencia operativa.",
      className: "my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4",
      imgClassName: "w-full h-full object-cover",
      titleClassName: "justify-end bg-opacity-70 p-4 text-white",
      img: "/IT_Solution1.jpg",
      spareImg: "",
    },
    {
      id: 3,
      title: "Liderazgo en Soluciones Viales",
      description: "Proveemos soluciones tecnológicas avanzadas para la gestión vial.",
      className: "my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4",
      imgClassName: "w-full h-full object-cover",
      titleClassName: "justify-end bg-opacity-70 p-4 text-white",
      img: "/Vial_Solution5.jpg",
      spareImg: "",
    },
  ];

export const RECENT_PROJECT_HOME: {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}[] = [
    {
      id: 1,
      title: "Energía",
      des: "Proyectos Energéticos",
      img: "/SolarTech1.jpg", // Usando la imagen del grid de Energía
      iconLists: ["/huawei_logo_PNG1.png"], // Iconos representativos
      link: "/energy",
    },
    {
      id: 2,
      title: "IT",
      des: "Tech Partners",
      img: "/IT_Solution2.jpg", // Usando la imagen del grid de IT
      iconLists: ["/dock.svg"], // Iconos representativos
      link: "/it",
    },
    {
      id: 3,
      title: "Vial",
      des: "Gestión Vial",
      img: "/Vial_Solution5.jpg", // Usando la imagen del grid de Vial
      iconLists: ["/diaphragm.png"], // Iconos representativos
      link: "/vial",
    },
  ];

export const gridItems_AllinOne: {
  id: number;
  title: string;
  description: string;
  className: string;
  imgClassName: string;
  titleClassName: string;
  img?: string;
  spareImg?: string;
  link?: string;  // Nueva propiedad para el enlace
}[] = [



    {
      id: 1,
      title: "Energía Simplificada",
      description: "Soluciones energéticas integrales para un futuro sostenible, todo en un solo lugar.",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh] bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end items-left bg-black bg-opacity-20",
      img: "/BatsPanel.jpg",
      spareImg: "",
      link: "1"
    },
    {
      id: 2,
      title: "Leasing",
      description: "Opciones de leasing flexibles para hacer realidad tu proyecto energético.",
      className: "relative lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "w-full h-full",
      titleClassName: "bg-black bg-opacity-50 text-white p-4 rounded-lg justify-end items-left",
      img: "/SolarTech2.jpg",
      spareImg: "",
      link: "2"
    },
    {
      id: 3,
      title: "Ideal para Gobiernos",
      description: "Soluciones eficientes y sostenibles para municipios y provincias.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "w-full h-full object-cover",
      titleClassName: "bg-black bg-opacity-30 text-white p-4 rounded-lg justify-end",
      img: "/SolarTech6.jpg",
      spareImg: "",
      link: "3"
    },
    {
      id: 4,
      title: "Eficiencia Energética",
      description: "Reducción de costos energéticos con tecnología avanzada.",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "w-full h-full object-cover",
      titleClassName: "bg-black bg-opacity-20 text-white p-4 rounded-lg",
      img: "/EN_BATFAC2.jpg",
      spareImg: "",
      link: "4"
    },
    {
      id: 5,
      title: "Soluciones para Edificios Públicos",
      description: "Optimización de energía en instalaciones gubernamentales.",
      className: " md:col-span-3 md:row-span-2",
      imgClassName: "w-full h-full object-cover",
      titleClassName: "bg-black bg-opacity-20 text-white p-4 rounded-lg",
      img: "/EN_BATFAC.jpg",
      spareImg: "",
      link: "5"
    },
    {
      id: 6,
      title: "Rápido Retorno de Inversión",
      description: "Altos costos de energía cubiertos con cuotas accesibles y bajas tasas, asegurando un retorno de inversión eficiente.",
      className: "llg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh] bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100",
      imgClassName: "w-full h-full object-cover",
      titleClassName: "bg-black bg-opacity-30 text-white p-4 rounded-lg justify-end items-left",
      img: "/EN_BAT_PAN.jpg",
      spareImg: "",
      link: "6"
    },
  ];

export const testimonials_AllInOne: {
  quote: string;
  name: string;
  title: string;
}[] = [
    {
      quote: "La solución All-in-One simplifica todo el proceso energético al ofrecer una plataforma integral que cubre desde la instalación hasta el mantenimiento. Con esta solución, hemos observado una reducción del 30% en costos operativos, permitiendo a los municipios y provincias reinvertir esos ahorros en otras áreas críticas.",
      name: "Energía Simplificada",
      title: "Municipios y Provincias",
    },
    {
      quote: "Nuestro programa de financiamiento a través de leasing ofrece tasas competitivas y cuotas accesibles, haciendo posible que los proyectos de energía renovable se financien por sí mismos. Los altos costos de energía ahora se pueden cubrir con los ahorros generados, asegurando un retorno de inversión en menos de cinco años.",
      name: "Financiamiento Asequible",
      title: "Proyectos de Energía Renovable",
    },
    {
      quote: "Para gobiernos locales y provinciales, la solución All-in-One proporciona una manera eficiente de implementar proyectos sostenibles. Hemos trabajado con múltiples municipios, ayudándolos a reducir sus huellas de carbono y a mejorar la eficiencia energética de sus edificios públicos, todo mientras mantienen un presupuesto equilibrado.",
      name: "Ideal para Gobiernos",
      title: "Implementación Sostenible",
    },
    {
      quote: "La tecnología avanzada de nuestros sistemas All-in-One no solo reduce los costos energéticos, sino que también mejora la eficiencia operativa. En nuestras instalaciones más recientes, hemos visto un ahorro energético del 40%, lo que demuestra el impacto positivo de integrar soluciones tecnológicas de última generación.",
      name: "Eficiencia Energética",
      title: "Ahorro y Sostenibilidad",
    },
    {
      quote: "Las soluciones All-in-One son ideales para edificios públicos que buscan optimizar su consumo energético. Gracias a nuestra tecnología avanzada, estos edificios pueden operar de manera más eficiente, reduciendo costos y mejorando su impacto ambiental, lo que resulta en un entorno más sostenible y económico.",
      name: "Soluciones para Edificios Públicos",
      title: "Optimización Energética",
    },
    {
      quote: "La solución All-in-One no solo ofrece una tecnología de vanguardia, sino que también asegura un rápido retorno de inversión. Con tasas de financiamiento bajas y cuotas accesibles, los altos costos de energía se ven mitigados, permitiendo que el proyecto se pague solo en pocos años, garantizando una solución económica y eficiente.",
      name: "Retorno de Inversión Rápido",
      title: "Tecnología y Economía",
    },
  ];

export const testimonials_Consulting: {
  quote: string;
  name: string;
  title: string;
}[] = [
    {
      quote: "Nuestra consultoría integral de energías renovables ha transformado proyectos desde su concepción hasta la implementación. Hemos visto cómo un análisis detallado y una estrategia personalizada pueden llevar a una reducción del 25% en costos operativos y un aumento significativo en la eficiencia energética.",
      name: "Consultoría Transformadora",
      title: "Análisis y Estrategia",
    },
    {
      quote: "A través de nuestro enfoque en Project Finance, ayudamos a asegurar fondos con condiciones óptimas para proyectos de energías renovables. Esto no solo viabiliza las iniciativas, sino que también garantiza un retorno de inversión en menos de cinco años, permitiendo reinversiones continuas en tecnología sostenible.",
      name: "Viabilidad Financiera",
      title: "Project Finance",
    },
    {
      quote: "El dimensionamiento preciso es crucial para el éxito de los proyectos de energía renovable. Nuestra consultoría se especializa en evaluar y dimensionar adecuadamente los sistemas, asegurando que las instalaciones operen con máxima eficiencia y que los recursos sean utilizados de manera óptima.",
      name: "Dimensionamiento Óptimo",
      title: "Eficiencia y Precisión",
    },
    {
      quote: "La elección de tecnología adecuada es fundamental para el rendimiento de los proyectos de energía renovable. Nuestra experiencia nos permite recomendar las mejores soluciones tecnológicas, garantizando no solo la sostenibilidad, sino también la adaptabilidad a futuras innovaciones y cambios en el sector.",
      name: "Tecnología Avanzada",
      title: "Elección Estratégica",
    },
    {
      quote: "Nuestra consultoría ofrece una perspectiva integral que incluye desde el diseño estratégico hasta la implementación técnica. Hemos asistido a varios municipios y provincias en la reducción de su huella de carbono y en la optimización del consumo energético, logrando un impacto ambiental positivo y sostenible.",
      name: "Consultoría Integral",
      title: "Impacto y Sostenibilidad",
    },
    {
      quote: "El análisis de viabilidad es un componente esencial de nuestra consultoría. Al evaluar exhaustivamente cada aspecto del proyecto, desde los costos hasta el impacto ambiental, aseguramos que cada iniciativa no solo sea viable, sino también altamente rentable y sostenible a largo plazo.",
      name: "Análisis de Viabilidad",
      title: "Rentabilidad y Sostenibilidad",
    },
  ];



export type ImageItem = {
  src: string;
  title: string;
  description: string;
};

export const imageItems_Consulting: ImageItem[] = [
  {
    src: '/ENG_ConReno.jpg',
    title: 'Análisis de Proyecto',
    description: 'Evaluación exhaustiva de viabilidad y potencial de proyectos energéticos para maximizar la eficiencia y minimizar los riesgos.'
  },
  {
    src: '/EN_BAT_PAN.jpg',
    title: 'Project Finance',
    description: 'Estructuración financiera de proyectos para asegurar fondos con condiciones óptimas y garantizar retornos de inversión sostenibles.'
  },
  {
    src: '/EN_BATFAC.jpg',
    title: 'Dimensionamiento de Sistemas',
    description: 'Cálculo preciso del tamaño de los sistemas energéticos para asegurar el rendimiento óptimo y la utilización eficiente de recursos.'
  },
  {
    src: '/EN_BATFAC2.jpg',
    title: 'Elección de Tecnología',
    description: 'Selección de las mejores soluciones tecnológicas para proyectos de energías renovables, asegurando sostenibilidad y adaptación futura.'
  },
  {
    src: '/EN_SolarSunset.jpg',
    title: 'Implementación y Mantenimiento',
    description: 'Gestión integral de la instalación y mantenimiento de sistemas energéticos para garantizar un funcionamiento eficiente y duradero.'
  }
];

export interface CardData {
  id: number;
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
}

export const CardsAllin1: CardData[] = [
  {
    id: 1,
    description: "Energía Simplificada",
    title: "Parques All-in-One: Solución Integral",
    src: "/BatsPanel.jpg",
    ctaText: "Más Información",
    ctaLink: "/energy",
    content: `Los Parques All-in-One representan una revolución en la gestión energética, ofreciendo una solución integral que abarca desde la planificación hasta el mantenimiento continuo. Esta innovadora plataforma unifica todas las etapas del ciclo de vida energético, eliminando la necesidad de coordinar múltiples proveedores y sistemas.

La simplicidad es la clave de nuestro enfoque. Al centralizar todas las operaciones en un único sistema, logramos una reducción significativa en los costos operativos, que en muchos casos alcanza hasta un 30%. Esto permite a municipios y provincias liberar recursos para invertir en otras áreas críticas de desarrollo.

Nuestra plataforma integrada ofrece:

1. Planificación y diseño personalizado

2. Instalación eficiente y profesional

3. Monitoreo en tiempo real del rendimiento energético

4. Mantenimiento preventivo y correctivo

5. Optimización continua del sistema

La solución All-in-One no solo simplifica la gestión energética, sino que también mejora la eficiencia operativa y financiera. Al reducir la burocracia y las barreras técnicas, facilitamos la transición hacia un futuro energético más sostenible y eficiente.

Además, nuestra plataforma proporciona herramientas avanzadas de análisis y optimización que garantizan un rendimiento energético óptimo a lo largo del tiempo. Esto asegura que las instalaciones funcionen con la máxima eficiencia y seguridad, reduciendo el desperdicio energético y maximizando el retorno de la inversión.

Al adoptar nuestra solución All-in-One, las entidades públicas y privadas no solo reducen costos, sino que también mejoran significativamente la sostenibilidad y resiliencia de sus infraestructuras energéticas. Integramos todos los aspectos del ciclo de vida de los sistemas energéticos, desde la planificación inicial hasta la operación diaria, ofreciendo una experiencia sin complicaciones para los gestores de proyectos.

Esta aproximación holística facilita la transición hacia un futuro más verde y eficiente, permitiendo a las organizaciones adaptarse rápidamente a los cambios en el mercado energético y cumplir con los cada vez más exigentes estándares de sostenibilidad.`,
  },
  {
    id: 2,
    description: "Opciones Financieras Flexibles",
    title: "Leasing: Accesibilidad y Eficiencia",
    src: "/SolarTech2.jpg",
    ctaText: "Explorar Opciones",
    ctaLink: "/leasing",
    content: `Nuestro modelo de leasing para los Parques All-in-One revoluciona la forma en que las organizaciones acceden a soluciones energéticas avanzadas. Este enfoque innovador elimina la barrera de las grandes inversiones iniciales, permitiendo a nuestros clientes implementar tecnología de punta sin comprometer su capital de trabajo.

El leasing de Parques All-in-One ofrece múltiples ventajas:

1. Flexibilidad Financiera: Los pagos periódicos permiten una planificación financiera más predecible y manejable.

2. Acceso a Tecnología Avanzada: Permite la implementación de soluciones energéticas de última generación sin la necesidad de una gran inversión inicial.

3. Mantenimiento Incluido: Nuestro leasing puede incluir servicios de mantenimiento y actualizaciones tecnológicas, asegurando que la solución permanezca siempre actualizada y operativa.

4. Optimización del Flujo de Caja: Los ahorros generados por la eficiencia energética pueden cubrir las cuotas del leasing, resultando en un impacto neutro o positivo en el flujo de caja.

5. Beneficios Fiscales: En muchos casos, los pagos de leasing pueden ser deducibles de impuestos, ofreciendo ventajas fiscales adicionales.

6. Escalabilidad: A medida que las necesidades energéticas crecen, el modelo de leasing permite escalar la solución de manera eficiente y económica.

7. Reducción de Riesgos: Al no ser propietario del equipo, se eliminan los riesgos asociados con la obsolescencia tecnológica.

Este modelo es particularmente ventajoso para instituciones gubernamentales y entidades públicas, ya que permite una gestión presupuestaria más eficiente y evita la carga de costos elevados de una sola vez. Además, al incluir mantenimiento y actualizaciones, garantizamos que la solución evolucione con las necesidades cambiantes y los avances tecnológicos.

Nuestro enfoque de leasing no solo hace que la tecnología energética avanzada sea más accesible, sino que también alinea los costos con los beneficios a lo largo del tiempo. Esto permite a las organizaciones implementar soluciones sostenibles y eficientes sin comprometer sus recursos financieros a corto plazo.

Con cuotas accesibles y tasas competitivas, aseguramos que el retorno de inversión sea rápido y tangible. Los altos costos de energía tradicionales se ven rápidamente compensados por los ahorros generados, creando un ciclo positivo de eficiencia y ahorro.`,
  },
  {
    id: 3,
    description: "Soluciones para el Sector Público",
    title: "Eficiencia Gubernamental Sostenible",
    src: "/SolarTech6.jpg",
    ctaText: "Descubrir Beneficios",
    ctaLink: "/government",
    content: `Los Parques All-in-One están diseñados específicamente para satisfacer las necesidades únicas del sector gubernamental, ofreciendo soluciones eficientes y sostenibles para municipios y provincias. Nuestra plataforma integrada permite a los gobiernos gestionar su infraestructura energética de manera eficaz, promoviendo la sostenibilidad y la eficiencia operativa.

Beneficios clave para el sector público:

1. Gestión Unificada: Integración de múltiples funciones energéticas en un solo sistema, simplificando la administración y reduciendo la complejidad operativa.

2. Ahorro de Costos: Reducción significativa en los gastos energéticos, liberando recursos para otras prioridades gubernamentales como salud, educación e infraestructura.

3. Sostenibilidad Ambiental: Facilitación de la adopción de políticas energéticas verdes, ayudando a cumplir con normativas ambientales y reducir la huella de carbono.

4. Monitoreo en Tiempo Real: Herramientas avanzadas para supervisar y optimizar el uso de energía, permitiendo una toma de decisiones informada y ágil.

5. Transparencia: Mejora en la rendición de cuentas y la transparencia en el uso de recursos energéticos públicos.

6. Resiliencia Energética: Aumento de la independencia energética y la capacidad de respuesta ante emergencias o interrupciones en el suministro.

7. Adaptabilidad: Flexibilidad para ajustar el sistema según las cambiantes necesidades energéticas y políticas gubernamentales.

8. Ejemplo de Liderazgo: Demostración de compromiso con la innovación y la sostenibilidad, estableciendo un modelo a seguir para el sector privado y otras entidades públicas.

Nuestra solución permite a los gobiernos implementar estrategias energéticas avanzadas sin la necesidad de expertise técnico interno extensivo. El sistema All-in-One se encarga de la complejidad técnica, permitiendo a los funcionarios concentrarse en la toma de decisiones estratégicas y la mejora de los servicios públicos.

Además, la plataforma facilita la integración de fuentes de energía renovable, como solar y eólica, ayudando a los gobiernos a alcanzar sus objetivos de sostenibilidad y reducción de emisiones. Esto no solo mejora la calidad del aire y el medio ambiente local, sino que también posiciona a la región como líder en iniciativas de energía limpia.

La implementación de Parques All-in-One en el sector público no solo optimiza el consumo de energía, sino que también crea oportunidades para el desarrollo económico local, fomentando la creación de empleos en el sector de energías renovables y tecnologías limpias.

En resumen, nuestra solución All-in-One proporciona a los gobiernos las herramientas necesarias para liderar la transición hacia un futuro energético más limpio, eficiente y sostenible, beneficiando tanto a la administración como a los ciudadanos.`,
  },
  {
    id: 4,
    description: "Tecnología Avanzada para Ahorro",
    title: "Eficiencia Energética Optimizada",
    src: "/EN_BATFAC2.jpg",
    ctaText: "Ver Tecnología",
    ctaLink: "/efficiency",
    content: `La eficiencia energética es el pilar fundamental de nuestros Parques All-in-One, ofreciendo una reducción sustancial en los costos energéticos a través de la implementación de tecnología de vanguardia. Nuestra solución integral no solo disminuye el consumo de energía, sino que también optimiza cada aspecto del ciclo energético para maximizar el rendimiento y minimizar el desperdicio.

Características clave de nuestra tecnología de eficiencia energética:

1. Sistemas de Gestión Energética Inteligente: Utilizamos algoritmos avanzados de aprendizaje automático para analizar patrones de consumo y ajustar automáticamente los sistemas para un rendimiento óptimo.

2. Almacenamiento en Baterías de Alta Capacidad: Implementamos sistemas de almacenamiento de energía de última generación que permiten aprovechar al máximo la energía generada, reduciendo la dependencia de la red eléctrica durante las horas pico.

3. Integración de Energías Renovables: Optimizamos el uso de fuentes de energía renovable como solar y eólica, maximizando su contribución al mix energético y reduciendo la huella de carbono.

4. Monitoreo en Tiempo Real: Nuestra plataforma proporciona visualizaciones en tiempo real del consumo energético, permitiendo identificar rápidamente áreas de mejora y tomar decisiones informadas.

5. Mantenimiento Predictivo: Utilizamos sensores y análisis de datos para predecir y prevenir fallos en los equipos, reduciendo el tiempo de inactividad y los costos de mantenimiento.

6. Automatización de Edificios: Implementamos sistemas de control automático para iluminación, calefacción, ventilación y aire acondicionado (HVAC) que se adaptan a las condiciones ambientales y de ocupación en tiempo real.

7. Recuperación de Calor: Aprovechamos el calor residual de procesos industriales o sistemas de refrigeración para otras aplicaciones, aumentando la eficiencia global del sistema.

8. Microrredes Inteligentes: Creamos sistemas energéticos locales que pueden operar de forma independiente o en conjunto con la red principal, aumentando la resiliencia y la eficiencia.

Beneficios tangibles de nuestra solución de eficiencia energética:

- Reducción del Consumo: Hemos observado reducciones de hasta un 40% en el consumo energético en instalaciones que han implementado nuestro sistema All-in-One.

- Ahorro en Costos: La disminución en el consumo se traduce directamente en ahorros significativos en las facturas de energía.

- Mejora en la Sostenibilidad: La reducción del consumo energético conlleva una disminución proporcional en las emisiones de gases de efecto invernadero.

- Optimización Continua: Nuestros sistemas se adaptan y mejoran constantemente, asegurando que la eficiencia energética aumente con el tiempo.

- Cumplimiento Normativo: Ayudamos a las organizaciones a cumplir y superar los estándares regulatorios de eficiencia energética.

- Mejora en la Productividad: Un ambiente de trabajo optimizado energéticamente puede llevar a mejoras en la comodidad y productividad de los empleados.

Nuestra tecnología de eficiencia energética no solo reduce los costos operativos, sino que también posiciona a las organizaciones como líderes en sostenibilidad y responsabilidad ambiental. Al implementar estas soluciones avanzadas, nuestros clientes no solo ahorran dinero, sino que también contribuyen significativamente a un futuro más limpio y sostenible.`,
  },
  {
    id: 5,
    description: "Optimización Energética para el Sector Público",
    title: "Soluciones Integrales para Edificios Públicos",
    src: "/EN_BATFAC.jpg",
    ctaText: "Optimizar Ahora",
    ctaLink: "/public-buildings",
    content: `Los Parques All-in-One ofrecen una solución revolucionaria para la optimización energética en edificios públicos, abordando los desafíos únicos que enfrentan las instalaciones gubernamentales en términos de consumo y gestión de energía. Nuestro enfoque integral está diseñado para transformar la eficiencia operativa de una amplia gama de edificios públicos, desde oficinas administrativas y escuelas hasta hospitales y centros comunitarios.

Características clave de nuestra solución para edificios públicos:

1. Gestión Energética Centralizada: Implementamos un sistema unificado que permite el control y monitoreo de múltiples edificios desde una única plataforma. Esto facilita la gestión eficiente de complejos gubernamentales enteros, proporcionando una visión holística del consumo energético y permitiendo ajustes en tiempo real.

2. Adaptabilidad Personalizada: Reconocemos que cada tipo de edificio público tiene necesidades energéticas únicas. Nuestras soluciones se personalizan para adaptarse a las especificidades de cada instalación, ya sea una biblioteca, un centro deportivo o un edificio administrativo, asegurando una optimización energética óptima en cada caso.

3. Integración de Energías Renovables: Incorporamos de manera seamless fuentes de energía renovable como paneles solares y turbinas eólicas. Esta integración reduce significativamente la dependencia de la red eléctrica tradicional, disminuyendo los costos operativos a largo plazo y mejorando la sostenibilidad ambiental de los edificios públicos.

4. Sistemas de Iluminación Inteligente: Implementamos tecnología de iluminación LED de última generación, combinada con sensores de ocupación y luz natural. Estos sistemas ajustan automáticamente la intensidad y el uso de la iluminación, optimizando el consumo energético sin comprometer el confort de los ocupantes.

5. Gestión Avanzada de HVAC: Nuestros sistemas de calefacción, ventilación y aire acondicionado utilizan algoritmos inteligentes para ajustarse automáticamente según la ocupación, las condiciones climáticas y los horarios de uso del edificio. Esto no solo mejora la eficiencia energética, sino que también mantiene un ambiente confortable y saludable.

6. Monitoreo de Calidad del Aire Interior: Instalamos sensores avanzados que controlan constantemente la calidad del aire interior. Estos sistemas optimizan la ventilación según sea necesario, asegurando un ambiente saludable y productivo para los empleados y visitantes, mientras se minimiza el desperdicio energético.

7. Almacenamiento de Energía: Incorporamos sistemas de baterías de alta capacidad que permiten almacenar el exceso de energía generada para su uso durante horas pico o como respaldo durante cortes de energía. Esto aumenta la resiliencia energética de los edificios públicos y optimiza el uso de energías renovables.

8. Estaciones de Carga para Vehículos Eléctricos: Integramos infraestructura de carga para vehículos eléctricos, promoviendo la movilidad sostenible y posicionando a los edificios públicos como líderes en la adopción de tecnologías limpias.

9. Análisis Predictivo y Mantenimiento Proactivo: Utilizamos inteligencia artificial y análisis de big data para predecir patrones de consumo y anticipar necesidades de mantenimiento. Esto permite una gestión proactiva que minimiza los tiempos de inactividad y maximiza la eficiencia operativa.

10. Capacitación y Participación de Usuarios: Ofrecemos programas de formación para el personal gubernamental, fomentando una cultura de conciencia energética y uso eficiente de los recursos.

Beneficios para los Edificios Públicos:

- Reducción Significativa de Costos: Nuestros clientes han experimentado reducciones de hasta un 40% en sus gastos energéticos, liberando recursos para otras prioridades gubernamentales.
- Mejora de la Sostenibilidad: La optimización energética contribuye directamente a la reducción de la huella de carbono, alineándose con objetivos de sostenibilidad y responsabilidad ambiental.
- Aumento de la Transparencia: Nuestros sistemas proporcionan informes detallados sobre el uso de energía, facilitando la rendición de cuentas y la toma de decisiones basada en datos.
- Mejora del Confort y Productividad: La optimización de las condiciones ambientales en los edificios públicos resulta en un aumento del confort y la productividad de los empleados y visitantes.
- Liderazgo en Innovación: La adopción de estas tecnologías posiciona a las entidades gubernamentales como líderes en innovación y sostenibilidad, sirviendo de ejemplo para el sector privado y otras instituciones públicas.

Al implementar nuestras soluciones All-in-One, los edificios públicos no solo se convierten en modelos de eficiencia energética, sino que también demuestran el compromiso del gobierno con la protección del medio ambiente y la gestión responsable de los recursos públicos. Esta transformación energética integral mejora la reputación institucional y promueve una cultura de sostenibilidad en toda la comunidad.`,
  },
  {
    id: 6,
    title: "Rápido Retorno de Inversión",
    description: "Rentabilidad y Sostenibilidad a Corto Plazo",
    src: "/EN_BAT_PAN.jpg",
    ctaText: "Calcular ROI",
    ctaLink: "/roi-calculator",
    content: `Una de las características más atractivas de nuestros Parques All-in-One es su capacidad para ofrecer un rápido retorno de inversión (ROI), combinando rentabilidad financiera con sostenibilidad ambiental. Este enfoque innovador permite a las organizaciones, especialmente a entidades gubernamentales y del sector público, implementar soluciones energéticas avanzadas sin comprometer sus recursos financieros a corto plazo.

Factores clave que contribuyen al rápido ROI:

1. Ahorros Inmediatos en Costos Operativos: Desde el primer día de implementación, nuestras soluciones generan ahorros significativos en los costos energéticos. Hemos observado reducciones de hasta un 30% en los gastos operativos relacionados con la energía.

2. Modelo de Leasing Flexible: Nuestro modelo de leasing permite a los clientes acceder a tecnología de punta sin necesidad de grandes inversiones iniciales. Las cuotas accesibles y las bajas tasas de interés aseguran que los ahorros energéticos superen los costos del leasing desde el inicio.

3. Eficiencia Energética Optimizada: La integración de tecnologías avanzadas de eficiencia energética, como sistemas de gestión inteligente y almacenamiento en baterías, maximiza los ahorros y acelera el retorno de la inversión.

4. Aprovechamiento de Incentivos Gubernamentales: Ayudamos a nuestros clientes a identificar y aprovechar incentivos fiscales, subvenciones y programas de apoyo gubernamental para proyectos de energía limpia, reduciendo aún más los costos iniciales.

5. Reducción de Costos de Mantenimiento: Nuestros sistemas de monitoreo predictivo y mantenimiento proactivo minimizan los tiempos de inactividad y los costos asociados con reparaciones de emergencia.

6. Aumento de la Vida Útil de los Equipos: La optimización del uso de los sistemas energéticos prolonga la vida útil de los equipos, reduciendo los costos de reemplazo a largo plazo.

7. Ingresos por Excedentes de Energía: En muchos casos, el exceso de energía generada puede venderse a la red, creando una nueva fuente de ingresos.

Análisis Detallado del ROI:

- Ahorro Energético: En promedio, nuestros clientes experimentan una reducción del 30-40% en sus facturas de energía. Para un edificio público que gasta $100,000 anuales en energía, esto puede traducirse en un ahorro de $30,000 a $40,000 por año.

- Costos de Implementación vs. Ahorros: Aunque los costos de implementación varían según el tamaño y complejidad del proyecto, nuestro modelo de leasing está diseñado para que las cuotas mensuales sean inferiores a los ahorros generados, resultando en un flujo de caja positivo desde el inicio.

- Tiempo de Recuperación de la Inversión: Dependiendo de las condiciones específicas, muchos de nuestros clientes logran recuperar su inversión en un plazo de 3 a 5 años.

- Beneficios a Largo Plazo: Más allá del período de recuperación inicial, los ahorros continúan acumulándose. A lo largo de un período de 20 años, no es inusual ver ahorros totales que superan varias veces el costo inicial del proyecto.

Caso de Estudio: Municipalidad de Ejemplo

La Municipalidad de Ejemplo implementó nuestro sistema All-in-One en su complejo de oficinas principales:
- Inversión inicial (a través de leasing): $500,000
- Ahorro anual en costos energéticos: $150,000
- Tiempo de recuperación de la inversión: 3.3 años
- Ahorro total proyectado a 20 años: $3,000,000 (6 veces la inversión inicial)

Beneficios Adicionales que Aceleran el ROI:

1. Mejora de la Imagen Pública: La adopción de tecnologías limpias mejora la reputación de la organización, lo que puede traducirse en beneficios intangibles como mayor apoyo público y oportunidades de colaboración.

2. Aumento de la Productividad: Los ambientes de trabajo optimizados energéticamente mejoran el confort y la productividad de los empleados, generando ahorros indirectos.

3. Protección contra la Volatilidad de Precios: La reducción de la dependencia de fuentes de energía tradicionales protege contra futuras fluctuaciones en los precios de la energía.

4. Cumplimiento Normativo: La implementación proactiva de soluciones energéticas eficientes ayuda a cumplir con regulaciones cada vez más estrictas, evitando posibles multas o costos de adaptación futuros.

En conclusión, nuestro enfoque de Parques All-in-One no solo ofrece una solución energética sostenible, sino que también representa una inversión financiera sólida con un rápido retorno. Al combinar tecnología avanzada, modelos financieros flexibles y una visión holística de la eficiencia energética, permitimos a nuestros clientes lograr sus objetivos de sostenibilidad de manera económicamente ventajosa. Este rápido ROI hace que la transición hacia una infraestructura energética más limpia y eficiente sea no solo una decisión ambientalmente responsable, sino también financieramente inteligente.`,
  }
];

