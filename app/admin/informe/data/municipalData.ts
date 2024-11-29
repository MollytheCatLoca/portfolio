// app/admin/informe/data/municipalData.ts

export interface InstalacionMunicipal {
    id: number;
    nombre: string;
    direccion: string;
    potenciaContratada: number;
    consumoMensual: number;
    cargoFijo: number;
    facturaTotal: number;
}

export interface Totales {
    potenciaTotal: number;
    consumoMensualTotal: number;
    consumoAnualTotal: number;
    cargoFijoTotal: number;
    facturaTotal: number;
}

export interface MetricasInstalacion {
    consumoAnual: number;
    cargoFijoUSD: number;
    facturaTotalUSD: number;
    costoKWh: number;
    costoKWhUSD: number;
}

export const TIPO_CAMBIO = 1010;

export const INSTALACIONES_MUNICIPALES: InstalacionMunicipal[] = [
    {
        id: 1,
        nombre: "Edificio - Palacio Municipal",
        direccion: "Gral. Güemes N° 835, Sarandi",
        potenciaContratada: 367.00,
        consumoMensual: 42000,
        cargoFijo: 2650000,
        facturaTotal: 9950000
    },
    {
        id: 2,
        nombre: "Parque - La Estación",
        direccion: "Pitágoras N° 1750-1702, Sarandí",
        potenciaContratada: 355.00,
        consumoMensual: 40500,
        cargoFijo: 2550000,
        facturaTotal: 9600000
    },
    {
        id: 3,
        nombre: "Parque - Museo del Futbol (POLO)",
        direccion: "Colón N° 950, Avellaneda",
        potenciaContratada: 313.40,
        consumoMensual: 35800,
        cargoFijo: 2250000,
        facturaTotal: 8450000
    },
    {
        id: 4,
        nombre: "Polideportivo - Diego Armando Maradona",
        direccion: "Gdor. Alberto Barceló N° 1925, Villa Dominico",
        potenciaContratada: 171.00,
        consumoMensual: 19500,
        cargoFijo: 1230000,
        facturaTotal: 4620000
    },
    {
        id: 5,
        nombre: "ECO PUNTO",
        direccion: "Nicaragua N°, Sarandi",
        potenciaContratada: 162.00,
        consumoMensual: 18500,
        cargoFijo: 1165000,
        facturaTotal: 4380000
    },
    {
        id: 6,
        nombre: "Polideportivo - Jose Mármol",
        direccion: "Humberto Primo N° 2180, Piñeyro",
        potenciaContratada: 100.00,
        consumoMensual: 11400,
        cargoFijo: 720000,
        facturaTotal: 2700000
    },
    {
        id: 7,
        nombre: "Edificio - Cristina Kirchner",
        direccion: "San Martín N° 1351, Avellaneda",
        potenciaContratada: 80.00,
        consumoMensual: 9100,
        cargoFijo: 575000,
        facturaTotal: 2160000
    },
    {
        id: 8,
        nombre: "Edificio - Néstor Kirchner",
        direccion: "Av. Manuel Belgrano N° 1124, Avellaneda",
        potenciaContratada: 77.76,
        consumoMensual: 8900,
        cargoFijo: 560000,
        facturaTotal: 2100000
    },
    {
        id: 9,
        nombre: "Polideportivo - Delfo Cabrera",
        direccion: "Almte. Cordero N° 2245, Sarandí",
        potenciaContratada: 50.00,
        consumoMensual: 5700,
        cargoFijo: 360000,
        facturaTotal: 1350000
    },
    {
        id: 10,
        nombre: "Polideportivo - D.A.R.",
        direccion: "Av. Mitre N°5000, Villa Dominico",
        potenciaContratada: 30.50,
        consumoMensual: 3500,
        cargoFijo: 220000,
        facturaTotal: 825000
    },
    {
        id: 11,
        nombre: "Polideportivo - Néstor Kirchner",
        direccion: "Limay N° 1001, Crucecita",
        potenciaContratada: 18.00,
        consumoMensual: 2100,
        cargoFijo: 130000,
        facturaTotal: 490000
    },
    {
        id: 12,
        nombre: "Polideportivo - Gabino Alegre",
        direccion: "Centenario Uruguay y Homero Manzi, Villa Corina",
        potenciaContratada: 9.00,
        consumoMensual: 1000,
        cargoFijo: 65000,
        facturaTotal: 245000
    },
    {
        id: 13,
        nombre: "Polideportivo - La Saladita",
        direccion: "Morse N° 3410, Sarandi",
        potenciaContratada: 9.00,
        consumoMensual: 1000,
        cargoFijo: 65000,
        facturaTotal: 245000
    }
];

export function calcularTotales(): Totales {
    return {
        potenciaTotal: INSTALACIONES_MUNICIPALES.reduce((acc, inst) => acc + inst.potenciaContratada, 0),
        consumoMensualTotal: INSTALACIONES_MUNICIPALES.reduce((acc, inst) => acc + inst.consumoMensual, 0),
        consumoAnualTotal: INSTALACIONES_MUNICIPALES.reduce((acc, inst) => acc + (inst.consumoMensual * 12), 0),
        cargoFijoTotal: INSTALACIONES_MUNICIPALES.reduce((acc, inst) => acc + inst.cargoFijo, 0),
        facturaTotal: INSTALACIONES_MUNICIPALES.reduce((acc, inst) => acc + inst.facturaTotal, 0)
    };
}

export function calcularMetricasInstalacion(instalacion: InstalacionMunicipal): MetricasInstalacion {
    return {
        consumoAnual: instalacion.consumoMensual * 12,
        cargoFijoUSD: instalacion.cargoFijo / TIPO_CAMBIO,
        facturaTotalUSD: instalacion.facturaTotal / TIPO_CAMBIO,
        costoKWh: (instalacion.facturaTotal - instalacion.cargoFijo) / instalacion.consumoMensual,
        costoKWhUSD: ((instalacion.facturaTotal - instalacion.cargoFijo) / instalacion.consumoMensual) / TIPO_CAMBIO
    };
}