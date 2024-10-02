import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const DEBUG_MODE = 1; // 1 para usar datos de Heroku, 2 para usar datos locales
const TIMEOUT = 60000; // 60 segundos de timeout
const CACHE_EXPIRATION = 3600000; // 1 hora en milisegundos

interface CacheItem {
    data: any;
    timestamp: number;
}

const cache = new Map<string, CacheItem>();

async function getLocalData() {
    const filePath = path.join(process.cwd(), 'data', 'parquesSolaresEscenarios.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function fetchFromHeroku(url: string, data: any, options: any) {
    const response = await axios({
        method: 'get',
        url: url,
        ...options,
        data: JSON.stringify(data)
    });
    return response.data;
}

function getCacheKey(data: any): string {
    return `${data.provincia}-${data.localidad}-${data.capacidad}-${data.latitud}-${data.longitud}-${data.scenarioId}`; // Añada -${data.scenarioId} al final

}

function isCacheValid(cacheItem: CacheItem): boolean {
    return Date.now() - cacheItem.timestamp < CACHE_EXPIRATION;
}

export async function POST(req: NextRequest) {
    console.log("API route: POST request received");
    const startTime = Date.now();
    try {
        const requestData = await req.json();
        //console.log("API solarPark reqData: ", requestData)

        const data = {
            provincia: requestData.provincia || "Test",
            localidad: requestData.localidad || "Test",
            capacidad: requestData.capacidad || 1,
            area: requestData.area || 100000,
            latitud: requestData.latitud || -27.5269702,
            longitud: requestData.longitud || -58.76592117375753,
            scenarioId: requestData.scenarioId || "" // Añada esta línea

        };

        //console.log("API route: Using data", JSON.stringify(data, null, 2));
        console.log("API route: Using data");

        const cacheKey = getCacheKey(data);
        const cachedItem = cache.get(cacheKey);

        if (cachedItem && isCacheValid(cachedItem)) {
            console.log('API route: Returning cached data');
            return NextResponse.json(cachedItem.data);
        }

        let responseData;

        if (DEBUG_MODE === 1) {
            const herokuUrl = 'https://prompt-handler-06fbef253337.herokuapp.com/solar-parks';
            const auth = {
                username: process.env.API_USERNAME || '',
                password: process.env.API_PASSWORD || ''
            };

            console.log('API route: Requesting data from Heroku');
            //console.log('API route: Using auth:', { username: auth.username, passwordLength: auth.password?.length });

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

            try {
                responseData = await fetchFromHeroku(herokuUrl, data, {
                    auth: auth,
                    timeout: TIMEOUT,
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('API route: Received response from Heroku');

                // Guardar en caché
                cache.set(cacheKey, { data: responseData, timestamp: Date.now() });
            } catch (axiosError: any) {
                console.error('API route: Axios error:', axiosError.message);
                if (axiosError.response) {
                    console.error('API route: Axios error response:', axiosError.response.data);
                    console.error('API route: Axios error status:', axiosError.response.status);
                    console.error('API route: Axios error headers:', axiosError.response.headers);
                } else if (axiosError.request) {
                    console.error('API route: No response received:', axiosError.request);
                } else {
                    console.error('API route: Error setting up request:', axiosError.message);
                }
                throw axiosError;
            } finally {
                clearTimeout(timeoutId);
            }
        } else if (DEBUG_MODE === 2) {
            console.log('API route: Reading local data');
            responseData = await getLocalData();
            console.log('API route: Local data read successfully');
        } else {
            throw new Error('Invalid DEBUG_MODE');
        }

        console.log('API route: Data structure OK');
        const endTime = Date.now();
        const processingTime = (endTime - startTime) / 1000;
        console.log(`API route: Total processing time: ${processingTime} seconds`);

        return NextResponse.json(responseData);
    } catch (error: any) {
        console.error('API route: Error fetching solar parks data:', error);

        return NextResponse.json(
            { error: 'An unexpected error occurred', details: error.message },
            { status: 500 }
        );
    }
}