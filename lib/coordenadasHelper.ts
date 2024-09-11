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
    if (provinciasLocalidadesData === null) {
        try {
            const response = await fetch('/data/provinciasLocalidades.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            provinciasLocalidadesData = await response.json();
            console.log('Provincias cargadas:', Object.keys(provinciasLocalidadesData));
        } catch (error) {
            console.error('Error al cargar el archivo de provincias y localidades:', error);
            return {};
        }
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
        console.log('Provincias disponibles:', Object.keys(data));

        if (!data[provincia]) {
            console.log(`Buscando provincia: ${provincia}`);
            console.log('Provincias disponibles:', Object.keys(data));
            throw new Error(`Provincia no encontrada: ${provincia}`);
        }

        console.log(`Localidades en ${provincia}:`, data[provincia].map(l => l.nombre));

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
        console.error(`Error detallado al obtener coordenadas para ${localidad}, ${provincia}:`, error);
        throw error;
    }
});