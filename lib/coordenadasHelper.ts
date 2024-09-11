import { cache } from 'react'

interface Coordenadas {
    lat: number;
    lon: number;
}

interface Localidad {
    nombre: string;
    lat: number;
    lon: number;
}

interface ProvinciaData {
    [provincia: string]: Localidad[];
}

let provinciasLocalidadesData: ProvinciaData | null = null;
const coordCache = new Map<string, Coordenadas>();

async function loadProvinciasLocalidadesData(): Promise<ProvinciaData> {
    if (typeof window === 'undefined' && provinciasLocalidadesData === null) {
        const { promises: fs } = await import('fs');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'data', 'provinciasLocalidades.json');
        const fileContents = await fs.readFile(filePath, 'utf8');
        provinciasLocalidadesData = JSON.parse(fileContents);
    }
    return provinciasLocalidadesData || {};
}

export const getParquesSolaresCoord = cache(async (provincia: string, localidad: string): Promise<Coordenadas> => {
    const cacheKey = `coord_${provincia}_${localidad}`;

    if (coordCache.has(cacheKey)) {
        return coordCache.get(cacheKey)!;
    }

    try {
        const data = await loadProvinciasLocalidadesData();

        if (!data[provincia]) {
            throw new Error(`Provincia no encontrada: ${provincia}`);
        }

        const localidadInfo = data[provincia].find(l => l.nombre.toLowerCase() === localidad.toLowerCase());

        if (!localidadInfo) {
            throw new Error(`Localidad no encontrada: ${localidad} en la provincia ${provincia}`);
        }

        const coordenadas: Coordenadas = {
            lat: localidadInfo.lat,
            lon: localidadInfo.lon
        };

        coordCache.set(cacheKey, coordenadas);

        return coordenadas;
    } catch (error) {
        console.error(`Error al obtener coordenadas para ${localidad}, ${provincia}:`, error);
        throw error;
    }
});