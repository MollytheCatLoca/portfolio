import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const constantsFilePath = path.join(process.cwd(), 'app', 'admin', 'informe', 'data', 'constants.json');

// Estructura por defecto de las constantes
const DEFAULT_CONSTANTS = {
    technical: {
        contractedPowerKVA: 0,
        contractedPowerKW: 0,
        injectionLimitKW: 0,
        costPerKW: 0,
        referencePowerMW: 0,
        referenceAnnualGenerationMWH: 0,
        maxCurtailmentPercentage: 0,
        daysPerYear: 365,
        hoursPico: 5,
        hoursValle: 6,
        hoursResto: 13,
        hoursGeneration: 8,
        OyMLeasing: 30000,
        OyMSLeasing: 60000,
        duracionLeasing: 6,
        vidaUtil: 25,
        tasaInteres: 6
    },
    consumption: {
        annualConsumption: 0,
        picoMonthly: 0,
        valleMonthly: 0,
        restoMonthly: 0
    },
    power: {
        installedPowerKW: 0
    },
    invoice: {
        exchangeRate: 0,
        totalInvoiceAmountPesos: 0,
        taxesPercentage: 0,
        fixedChargesPesos: 0,
        reactivePowerChargesPesos: 0,
        priceEnergyMWh: 0
    },
    company: {
        companyName: 'Prueba Deaflaut',
        latitude: -69,
        longitude: -69,
        address: "Deafalut Adreess"
    },
    detailedMetrics: {
        capacityMW: 0,
        valoresAnuales: {
            generacionTotal: 0,
            autoconsumo: 0,
            inyeccion: 0,
            curtailment: 0
        },
        porcentajes: {
            ahorroTotal: 0,
            autoconsumo: 0,
            inyeccion: 0,
            curtailment: 0
        }
    }
};

async function readConstants() {
    try {
        const data = await fs.readFile(constantsFilePath, 'utf8');
        const constants = JSON.parse(data);

        // Aseguramos que existan todas las secciones con sus valores por defecto
        return {
            technical: { ...DEFAULT_CONSTANTS.technical, ...constants.technical },
            consumption: { ...DEFAULT_CONSTANTS.consumption, ...constants.consumption },
            power: { ...DEFAULT_CONSTANTS.power, ...constants.power },
            invoice: { ...DEFAULT_CONSTANTS.invoice, ...constants.invoice },
            company: { ...DEFAULT_CONSTANTS.company, ...constants.company },
            detailedMetrics: {
                ...DEFAULT_CONSTANTS.detailedMetrics,
                ...constants.detailedMetrics,
                valoresAnuales: {
                    ...DEFAULT_CONSTANTS.detailedMetrics.valoresAnuales,
                    ...(constants.detailedMetrics?.valoresAnuales || {})
                },
                porcentajes: {
                    ...DEFAULT_CONSTANTS.detailedMetrics.porcentajes,
                    ...(constants.detailedMetrics?.porcentajes || {})
                }
            }
        };
    } catch (error) {
        // Si el archivo no existe o hay error al leerlo, devolvemos los valores por defecto
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            await fs.writeFile(constantsFilePath, JSON.stringify(DEFAULT_CONSTANTS, null, 2));
            return DEFAULT_CONSTANTS;
        }
        console.error('Error reading constants:', error);
        throw error;
    }
}

async function writeConstants(data: any) {
    try {
        const currentConstants = await readConstants();

        // Verificamos y limpiamos cada sección antes de guardar
        const updatedConstants = {
            technical: {
                ...currentConstants.technical,
                ...(data.technical || {})
            },
            consumption: {
                ...currentConstants.consumption,
                ...(data.consumption || {})
            },
            power: {
                ...currentConstants.power,
                ...(data.power || {})
            },
            invoice: {
                ...currentConstants.invoice,
                ...(data.invoice || {})
            },
            company: {
                ...currentConstants.company,
                ...(data.company || {})
            },
            detailedMetrics: {
                ...DEFAULT_CONSTANTS.detailedMetrics,
                ...((newData.detailedMetrics || {}).valoresAnuales || {}),
                ...((newData.detailedMetrics || {}).porcentajes || {}),
            }


        };

        await fs.writeFile(constantsFilePath, JSON.stringify(updatedConstants, null, 2));
        return updatedConstants;
    } catch (error) {
        console.error('Error writing constants:', error);
        throw error;
    }
}

export async function GET() {
    try {
        const constants = await readConstants();
        return NextResponse.json(constants);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json(
            { error: 'Error reading constants' },
            { status: 500 }
        );
    }
}

// En /api/constants/route.ts

export async function POST(request: Request) {
    try {
        const newData = await request.json();
        const currentConstants = await readConstants();

        // Nos aseguramos de que no haya anidamiento
        const updatedConstants = {
            ...currentConstants,
            technical: {
                ...currentConstants.technical,
                ...(newData.technical || {})
            },
            consumption: {
                ...currentConstants.consumption,
                ...(newData.consumption || {})
            },
            power: {
                ...currentConstants.power,
                ...(newData.power || {})
            },
            invoice: {
                ...currentConstants.invoice,
                ...(newData.invoice || {})
            },
            company: {
                ...currentConstants.company,
                ...(newData.company || {})
            },

            detailedMetrics: newData.detailedMetrics
                ? {
                    ...DEFAULT_CONSTANTS.detailedMetrics,
                    ...newData.detailedMetrics,
                    valoresAnuales: {
                        ...DEFAULT_CONSTANTS.detailedMetrics.valoresAnuales,
                        ...newData.detailedMetrics.valoresAnuales
                    },
                    porcentajes: {
                        ...DEFAULT_CONSTANTS.detailedMetrics.porcentajes,
                        ...newData.detailedMetrics.porcentajes
                    }
                }
                : currentConstants.detailedMetrics

        };

        console.log('Saving constants:', updatedConstants);


        // Escribimos el archivo
        await fs.writeFile(constantsFilePath, JSON.stringify(updatedConstants, null, 2));

        return NextResponse.json({
            message: 'Constants updated successfully',
            data: updatedConstants
        });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json(
            { error: 'Error updating constants' },
            { status: 500 }
        );
    }
}