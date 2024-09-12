import { cache } from 'react'
import { getParquesSolaresCoord } from './coordenadasHelper';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL
    ? (process.env.NEXT_PUBLIC_API_URL.startsWith('http')
        ? process.env.NEXT_PUBLIC_API_URL
        : `https://${process.env.NEXT_PUBLIC_API_URL}`)
    : 'https://www.bisintegraciones.com';

console.log('API base URL:', baseUrl);


interface QueryParams {
    provincia?: string;
    localidad?: string;
    capacidad?: string | number;
    area?: string | number;
    latitud?: number;
    longitud?: number;
}

interface ParqueSolarData {
    id_escenario: number;
    nombre: string;
    ubicacion: {
        ciudad: string;
        provincia: string;
        coordenadas: {
            lat: number;
            lon: number;
        };
        descripcion: string;
    };
    capacidad: {
        actual: number;
        maxima: number;
        unidad: string;
        paneles: number;
        inversores: number;
    };
    inversion: {
        total: number;
        unidad: string;
        periodoRecuperacion: number;
        tir: number;
        van: number;
    };
    financiamiento: {
        plazoFinanciamiento: number;
        tasaInteres: number;
    };
    analisisFinanciero: Array<{
        year: number;
        generacion: number;
        ingresos: number;
        cuotaInversion: number;
    }>;
    produccionAnual: {
        estimada: number;
        unidad: string;
        consumoEquivalente: number;
    };
    ahorroCO2: {
        anual: number;
        unidad: string;
        equivalenciaArboles: number;
        equivalenciaAutos: number;
    };
    terreno: {
        area: number;
        unidad: string;
        tipo: string;
        elevacionPromedio: number;
        unidadElevacion: string;
        irradiacionAnual: number;
        unidadIrradiacion: string;
    };
    generacionMensual: Array<{
        mes: string;
        generacion: number;
    }>;
    generacionAnual: Array<{
        year: number;
        generacion: number;
    }>;
    factorCapacidad: number;
    impactoSocial: {
        empleosDirectos: number;
        empleosIndirectos: number;
        programasEducativos: number;
    };
    detallesTecnicos: {
        tipoPaneles: string;
        eficienciaPaneles: number;
        vidaUtilEstimada: number;
        degradacionAnual: number;
    };
}

const parquesSolaresCache = new Map();

export const getParquesSolaresData = cache(async (params: QueryParams = {}): Promise<ParqueSolarData[]> => {
    console.log("getParquesSolaresData: Called with params", params);

    if (Object.values(params).every(value => value === '')) {
        console.log("getParquesSolaresData: Todos los parámetros están vacíos, no se realiza la llamada a la API");
        return [];
    }

    const cacheKey = JSON.stringify(params);

    if (parquesSolaresCache.has(cacheKey)) {
        console.log("getParquesSolaresData: Returning cached data");
        return parquesSolaresCache.get(cacheKey);
    }

    console.log("getParquesSolaresData: Fetching data from API");
    const data = await fetchDataFromAPI(params);
    parquesSolaresCache.set(cacheKey, data);
    return data;
});

async function fetchDataFromAPI(params: QueryParams): Promise<ParqueSolarData[]> {
    console.log("fetchDataFromAPI: Fetching from API with params", params);

    let coordenadas = { lat: 0, lon: 0 };
    console.log("ANTES IF Params Lat", params.longitud)
    console.log("ANTES IF Params Lat", params.latitud)
    if (params.provincia && params.localidad && !params.latitud && !params.longitud) {
        console.log("Params Lat", params.longitud)
        console.log("Params Lat", params.latitud)
        try {
            coordenadas = await getParquesSolaresCoord(params.provincia, params.localidad);
            console.log("apiSolar.TS Coordendas", coordenadas)
        } catch (error) {
            console.error('Error al obtener coordenadas:', error);
        }
    }

    const data = {
        provincia: params.provincia || "Test aS",
        localidad: params.localidad || "Test aS",
        capacidad: params.capacidad || 1,
        area: params.area || 100000,
        latitud: params.latitud || coordenadas.lat || -27.5269702,
        longitud: params.longitud || coordenadas.lon || -58.76592117375753
    };

    try {
        console.log('Intentando llamar a la API:', `${baseUrl}/api/solarParks`);
        const response = await axios({
            method: 'post',
            url: `${baseUrl}/api/solarParks`,
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("fetchDataFromAPI: Data received from API");
        //console.log("fetchDataFromAPI: Data received from API", response.data);

        // Manejar diferentes estructuras de respuesta
        let parquesSolares: ParqueSolarData[] = [];

        if (response.data && response.data.parque_buenos_aires) {
            parquesSolares = response.data.parque_buenos_aires;
        } else if (Array.isArray(response.data)) {
            parquesSolares = response.data;
        } else if (typeof response.data === 'object' && response.data !== null) {
            // Si la respuesta es un objeto, intentamos extraer los escenarios
            const escenarios = Object.values(response.data).find(Array.isArray);
            if (escenarios) {
                parquesSolares = escenarios as ParqueSolarData[];
            }
        }

        if (parquesSolares.length === 0) {
            console.error("Unexpected data structure received from API", response.data);
        }

        return parquesSolares;
    } catch (error) {
        console.error("fetchDataFromAPI: Error fetching data", error);
        return [];
    }
}

export const getParqueSolarData = async (id: number, params: QueryParams = {}): Promise<ParqueSolarData | null> => {
    console.log("getParqueSolarData: Fetching data for scenario", id, "with params", params);
    const data = await getParquesSolaresData(params);
    //console.log("getParqueSolarData: All scenarios data received", data);

    const escenario = data.find(s => s.id_escenario === id);

    if (!escenario) {
        console.warn(`No se encontró el escenario con id ${id}`);
        return null;
    }

    //console.log("getParqueSolarData: Scenario found", escenario);
    console.log("getParqueSolarData: Scenario found")
    return escenario;
};

export async function updateParqueSolarData(nombre: string, updates: Partial<ParqueSolarData>, params: QueryParams = {}): Promise<ParqueSolarData> {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    try {
        const response = await fetch(`${baseUrl}/api/solarParks/${nombre}?${queryString}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Failed to update parque solar data');
        }

        const updatedParque = await response.json();

        // Actualizar el cache
        const cacheKey = JSON.stringify(params);
        if (parquesSolaresCache.has(cacheKey)) {
            const cachedData = parquesSolaresCache.get(cacheKey);
            const updatedData = cachedData.map(p =>
                p.nombre === nombre ? { ...p, ...updatedParque } : p
            );
            parquesSolaresCache.set(cacheKey, updatedData);
        }

        return updatedParque;
    } catch (error) {
        console.error("Error updating parque solar data:", error);
        throw error;
    }
}