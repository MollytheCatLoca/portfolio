import provinciasLocalidadesData from '@/public/data/provinciasLocalidades.json';

interface Coordenadas {
    lat: number;
    lon: number;
}

export async function getParquesSolaresCoord(provincia: string, localidad: string): Promise<Coordenadas> {
    console.log(`Buscando coordenadas para: ${provincia}, ${localidad}`);

    try {
        if (!provinciasLocalidadesData[provincia]) {
            console.log('Provincias disponibles:', Object.keys(provinciasLocalidadesData));
            throw new Error(`Provincia no encontrada: ${provincia}`);
        }

        console.log(`Localidades en ${provincia}:`, provinciasLocalidadesData[provincia].map(l => l.nombre));

        const localidadInfo = provinciasLocalidadesData[provincia].find(
            l => l.nombre.toLowerCase() === localidad.toLowerCase()
        );

        if (!localidadInfo) {
            throw new Error(`Localidad no encontrada: ${localidad} en la provincia ${provincia}`);
        }

        console.log(`Coordenadas encontradas:`, localidadInfo);

        return {
            lat: localidadInfo.lat,
            lon: localidadInfo.lon
        };
    } catch (error) {
        console.error(`Error al obtener coordenadas para ${localidad}, ${provincia}:`, error);
        throw error;
    }
}