// /data/data_gen.ts

// Datos de sensibilidad de generación
export const SENSITIVITY_GEN_DATA = [
    { Aumento: "0", VariacionTIR: 0, VariacionPayback: 0 },
    { Aumento: "5", VariacionTIR: 8.5, VariacionPayback: -9.8 },
    { Aumento: "10", VariacionTIR: 15.8, VariacionPayback: -18.2 },
    { Aumento: "15", VariacionTIR: 21.6, VariacionPayback: -25.1 },
    { Aumento: "20", VariacionTIR: 26.4, VariacionPayback: -30.8 },
    { Aumento: "25", VariacionTIR: 30.0, VariacionPayback: -35.0 }
];

// Datos financieros del proyecto solar por MW
export const SOLAR_PROJECT_DATA = [
    { mw: 1, generacion: 2295, inversion: 1000000, van: 427482, payback: 8, retorno: 17 },
    { mw: 2, generacion: 4590, inversion: 1960000, van: 913419, payback: 7.5, retorno: 18 },
    { mw: 3, generacion: 6885, inversion: 2881200, van: 1456057, payback: 7, retorno: 19 },
    { mw: 4, generacion: 9180, inversion: 3764768, van: 2053589, payback: 6.5, retorno: 20 },
    { mw: 5, generacion: 11475, inversion: 4611841, van: 2956847, payback: 6, retorno: 21 },
    { mw: 6, generacion: 13770, inversion: 5423525, van: 3684273, payback: 5.8, retorno: 22.5 },
    { mw: 7, generacion: 16065, inversion: 6200897, van: 4476790, payback: 5.5, retorno: 23.5 },
    { mw: 8, generacion: 18360, inversion: 6945004, van: 5316220, payback: 5.2, retorno: 24.3 },
    { mw: 9, generacion: 20655, inversion: 7656867, van: 6921043, payback: 5, retorno: 25.0 },
    { mw: 10, generacion: 22950, inversion: 8337478, van: 7914016, payback: 4.8, retorno: 25.5 },
    { mw: 11, generacion: 25245, inversion: 8987801, van: 8846855, payback: 4.5, retorno: 25.8 },
    { mw: 12, generacion: 27540, inversion: 9608776, van: 9993131, payback: 4.2, retorno: 26.0 },
    { mw: 13, generacion: 29835, inversion: 10201317, van: 11100474, payback: 4.1, retorno: 26.0 },
    { mw: 14, generacion: 32130, inversion: 10786313, van: 12244145, payback: 4.05, retorno: 26.0 },
    { mw: 15, generacion: 34425, inversion: 11304629, van: 13423005, payback: 4.0, retorno: 26.0 }
];


export const COMPANY_ENERGY_DATA = [
    { month: 1, energia: 3084, costoPotencia: 15795, costoTotal: 220279, costoTotal_MWh: 71.44, costoPotencia_MWh: 5.12, costoEnergia_MWh: 66.31 },
    { month: 2, energia: 2933, costoPotencia: 27492, costoTotal: 217639, costoTotal_MWh: 74.21, costoPotencia_MWh: 9.37, costoEnergia_MWh: 64.84 },
    { month: 3, energia: 1930, costoPotencia: 45438, costoTotal: 207235, costoTotal_MWh: 107.35, costoPotencia_MWh: 23.54, costoEnergia_MWh: 83.81 },
    { month: 4, energia: 3370, costoPotencia: 52134, costoTotal: 254162, costoTotal_MWh: 75.43, costoPotencia_MWh: 15.47, costoEnergia_MWh: 59.95 },
    { month: 5, energia: 2629, costoPotencia: 48791, costoTotal: 261429, costoTotal_MWh: 99.44, costoPotencia_MWh: 18.56, costoEnergia_MWh: 80.88 },
    { month: 6, energia: 2470, costoPotencia: 50127, costoTotal: 282150, costoTotal_MWh: 114.25, costoPotencia_MWh: 20.30, costoEnergia_MWh: 93.95 },
    { month: 7, energia: 2925, costoPotencia: 51091, costoTotal: 286488, costoTotal_MWh: 97.93, costoPotencia_MWh: 17.46, costoEnergia_MWh: 80.47 },
    { month: 8, energia: 2808, costoPotencia: 51935, costoTotal: 292060, costoTotal_MWh: 104.03, costoPotencia_MWh: 18.50, costoEnergia_MWh: 85.53 },
    { month: 9, energia: 3136, costoPotencia: 53685, costoTotal: 298892, costoTotal_MWh: 95.30, costoPotencia_MWh: 17.12, costoEnergia_MWh: 78.18 }
];


// Datos generados para el análisis de la planta solar de 14 MW

export const PLANT_METRICS = {
    coveragePercentage: 95, // Cobertura del consumo energético anual en %
    annualSavings: 2939722, // Ahorro económico anual promedio en $
    savingsPercentage: 89, // Reducción en costos operativos en %
    cleanEnergyPercentage: 100, // Porcentaje de energía limpia y renovable
    lifespan: 25 // Vida útil garantizada en años
};

export const IMPLEMENTATION_PLAN = [
    {
        step: 1,
        title: 'Formalización',
        tasks: [
            'Revisión del contrato',
            'Firma de documentación',
            'Establecimiento de términos'
        ]
    },
    {
        step: 2,
        title: 'Instalación',
        tasks: [
            'Cronograma detallado',
            'Coordinación técnica',
            'Capacitación del personal'
        ]
    },
    {
        step: 3,
        title: 'Seguimiento',
        tasks: [
            'Sistema de monitoreo',
            'Evaluación continua',
            'Optimización constante'
        ]
    }
];
