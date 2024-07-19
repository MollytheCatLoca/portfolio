// Constantes comunes a todas las secciones
// Items de navegación comunes
// const navItems = [...]
// Empresas asociadas, comunes a todas las secciones
// const companies_Energy = [...]
// Redes sociales comunes a todas las secciones
// const socialMedia = [...]
// Constantes específicas para cada sección
// Constantes para la sección de Energy
// const gridItems_Energy = [...]
// const projects_Energy = [...]
// const testimonials_Energy = [...]
// const workExperience_Energy = [...]
// Constantes para la sección de IT
// const gridItems_IT = [...]
// const projects_IT = [...]
// const testimonials_IT = [...]
// const workExperience_IT = [...]
// Constantes para la sección de Vial
// const gridItems_Vial = [...]
// const projects_Vial = [...]
// const testimonials_Vial = [...]   
// const workExperience_Vial = [...]

// Imágenes necesarias para la sección de IT

// gridItems_IT
// "/IT_Solution1.jpg" (Imagen de soluciones tecnológicas avanzadas)
// "/IT_Solution2.jpg" (Imagen de consultoría integral en IT)
// "/IT_Solution3.jpg" (Imagen de soporte financiero para proyectos de IT)
// "/IT_Solution4.jpg" (Imagen de implementación de sistemas IT All-in-One)
// "/IT_Solution5.jpg" (Imagen de comunidades transformadas con tecnología IT)
// "/IT_Solution6.jpg" (Imagen de misión sostenible en IT)

// projects_IT
// "/IT_Project1.jpg" (Imagen de soluciones IT All-in-One)
// "/IT_Project2.jpg" (Imagen de IT verde para edificios públicos)
// "/IT_Project3.jpg" (Imagen de parques tecnológicos IT)
// "/IT_Project4.jpg" (Imagen de consultoría IT integral)

// workExperience_IT
// "/IT_Engineering.jpg" (Imagen de ingeniería en IT)
// "/IT_Finance.jpg" (Imagen de consultoría financiera y project finance en IT)
// "/IT_Procurement.jpg" (Imagen de gestión de proyectos y procurement en IT)
// "/IT_AllInOne.jpg" (Imagen de implementación de sistemas IT All-in-One)
// "/IT_Consulting.jpg" (Imagen de consultoría IT integral)
// "/IT_Innovation.jpg" (Imagen de innovación y tecnología en IT)

// Imágenes necesarias para la sección de Vial

// gridItems_Vial
// "/Vial_Solution1.jpg" (Imagen de soluciones viales tecnológicas)
// "/Vial_Solution2.jpg" (Imagen de consultoría integral en proyectos viales)
// "/Vial_Solution3.jpg" (Imagen de soporte financiero para proyectos viales)
// "/Vial_Solution4.jpg" (Imagen de implementación de sistemas viales All-in-One)
// "/Vial_Solution5.jpg" (Imagen de comunidades transformadas con proyectos viales)
// "/Vial_Solution6.jpg" (Imagen de misión sostenible en proyectos viales)

// projects_Vial
// "/Vial_Project1.jpg" (Imagen de soluciones viales All-in-One)
// "/Vial_Project2.jpg" (Imagen de proyectos viales para edificios públicos)
// "/Vial_Project3.jpg" (Imagen de parques viales tecnológicos)
// "/Vial_Project4.jpg" (Imagen de consultoría vial integral)

