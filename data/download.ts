export interface Presentation {
    id: number;
    title: string;
    description: string;
    category: 'Energia' | 'Vial' | 'IT';
    excerpt: string;
    imageSrc: string;
    downloadPath: string;
}

export const presentations: Presentation[] = [
    {
        id: 1,
        title: "All In One",
        description: "Una solución integral para la gestión inteligente de la energía, que combina hardware y software para optimizar el consumo y la producción de energía.",
        category: "Energia",
        excerpt: "BIS All In One es una plataforma de gestión energética que integra medición, control y optimización en tiempo real. Diseñada para mejorar la eficiencia energética en diversos sectores, desde industrias hasta hogares inteligentes.",
        imageSrc: "/download/BIS-ALL-IN-ONE.jpg",
        downloadPath: "/download/BIS-ALL-IN-ONE.pdf"
    },
    {
        id: 2,
        title: "Energías Renovables para Municipios",
        description: "Transformación de municipios en entidades sustentables mediante la implementación de energías renovables, con énfasis en parques solares.",
        category: "Energia",
        excerpt: "Descubre cómo los municipios pueden convertirse en faros de sustentabilidad a través de la generación de energía renovable. Desde parques solares hasta instalaciones en edificios públicos, exploramos las oportunidades y beneficios para los gobiernos locales.",
        imageSrc: "/download/BIS ENERGIAS RENOVABLES - Muni.jpg",
        downloadPath: "/download/BIS ENERGIAS RENOVABLES - Muni.pdf"
    },
    {
        id: 3,
        title: "Energías Renovables: Oportunidades para Municipios",
        description: "Líneas de leasing del BICE para financiar proyectos de energías renovables en municipios.",
        category: "Energia",
        excerpt: "Explora las oportunidades de financiamiento para proyectos de energías renovables en municipios a través de las líneas de leasing ofrecidas por el BICE (Banco de Inversión y Comercio Exterior). Descubre cómo estos instrumentos financieros pueden impulsar la transición hacia energías limpias en tu localidad.",
        imageSrc: "/download/BIS ENERGIAS RENOVABLES - Muni Leasing BICE.jpg",
        downloadPath: "/download/BIS ENERGIAS RENOVABLES - Muni Leasing BICE.pdf"
    },
    {
        id: 4,
        title: "Consultoría Financiera Integral",
        description: "Servicios de consultoría financiera para proyectos de energía renovable, abarcando desde pequeña hasta gran escala.",
        category: "Energia",
        excerpt: "BIS Integraciones ofrece un enfoque global para la gestión de líneas financieras en proyectos de energía renovable. Nuestro equipo de expertos proporciona soluciones adaptadas para proyectos desde 300 kW hasta más de 10 MW, utilizando diversas fuentes de financiamiento como leasing, créditos bancarios y organismos multilaterales.",
        imageSrc: "/EN_FINMundo.jpg",
        downloadPath: "/download/Consultoria Finaciera BIS.pdf"
    }
];