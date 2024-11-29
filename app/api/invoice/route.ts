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
        // Solo devolvemos las constantes de invoice
        return NextResponse.json(constants.invoice);
    } catch (error) {
        return NextResponse.json(
            { error: 'Error reading Invoice constants' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const requestData = await request.json();

        // Aseguramos que sólo tomamos la sección "invoice" de los datos recibidos
        const newInvoiceData = requestData.invoice;

        if (!newInvoiceData) {
            return NextResponse.json(
                { error: 'No invoice data provided' },
                { status: 400 }
            );
        }

        let constants = await readConstants();

        // Reemplazamos la sección invoice directamente, sin anidar ni mezclar con datos viejos
        constants.invoice = newInvoiceData;

        // Escribimos el archivo con las constantes actualizadas, asegurándonos de no tener anidamientos innecesarios
        await fs.writeFile(constantsFilePath, JSON.stringify(constants, null, 2), 'utf8');

        return NextResponse.json({ message: 'Invoice constants updated successfully', data: constants.invoice });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json(
            { error: 'Error updating Invoice constants' },
            { status: 500 }
        );
    }
}
