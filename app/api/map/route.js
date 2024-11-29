import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

export async function GET(request) {
    try {
        // Obtener los parámetros de búsqueda (latitud y longitud)
        const { searchParams } = new URL(request.url);
        const lat = searchParams.get('lat');
        const lon = searchParams.get('lon');

        if (!lat || !lon) {
            // Devolver error si faltan los parámetros de latitud o longitud
            return NextResponse.json({ error: 'Latitud y longitud son requeridas' }, { status: 400 });
        }

        // Construir la URL de la API de Google Maps
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=15&size=800x400&markers=color:red|${lat},${lon}&key=${apiKey}`;

        // Solicitar la imagen a Google Maps API
        console.log("Solicitando la imagen a Google Maps...");
        const response = await axios.get(mapUrl, { responseType: 'arraybuffer' });

        // Convertir la respuesta en un buffer
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Utilizar un nombre de archivo fijo para simplificar el proceso
        const fileName = 'static_map.png';
        const filePath = path.join(process.cwd(), 'public', 'maps', fileName);

        // Log de la ruta que se intenta utilizar
        console.log(`Intentando guardar la imagen en la ruta: ${filePath}`);

        // Escribir la imagen en la carpeta indicada
        await fs.writeFile(filePath, imageBuffer);
        console.log("Imagen guardada correctamente en la carpeta maps.");

        // Devolver una respuesta indicando que el archivo se creó correctamente
        return NextResponse.json({ message: 'Imagen creada exitosamente' }, { status: 200 });

    } catch (error) {
        // Registrar el error en el servidor y devolver un error de respuesta
        console.error('Error al obtener o guardar la imagen del mapa:', error.message);
        return NextResponse.json({ error: 'Error al obtener la imagen del mapa' }, { status: 500 });
    }
}
