// data/solarParkData.ts

export const SOLAR_PARK_DATA = {
    capacities: {
      installed: {
        value: 3.00,
        unit: 'MWp'
      },
      dispatch: {
        value: 2.73,
        unit: 'MW',
        powerFactor: 0.9
      }
    },
  
    solarResource: {
      ghi: {
        value: 1850.0,
        unit: 'kWh/m²'
      },
      dhi: {
        value: 580.0,
        unit: 'kWh/m²'
      },
      averageTemperature: {
        value: 17.5,
        unit: '°C'
      },
      dataSource: 'Solargis'
    },
  
    firstYearPerformance: {
      specificProduction: {
        value: 2015.0,
        unit: 'kWh/kWp'
      },
      performanceRatio: {
        value: 82.5,
        unit: '%'
      },
      totalInjectedEnergy: {
        value: 6.15,
        unit: 'GWh'
      },
      totalEnergyConsumption: {
        value: -30.0,
        unit: 'MWh'
      },
      energyYield: {
        value: 6.15,
        unit: 'GWh'
      }
    },
  
    twentyFiveYearPerformance: {
      specificProduction: {
        value: 1945.0,
        unit: 'kWh/kWp'
      },
      energyYield: {
        value: 142.5,
        unit: 'GWh'
      },
      performanceRatio: {
        value: 79.7,
        unit: '%'
      }
    },
  
    technicalSpecs: {
      outputPoint: {
        value: 33,
        unit: 'kV',
        description: 'Sala de Celdas en Media Tensión'
      },
      powerFactor: {
        value: 0.9,
        description: 'Factor de potencia nominal'
      },
      reactivePower: {
        value: 10,
        unit: '%',
        description: 'Capacidad adicional de potencia reactiva'
      },
      voltageVariation: {
        value: 95,
        unit: '%',
        description: 'Variación de tensión permitida'
      }
    },
  
    projectNotes: {
      dimensioning: "El Proyecto fue dimensionado para cumplir los requerimientos de compensación del factor de potencia dentro de los límites requeridos por la red de 0,9 (capaces de manejar un 10% adicional de potencia reactiva), y la variación de tensión incluso si cae hasta un 95% de su valor nominal.",
      operation: "Esto permite que el sistema fotovoltaico cumpla con los estrictos requerimientos de la red eléctrica, asegurando una operación eficiente y estable, sin necesidad de instalación de bancos de capacitores."
    }
  };
  
  // Tipos TypeScript para los datos
  export interface SolarValue {
    value: number;
    unit: string;
    description?: string;
  }
  
  export interface SolarResourceData {
    ghi: SolarValue;
    dhi: SolarValue;
    averageTemperature: SolarValue;
    dataSource: string;
  }
  
  export interface PerformanceData {
    specificProduction: SolarValue;
    performanceRatio: SolarValue;
    energyYield?: SolarValue;
    totalInjectedEnergy?: SolarValue;
    totalEnergyConsumption?: SolarValue;
  }
  
  export interface TechnicalSpecs {
    outputPoint: SolarValue;
    powerFactor: Omit<SolarValue, 'unit'>;
    reactivePower: SolarValue;
    voltageVariation: SolarValue;
  }
  
  export interface ProjectNotes {
    dimensioning: string;
    operation: string;
  }
  
  // Ejemplo de uso:
  /*
  import { SOLAR_PARK_DATA } from './constants/solarParkData';
  
  // Acceder a los datos
  const installedCapacity = SOLAR_PARK_DATA.capacities.installed.value; // 14.35
  const ghi = SOLAR_PARK_DATA.solarResource.ghi.value; // 1695.5
  const firstYearProduction = SOLAR_PARK_DATA.firstYearPerformance.specificProduction.value; // 1956.5
  */



  export const ENERGY_RESOURCE_DATA = {
    title: "Recurso Energético",
    subtitle: "Año Meteorológico Típico (TMY)",
    monthlyData: [
      { month: "Enero", ghi: 235.0, dhi: 70.5, temperature: 24.8 },
      { month: "Febrero", ghi: 185.0, dhi: 65.2, temperature: 23.5 },
      { month: "Marzo", ghi: 170.0, dhi: 58.4, temperature: 21.2 },
      { month: "Abril", ghi: 125.0, dhi: 48.6, temperature: 17.5 },
      { month: "Mayo", ghi: 95.0, dhi: 42.3, temperature: 14.2 },
      { month: "Junio", ghi: 80.0, dhi: 38.5, temperature: 11.5 },
      { month: "Julio", ghi: 90.0, dhi: 40.2, temperature: 11.2 },
      { month: "Agosto", ghi: 120.0, dhi: 45.6, temperature: 13.0 },
      { month: "Septiembre", ghi: 155.0, dhi: 52.8, temperature: 15.5 },
      { month: "Octubre", ghi: 190.0, dhi: 58.4, temperature: 18.2 },
      { month: "Noviembre", ghi: 210.0, dhi: 65.2, temperature: 21.0 },
      { month: "Diciembre", ghi: 225.0, dhi: 68.5, temperature: 23.5 }
    ],
    annualData: {
      ghi: 1850.0,
      dhi: 580.0,
      temperature: 17.5
    },
    units: {
      ghi: "kWh/m²/mes",
      dhi: "kWh/m²/mes",
      temperature: "°C"
    }
  };


  // constants/energyProductionData.ts

  export const ENERGY_PRODUCTION_DATA = {
    title: "Reporte de Producción Energética",
    summary: {
      firstYear: {
        production: 6.15,
        unit: "GWh",
        performanceRatio: 82.5,
        specificProduction: 2015.0,
        unit_specific: "kWh/kWp",
        bifacialGain: 4.39
      },
      totalEnergy: {
        injected: 6.15,
        unit: "GWh",
        reactiveInjected: 2.84,
        unit_reactive: "GVArh",
        powerFactor: 0.905
      }
    },
    monthlyProduction: [
      { month: "Enero", energy: 0.85, performanceRatio: 78.50, percentage: 14.05 },
      { month: "Febrero", energy: 0.65, performanceRatio: 79.20, percentage: 10.74 },
      { month: "Marzo", energy: 0.60, performanceRatio: 81.50, percentage: 9.92 },
      { month: "Abril", energy: 0.42, performanceRatio: 83.20, percentage: 6.94 },
      { month: "Mayo", energy: 0.32, performanceRatio: 84.50, percentage: 5.29 },
      { month: "Junio", energy: 0.26, performanceRatio: 85.10, percentage: 4.30 },
      { month: "Julio", energy: 0.30, performanceRatio: 84.80, percentage: 4.96 },
      { month: "Agosto", energy: 0.40, performanceRatio: 83.90, percentage: 6.61 },
      { month: "Septiembre", energy: 0.52, performanceRatio: 82.70, percentage: 8.60 },
      { month: "Octubre", energy: 0.63, performanceRatio: 81.50, percentage: 10.41 },
      { month: "Noviembre", energy: 0.70, performanceRatio: 79.80, percentage: 11.57 },
      { month: "Diciembre", energy: 0.80, performanceRatio: 78.90, percentage: 13.22 }
    ],
    total: {
      energy: 6.15,
      performanceRatio: 82.5,
      percentage: 100.0
    }
};
  // constants/solarBudgetData.ts

