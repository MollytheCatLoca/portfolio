
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
      link: "4"
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
      link: "4"
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
    title: "Provincias y Municipios",
    src: "/EN_SolarCam.jpg",
    ctaText: "Home",
    ctaLink: "/energy",
    content: "La solución All-in-One simplifica todo el proceso energético al ofrecer una plataforma integral que cubre desde la instalación hasta el mantenimiento. Con esta solución, hemos observado una reducción del 30% en costos operativos, permitiendo a los municipios y provincias reinvertir esos ahorros en otras áreas críticas.\n\nAdemás, la plataforma proporciona un monitoreo constante y herramientas de optimización que garantizan un rendimiento energético óptimo a lo largo del tiempo, asegurando que las instalaciones funcionen con la máxima eficiencia y seguridad.\n\nEsta solución no solo reduce costos, sino que también mejora la sostenibilidad y la resiliencia de las infraestructuras energéticas locales. Al integrar todos los aspectos del ciclo de vida de los sistemas energéticos, desde la planificación hasta la operación, la solución All-in-One ofrece una experiencia sin complicaciones para los gestores de proyectos y facilita la transición hacia un futuro más verde y eficiente.",
  },
  {
    id: 2,
    description: "Proyectos de Energía Renovable",
    title: "Financiamiento",
    src: "/EN_FINMundo.jpg",
    ctaText: "Home",
    ctaLink: "/energy",
    content: "Nuestro programa de financiamiento a través de leasing ofrece tasas competitivas y cuotas accesibles, haciendo posible que los proyectos de energía renovable se financien por sí mismos. Los altos costos de energía ahora se pueden cubrir con los ahorros generados, asegurando un retorno de inversión en menos de cinco años.\n\nAdemás, ofrecemos la suscripción de Obligaciones Negociables (ONs) y Bonos Verdes, que proporcionan una alternativa eficaz para financiar proyectos sostenibles a largo plazo. Estos instrumentos financieros no solo permiten acceder a capital en condiciones ventajosas, sino que también atraen a inversores comprometidos con la sostenibilidad y la transición energética.\n\nLa suscripción de ONs ofrece la posibilidad de obtener financiamiento flexible y estructurado, adaptado a las necesidades específicas de cada proyecto. Por otro lado, los Bonos Verdes representan una oportunidad para alinear el financiamiento con los objetivos de desarrollo sostenible, permitiendo a los inversores participar activamente en la lucha contra el cambio climático mientras obtienen rendimientos atractivos.\n\nCon estas herramientas, nuestro programa de financiamiento no solo facilita la implementación de soluciones energéticas innovadoras, sino que también impulsa el crecimiento económico y social, asegurando un futuro más verde y sostenible para todos.",
  },
  {
    id: 3,
    description: "Eficiencia Energética",
    title: "Ahorro y Sostenibilidad",
    src: "/EN_EDIP1.jpg",
    ctaText: "Home",
    ctaLink: "/energy",
    content: "La tecnología avanzada de nuestros sistemas All-in-One no solo reduce los costos energéticos, sino que también mejora la eficiencia operativa. En nuestras instalaciones más recientes, hemos visto un ahorro energético del 40%, lo que demuestra el impacto positivo de integrar soluciones tecnológicas de última generación.\n\nEsta mejora en la eficiencia energética no solo se traduce en menores costos operativos, sino que también reduce significativamente la huella de carbono de las instalaciones, contribuyendo a un entorno más sostenible. Al combinar tecnologías de monitoreo en tiempo real y algoritmos de optimización, nuestros sistemas aseguran que cada componente opere en su punto óptimo, maximizando el rendimiento y minimizando los desperdicios energéticos.\n\nCon estas innovaciones, nuestros clientes no solo cumplen con los estándares regulatorios más exigentes, sino que también lideran la adopción de prácticas sostenibles en sus respectivas industrias. El enfoque integral de nuestras soluciones All-in-One permite a las organizaciones adaptarse rápidamente a los cambios en el mercado energético, garantizando un futuro más eficiente y sostenible.\n\nAl implementar nuestras soluciones, las empresas pueden demostrar su compromiso con la sostenibilidad y la eficiencia, convirtiéndose en líderes en sus sectores y generando un impacto positivo a largo plazo tanto para el negocio como para el medio ambiente.",
  },
  {
    id: 4,
    description: "Optimización Energética",
    title: "Soluciones para Edificios Públicos",
    src: "/EN_ALL1.jpg",
    ctaText: "Home",
    ctaLink: "/energy",
    content: "Las soluciones All-in-One son ideales para edificios públicos que buscan optimizar su consumo energético. Gracias a nuestra tecnología avanzada, estos edificios pueden operar de manera más eficiente, reduciendo costos y mejorando su impacto ambiental, lo que resulta en un entorno más sostenible y económico.\n\nLa implementación de nuestros sistemas en edificios públicos no solo permite una reducción significativa en el consumo de energía, sino que también contribuye a mejorar la calidad del servicio ofrecido a la comunidad. Al reducir la dependencia de fuentes de energía tradicionales y aumentar la eficiencia operativa, los edificios públicos pueden reasignar recursos financieros a otras áreas esenciales, beneficiando directamente a la ciudadanía.\n\nAdemás, la integración de tecnologías inteligentes permite un monitoreo constante del uso energético, lo que facilita la identificación de áreas de mejora y la implementación de ajustes en tiempo real. Esto no solo maximiza la eficiencia, sino que también prolonga la vida útil de los sistemas instalados, asegurando un retorno de la inversión aún mayor.\n\nCon estas soluciones, los edificios públicos se convierten en referentes de sostenibilidad, demostrando el compromiso de las administraciones con la protección del medio ambiente y la gestión responsable de los recursos. Este enfoque no solo mejora la reputación institucional, sino que también promueve una cultura de eficiencia y sostenibilidad en toda la comunidad.",
  },
];