// workExperience_Vial
// "/Vial_Engineering.jpg" (Imagen de ingeniería en proyectos viales)
// "/Vial_Finance.jpg" (Imagen de consultoría financiera y project finance en proyectos viales)
// "/Vial_Procurement.jpg" (Imagen de gestión de proyectos y procurement en proyectos viales)
// "/Vial_AllInOne.jpg" (Imagen de implementación de sistemas viales All-in-One)
// "/Vial_Consulting.jpg" (Imagen de consultoría vial integral)
// "/Vial_Innovation.jpg" (Imagen de innovación y tecnología en proyectos viales)




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
  },
  {
    id: 2,
    title: "Consultoría Integral en Energías Renovables",
    description: "Desde estudios de viabilidad hasta la optimización de sistemas energéticos.",
    className: "relative lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "absolute top-0 left-0 z-10 p-4 text-white",
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
  },
  {
    id: 4,
    title: "Parques Solares All-in-One",
    description: "Soluciones llave en mano que simplifican la instalación y operación de sistemas de energía solar.",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "h-full w-full object-cover object-center",
    titleClassName: "justify-start",
    img: "/BatsPanel.jpg",
    spareImg: "",
  },
  {
    id: 5,
    title: "Transformando Comunidades con Energía Limpia",
    description: "Proyectos que convierten a las localidades en ejemplos de sostenibilidad y eficiencia.",
    className: "relative md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 h-full w-full object-cover object-center",
    titleClassName: "justify-end bg-black bg-opacity-50 text-white",
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
    link: "https://bisintegraciones.com/transformando-municipios-en-comunidades-sustentables-con-energias-renovables/",
  },
  {
    id: 2,
    title: "Energía Verde para Edificios Públicos",
    des: "Instalación de paneles solares en colegios y hospitales para reducir costos y mejorar la sostenibilidad.",
    img: "/edificiosSolar.jpg",
    iconLists: ["/public-administration.png", "/solar-panel.png", "/planet-earth.png"],
    link: "https://bisintegraciones.com/soluciones-integrales-en-energias-renovables/",
  },
  {
    id: 3,
    title: "Parques Solares",
    des: "Generación de energía verde a pequeña escala para reducir costos energéticos y fomentar la sostenibilidad.",
    img: "/SolarTech5.jpg",
    iconLists: ["/solar-panel.png", "/planet-earth.png", "/energy.png"],
    link: "https://bisintegraciones.com/soluciones-integrales-en-energias-renovables/",
  },
  {
    id: 4,
    title: "Consultoría Energética Integral",
    des: "Asesoría completa desde estudios de viabilidad hasta la implementación y optimización de sistemas.",
    img: "/consultoriaener.jpg",
    iconLists: ["/strategic-consulting.png", "/energy.png", "/planet-earth.png"],
    link: "https://bisintegraciones.com/soluciones-integrales-en-energias-renovables/",
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
    link: "https://bisintegraciones.com/desarrollo-software-a-medida/",
  },
  {
    id: 2,
    title: "Infraestructura IT",
    des: "Implementamos y gestionamos infraestructuras IT robustas y escalables.",
    img: "/ITP_Fiber.jpg",
    iconLists: ["/next.svg"],
    link: "https://bisintegraciones.com/infraestructura-it/",
  },
  {
    id: 3,
    title: "Consultoría IT",
    des: "Asesoramos en la optimización y modernización de tus sistemas IT.",
    img: "/ITP_Program.jpg",
    iconLists: ["/git.svg"],
    link: "https://bisintegraciones.com/consultoria-it/",
  },
  {
    id: 4,
    title: "Seguridad Cibernética",
    des: "Protegemos tu infraestructura digital contra amenazas cibernéticas.",
    img: "/ITP_CiberSeg.jpg",
    iconLists: ["/host.svg"],
    link: "https://bisintegraciones.com/seguridad-cibernetica/",
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
    link: "https://bisintegraciones.com/botones-de-panico/",
  },
  {
    id: 2,
    title: "Totems",
    des: "Seguridad Urbana",
    img: "/VIAL_TOTEM1.webp",
    iconLists: ["/totem.png"],
    link: "https://bisintegraciones.com/totems-informativos/",
  },
  {
    id: 3,
    title: "Gestión de Tráfico Inteligente",
    des: "Gestión eficiente del tráfico vehicular",
    img: "/VIAL_Transit.jpg",
    iconLists: [ "/traffic.png"],
    link: "https://bisintegraciones.com/gestion-trafico-inteligente/",
  },
  {
    id: 4,
    title: "Tecnologia en Vigilancia",
    des: "Camaras & Contac Centers",
    img: "/VIAL_911.jpg",
    iconLists: [ "/diaphragm.png"],
    link: "https://bisintegraciones.com/camaras-de-vigilancia/",
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
    iconLists: ["/git.svg"], // Iconos representativos
    link: "/vial",
  },
];