export const SOLAR_BUDGET_DATA = {
    title: "Presupuesto del Proyecto Solar",
    projectMetrics: {
      capex: 2400000,
      dcPower: 3, // MWp
      acPower: 3.6, // MW (inversores)
      executionTime: 6, // meses
      // Ratio USD/Wp = CAPEX / (DC Power in W)
      usdWpRatio: (2400000 / (3.0 * 1000000)).toFixed(2)
    },
    equipment: [
      {
        code: "NEG19RC.20",
        description: "605/610W - N-TYPE i-TOPCon BIFACIAL DE DOBLE VIDRIO",
        quantity: 4920.00,
        type: "Módulos"
      },
      {
        code: "SUN2000-150K-MG0",
        description: "Inversores Huawei 150kW",
        quantity: 20.00,
        type: "Inversores"
      },
      {
        code: "JUPITER-3000K-H1",
        description: "Estación Transformadora Inteligente",
        quantity: 1,
        type: "STS"
      },
      {
        code: "EST-1EJE",
        description: "Estructuras a 1 eje Trina",
        quantity: 3000000.00,
        type: "Estructuras"
      },
      {
        code: "LAMT-2.2",
        description: "Tendido LAMT 1,0km",
        quantity: 1.00,
        type: "Conexión"
      },
      {
        code: "INST",
        description: "Instalación",
        quantity: 3000000.00,
        type: "Servicios"
      },
      {
        code: "PDI",
        description: "PDI",
        quantity: 1.00,
        type: "Documentación"
      }
    ]
  };