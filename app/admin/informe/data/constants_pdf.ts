// constants_pdf.ts
export const heroSectionData = {
    subtitle: "Informe de Energía Renovable",
    title: "Parque Solar All-in-One",
    description: "Solución integrada para la generación de energía sostenible en proyectos empresariales y municipales, adaptada a las necesidades actuales.",
    buttonText: "Informe Tecnico - Inglow S.A."
};

import { useConstants } from '../contexts/ConstantsContext';
// constants_pdf.ts


// Datos de la Sección Ventajas All-in-One
export const ventajasAllinOneData = {
    title: "PROPUESTA DE PARQUE SOLAR ALL-IN-ONE",
    descripcion: "El presente informe tiene como objetivo proporcionar un análisis técnico para la provisión e instalación de sistemas fotovoltaicos modulares All-in-One de BIS Integraciones. Estos sistemas están diseñados para maximizar la eficiencia y facilitar la implementación de proyectos solares en diversas ubicaciones, asegurando alta calidad y confiabilidad.",

    // Ventajas Clave
    ventajas: [
        {
            icon: "DollarSign", // Nombre del icono
            title: "Leasing",
            description: "Ideal para proyectos entre 300 kW y 3 MW, aprovechando líneas de crédito con condiciones favorables, incluyendo tasas competitivas y plazos de hasta 60 meses.",
            details: [
                "Flexibilidad en la estructuración de pagos",
                "Posibilidad de incluir opciones de compra al final del contrato",
                "Beneficios fiscales potenciales para el arrendatario"
            ]
        },
        {
            icon: "Building",
            title: "Fideicomisos",
            description: "Permiten la adquisición del parque solar y la venta de energía generada, garantizando un flujo de ingresos constante y fortaleciendo la infraestructura energética.",
            details: [
                "Separación patrimonial que reduce riesgos",
                "Estructura flexible adaptable a múltiples inversores",
                "Facilita la gestión y distribución de beneficios"
            ]
        },
        {
            icon: "Shield",
            title: "Sociedades de Garantía Recíproca (SGRs)",
            description: "Utilizadas para respaldar créditos en proyectos de 1 MW a 10 MW, facilitando el acceso a financiamiento seguro y respaldado.",
            details: [
                "Mejora las condiciones de acceso al crédito",
                "Reduce los requerimientos de garantías propias",
                "Posibilidad de obtener tasas más competitivas"
            ]
        },
        {
            icon: "FileText",
            title: "Obligaciones Negociables (ONs)",
            description: "Emisión de títulos de deuda para proyectos de gran escala, ampliando las fuentes de financiamiento y permitiendo la expansión modular.",
            details: [
                "Acceso a mercados de capitales más amplios",
                "Posibilidad de estructurar pagos acordes al flujo del proyecto",
                "Mejora el perfil financiero de la empresa emisora"
            ]
        }
    ],

    // Beneficios Clave
    beneficios: [
        "Adaptabilidad a diferentes tamaños y etapas de proyectos",
        "Optimización de costos financieros",
        "Diversificación de fuentes de financiamiento",
        "Facilita la expansión gradual y el escalamiento",
        "Mejora la viabilidad y sostenibilidad a largo plazo"
    ]
};

// Puedes añadir más secciones según lo necesites
// Ejemplo:
// export const otraSeccionData = { ... }


// Constantes y tipos para métricas manuales
export interface MetricasManuales {
    energiaGenerada: number;
    precioUnitarioEnergia: number;
    cuotaLeasing: number;
    oYMenLeasing: number;
    oYMfueraLeasing: number;
    ahorroEnLeasing: number;
    ahorroFueraLeasing: number;
    ahorroEnLeasingTotalPeriodo: number;
    ahorroFueraLeasingTotalPeriodo: number;
    ahorroTotalProyecto: number;
    factorPlanta: number;
    costoParque: number;
    duracionLeasing: number;
    vidaUtil: number; // 
}

export const usecalcularMetricasManuales = (plantCapacityKW: number): MetricasManuales => {


    // Valores base
    const { constants } = useConstants();
    const plantCapacityKWcm = plantCapacityKW

    //const energiaGenerada = 2026;
    const energiaGenerada = Math.floor(constants.detailedMetrics?.valoresAnuales.generacionTotal)
    const precioUnitarioEnergia = constants.invoice.priceEnergyMWh
    const costoParquexMW = constants.technical.costPerKW

    // Cálculos proporcionales basados en la capacidad de la planta
    const cuotaLeasing = 104000 * (plantCapacityKW / 600);

    // O&M proporcional a la capacidad (base: 30000 para 1000kW en leasing)
    const oYMenLeasing = constants.technical.OyMLeasing * (plantCapacityKW / 1000);

    // O&M proporcional a la capacidad (base: 60000 para 1000kW fuera de leasing)
    const oYMfueraLeasing = constants.technical.OyMSLeasing * (plantCapacityKW / 1000);

    // Cálculo de ahorros (energiaGenerada * precioUnitarioEnergia) - oYMenLeasing - cuotaLeasing;
    const ahorroEnLeasing = (energiaGenerada * precioUnitarioEnergia) - oYMenLeasing - cuotaLeasing
    const ahorroFueraLeasing = (energiaGenerada * precioUnitarioEnergia) - oYMfueraLeasing;

    const duracionLeasing = constants.technical.duracionLeasing
    const duracionResto = (25 - duracionLeasing)
    const vidaUtil = 25

    const ahorroEnLeasingTotalPeriodo = ahorroEnLeasing * duracionLeasing
    //
    const ahorroFueraLeasingTotalPeriodo = ahorroFueraLeasing * duracionResto
    const ahorroTotalProyecto = ahorroEnLeasingTotalPeriodo + ahorroFueraLeasingTotalPeriodo
    //+ ahorroFueraLeasingTotalPeriodo
    //energiaGenerada
    //const energiaGeneradaAux = 1850 / (plantCapacityKW / 1000)
    //(energiaGeneradaAux) / (plantCapacityKW / 1000 * 8760)
    const factorPlanta = energiaGenerada * 1000 / ((plantCapacityKW * 1000) * 8760)

    const costoParque = costoParquexMW * plantCapacityKW




    return {
        energiaGenerada,
        precioUnitarioEnergia,
        cuotaLeasing,
        oYMenLeasing,
        oYMfueraLeasing,
        ahorroEnLeasing,
        ahorroFueraLeasing,
        ahorroEnLeasingTotalPeriodo,
        ahorroFueraLeasingTotalPeriodo,
        ahorroTotalProyecto,
        factorPlanta,
        costoParque,
        duracionLeasing,
        vidaUtil,
        plantCapacityKWcm,
    };
};

// Ejemplo de uso:
// const metricasManuales = calcularMetricasManuales(800); // Para una planta de 800kW
