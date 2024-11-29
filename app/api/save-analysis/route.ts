// app/api/save-analysis/route.ts
import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
    console.log('API route hit: /api/save-analysis');

    try {
        const data = await request.json()
        console.log('Datos recibidos:', JSON.stringify(data, null, 2));

        // Cambiamos la ruta al directorio correcto
        const dirPath = join(process.cwd(), 'app', 'admin', 'informeCF', 'data')
        console.log('Directorio destino:', dirPath);

        try {
            await mkdir(dirPath, { recursive: true })
            console.log('Directorio creado/verificado');
        } catch (err: any) {
            if (err.code !== 'EEXIST') {
                console.error('Error creando directorio:', err);
                throw err;
            }
        }

        const filePath = join(dirPath, 'CalculosAnalisis.ts')
        console.log('Ruta del archivo:', filePath);

        const content = `// Generado: ${new Date().toISOString()}
export const analysisResults = ${JSON.stringify(data, null, 2)};`

        await writeFile(filePath, content, 'utf-8')
        console.log('Archivo guardado exitosamente');

        return NextResponse.json({
            success: true,
            message: 'Archivo guardado correctamente',
            path: filePath
        })

    } catch (error: any) {
        console.error('Error en el servidor:', error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Error desconocido',
                details: error.stack
            },
            { status: 500 }
        )
    }
}