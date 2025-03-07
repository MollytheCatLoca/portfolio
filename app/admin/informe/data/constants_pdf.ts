// data/constants_pdf.ts
import { Constants } from '../contexts/ConstantsContext';

// Variable global para almacenar constants
let _globalConstants: any = null;

// Función para actualizar constants globales
export function setGlobalConstants(constants: Constants) {
  _globalConstants = constants;
}

export const heroSectionData = {
    subtitle: "Informe de Energía Renovable",
    title: "Parque Solar All-in-One",
    description: "Solución integrada para la generación de energía sostenible en proyectos empresariales y municipales, adaptada a las necesidades actuales.",
    buttonText: "Informe Tecnico - Inglow S.A."
};

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
    vidaUtil: number;
    plantCapacityKWcm: number;
}

// Función original que requiere constants como parámetro
// Modificar la función original para que sea retrocompatible
export const calcularMetricasManuales = (plantCapacityKW: number, constants?: any): MetricasManuales => {
    // Si no se proporciona constants, usar _globalConstants
    const actualConstants = constants || _globalConstants;
    
    // Si no hay constants disponibles (ni pasados ni globales), retorna valores por defecto
    if (!actualConstants) {
        return {
            energiaGenerada: 0,
            precioUnitarioEnergia: 0,
            cuotaLeasing: 0,
            oYMenLeasing: 0,
            oYMfueraLeasing: 0,
            ahorroEnLeasing: 0,
            ahorroFueraLeasing: 0,
            ahorroEnLeasingTotalPeriodo: 0,
            ahorroFueraLeasingTotalPeriodo: 0,
            ahorroTotalProyecto: 0,
            factorPlanta: 0,
            costoParque: 0,
            duracionLeasing: 6,
            vidaUtil: 25,
            plantCapacityKWcm: plantCapacityKW,
        };
    }
    
    const plantCapacityKWcm = plantCapacityKW;

    // Código actual de la función con actualConstants...
    const energiaGenerada = Math.floor(actualConstants?.detailedMetrics?.valoresAnuales?.generacionTotal || 0);
    const precioUnitarioEnergia = actualConstants?.invoice?.priceEnergyMWh || 0;
    const costoParquexMW = actualConstants?.technical?.costPerKW || 0;

    // Resto de la función sin cambios pero usando actualConstants en lugar de constants
    const cuotaLeasing = 104000 * (plantCapacityKW / 600);
    const oYMenLeasing = (actualConstants?.technical?.OyMLeasing || 30000) * (plantCapacityKW / 1000);
    const oYMfueraLeasing = (actualConstants?.technical?.OyMSLeasing || 60000) * (plantCapacityKW / 1000);
    
    const ahorroEnLeasing = (energiaGenerada * precioUnitarioEnergia) - oYMenLeasing - cuotaLeasing;
    const ahorroFueraLeasing = (energiaGenerada * precioUnitarioEnergia) - oYMfueraLeasing;
    
    const duracionLeasing = actualConstants?.technical?.duracionLeasing || 6;
    const duracionResto = (25 - duracionLeasing);
    const vidaUtil = 25;
    
    const ahorroEnLeasingTotalPeriodo = ahorroEnLeasing * duracionLeasing;
    const ahorroFueraLeasingTotalPeriodo = ahorroFueraLeasing * duracionResto;
    const ahorroTotalProyecto = ahorroEnLeasingTotalPeriodo + ahorroFueraLeasingTotalPeriodo;
    
    const factorPlanta = energiaGenerada * 1000 / ((plantCapacityKW * 1000) * 8760);
    const costoParque = costoParquexMW * plantCapacityKW;

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