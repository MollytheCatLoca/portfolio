// data/parqueDashSim.ts

export const parqueSolarData = {
    nombre: "Parque Solar Comodoro Rivadavia",
    ubicacion: {
        ciudad: "Comodoro Rivadavia",
        provincia: "Chubut",
        coordenadas: { lat: -45.8656, lon: -67.4969 },
        descripcion: "Ubicado en la zona sur de la ciudad, en un área en proceso de recuperación ambiental."
    },
    capacidad: {
        actual: 1.86,
        maxima: 9,
        unidad: "MWp",
        paneles: 1725,
        inversores: 21
    },
    inversion: {
        total: 3.6,
        unidad: "MUSD",
        periodoRecuperacion: 5, // años
        tir: 12.5, // Tasa Interna de Retorno (%)
        van: 2.1 // Valor Actual Neto (MUSD)
    },
    financiamiento: {
        plazoFinanciamiento: 6, // años
        tasaInteres: 0.08, // 8% anual
    },

    analisisFinanciero: [
        { año: 2024, generacion: 3285, ingresos: 328.5, cuotaInversion: 295.65 },
        { año: 2025, generacion: 3268, ingresos: 326.8, cuotaInversion: 294.12 },
        { año: 2026, generacion: 3252, ingresos: 325.2, cuotaInversion: 292.68 },
        { año: 2027, generacion: 3236, ingresos: 323.6, cuotaInversion: 291.24 },
        { año: 2028, generacion: 3220, ingresos: 322.0, cuotaInversion: 289.80 },
        { año: 2029, generacion: 3204, ingresos: 320.4, cuotaInversion: 288.36 },
        { año: 2030, generacion: 3188, ingresos: 318.8, cuotaInversion: 0 },
        { año: 2031, generacion: 3172, ingresos: 317.2, cuotaInversion: 0 },
        { año: 2032, generacion: 3156, ingresos: 315.6, cuotaInversion: 0 },
        { año: 2033, generacion: 3140, ingresos: 314.0, cuotaInversion: 0 }
    ],

    produccionAnual: {
        estimada: 3285,
        unidad: "MWh",
        consumoEquivalente: 1000 // Número de hogares que puede abastecer
    },
    ahorroCO2: {
        anual: 1642,
        unidad: "ton",
        equivalenciaArboles: 75000,
        equivalenciaAutos: 356 // Autos retirados de circulación
    },
    terreno: {
        area: 10,
        unidad: "hectáreas",
        tipo: "Ex basural en recuperación",
        elevacionPromedio: 25,
        unidadElevacion: "metros sobre el nivel del mar",
        irradiacionAnual: 1800,
        unidadIrradiacion: "kWh/m²"
    },
    generacionMensual: [
        { mes: 'Ene', generacion: 280 },
        { mes: 'Feb', generacion: 300 },
        { mes: 'Mar', generacion: 290 },
        { mes: 'Abr', generacion: 260 },
        { mes: 'May', generacion: 220 },
        { mes: 'Jun', generacion: 200 },
        { mes: 'Jul', generacion: 210 },
        { mes: 'Ago', generacion: 240 },
        { mes: 'Sep', generacion: 270 },
        { mes: 'Oct', generacion: 290 },
        { mes: 'Nov', generacion: 310 },
        { mes: 'Dic', generacion: 320 }
    ],
    generacionAnual: [
        { año: 2024, generacion: 3285 },
        { año: 2025, generacion: 3260 },
        { año: 2026, generacion: 3235 },
        { año: 2027, generacion: 3210 },
        { año: 2028, generacion: 3185 }
    ],
    factorCapacidad: 20.1,
    impactoSocial: {
        empleosDirectos: 30,
        empleosIndirectos: 100,
        programasEducativos: 5
    },
    detallesTecnicos: {
        tipoPaneles: "Monocristalinos de alta eficiencia",
        eficienciaPaneles: 21.5, // %
        vidaUtilEstimada: 25, // años
        degradacionAnual: 0.5 // % de pérdida de eficiencia por año
    }
};