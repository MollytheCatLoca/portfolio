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
        // Solo devolvemos las constantes de power
        return NextResponse.json(constants.power);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error reading Power constants' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        // Aseguramos que sólo tomamos la sección "power" de los datos recibidos
        const newPowerData = requestData.power;

        if (!newPowerData) {
            return NextResponse.json(
                { error: 'No power data provided' },
                { status: 400 }
            );
        }

        let constants = await readConstants();
        // Reemplazamos la sección power directamente
        constants.power = newPowerData;

        // Escribimos el archivo con las constantes actualizadas
        await fs.writeFile(constantsFilePath, JSON.stringify(constants, null, 2), 'utf8');

        return NextResponse.json({
            message: 'Power constants updated successfully',
            data: constants.power
        });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json(
            { error: 'Error updating Power constants' },
            { status: 500 }
        );
    }
}