import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const constantsFilePath = path.join(process.cwd(), 'app', 'admin', 'informe', 'data', 'constants.json');

async function readConstants() {
    try {
        const data = await fs.readFile(constantsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading constants:', error);
        // Si no existe el archivo o está vacío, devolvemos la estructura base
        return {
            technical: {},
            consumption: {},
            power: {},
            invoice: {}
        };
    }
}

export async function GET() {
    try {
        const constants = await readConstants();
        // Solo devolvemos las constantes de consumo
        return NextResponse.json(constants.consumption);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error reading Consumption constants' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        // Aseguramos que sólo tomamos la sección "consumption" de los datos recibidos
        const newConsumptionData = requestData.consumption;

        if (!newConsumptionData) {
            return NextResponse.json(
                { error: 'No consumption data provided' },
                { status: 400 }
            );
        }

        let constants = await readConstants();
        // Reemplazamos la sección consumption directamente
        constants.consumption = newConsumptionData;

        // Escribimos el archivo con las constantes actualizadas
        await fs.writeFile(constantsFilePath, JSON.stringify(constants, null, 2), 'utf8');

        return NextResponse.json({
            message: 'Consumption constants updated successfully',
            data: constants.consumption
        });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json(
            { error: 'Error updating Consumption constants' },
            { status: 500 }
        );
    }
}