import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'provinciasLocalidades.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error al leer el archivo de provincias:', error);
        return NextResponse.json({ error: 'Error al cargar los datos de provincias' }, { status: 500 });
    }
}